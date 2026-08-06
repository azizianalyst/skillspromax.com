"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, MessageCircle } from "lucide-react";
import { nav, site } from "@/content/site";

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-canvas/90 backdrop-blur-md">
      <div className="shell flex h-16 items-center justify-between gap-6">
        <Link href="/" className="text-[1.2rem] font-bold tracking-tight text-ink" aria-label={`${site.name} home`}>
          Skills<span className="text-accent">Pro</span>Max
        </Link>

        <nav className="hidden items-center gap-7 md:flex" aria-label="Main">
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
          className="md:hidden -mr-2 p-2 text-ink"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {open && (
        <div id="mobile-nav" className="border-t border-line bg-canvas md:hidden">
          <nav className="shell flex flex-col py-2" aria-label="Mobile">
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
            <div className="mt-4 flex flex-col gap-2 pb-4">
              <a href="/#apply" onClick={() => setOpen(false)} className="btn btn-primary">
                Apply free
              </a>
              <a href={site.whatsapp.href} onClick={() => setOpen(false)} className="btn btn-outline">
                <MessageCircle className="size-4" aria-hidden /> WhatsApp
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
