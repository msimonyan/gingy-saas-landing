// Canonical legal document text for the public marketing site.
// Each document is available in Russian (default) and English.
// `updated` mirrors the document's "Last updated" date and is also the version
// recorded against users when they accept the documents during sign-up.

export type LegalLang = 'ru' | 'en'

export interface LegalText {
  title: string
  updatedLabel: string
  html: string
}

export interface LegalDocument {
  ru: LegalText
  en: LegalText
}

const PRIVACY_EN = `
<p><strong>Gingy SaaS Platform</strong></p>
<h2>1. General Provisions</h2>
<p>This Privacy Policy describes how OOO «ДЖИНДЖИ ГО» ("Gingy", "we", "us") collects, uses, and protects personal data of users when using the Gingy platform, including:</p>
<ul><li>web admin panel</li><li>mobile applications (iOS/Android)</li><li>landing website</li></ul>
<p>We comply with Federal Law No. 152-FZ "On Personal Data" (Russian Federation).</p>
<h2>2. Data We Collect</h2>
<p>We collect only the minimum necessary data for service operation:</p>
<h3>2.1 Account Data</h3>
<ul><li>email address</li><li>password (hashed, not visible to us)</li><li>company affiliation (organization account)</li></ul>
<h3>2.2 Employee Data</h3>
<ul><li>name or display name (if provided)</li><li>optional avatar image (user-uploaded)</li></ul>
<h3>2.3 Operational Data (Task System)</h3>
<ul><li>tasks created, assigned, completed</li><li>task history and status changes</li><li>messages and internal communications related to tasks</li><li>problem reports submitted by employees</li></ul>
<h3>2.4 Technical Data (Limited)</h3>
<p>We do NOT collect:</p>
<ul><li>device identifiers</li><li>background tracking data</li><li>precise location data</li><li>IP address logs (not stored)</li></ul>
<p>We only process minimal technical data required for system operation (e.g. session validity).</p>
<h2>3. Purpose of Data Processing</h2>
<p>We use data strictly for:</p>
<ul><li>providing SaaS functionality</li><li>enabling team task management</li><li>sending system notifications (push/email)</li><li>maintaining service security and stability</li></ul>
<p>We do NOT use data for advertising or profiling.</p>
<h2>4. Push Notifications</h2>
<p>We send push notifications for:</p>
<ul><li>task assignments</li><li>reminders</li><li>system alerts</li><li>internal messages</li></ul>
<p>We do not send marketing notifications.</p>
<h2>5. Data Sharing</h2>
<p>We do not sell or share personal data with third parties except:</p>
<ul><li>payment provider (YooMoney) for subscription processing</li><li>infrastructure providers (hosting, database services)</li></ul>
<h2>6. Data Storage</h2>
<p>All data is stored in data centers located in the Russian Federation.</p>
<h2>7. Data Ownership</h2>
<p>All data entered into Gingy belongs to the client organization that created it. Gingy acts as a data processor.</p>
<h2>8. Data Retention &amp; Deletion</h2>
<ul><li>When an account is deleted, data is retained for <strong>15 days</strong> for recovery purposes.</li><li>After 15 days, all data is permanently deleted.</li></ul>
<h2>9. Security Measures</h2>
<p>We apply reasonable technical and organizational measures:</p>
<ul><li>encrypted password storage</li><li>secure access control</li><li>role-based access (organization-level isolation)</li></ul>
<h2>10. User Rights</h2>
<p>Users may:</p>
<ul><li>request account deletion</li><li>request data access (within system limitations)</li></ul>
<p>Requests are handled via support email.</p>
<h2>11. Changes to Policy</h2>
<p>We may update this policy with prior notice.</p>
<h2>12. Contact</h2>
<p>OOO «ДЖИНДЖИ ГО»<br>Email: support@gingy.ru<br>Address: Moscow, Russia</p>
`

