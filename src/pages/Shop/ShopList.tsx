import { Link } from 'react-router-dom'
import { useCart } from '@/context/CartContext'
import { useCurrency } from '@/context/CurrencyContext'
import { getLocale } from '@/locales'
import { products } from '@/data/products'
import type { Product } from '@/types/shop'
import styles from './ShopList.module.css'

const t = getLocale('pl')

function ProductCard({ product }: { product: Product }) {
  const { items, addItem, updateQuantity } = useCart()
  const { formatPrice } = useCurrency()

  const name = t.product[product.nameKey]
  const description = t.product[product.descriptionKey]
  const priceUnit = product.unit === 'jar' ? t.shop.perJar : t.shop.perKg
  const weight = product.weightG ? ` ${product.weightG}g` : ''

  const cartItem = items.find((i) => i.product.id === product.id)
  const quantity = cartItem?.quantity ?? 0

  return (
    <article className={styles.card}>
      <div className={styles.cardImage}>
        <span className={styles.cardEmoji}>🍯</span>
      </div>
      <div className={styles.cardBody}>
        <h3 className={styles.cardTitle}>{name}{weight}</h3>
        <p className={styles.cardDesc}>{description}</p>
        <div className={styles.cardFooter}>
          <span className={styles.price}>
            {formatPrice(product.pricePln)}{' '}
            <span className={styles.priceUnit}>{t.shop.pricePer} {priceUnit}</span>
          </span>
          {quantity === 0 ? (
            <button
              type="button"
              onClick={() => addItem(product, 1)}
              className={styles.btnAdd}
            >
              {t.shop.addToCart}
            </button>
          ) : (
            <div className={styles.quantity}>
              <button
                type="button"
                onClick={() => updateQuantity(product.id, quantity - 1)}
                className={styles.qtyBtn}
                aria-label="Zmniejsz ilość"
              >
                −
              </button>
              <span className={styles.qtyNum}>{quantity}</span>
              <button
                type="button"
                onClick={() => updateQuantity(product.id, quantity + 1)}
                className={styles.qtyBtn}
                aria-label="Zwiększ ilość"
              >
                +
              </button>
            </div>
          )}
        </div>
      </div>
    </article>
  )
}

export function ShopList() {
  return (
    <div className={styles.page}>
      <header className={styles.head}>
        <h1 className={styles.title}>{t.shop.title}</h1>
        <p className={styles.subtitle}>{t.shop.subtitle}</p>
        <CurrencySwitcher />
      </header>

      {products.length === 0 ? (
        <p className={styles.empty}>{t.shop.emptyList}</p>
      ) : (
        <div className={styles.grid}>
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}

      <div className={styles.actions}>
        <Link to="/sklep/koszyk" className={styles.linkCart}>
          {t.shop.viewCart}
        </Link>
      </div>
    </div>
  )
}

function CurrencySwitcher() {
  const { currency, setCurrency } = useCurrency()
  return (
    <div className={styles.currencyWrap}>
      <span className={styles.currencyLabel}>{t.currency.switchLabel}:</span>
      <div className={styles.currencyBtns}>
        <button
          type="button"
          onClick={() => setCurrency('PLN')}
          className={currency === 'PLN' ? styles.currencyActive : styles.currencyBtn}
        >
          {t.currency.pln}
        </button>
        <button
          type="button"
          onClick={() => setCurrency('EUR')}
          className={currency === 'EUR' ? styles.currencyActive : styles.currencyBtn}
        >
          {t.currency.eur}
        </button>
      </div>
    </div>
  )
}
