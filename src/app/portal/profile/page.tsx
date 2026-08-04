import { requireStudent } from "@/lib/student";
import { ProfileContactForm } from "@/components/portal/profile-contact-form";

export default async function PortalProfilePage() {
  const { user, profile } = await requireStudent();

  return (
    <div className="space-y-7">
      <header>
        <h1 className="display-md">Profile</h1>
        <p className="mt-2 text-sm text-muted">
          Identity details are managed by admissions. You can update your phone and WhatsApp.
        </p>
      </header>

      <section className="card p-5 md:p-6">
        <h2 className="font-display text-lg text-ink">Identity</h2>
        <dl className="mt-4 grid gap-4 sm:grid-cols-2 text-sm">
          <div>
            <dt className="text-xs font-semibold uppercase tracking-wider text-faint">Name</dt>
            <dd className="mt-1 text-ink">{user.name}</dd>
          </div>
          <div>
            <dt className="text-xs font-semibold uppercase tracking-wider text-faint">
              Roll number
            </dt>
            <dd className="mt-1 tnum text-ink">{profile.rollNo}</dd>
          </div>
          <div>
            <dt className="text-xs font-semibold uppercase tracking-wider text-faint">Email</dt>
            <dd className="mt-1 text-ink">{user.email}</dd>
          </div>
          {profile.fatherName && (
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wider text-faint">
                Father&apos;s name
              </dt>
              <dd className="mt-1 text-ink">{profile.fatherName}</dd>
            </div>
          )}
          {profile.city && (
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wider text-faint">
                City / village
              </dt>
              <dd className="mt-1 text-ink">{profile.city}</dd>
            </div>
          )}
        </dl>
      </section>

      <section className="card p-5 md:p-6">
        <h2 className="font-display text-lg text-ink">Contact</h2>
        <div className="mt-5">
          <ProfileContactForm
            phone={user.phone ?? ""}
            whatsapp={profile.whatsapp ?? ""}
          />
        </div>
      </section>
    </div>
  );
}
