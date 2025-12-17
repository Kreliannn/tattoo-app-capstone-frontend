"use client"
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import Link from "next/link";


export default function Layout({ children } : { children: React.ReactNode }) {


    return (
      <div className="flex min-h-screen ">
      
     
        <main className="w-full">

          <header className="border-b border-border absolute w-full bg-stone-50">
            <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8">
              <div className="flex items-center gap-2">
                <Link href={"/"} className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                  <img src="/web/logo.jpg" alt="Tattoo design 1" className="h-full w-full rounded-lg" />
                </Link>
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

          <div className="mb-[80px] md:mb-[0px]"> </div>
          {children}

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
        </main>
      </div>
    );
  }