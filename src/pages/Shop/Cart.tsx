import { Link } from 'react-router-dom'
import { useCart } from '@/context/CartContext'
import { useCurrency } from '@/context/CurrencyContext'
import { getLocale } from '@/locales'
import styles from './Cart.module.css'

const t = getLocale('pl')

export function Cart() {
  const { items, removeItem, updateQuantity, totalPln } = useCart()
  const { formatPrice } = useCurrency()

  if (items.length === 0) {
    return (
      <div className={styles.page}>
        <h1 className={styles.title}>{t.shop.yourCart}</h1>
        <p className={styles.empty}>{t.shop.cartEmpty}</p>
        <Link to="/sklep" className={styles.link}>
          {t.shop.continueShopping}
        </Link>
      </div>
    )
  }

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>{t.shop.yourCart}</h1>

      <ul className={styles.list}>
        {items.map(({ product, quantity }) => (
          <li key={product.id} className={styles.row}>
            <div className={styles.rowInfo}>
              <span className={styles.rowName}>{t.product[product.nameKey]}</span>
              <span className={styles.rowPrice}>
                {formatPrice(product.pricePln)} × {quantity} = {formatPrice(product.pricePln * quantity)}
              </span>
            </div>
            <div className={styles.rowActions}>
              <div className={styles.quantity}>
                <button
                  type="button"
                  onClick={() => updateQuantity(product.id, quantity - 1)}
                  className={styles.qtyBtn}
                  aria-label="Zmniejsz"
                >
                  −
                </button>
                <span className={styles.qtyNum}>{quantity}</span>
                <button
                  type="button"
                  onClick={() => updateQuantity(product.id, quantity + 1)}
                  className={styles.qtyBtn}
                  aria-label="Zwiększ"
                >
                  +
                </button>
              </div>
              <button
                type="button"
                onClick={() => removeItem(product.id)}
                className={styles.remove}
                aria-label="Usuń"
              >
                Usuń
              </button>
            </div>
          </li>
        ))}
      </ul>

      <div className={styles.footer}>
        <p className={styles.total}>
          {t.shop.cartTotal}: <strong>{formatPrice(totalPln)}</strong>
        </p>
        <div className={styles.buttons}>
          <Link to="/sklep" className={styles.linkSecondary}>
            {t.shop.continueShopping}
          </Link>
          <Link to="/sklep/zamowienie" className={styles.linkPrimary}>
            {t.shop.checkout}
          </Link>
        </div>
      </div>
    </div>
  )
}
