"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Banknote, User, LogOut, ExternalLink } from "lucide-react";
import { portalSignOut } from "@/app/portal/actions";
import { cn } from "@/lib/utils";

const items: {
  href: string;
  label: string;
  icon: typeof LayoutDashboard;
  exact?: boolean;
}[] = [
  { href: "/portal", label: "Overview", icon: LayoutDashboard, exact: true },
  { href: "/portal/fees", label: "Fees", icon: Banknote },
  { href: "/portal/profile", label: "Profile", icon: User },
];

export function PortalNav({
  userName,
  rollNo,
}: {
  userName: string;
  rollNo: string;
}) {
  const pathname = usePathname();

  return (
    <header className="border-b border-line bg-canvas">
      <div className="shell flex h-14 items-center justify-between gap-4">
        <div className="flex items-center gap-6 min-w-0">
          <Link href="/portal" className="shrink-0 font-display text-lg leading-none">
            Skills<span className="text-accent">Pro</span>Max
          </Link>
          <nav className="hidden items-center gap-1 sm:flex" aria-label="Student portal">
            {items.map((item) => {
              const active = item.exact
                ? pathname === item.href
                : pathname === item.href || pathname.startsWith(item.href + "/");
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "inline-flex items-center gap-1.5 rounded-[var(--radius-sm)] px-3 py-1.5 text-sm transition-colors",
                    active
                      ? "bg-sand font-medium text-ink"
                      : "text-ink-2 hover:bg-sand/60 hover:text-ink",
                  )}
                >
                  <Icon className="size-3.5 text-muted" aria-hidden />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden text-right text-xs leading-snug text-muted md:block">
            <p className="font-medium text-ink-2">{userName}</p>
            <p className="tnum">{rollNo}</p>
          </div>
          <Link href="/" className="btn btn-ghost btn-sm hidden sm:inline-flex">
            <ExternalLink className="size-3.5" aria-hidden />
            Site
          </Link>
          <form action={portalSignOut}>
            <button type="submit" className="btn btn-outline btn-sm">
              <LogOut className="size-3.5" aria-hidden />
              Sign out
            </button>
          </form>
        </div>
      </div>

      <nav
        className="shell flex gap-1 overflow-x-auto pb-2 sm:hidden"
        aria-label="Student portal mobile"
      >
        {items.map((item) => {
          const active = item.exact
            ? pathname === item.href
            : pathname === item.href || pathname.startsWith(item.href + "/");
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "rounded-[var(--radius-sm)] px-3 py-1.5 text-sm whitespace-nowrap",
                active ? "bg-sand font-medium text-ink" : "text-ink-2",
              )}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
