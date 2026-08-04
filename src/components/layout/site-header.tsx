"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, Phone, MessageCircle } from "lucide-react";
import { nav, site } from "@/content/site";

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-canvas/95 backdrop-blur-sm">
      <div className="hidden border-b border-line bg-sand md:block">
        <div className="shell flex h-9 items-center justify-between text-xs text-muted">
          <p>{site.location.label}</p>
          <div className="flex items-center gap-5">
            <a href={site.phone.href} className="flex items-center gap-1.5 hover:text-accent">
              <Phone className="size-3" aria-hidden />
              {site.phone.display}
            </a>
            <a href={site.whatsapp.href} className="hover:text-accent">
              WhatsApp
            </a>
          </div>
        </div>
      </div>

      <div className="shell flex h-16 items-center justify-between gap-6">
        <Link href="/" className="flex items-baseline gap-2" aria-label={`${site.name} home`}>
          <span className="font-display text-[1.375rem] leading-none tracking-tight">
            Skills<span className="text-accent">Pro</span>Max
          </span>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Main">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm text-ink-2 transition-colors hover:text-accent"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Link href="/login" className="btn btn-ghost btn-sm">
            Student portal
          </Link>
          <a href="/#apply" className="btn btn-primary btn-sm">
            Apply now
          </a>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="lg:hidden -mr-2 p-2 text-ink"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {open && (
        <div id="mobile-nav" className="border-t border-line bg-canvas lg:hidden">
          <nav className="shell flex flex-col py-3" aria-label="Mobile">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="border-b border-line py-3 text-[0.9375rem] text-ink-2 last:border-0"
              >
                {item.label}
              </a>
            ))}
            <div className="mt-4 flex flex-col gap-2 pb-4">
              <a href="/#apply" onClick={() => setOpen(false)} className="btn btn-primary">
                Apply now
              </a>
              <a href={site.whatsapp.href} onClick={() => setOpen(false)} className="btn btn-outline">
                <MessageCircle className="size-4" aria-hidden /> WhatsApp
              </a>
              <Link href="/login" onClick={() => setOpen(false)} className="btn btn-ghost">
                Student portal
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
