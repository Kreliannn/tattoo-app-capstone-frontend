"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Sparkles, Pencil, TrendingUp, Eye, Brain, Box } from "lucide-react"
import Link from "next/link"

export default function Page() {

  

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <header className="border-b border-border absolute w-full">
        <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8">
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
              <img src="/web/logo.jpg" alt="Tattoo design 1" className="h-full w-full rounded-lg" />
            </div>
            <span className="text-xl font-bold">InkStudio</span>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" className="hidden md:inline-flex">
              For Artists
            </Button>
            <Button variant="ghost" className="hidden md:inline-flex">
              For Clients
            </Button>
            <Link href={"/guest/login"}>  <Button variant="outline"> Sign In</Button> </Link>
            <Button>Get Started</Button>
          </div>
        </nav>
      </header>

      <main>
        {/* Hero */}
        <section className="mx-auto max-w-7xl px-6 py-24 lg:px-8 lg:py-32">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <div className="flex flex-col justify-center">
              <h1 className="text-balance text-5xl font-bold tracking-tight lg:text-6xl xl:text-7xl">
                The complete platform for tattoo artistry
              </h1>
              <p className="mt-6 text-pretty text-lg leading-relaxed text-muted-foreground lg:text-xl">
                Empower artists with intelligent design tools and smart pricing. Connect clients with portfolios, 3D
                visualization, and AI-powered decision support.
              </p>
              <div className="mt-10 flex flex-wrap gap-4">
                <Button size="lg" className="text-base">
                  Start Creating
                </Button>
                <Button size="lg" variant="outline" className="text-base bg-transparent">
                  Browse Artists
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="grid grid-cols-2 gap-3">
                <Card className="overflow-hidden mb-7 flex items-center justify-center">
                  <img src="/web/tattoo5.jpg" alt="Tattoo design 1" className="h-[200px] w-[200px] object-cover" />
                </Card>
                <Card className="overflow-hidden translate-y-8  mb-7 flex items-center justify-center">
                  <img src="/web/tattoo2.jpg" alt="Tattoo design 2" className="h-[200px] w-[200px] object-cover" />
                </Card>
                <Card className="overflow-hidden -translate-y-8 flex items-center justify-center">
                  <img src="/web/tattoo3.jpg" alt="Tattoo design 3" className="h-[200px] w-[200px] object-cover" />
                </Card>
                <Card className="overflow-hidden flex items-center justify-center ">
                  <img src="/web/tattoo1.jpg" alt="Tattoo design 4" className="h-[200px] w-[200px] object-cover" />
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="border-y border-border bg-muted/30">
          <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
            <div className="grid gap-8 md:grid-cols-3">
              <div className="text-center">
                <div className="text-4xl font-bold lg:text-5xl">10K+</div>
                <div className="mt-2 text-muted-foreground">Active Artists</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold lg:text-5xl">50K+</div>
                <div className="mt-2 text-muted-foreground">Designs Created</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold lg:text-5xl">98%</div>
                <div className="mt-2 text-muted-foreground">Client Satisfaction</div>
              </div>
            </div>
          </div>
        </section>

        {/* Features for Artists */}
        <section className="mx-auto max-w-7xl px-6 py-24 lg:px-8 lg:py-32">
          <div className="mb-16 text-center">
            <h2 className="text-balance text-4xl font-bold tracking-tight lg:text-5xl">Powerful tools for artists</h2>
            <p className="mx-auto mt-4 max-w-2xl text-pretty text-lg text-muted-foreground">
              Everything you need to manage your portfolio, price your work intelligently, and grow your business.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            <Card className="p-8">
              <div className="flex gap-3 items-center justify-start">
                  <div className=" flex h-12 w-12 items-center justify-center rounded-lg bg-secondary">
                   <Pencil className="h-6 w-6 text-secondary-foreground" />
                  </div>
                  <h3 className=" text-xl font-bold">Design Studio</h3>
              </div>
              <p className="leading-relaxed text-muted-foreground">
                Advanced editing tools to create, refine, and perfect your tattoo designs with precision and creativity.
              </p>
            </Card>
            <Card className="p-8">
               <div className="flex gap-3 items-center justify-start">
                  <div className=" flex h-12 w-12 items-center justify-center rounded-lg bg-secondary">
                    <TrendingUp className="h-6 w-6 text-secondary-foreground" />
                  </div>
                  <h3 className=" text-xl font-bold">Smart Pricing</h3>
               </div>
             
              <p className="leading-relaxed text-muted-foreground">
                AI-powered pricing recommendations based on complexity, size, style, and market rates to maximize your
                earnings.
              </p>
            </Card>
            <Card className="p-8">
              <div className="flex gap-3 items-center justify-start">
                <div className=" flex h-12 w-12 items-center justify-center rounded-lg bg-secondary">
                  <Eye className="h-6 w-6 text-secondary-foreground" />
                </div>
                <h3 className="text-xl font-bold">Portfolio Showcase</h3>
              </div>
              
              <p className="leading-relaxed text-muted-foreground">
                Create stunning galleries to display your work and attract clients with professional presentation tools.
              </p>
            </Card>
          </div>
        </section>

        {/* Features for Clients */}
        <section className="border-t border-border bg-muted/30">
          <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8 lg:py-32">
            <div className="mb-16 text-center">
              <h2 className="text-balance text-4xl font-bold tracking-tight lg:text-5xl">Find your perfect tattoo</h2>
              <p className="mx-auto mt-4 max-w-2xl text-pretty text-lg text-muted-foreground">
                Discover talented artists, visualize designs on your body, and make confident decisions with AI
                assistance.
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-3">
              <Card className="p-8">
                 <div className="flex gap-3 items-center justify-start">
                    <div className="-4 flex h-12 w-12 items-center justify-center rounded-lg bg-accent">
                      <Eye className="h-6 w-6 text-accent-foreground" />
                    </div>
                    <h3 className="-3 text-xl font-bold">Artist Discovery</h3>
                 </div>
                <p className="leading-relaxed text-muted-foreground">
                  Browse thousands of portfolios, filter by style, and find the perfect artist for your vision.
                </p>
              </Card>
              <Card className="p-8">
                <div className="flex gap-3 items-center justify-start">
                  <div className="-4 flex h-12 w-12 items-center justify-center rounded-lg bg-accent">
                      <Box className="h-6 w-6 text-accent-foreground" />
                    </div>
                    <h3 className="-3 text-xl font-bold">3D Visualization</h3>
                </div>
               
                <p className="leading-relaxed text-muted-foreground">
                  See how designs look on a realistic 3D body model before committing to your tattoo.
                </p>
              </Card>
              <Card className="p-8">
                <div className="flex gap-3 items-center justify-start">
                  <div className="-4 flex h-12 w-12 items-center justify-center rounded-lg bg-accent">
                    <Brain className="h-6 w-6 text-accent-foreground" />
                  </div>
                  <h3 className="-3 text-xl font-bold">Decision Support</h3>
                </div>
            
                <p className="leading-relaxed text-muted-foreground">
                  Get AI-powered recommendations based on your preferences, skin tone, and placement considerations.
                </p>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="mx-auto max-w-7xl px-6 py-24 lg:px-8 lg:py-32">
          <Card className="overflow-hidden bg-primary text-primary-foreground">
            <div className="grid gap-8 p-12 lg:grid-cols-2 lg:gap-16 lg:p-16">
              <div>
                <h2 className="text-balance text-4xl font-bold tracking-tight lg:text-5xl">
                  Ready to transform your tattoo journey?
                </h2>
                <p className="mt-6 text-pretty text-lg leading-relaxed text-primary-foreground/80">
                  Join thousands of artists and clients who trust InkStudio to bring their visions to life.
                </p>
                <div className="mt-10 flex flex-wrap gap-4">
                  <Button
                    size="lg"
                    variant="secondary"
                    className="bg-primary-foreground text-primary hover:bg-primary-foreground/90"
                  >
                    Get Started Free
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10 bg-transparent"
                  >
                    Schedule Demo
                  </Button>
                </div>
              </div>
              <div className="relative hidden lg:block ">
                <img src="/web/img1.png" alt="Artist at work" className="rounded-lg object-cover" />
              </div>
            </div>
          </Card>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-muted/30">
        <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
          <div className="grid gap-8 md:grid-cols-4">
            <div>
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                  <img src="/web/logo.jpg" alt="Tattoo design 1" className="h-full w-full rounded-lg" />
                </div>
                <span className="font-bold">InkStudio</span>
              </div>
              <p className="mt-4 text-sm text-muted-foreground">
                The complete platform for tattoo artistry and discovery.
              </p>
            </div>
            <div>
              <h4 className="mb-4 font-semibold">Product</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-foreground">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground">
                    FAQ
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4 font-semibold">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-foreground">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground">
                    Careers
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4 font-semibold">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-foreground">
                    Privacy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground">
                    Terms
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t border-border pt-8 text-center text-sm text-muted-foreground">
            © 2025 InkStudio. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}
