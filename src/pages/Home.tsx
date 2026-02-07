import { Link } from 'react-router-dom'
import { getLocale } from '@/locales'
import styles from './Home.module.css'

const t = getLocale('pl')

export function Home() {
  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <h1 className={styles.heroTitle}>{t.home.heroTitle}</h1>
        <p className={styles.heroSubtitle}>{t.home.heroSubtitle}</p>
        <Link to="/sklep" className={styles.heroCta}>
          {t.home.heroCta}
        </Link>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>{t.home.introTitle}</h2>
        <p className={styles.introText}>{t.home.introText}</p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>{t.home.featuresTitle}</h2>
        <div className={styles.features}>
          <div className={styles.feature}>
            <span className={styles.featureIcon}>🌸</span>
            <h3 className={styles.featureTitle}>{t.home.feature1Title}</h3>
            <p className={styles.featureText}>{t.home.feature1Text}</p>
          </div>
          <div className={styles.feature}>
            <span className={styles.featureIcon}>📍</span>
            <h3 className={styles.featureTitle}>{t.home.feature2Title}</h3>
            <p className={styles.featureText}>{t.home.feature2Text}</p>
          </div>
          <div className={styles.feature}>
            <span className={styles.featureIcon}>❤️</span>
            <h3 className={styles.featureTitle}>{t.home.feature3Title}</h3>
            <p className={styles.featureText}>{t.home.feature3Text}</p>
          </div>
        </div>
        <div className={styles.ctaWrap}>
          <Link to="/sklep" className={styles.ctaButton}>
            {t.home.visitShop}
          </Link>
        </div>
      </section>
    </div>
  )
}
