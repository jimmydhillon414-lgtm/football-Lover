
import { Bundles } from '@/components/bundles'
import { CartDrawer } from '@/components/cart/cart-drawer'
import { CustomLab } from '@/components/custom-lab'
import { Hero } from '@/components/hero'
import { ProductCatalog } from '@/components/product-catalog'
import { SiteFooter } from '@/components/site-footer'
import { SiteHeader } from '@/components/site-header' 
import { Testimonials } from '@/components/testimonials'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <AnnouncementBar />
      <SiteHeader />
      <main>
        <Hero />
        <ProductCatalog />
        <CustomLab />
        <Bundles />
        <Testimonials />
      </main>
      <SiteFooter />
      <CartDrawer />
    </div>
  )
}
