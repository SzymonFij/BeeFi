import { Link, NavLink } from 'react-router-dom'
import { useCart } from '@/context/CartContext'
import { getLocale } from '@/locales'
import styles from './Header.module.css'

const t = getLocale('pl')

export function Header() {
  const { totalItems } = useCart()

  return (
    <header className={styles.header}>
      <div className={styles.wrap}>
        <Link to="/" className={styles.logo}>
          <span className={styles.logoIcon}>🐝</span>
          <span className={styles.logoText}>BeeFi</span>
        </Link>
        <nav className={styles.nav}>
          <NavLink to="/" className={({ isActive }) => (isActive ? styles.linkActive : styles.link)} end>
            {t.nav.home}
          </NavLink>
          <NavLink to="/o-nas" className={({ isActive }) => (isActive ? styles.linkActive : styles.link)}>
            {t.nav.about}
          </NavLink>
          <NavLink to="/sklep" className={({ isActive }) => (isActive ? styles.linkActive : styles.link)}>
            {t.nav.shop}
          </NavLink>
          <NavLink to="/kontakt" className={({ isActive }) => (isActive ? styles.linkActive : styles.link)}>
            {t.nav.contact}
          </NavLink>
          <Link to="/sklep/koszyk" className={styles.cartLink}>
            {totalItems > 0 ? t.nav.cartCount.replace('{count}', String(totalItems)) : t.nav.cart}
          </Link>
          <NavLink to="/logowanie" className={({ isActive }) => (isActive ? styles.linkActive : styles.link)}>
            {t.nav.login}
          </NavLink>
        </nav>
      </div>
    </header>
  )
}
