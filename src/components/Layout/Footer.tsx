import { Link } from 'react-router-dom'
import { getLocale } from '@/locales'
import styles from './Footer.module.css'

const t = getLocale('pl')

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className={styles.footer}>
      <div className={styles.wrap}>
        <div className={styles.brand}>
          <span className={styles.logoIcon}>🐝</span>
          <span className={styles.logoText}>Pasieka BeeFi</span>
        </div>
        <nav className={styles.nav}>
          <Link to="/" className={styles.link}>{t.footer.navHome}</Link>
          <Link to="/o-nas" className={styles.link}>{t.footer.navAbout}</Link>
          <Link to="/sklep" className={styles.link}>{t.footer.navShop}</Link>
          <Link to="/kontakt" className={styles.link}>{t.footer.navContact}</Link>
        </nav>
        <p className={styles.rights}>
          {t.footer.rights.replace('{year}', String(year))}
        </p>
      </div>
    </footer>
  )
}
