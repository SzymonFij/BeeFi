import { getLocale } from '@/locales'
import styles from './LocationMap.module.css'

const t = getLocale('pl')

/** Współrzędne Łodzi — centrum */
const LODZ_LAT = 51.7592
const LODZ_LNG = 19.456

/** Link do Google Maps — wyznaczanie trasy (na mobile otwiera aplikację Maps) */
const GOOGLE_MAPS_DIRECTIONS = `https://www.google.com/maps/dir//${LODZ_LAT},${LODZ_LNG}`

/** OpenStreetMap embed — Łódź (bez klucza API) */
const OSM_EMBED = `https://www.openstreetmap.org/export/embed.html?bbox=19.38%2C51.72%2C19.55%2C51.80&layer=mapnik&marker=${LODZ_LAT}%2C${LODZ_LNG}`

export function LocationMap() {
  return (
    <section className={styles.section}>
      <h2 className={styles.title}>{t.contact.mapTitle}</h2>
      <p className={styles.hint}>{t.contact.mapHint}</p>
      <a
        href={GOOGLE_MAPS_DIRECTIONS}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.link}
        aria-label={t.contact.mapHint}
      >
        <div className={styles.mapWrap}>
          <iframe
            title={t.contact.mapTitle}
            src={OSM_EMBED}
            className={styles.iframe}
            loading="lazy"
          />
        </div>
      </a>
    </section>
  )
}