const PRIVACY_RU = `
<p>ООО «ДЖИНДЖИ ГО» (далее — «Gingy», «мы», «Сервис»)</p>
<h2>1. Общие положения</h2>
<p>Настоящая Политика описывает, какие данные обрабатывает сервис Gingy при использовании веб-платформы, панели администратора и мобильных приложений.</p>
<p>Мы соблюдаем требования Федерального закона РФ № 152-ФЗ «О персональных данных».</p>
<p>Используя сервис, пользователь соглашается с условиями настоящей Политики.</p>
<h2>2. Какие данные мы собираем</h2>
<p>Мы собираем только данные, необходимые для работы сервиса.</p>
<h3>2.1. Данные аккаунта</h3>
<ul><li>адрес электронной почты</li><li>пароль (в зашифрованном виде)</li><li>принадлежность к организации</li></ul>
<h3>2.2. Данные сотрудников (если предоставлены пользователем)</h3>
<ul><li>имя или отображаемое имя</li><li>аватар (по желанию пользователя)</li></ul>
<h3>2.3. Рабочие данные системы</h3>
<ul><li>задачи и их статусы</li><li>история изменений задач</li><li>сообщения внутри системы</li><li>отчёты о проблемах, созданные пользователями</li></ul>
<h3>2.4. Технические данные</h3>
<p>Мы не собираем и не используем:</p>
<ul><li>геолокацию пользователей</li><li>идентификаторы устройств</li><li>скрытую активность пользователей</li></ul>
<p>Мы обрабатываем только минимальные технические данные, необходимые для работы системы (например, авторизация пользователя).</p>
<h2>3. Цели обработки данных</h2>
<p>Данные используются исключительно для:</p>
<ul><li>предоставления функциональности сервиса</li><li>управления задачами и процессами</li><li>отправки системных уведомлений</li><li>обеспечения безопасности и стабильности работы</li></ul>
<p>Мы не используем данные для рекламы или профилирования.</p>
<h2>4. Уведомления</h2>
<p>Сервис может отправлять уведомления:</p>
<ul><li>о назначении задач</li><li>о напоминаниях</li><li>о системных событиях</li><li>о внутренних сообщениях</li></ul>
<p>Маркетинговые уведомления не отправляются.</p>
<h2>5. Передача данных третьим лицам</h2>
<p>Мы не продаём и не передаём персональные данные третьим лицам, за исключением:</p>
<ul><li>платёжного провайдера (ЮMoney)</li><li>инфраструктурных сервисов (хостинг, облачные системы)</li></ul>
<h2>6. Хранение данных</h2>
<p>Все данные хранятся на серверах, расположенных на территории Российской Федерации.</p>
<h2>7. Владение данными</h2>
<p>Все данные принадлежат организации-клиенту, которая их создала. Gingy выступает в роли оператора (обработчика) данных.</p>
<h2>8. Срок хранения и удаление данных</h2>
<ul><li>После удаления аккаунта данные хранятся <strong>15 дней</strong> для возможности восстановления.</li><li>По истечении 15 дней данные удаляются без возможности восстановления.</li></ul>
<h2>9. Безопасность</h2>
<p>Мы применяем разумные технические и организационные меры защиты:</p>
<ul><li>шифрование паролей</li><li>контроль доступа</li><li>разделение прав пользователей по ролям</li></ul>
<h2>10. Права пользователя</h2>
<p>Пользователь может:</p>
<ul><li>запросить удаление аккаунта</li><li>запросить информацию о данных (в рамках возможностей системы)</li></ul>
<p>Запросы обрабатываются через службу поддержки.</p>
<h2>11. Изменения политики</h2>
<p>Мы можем обновлять Политику. Актуальная версия всегда доступна в сервисе.</p>
<h2>12. Контакты</h2>
<p>ООО «ДЖИНДЖИ ГО»<br>Email: support@gingy.ru<br>Адрес: Москва, Россия</p>
`

const TERMS_EN = `
<p>This document is a public offer of OOO «ДЖИНДЖИ ГО» ("Gingy") to enter into a SaaS service agreement. By registering or using Gingy, the user accepts this agreement.</p>
<h2>1. Subject of Agreement</h2>
<p>Gingy provides a cloud-based SaaS platform for:</p>
<ul><li>staff management</li><li>task management</li><li>logistics and warehouse operations</li></ul>
<p>Service is provided on a subscription basis.</p>
<h2>2. Account Structure</h2>
<ul><li>Each organization represents a single company account.</li><li>One organization = one team.</li><li>All users belong to their organization only.</li></ul>
<h2>3. Subscription Model</h2>
<h3>3.1 Billing</h3>
<ul><li>Monthly or yearly subscription</li><li>Auto-renewal enabled by default</li></ul>
<h3>3.2 Free Trial</h3>
<p>Not provided.</p>
<h3>3.3 Pricing Changes</h3>
<p>Gingy may change pricing with prior notice. Existing paid periods remain unaffected.</p>
<h2>4. Payments</h2>
<p>Payments are processed via YooMoney or authorized payment providers.</p>
<h2>5. Refund Policy</h2>
<p>All payments are final and non-refundable.</p>
<h2>6. Acceptable Use</h2>
<p>Users agree not to:</p>
<ul><li>misuse the platform</li><li>attempt unauthorized access</li><li>reverse engineer the system</li><li>disrupt service stability</li></ul>
<h2>7. Data Ownership</h2>
<p>All data created within Gingy belongs to the client organization. Gingy only provides technical infrastructure.</p>
<h2>8. Availability</h2>
<p>Service is provided "as is". We do not guarantee uninterrupted availability.</p>
<h2>9. Limitation of Liability</h2>
<p>Gingy is not liable for:</p>
<ul><li>indirect damages</li><li>data loss caused by user actions</li><li>business losses due to service interruptions</li></ul>
<h2>10. Termination</h2>
<ul><li>Organizations may cancel subscription anytime.</li><li>Service access continues until billing period ends.</li></ul>
<h2>11. Governing Law</h2>
<p>This agreement is governed by the laws of the Russian Federation. All disputes are resolved in <strong>Moscow courts</strong>.</p>
<h2>12. Contact Information</h2>
<p>OOO «ДЖИНДЖИ ГО»<br>support@gingy.ru<br>Moscow, Russia</p>
`

