'use client'

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react'

export type CartItem = {
  id: string
  name: string
  price: number
  image: string
  qty: number
  meta?: string
}

type CartContextValue = {
  items: CartItem[]
  isOpen: boolean
  open: () => void
  close: () => void
  addItem: (item: Omit<CartItem, 'qty'>, qty?: number) => void
  removeItem: (id: string) => void
  updateQty: (id: string, qty: number) => void
  count: number
  subtotal: number
}

const CartContext = createContext<CartContextValue | null>(null)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [isOpen, setIsOpen] = useState(false)

  const open = useCallback(() => setIsOpen(true), [])
  const close = useCallback(() => setIsOpen(false), [])

  const addItem = useCallback<CartContextValue['addItem']>((item, qty = 1) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === item.id)
      if (existing) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, qty: i.qty + qty } : i,
        )
      }
      return [...prev, { ...item, qty }]
    })
    setIsOpen(true)
  }, [])

  const removeItem = useCallback((id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id))
  }, [])

  const updateQty = useCallback((id: string, qty: number) => {
    setItems((prev) =>
      qty <= 0
        ? prev.filter((i) => i.id !== id)
        : prev.map((i) => (i.id === id ? { ...i, qty } : i)),
    )
  }, [])

  const count = items.reduce((sum, i) => sum + i.qty, 0)
  const subtotal = items.reduce((sum, i) => sum + i.qty * i.price, 0)

  const value = useMemo(
    () => ({
      items,
      isOpen,
      open,
      close,
      addItem,
      removeItem,
      updateQty,
      count,
      subtotal,
    }),
    [items, isOpen, open, close, addItem, removeItem, updateQty, count, subtotal],
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
