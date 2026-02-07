import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '@/context/CartContext'
import { useCurrency } from '@/context/CurrencyContext'
import { getLocale } from '@/locales'
import styles from './Checkout.module.css'

const t = getLocale('pl')

export function Checkout() {
  const navigate = useNavigate()
  const { items, totalPln, clearCart } = useCart()
  const { formatPrice } = useCurrency()
  const [success, setSuccess] = useState(false)
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    comment: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Placeholder: w przyszłości wysyłka zamówienia na backend
    setSuccess(true)
    clearCart()
    setTimeout(() => navigate('/sklep'), 3000)
  }

  if (items.length === 0 && !success) {
    return (
      <div className={styles.page}>
        <h1 className={styles.title}>{t.shop.checkoutTitle}</h1>
        <p className={styles.empty}>{t.shop.cartEmpty}</p>
        <Link to="/sklep" className={styles.link}>
          {t.shop.continueShopping}
        </Link>
      </div>
    )
  }

  if (success) {
    return (
      <div className={styles.page}>
        <div className={styles.successBox}>
          <h2 className={styles.successTitle}>{t.shop.orderSuccess}</h2>
          <p className={styles.successNote}>{t.shop.orderSuccessNote}</p>
          <Link to="/sklep" className={styles.link}>
            {t.shop.continueShopping}
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.page}>
      <header className={styles.head}>
        <h1 className={styles.title}>{t.shop.checkoutTitle}</h1>
        <p className={styles.subtitle}>{t.shop.checkoutSubtitle}</p>
      </header>

      <p className={styles.note}>{t.shop.checkoutNote}</p>

      <form onSubmit={handleSubmit} className={styles.form}>
        <label className={styles.label}>
          {t.shop.checkoutName}
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            className={styles.input}
          />
        </label>
        <label className={styles.label}>
          {t.shop.checkoutEmail}
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            className={styles.input}
          />
        </label>
        <label className={styles.label}>
          {t.shop.checkoutPhone}
          <input
            type="tel"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            required
            className={styles.input}
          />
        </label>
        <label className={styles.label}>
          {t.shop.checkoutAddress}
          <input
            type="text"
            name="address"
            value={form.address}
            onChange={handleChange}
            required
            className={styles.input}
          />
        </label>
        <label className={styles.label}>
          {t.shop.checkoutComment}
          <textarea
            name="comment"
            value={form.comment}
            onChange={handleChange}
            rows={3}
            className={styles.textarea}
          />
        </label>

        <div className={styles.summary}>
          <p className={styles.summaryLine}>
            {t.shop.cartTotal}: <strong>{formatPrice(totalPln)}</strong>
          </p>
        </div>

        <button type="submit" className={styles.submit}>
          {t.shop.checkoutSubmit}
        </button>
      </form>
    </div>
  )
}