const TERMS_RU = `
<p>Настоящий документ является публичной офертой ООО «ДЖИНДЖИ ГО» (далее — «Gingy», «Сервис») и определяет условия использования SaaS-платформы Gingy. Регистрация или использование сервиса означает полное согласие пользователя с условиями оферты.</p>
<h2>1. Общие положения</h2>
<p>Настоящий документ определяет условия использования сервиса Gingy и является публичной офертой.</p>
<h2>2. Предмет договора</h2>
<p>Gingy предоставляет облачную платформу для:</p>
<ul><li>управления сотрудниками</li><li>постановки и контроля задач</li><li>управления логистическими и складскими процессами</li></ul>
<h2>3. Структура аккаунта</h2>
<ul><li>Один аккаунт соответствует одной организации</li><li>Все пользователи относятся к одной организации</li><li>Доступ разграничивается ролями (сотрудник / администратор)</li></ul>
<h2>4. Подписка и оплата</h2>
<h3>4.1. Модель оплаты</h3>
<p>Сервис предоставляется по подписке:</p>
<ul><li>ежемесячной</li><li>ежегодной</li></ul>
<h3>4.2. Автопродление</h3>
<p>Подписка продлевается автоматически, если не отменена пользователем.</p>
<h3>4.3. Бесплатный период</h3>
<p>Не предоставляется.</p>
<h3>4.4. Изменение стоимости</h3>
<p>Gingy вправе изменять стоимость подписки с предварительным уведомлением.</p>
<h2>5. Оплата услуг</h2>
<p>Оплата осуществляется через платёжного провайдера ЮMoney или иные подключённые платёжные системы.</p>
<h2>6. Возвраты</h2>
<p>Оплата за услуги не подлежит возврату.</p>
<h2>7. Использование сервиса</h2>
<p>Пользователь обязуется:</p>
<ul><li>использовать сервис в рамках закона РФ</li><li>не нарушать работу системы</li><li>не пытаться получить несанкционированный доступ</li><li>не осуществлять реверс-инжиниринг</li></ul>
<h2>8. Данные и контент</h2>
<p>Все данные, созданные в системе, принадлежат организации клиента. Gingy не использует данные в коммерческих целях.</p>
<h2>9. Ограничение ответственности</h2>
<p>Сервис предоставляется «как есть». Gingy не несёт ответственности за:</p>
<ul><li>косвенные убытки</li><li>потерю данных по вине пользователя</li><li>перебои в работе сервиса</li></ul>
<h2>10. Прекращение использования</h2>
<p>Пользователь может прекратить использование сервиса в любое время. Доступ сохраняется до конца оплаченного периода.</p>
<h2>11. Применимое право</h2>
<p>Настоящая оферта регулируется законодательством Российской Федерации. Все споры рассматриваются в судах города Москвы.</p>
<h2>12. Контакты</h2>
<p>ООО «ДЖИНДЖИ ГО»<br>support@gingy.ru<br>Москва, Россия</p>
`

const UPDATED = '2026-05-12'

export const privacyPolicy: LegalDocument = {
  ru: { title: 'Политика конфиденциальности', updatedLabel: `Дата обновления: 12.05.2026`, html: PRIVACY_RU },
  en: { title: 'Privacy Policy', updatedLabel: `Last updated: ${UPDATED}`, html: PRIVACY_EN },
}

export const termsOfService: LegalDocument = {
  ru: { title: 'Правила использования', updatedLabel: `Дата обновления: 12.05.2026`, html: TERMS_RU },
  en: { title: 'Terms of Service', updatedLabel: `Last updated: ${UPDATED}`, html: TERMS_EN },
}
