"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, Phone } from "lucide-react";
import { nav, site } from "@/content/site";

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-white/95 backdrop-blur-sm">
      <div className="hidden border-b border-line/60 text-xs text-muted lg:block">
        <div className="shell flex h-8 items-center justify-between">
          <span>{site.location.label}</span>
          <a href={site.phone.href} className="flex items-center gap-1.5 font-semibold text-ink hover:opacity-80">
            <Phone className="size-3" aria-hidden />
            {site.phone.display}
          </a>
        </div>
      </div>

      <div className="shell flex h-16 items-center justify-between gap-4">
        <Link href="/" className="min-w-0" aria-label={`${site.name} home`}>
          <p className="truncate font-display text-base font-bold tracking-tight text-ink md:text-lg">
            Skills<span className="text-accent">Pro</span>Max
          </p>
          <p className="truncate text-[0.7rem] text-muted md:text-xs">
            Digital skills · Dubai worldwide
          </p>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex" aria-label="Main">
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

        <div className="hidden items-center gap-2 lg:flex">
          <Link href="/login" className="btn btn-ghost btn-sm">
            Portal
          </Link>
          <a href="/#apply" className="btn btn-primary btn-sm">
            Apply free
          </a>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="rounded-lg p-2 text-ink lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {open && (
        <div id="mobile-nav" className="border-t border-line lg:hidden">
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
            <div className="flex flex-col gap-2 py-4">
              <a href="/#apply" onClick={() => setOpen(false)} className="btn btn-primary">
                Apply free
              </a>
              <a href={site.whatsapp.href} onClick={() => setOpen(false)} className="btn btn-outline">
                WhatsApp
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
