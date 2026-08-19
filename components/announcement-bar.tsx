import { Truck, Wallet } from 'lucide-react'

export function AnnouncementBar() {
  const message = (
    // <span className="mx-6 inline-flex items-center gap-6 text-xs font-semibold tracking-wide sm:text-sm">
    //   <span className="inline-flex items-center gap-1.5">
    //     <Truck className="size-3.5" />
    //     {/* Free Express Shipping Across India on Orders Above ₹999 */}
    //   </span>
    //   <span aria-hidden className="text-primary-foreground/40">
    //     {'•'}
    //   </span>
    //   <span className="inline-flex items-center gap-1.5">
    //     <Wallet className="size-3.5" />
    //     {/* Cash on Delivery (COD) &amp; UPI Available */}
    //   </span>
    // </span>
  )

  return (
    <div className="overflow-hidden bg-primary text-primary-foreground">
      <div className="flex w-max animate-marquee whitespace-nowrap py-2">
        {message}
        {message}
        {message}
        {message}
      </div>
    </div>
  )
}
