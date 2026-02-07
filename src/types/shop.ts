export interface Product {
  id: string
  nameKey: keyof import('@/locales/pl').LocaleKeys['product']
  descriptionKey: keyof import('@/locales/pl').LocaleKeys['product']
  pricePln: number
  unit: 'jar' | 'kg'
  imageUrl?: string
  weightG?: number // np. 450 dla słoika 450g
}

export interface CartItem {
  product: Product
  quantity: number
}

export interface OrderDraft {
  items: CartItem[]
  customerName: string
  email: string
  phone: string
  address: string
  comment?: string
}
