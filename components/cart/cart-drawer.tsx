'use client'

import { AnimatePresence, motion } from 'framer-motion'
import {
  BadgeCheck,
  Banknote,
  CreditCard,
  Loader2,
  Minus,
  Plus,
  ShoppingBag,
  Smartphone,
  Truck,
  X,
} from 'lucide-react'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useCart } from '@/components/cart/cart-context'
import { Button } from '@/components/ui/button'
import { formatINR } from '@/lib/products'
import { supabase } from '@/lib/supabaseClient'

const FREE_SHIP_THRESHOLD = 999

type Step = 'cart' | 'checkout' | 'done'

const PAYMENTS = [
  { id: 'cod', label: 'Cash on Delivery', hint: 'Pay at doorstep', icon: Banknote },
  { id: 'upi', label: 'UPI', hint: 'GPay · Paytm · PhonePe', icon: Smartphone },
  { id: 'card', label: 'Card', hint: 'Credit / Debit', icon: CreditCard },
] as const

export function CartDrawer() {
  const { items, isOpen, close, subtotal, updateQty, removeItem, count, clearCart } =
    useCart()
  const router = useRouter()
  const [step, setStep] = useState<Step>('cart')
  const [payment, setPayment] = useState<string>('cod')

  // Form states
  const [fullName, setFullName] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [city, setCity] = useState('')
  const [pincode, setPincode] = useState('')

  const [loading, setLoading] = useState(false)
  const [orderId, setOrderId] = useState('')

  const remaining = Math.max(0, FREE_SHIP_THRESHOLD - subtotal)
  const progress = Math.min(100, (subtotal / FREE_SHIP_THRESHOLD) * 100)
  const shipping = subtotal >= FREE_SHIP_THRESHOLD || subtotal === 0 ? 0 : 79
  const total = subtotal + shipping

  // Prefill form from user account/saved address if available
  useEffect(() => {
    async function loadAddress() {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (user) {
        if (user.user_metadata?.full_name) {
          setFullName(user.user_metadata.full_name)
        }

        const { data: addresses } = await supabase
          .from('user_addresses')
          .select('*')
          .eq('user_id', user.id)
          .limit(1)

        if (addresses && addresses.length > 0) {
          const addr = addresses[0]
          setAddress(addr.street_address || '')
          setCity(addr.city || '')
          setPincode(addr.pincode || '')
          if (addr.phone) setPhone(addr.phone)
        }
      }
    }

    if (isOpen) {
      loadAddress()
    }
  }, [isOpen])

  const handleClose = () => {
    close()
    setTimeout(() => setStep('cart'), 300)
  }

  const validateForm = () => {
    if (!fullName.trim() || !phone.trim() || !address.trim() || !city.trim() || !pincode.trim()) {
      alert('Please fill in all shipping details before placing the order.')
      return false
    }

    const cleanPhone = phone.replace(/\D/g, '')
    if (cleanPhone.length < 10) {
      alert('Please enter a valid 10-digit phone number.')
      return false
    }

    if (!/^\d{6}$/.test(pincode.trim())) {
      alert('Please enter a valid 6-digit PIN code.')
      return false
    }

    return true
  }

  const handlePlaceOrder = async () => {
    if (!validateForm()) return

    setLoading(true)

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      const generatedOrderId = `FL-${Math.floor(100000 + Math.random() * 900000)}`

      // 1. Save order into Supabase Database
      const { error: dbError } = await supabase.from('orders').insert([
        {
          order_number: generatedOrderId,
          user_id: user ? user.id : null,
          customer_name: fullName.trim(),
          customer_email: user?.email || 'N/A',
          customer_phone: phone.trim(),
          shipping_address: `${address.trim()}, ${city.trim()}`,
          pincode: pincode.trim(),
          items: items,
          total_amount: total,
          payment_method: payment.toUpperCase(),
          status: 'Pending',
        },
      ])

      if (dbError) {
        throw new Error(`Failed to save order: ${dbError.message}`)
      }

      // 2. Post order to sync endpoint / Google Sheets API
      const res = await fetch('/api/place-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          order_number: generatedOrderId,
          customer_name: fullName.trim(),
          customer_email: user?.email || 'N/A',
          customer_phone: phone.trim(),
          street_address: address.trim(),
          city: city.trim(),
          pincode: pincode.trim(),
          items: items,
          total_amount: total,
          payment_method: payment.toUpperCase(),
        }),
      })

      if (!res.ok) {
        console.warn('Google Sheets sync endpoint returned non-200 status.')
      }

      // 3. Complete order state
      setOrderId(generatedOrderId)
      if (clearCart) clearCart()
      setStep('done')
    } catch (err: any) {
      alert(err.message || 'Error processing order. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="absolute inset-0 bg-background/70 backdrop-blur-sm"
          />
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col border-l border-border bg-card"
            role="dialog"
            aria-modal="true"
            aria-label="Shopping cart drawer"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-border px-5 py-4">
              <h2 className="inline-flex items-center gap-2 font-display text-xl italic">
                <ShoppingBag className="size-5 text-primary" />
                {step === 'checkout'
                  ? 'CHECKOUT'
                  : step === 'done'
                    ? 'ORDER PLACED'
                    : `YOUR BAG (${count})`}
              </h2>
              <Button
                variant="ghost"
                size="icon"
                aria-label="Close cart drawer"
                onClick={handleClose}
              >
                <X className="size-5" />
              </Button>
            </div>

            {/* Empty Cart */}
            {items.length === 0 && step !== 'done' && (
              <div className="flex flex-1 flex-col items-center justify-center gap-3 px-6 text-center">
                <ShoppingBag className="size-10 text-muted-foreground" />
                <p className="font-semibold">Your bag is empty</p>
                <p className="text-sm text-muted-foreground">
                  Add some pitch-ready gear to get started.
                </p>
                <Button
                  onClick={handleClose}
                  className="mt-2 bg-primary font-bold text-primary-foreground hover:bg-primary/90"
                >
                  Start Shopping
                </Button>
              </div>
            )}

            {/* Cart Step */}
            {items.length > 0 && step === 'cart' && (
              <>
                <div className="border-b border-border px-5 py-3">
                  <div className="mb-2 flex items-center gap-2 text-xs font-semibold">
                    <Truck className="size-4 text-primary" />
                    {remaining > 0 ? (
                      <span>
                        Add{' '}
                        <span className="text-primary">
                          {formatINR(remaining)}
                        </span>{' '}
                        more to get FREE express shipping!
                      </span>
                    ) : (
                      <span className="text-primary">
                        You&apos;ve unlocked FREE express shipping!
                      </span>
                    )}
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-muted">
                    <motion.div
                      className="h-full rounded-full bg-primary"
                      initial={false}
                      animate={{ width: `${progress}%` }}
                      transition={{ type: 'spring', damping: 20 }}
                    />
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto px-5 py-4">
                  <ul className="flex flex-col gap-4">
                    {items.map((it) => (
                      <li key={it.id} className="flex gap-3">
                        <div className="size-20 shrink-0 overflow-hidden rounded-xl border border-border bg-muted/30">
                          <img
                            src={it.image || '/placeholder.svg'}
                            alt={it.name}
                            className="size-full object-cover"
                          />
                        </div>
                        <div className="flex flex-1 flex-col">
                          <div className="flex items-start justify-between gap-2">
                            <div className="min-w-0">
                              <p className="truncate text-sm font-semibold">
                                {it.name}
                              </p>
                              {it.meta && (
                                <p className="truncate text-xs text-muted-foreground">
                                  {it.meta}
                                </p>
                              )}
                            </div>
                            <button
                              type="button"
                              aria-label={`Remove ${it.name}`}
                              onClick={() => removeItem(it.id)}
                              className="text-muted-foreground transition-colors hover:text-destructive"
                            >
                              <X className="size-4" />
                            </button>
                          </div>
                          <div className="mt-auto flex items-center justify-between">
                            <div className="inline-flex items-center rounded-lg border border-border">
                              <button
                                type="button"
                                aria-label="Decrease quantity"
                                onClick={() => updateQty(it.id, it.qty - 1)}
                                className="grid size-7 place-items-center text-muted-foreground hover:text-foreground"
                              >
                                <Minus className="size-3.5" />
                              </button>
                              <span className="w-6 text-center text-sm font-semibold">
                                {it.qty}
                              </span>
                              <button
                                type="button"
                                aria-label="Increase quantity"
                                onClick={() => updateQty(it.id, it.qty + 1)}
                                className="grid size-7 place-items-center text-muted-foreground hover:text-foreground"
                              >
                                <Plus className="size-3.5" />
                              </button>
                            </div>
                            <span className="font-display text-lg">
                              {formatINR(it.price * it.qty)}
                            </span>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                <CartFooter
                  subtotal={subtotal}
                  shipping={shipping}
                  total={total}
                  cta="Proceed to Checkout"
                  onCta={() => setStep('checkout')}
                />
              </>
            )}

            {/* Checkout Step */}
            {items.length > 0 && step === 'checkout' && (
              <>
                <div className="flex-1 overflow-y-auto px-5 py-4">
                  <div className="grid grid-cols-2 gap-3">
                    <Field
                      label="Full Name"
                      placeholder="Rohan Sharma"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                    />
                    <Field
                      label="Phone"
                      placeholder="+91 98765 43210"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                    <div className="col-span-2">
                      <Field
                        label="Delivery Address"
                        placeholder="Flat, street, area"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                      />
                    </div>
                    <Field
                      label="City"
                      placeholder="Bengaluru"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                    />
                    <Field
                      label="PIN Code"
                      placeholder="560001"
                      value={pincode}
                      onChange={(e) => setPincode(e.target.value)}
                    />
                  </div>

                  <p className="mb-2 mt-6 text-xs font-bold uppercase tracking-widest text-muted-foreground">
                    Payment Method
                  </p>
                  <div className="flex flex-col gap-2">
                    {PAYMENTS.map(({ id, label, hint, icon: Icon }) => (
                      <button
                        key={id}
                        type="button"
                        onClick={() => setPayment(id)}
                        className={`flex items-center gap-3 rounded-xl border p-3 text-left transition-colors ${
                          payment === id
                            ? 'border-primary bg-primary/10'
                            : 'border-border hover:border-primary/40'
                        }`}
                      >
                        <Icon className="size-5 text-primary" />
                        <div className="flex-1">
                          <p className="text-sm font-semibold">{label}</p>
                          <p className="text-xs text-muted-foreground">
                            {hint}
                          </p>
                        </div>
                        <span
                          className={`size-4 rounded-full border-2 ${
                            payment === id
                              ? 'border-primary bg-primary'
                              : 'border-muted-foreground'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <CartFooter
                  subtotal={subtotal}
                  shipping={shipping}
                  total={total}
                  disabled={loading}
                  cta={
                    loading ? (
                      <span className="flex items-center gap-2">
                        <Loader2 className="size-4 animate-spin" /> Processing...
                      </span>
                    ) : payment === 'cod' ? (
                      `Place COD Order · ${formatINR(total)}`
                    ) : (
                      `Pay ${formatINR(total)}`
                    )
                  }
                  onCta={handlePlaceOrder}
                  secondary={{ label: 'Back to bag', onClick: () => setStep('cart') }}
                />
              </>
            )}

            {/* Done Step */}
            {step === 'done' && (
              <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', damping: 12 }}
                  className="grid size-16 place-items-center rounded-full bg-primary/15"
                >
                  <BadgeCheck className="size-9 text-primary" />
                </motion.div>
                <h3 className="font-display text-2xl italic">
                  YOU&apos;RE MATCH-READY!
                </h3>
                <p className="text-xs font-semibold text-primary">
                  Order ID: {orderId}
                </p>
                <p className="text-sm text-muted-foreground">
                  Your order has been recorded and synced to our delivery system.
                  Track your express delivery or view details in your account profile.
                </p>
                <div className="mt-2 flex w-full flex-col gap-2">
                  <Button
                    onClick={() => {
                      handleClose()
                      router.push('/profile')
                    }}
                    variant="outline"
                    className="w-full font-bold"
                  >
                    View Order in Profile
                  </Button>
                  <Button
                    onClick={handleClose}
                    className="w-full bg-primary font-bold text-primary-foreground hover:bg-primary/90"
                  >
                    Continue Shopping
                  </Button>
                </div>
              </div>
            )}
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  )
}

function Field({
  label,
  placeholder,
  value,
  onChange,
}: {
  label: string
  placeholder: string
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-semibold text-muted-foreground">
        {label}
      </span>
      <input
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none transition-colors focus:border-primary"
      />
    </label>
  )
}

function CartFooter({
  subtotal,
  shipping,
  total,
  cta,
  onCta,
  disabled,
  secondary,
}: {
  subtotal: number
  shipping: number
  total: number
  cta: React.ReactNode
  onCta: () => void
  disabled?: boolean
  secondary?: { label: string; onClick: () => void }
}) {
  return (
    <div className="border-t border-border bg-card px-5 py-4">
      <dl className="space-y-1.5 text-sm">
        <div className="flex justify-between">
          <dt className="text-muted-foreground">Subtotal</dt>
          <dd className="font-semibold">{formatINR(subtotal)}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-muted-foreground">Shipping</dt>
          <dd className="font-semibold">
            {shipping === 0 ? (
              <span className="text-primary">FREE</span>
            ) : (
              formatINR(shipping)
            )}
          </dd>
        </div>
        <div className="flex justify-between border-t border-border/60 pt-2">
          <dt className="font-display text-lg italic">TOTAL</dt>
          <dd className="font-display text-xl">{formatINR(total)}</dd>
        </div>
      </dl>
      <Button
        size="lg"
        disabled={disabled}
        onClick={onCta}
        className="mt-4 h-12 w-full bg-primary text-base font-bold text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
      >
        {cta}
      </Button>
      {secondary && (
        <button
          type="button"
          onClick={secondary.onClick}
          className="mt-2 w-full text-center text-xs font-semibold text-muted-foreground hover:text-foreground"
        >
          {secondary.label}
        </button>
      )}
    </div>
  )
}
