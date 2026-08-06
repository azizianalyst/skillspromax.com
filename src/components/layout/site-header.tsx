"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, MessageCircle } from "lucide-react";
import { nav, site } from "@/content/site";

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 px-3 pt-3 md:px-4 md:pt-4">
      <div className="shell !px-0">
        <div className="rounded-2xl border border-line/80 bg-white/75 shadow-[0_8px_30px_-18px_rgba(10,15,26,0.35)] backdrop-blur-xl">
          <div className="flex h-16 items-center justify-between gap-4 px-4 md:px-5">
            <Link
              href="/"
              className="font-display text-[1.15rem] font-bold tracking-tight text-ink"
              aria-label={`${site.name} home`}
            >
              Skills<span className="text-accent">Pro</span>Max
            </Link>

            <nav className="hidden items-center gap-6 md:flex" aria-label="Main">
              {nav.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-sm font-medium text-muted transition-colors hover:text-ink"
                >
                  {item.label}
                </a>
              ))}
            </nav>

            <div className="hidden items-center gap-2 md:flex">
              <Link href="/login" className="btn btn-ghost btn-sm">
                Portal
              </Link>
              <a href="/#apply" className="btn btn-primary btn-sm">
                Apply
              </a>
            </div>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className="md:hidden -mr-1 rounded-xl p-2 text-ink"
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-label={open ? "Close menu" : "Open menu"}
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>

          {open && (
            <div id="mobile-nav" className="border-t border-line px-4 pb-4 md:hidden">
              <nav className="flex flex-col py-1" aria-label="Mobile">
                {nav.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="border-b border-line py-3.5 text-sm font-medium text-ink last:border-0"
                  >
                    {item.label}
                  </a>
                ))}
                <div className="mt-4 flex flex-col gap-2">
                  <a href="/#apply" onClick={() => setOpen(false)} className="btn btn-primary">
                    Apply free
                  </a>
                  <a
                    href={site.whatsapp.href}
                    onClick={() => setOpen(false)}
                    className="btn btn-outline"
                  >
                    <MessageCircle className="size-4" aria-hidden /> WhatsApp
                  </a>
                </div>
              </nav>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
