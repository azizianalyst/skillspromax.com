"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Inbox,
  MessageSquare,
  Users,
  Banknote,
  BarChart3,
  LogOut,
  ExternalLink,
  type LucideIcon,
} from "lucide-react";
import { signOutAction } from "@/app/admin/actions";
import { cn } from "@/lib/utils";

type NavItem = { href: string; label: string; icon: LucideIcon; exact?: boolean };

const items: NavItem[] = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/admin/applications", label: "Applications", icon: Inbox },
  { href: "/admin/inquiries", label: "Inquiries", icon: MessageSquare },
  { href: "/admin/batches", label: "Batches", icon: Users },
  { href: "/admin/fees", label: "Fees", icon: Banknote },
  { href: "/admin/outcomes", label: "Outcomes", icon: BarChart3 },
];

export function AdminNav({
  userName,
  role,
  counts,
}: {
  userName: string;
  role: string;
  counts?: { newApplications: number; unhandledInquiries: number };
}) {
  const pathname = usePathname();

  return (
    <aside className="flex w-64 shrink-0 flex-col border-r border-line bg-sand">
      <div className="px-5 py-5">
        <span className="font-display text-lg leading-none">
          Skills<span className="text-accent">Pro</span>Max
        </span>
        <p className="mt-1 text-[0.6875rem] font-semibold uppercase tracking-wider text-faint">
          Admin
        </p>
      </div>

      <nav className="flex-1 px-3" aria-label="Admin">
        <ul className="space-y-0.5">
          {items.map((item) => {
            const active = item.exact
              ? pathname === item.href
              : pathname === item.href || pathname.startsWith(item.href + "/");
            const Icon = item.icon;
            const badge =
              item.href === "/admin/applications"
                ? counts?.newApplications
                : item.href === "/admin/inquiries"
                  ? counts?.unhandledInquiries
                  : undefined;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-2.5 rounded-[var(--radius-sm)] px-3 py-2 text-[0.875rem] transition-colors",
                    active
                      ? "bg-canvas font-medium text-ink shadow-[inset_0_0_0_1px_var(--color-line)]"
                      : "text-ink-2 hover:bg-canvas/60 hover:text-ink",
                  )}
                >
                  <Icon className="size-4 shrink-0 text-muted" aria-hidden />
                  <span className="flex-1">{item.label}</span>
                  {badge ? (
                    <span className="rounded-full bg-accent px-1.5 py-px text-[0.625rem] font-semibold leading-none text-white">
                      {badge}
                    </span>
                  ) : null}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="border-t border-line p-3">
        <div className="px-2 py-2 text-xs leading-relaxed text-muted">
          <p className="font-medium text-ink-2">{userName}</p>
          <p className="capitalize">{role.toLowerCase()}</p>
        </div>
        <Link
          href="/"
          className="mt-1 flex items-center gap-2.5 rounded-[var(--radius-sm)] px-3 py-2 text-[0.8125rem] text-ink-2 hover:bg-canvas/60 hover:text-ink"
        >
          <ExternalLink className="size-3.5 text-muted" aria-hidden /> View public site
        </Link>
        <form action={signOutAction}>
          <button
            type="submit"
            className="mt-0.5 flex w-full items-center gap-2.5 rounded-[var(--radius-sm)] px-3 py-2 text-left text-[0.8125rem] text-ink-2 hover:bg-canvas/60 hover:text-ink"
          >
            <LogOut className="size-3.5 text-muted" aria-hidden /> Sign out
          </button>
        </form>
      </div>
    </aside>
  );
}
