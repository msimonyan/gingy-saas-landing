/**
 * Inertia-proof programmatic scrolling.
 *
 * macOS trackpad "momentum" keeps dispatching wheel events for up to ~3s after
 * you lift your fingers, and those events are non-cancelable, so `preventDefault`
 * can't stop them. If we scroll programmatically (to a section, or to the top of
 * a freshly navigated page) that leftover momentum lands on top of our scroll and
 * drags the page away — overshooting a section, or pushing a new page down past
 * its top.
 *
 * This helper owns the scroll outright: it sets `overflow: hidden` (which still
 * allows programmatic `scrollTo` but blocks user/inertia scrolling) and re-pins
 * the target every frame until either the momentum stream goes silent or the user
 * clearly takes over. `html { scrollbar-gutter: stable }` keeps hiding the
 * scrollbar from shifting the layout.
 *
 * Telling a real user scroll apart from inertia is the crux: both are
 * non-cancelable pixel-delta wheel events. The distinguisher is that inertia only
 * ever *decays*, while a user *re-accelerates* — so we release when the recent
 * wheel speed rises above what it was ~450ms ago. Tuned/validated against real
 * captured mouse + momentum traces.
 */

const SCROLL_DURATION = 600
/** Release once the wheel stream has been silent this long (momentum finished). */
const INERTIA_QUIET_MS = 200
/** Recent speed rising this far above its ~450ms-ago baseline = user took over. */
const USER_SCROLL_RISE_RATIO = 1.5
const USER_SCROLL_BASELINE_MS = 450
const USER_SCROLL_CONFIRM_MS = 100
/** Safety cap; must exceed how long momentum can run (~3s). */
const MAX_LOCK_MS = 4000

let cancelActive: (() => void) | null = null

function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
}

interface InertiaScrollOptions {
  /** Animate from the current position to the target (default true). When false
   *  the target is set instantly and then just held — used to pin a freshly
   *  navigated page at the top against leftover momentum. */
  animate?: boolean
}

/**
 * Scroll to `targetY` and hold it there against trackpad momentum until the
 * momentum dies or the user takes over. Returns a cancel function.
 */
export function inertiaScrollTo(targetY: number, { animate = true }: InertiaScrollOptions = {}): () => void {
  cancelActive?.()

  const html = document.documentElement
  const startY = window.scrollY
  const maxY = html.scrollHeight - window.innerHeight
  const clampedTarget = Math.max(0, Math.min(targetY, maxY))
  const distance = clampedTarget - startY
  const duration = animate ? SCROLL_DURATION : 0

  const prevScrollBehavior = html.style.scrollBehavior
  const prevOverflow = html.style.overflow
  html.style.scrollBehavior = 'auto'
  html.style.overflow = 'hidden'

  const start = performance.now()
  let lastWheelAt = start
  let userTookOver = false
  let ema = 0
  const speedHistory: { t: number; v: number }[] = []
  let risingSince = 0

  const onWheel = (e: WheelEvent) => {
    const t = performance.now()
    lastWheelAt = t
    if (e.cancelable) userTookOver = true // fresh trackpad gesture: release now
    const mag = Math.abs(e.deltaY)
    ema = ema === 0 ? mag : ema * 0.75 + mag * 0.25
    speedHistory.push({ t, v: ema })
    while (speedHistory.length > 0 && t - speedHistory[0].t > USER_SCROLL_BASELINE_MS + 300) {
      speedHistory.shift()
    }
  }
  const onUserIntent = () => { userTookOver = true }
  window.addEventListener('wheel', onWheel, { passive: true })
  window.addEventListener('keydown', onUserIntent, { passive: true })
  window.addEventListener('pointerdown', onUserIntent, { passive: true })

  let rafId = 0
  const cleanup = () => {
    cancelAnimationFrame(rafId)
    html.style.scrollBehavior = prevScrollBehavior
    html.style.overflow = prevOverflow
    window.removeEventListener('wheel', onWheel)
    window.removeEventListener('keydown', onUserIntent)
    window.removeEventListener('pointerdown', onUserIntent)
    cancelActive = null
  }
  cancelActive = cleanup

  const frame = (now: number) => {
    const elapsed = now - start
    const t = duration > 0 ? Math.min(1, elapsed / duration) : 1
    window.scrollTo(0, startY + distance * (duration > 0 ? easeInOutCubic(t) : 1))

    const settled = elapsed >= duration
    if (settled && ema > 0) {
      let baseline = ema
      for (let i = speedHistory.length - 1; i >= 0; i--) {
        if (now - speedHistory[i].t >= USER_SCROLL_BASELINE_MS) {
          baseline = speedHistory[i].v
          break
        }
      }
      if (ema > baseline * USER_SCROLL_RISE_RATIO) {
        if (risingSince === 0) risingSince = now
        else if (now - risingSince > USER_SCROLL_CONFIRM_MS) userTookOver = true
      } else {
        risingSince = 0
      }
    }

    const inertiaQuiet = now - lastWheelAt > INERTIA_QUIET_MS
    if (userTookOver || (settled && inertiaQuiet) || elapsed > MAX_LOCK_MS) {
      cleanup()
    } else {
      rafId = requestAnimationFrame(frame)
    }
  }
  rafId = requestAnimationFrame(frame)
  return cleanup
}
