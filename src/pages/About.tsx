import { getLocale } from '@/locales'
import styles from './About.module.css'

const t = getLocale('pl')

export function About() {
  return (
    <div className={styles.page}>
      <section className={styles.head}>
        <h1 className={styles.title}>{t.about.title}</h1>
        <p className={styles.subtitle}>{t.about.subtitle}</p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>{t.about.storyTitle}</h2>
        <p className={styles.storyText}>{t.about.storyText}</p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>{t.about.valuesTitle}</h2>
        <div className={styles.values}>
          <div className={styles.value}>
            <h3 className={styles.valueTitle}>{t.about.value1Title}</h3>
            <p className={styles.valueText}>{t.about.value1Text}</p>
          </div>
          <div className={styles.value}>
            <h3 className={styles.valueTitle}>{t.about.value2Title}</h3>
            <p className={styles.valueText}>{t.about.value2Text}</p>
          </div>
          <div className={styles.value}>
            <h3 className={styles.valueTitle}>{t.about.value3Title}</h3>
            <p className={styles.valueText}>{t.about.value3Text}</p>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>{t.about.locationsTitle}</h2>
        <ul className={styles.locations}>
          <li>{t.about.location1}</li>
          <li>{t.about.location2}</li>
          <li>{t.about.location3}</li>
        </ul>
      </section>
    </div>
  )
}
