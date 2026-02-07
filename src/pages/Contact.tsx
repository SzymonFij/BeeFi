import { useState } from 'react'
import { getLocale } from '@/locales'
import { LocationMap } from '@/components/LocationMap/LocationMap'
import styles from './Contact.module.css'

const t = getLocale('pl')

export function Contact() {
  const [sent, setSent] = useState(false)
  const [error, setError] = useState(false)

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(false)
    // Placeholder: w przyszłości wysyłka na backend / e-mail
    setSent(true)
  }

  return (
    <div className={styles.page}>
      <section className={styles.head}>
        <h1 className={styles.title}>{t.contact.title}</h1>
        <p className={styles.subtitle}>{t.contact.subtitle}</p>
      </section>

      <div className={styles.grid}>
        <div className={styles.card}>
          <h2 className={styles.cardTitle}>{t.contact.addressTitle}</h2>
          <address className={styles.address}>
            {t.contact.addressLine1}<br />
            {t.contact.addressLine2}<br />
            {t.contact.addressLine3}<br />
            {t.contact.addressLine4}
          </address>
          <p className={styles.meta}>
            <strong>{t.contact.email}</strong>: kontakt@beefi-pasieka.pl
          </p>
          <p className={styles.meta}>
            <strong>{t.contact.phone}</strong>: +48 123 456 789
          </p>
          <p className={styles.meta}>
            <strong>{t.contact.openHours}</strong><br />
            {t.contact.openHoursValue}
          </p>
        </div>

        <div className={styles.card}>
          <h2 className={styles.cardTitle}>Formularz</h2>
          {sent ? (
            <p className={styles.success}>{t.contact.formSuccess}</p>
          ) : (
            <form onSubmit={handleSubmit} className={styles.form}>
              <label className={styles.label}>
                {t.contact.formName}
                <input type="text" name="name" required className={styles.input} />
              </label>
              <label className={styles.label}>
                {t.contact.formEmail}
                <input type="email" name="email" required className={styles.input} />
              </label>
              <label className={styles.label}>
                {t.contact.formMessage}
                <textarea name="message" rows={4} required className={styles.textarea} />
              </label>
              {error && <p className={styles.error}>{t.contact.formError}</p>}
              <button type="submit" className={styles.submit}>
                {t.contact.formSend}
              </button>
            </form>
          )}
        </div>
      </div>

      <LocationMap />
    </div>
  )
}
