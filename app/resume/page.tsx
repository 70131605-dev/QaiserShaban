import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Download } from "lucide-react";
import { site } from "@/data/site";
import { experience } from "@/data/experience";
import { getProject } from "@/data/projects";
import { resume } from "@/data/resume";
import { withBase } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Resume",
  description: `${site.name}, ${resume.headline}. Experience, projects, skills and education.`,
  alternates: { canonical: "/resume" },
};

const strip = (url: string) => url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="mt-[18px] break-inside-avoid-page">
      <h2 className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.16em] text-[#3730a3]">
        {title}
        <span className="h-px flex-1 bg-[#d6d8e1]" />
      </h2>
      <div className="mt-2.5">{children}</div>
    </section>
  );
}

function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="mt-1.5 space-y-1">
      {items.map((t) => (
        <li key={t} className="flex gap-2 text-[11.5px] leading-[1.5] text-[#2b2f3a]">
          <span className="mt-[7px] size-[3.5px] shrink-0 rounded-full bg-[#4f46e5]" aria-hidden />
          <span>{t}</span>
        </li>
      ))}
    </ul>
  );
}

export default function ResumePage() {
  const work = experience.filter((e) => e.kind === "work");
  const education = experience.filter((e) => e.kind === "education");
  const projects = resume.projects.map(getProject).filter((p) => p !== undefined);

  const contacts: { label: string; href: string }[] = [
    { label: site.location, href: "" },
    { label: site.whatsappDisplay, href: `tel:${site.whatsapp}` },
    { label: site.email, href: `mailto:${site.email}` },
    { label: strip(site.socials.linkedin), href: site.socials.linkedin },
    { label: strip(site.socials.github), href: site.socials.github },
    { label: strip(site.url), href: site.url },
  ];

  return (
    <div className="min-h-dvh bg-bg-2 pb-16 pt-28 print:min-h-0 print:bg-white print:p-0">
      {/* Toolbar (screen only) */}
      <div className="mx-auto mb-5 flex w-full max-w-[210mm] items-center justify-between gap-3 px-4 print:hidden sm:px-0">
        <p className="text-[14px] text-fg-2">
          Resume · <span className="text-fg">{site.name}</span>
        </p>
        <a
          href={site.resume}
          download
          className="inline-flex h-10 items-center gap-2 rounded-xl bg-brand px-4 text-[14px] font-medium text-white shadow-btn transition-transform hover:-translate-y-0.5"
        >
          <Download className="size-4" aria-hidden /> Download PDF
        </a>
      </div>

      {/* A4 sheet: fixed print colours, independent of the site theme */}
      <article
        className="resume-sheet mx-auto w-full max-w-[210mm] bg-white px-[14mm] py-[12mm] text-[#1a1d26] shadow-[0_30px_80px_-30px_rgba(0,0,0,0.5)] print:max-w-none print:shadow-none"
        style={{ colorScheme: "light" }}
      >
        {/* Header */}
        <header className="border-b-2 border-[#4f46e5] pb-3.5">
          <h1 className="text-[30px] font-bold leading-none tracking-[-0.03em] text-[#0f1220]">{site.name}</h1>
          <p className="mt-1.5 text-[14px] font-semibold text-[#4338ca]">{resume.headline}</p>
          <ul className="mt-2.5 flex flex-wrap gap-x-3 gap-y-1 text-[10.5px] text-[#454a59]">
            {contacts.map((c, i) => (
              <li key={c.label} className="flex items-center gap-3">
                {i > 0 && <span className="text-[#b5b9c6]" aria-hidden>|</span>}
                {c.href ? (
                  <a href={c.href} className="hover:text-[#4338ca]">
                    {c.label}
                  </a>
                ) : (
                  c.label
                )}
              </li>
            ))}
          </ul>
        </header>

        <Section title="Professional summary">
          <p className="text-[11.5px] leading-[1.6] text-[#2b2f3a]">{resume.summary}</p>
        </Section>

        <Section title="Experience">
          {work.map((job) => (
            <div key={job.company} className="break-inside-avoid">
              <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                <h3 className="text-[13px] font-bold text-[#0f1220]">
                  {job.role} <span className="font-semibold text-[#4338ca]">· {job.company}</span>
                </h3>
                <p className="text-[10.5px] font-medium text-[#5b6070]">
                  {job.start} – {job.end}
                  {job.location && ` · ${job.location}`}
                </p>
              </div>
              <p className="mt-1 text-[11.5px] italic leading-[1.5] text-[#454a59]">{job.summary}</p>
              <Bullets items={job.achievements} />
              {job.stack && (
                <p className="mt-1.5 text-[10.5px] text-[#5b6070]">
                  <span className="font-semibold text-[#2b2f3a]">Stack:</span> {job.stack.map((s) => s.name).join(", ")}
                </p>
              )}
            </div>
          ))}
        </Section>

        <Section title="Selected projects">
          <div className="space-y-2.5">
            {projects.map((p) => {
              const live = p.links.demo;
              return (
                <div key={p.slug} className="break-inside-avoid">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                    <h3 className="text-[12.5px] font-bold text-[#0f1220]">
                      {p.title} <span className="font-medium text-[#5b6070]">· {p.category}</span>
                    </h3>
                    <a
                      href={live ?? `${site.url}/projects/${p.slug}/`}
                      className="text-[10.5px] font-medium text-[#4338ca]"
                    >
                      {live ? strip(live) : "Case study"}
                    </a>
                  </div>
                  <p className="mt-0.5 text-[11.5px] leading-[1.5] text-[#2b2f3a]">{p.summary}</p>
                  <p className="mt-0.5 text-[10.5px] text-[#5b6070]">
                    <span className="font-semibold text-[#2b2f3a]">Stack:</span> {p.stack.map((s) => s.name).join(", ")}
                  </p>
                </div>
              );
            })}
          </div>
        </Section>

        <Section title="Technical skills">
          <dl className="grid grid-cols-[120px_1fr] gap-x-3 gap-y-1 text-[11.5px] leading-[1.5]">
            {resume.skills.map((s) => (
              <div key={s.label} className="contents">
                <dt className="font-semibold text-[#0f1220]">{s.label}</dt>
                <dd className="text-[#2b2f3a]">{s.items}</dd>
              </div>
            ))}
          </dl>
        </Section>

        <Section title="Education">
          {education.map((e) => (
            <div key={e.company} className="flex flex-wrap items-baseline justify-between gap-x-4">
              <h3 className="text-[12.5px] font-bold text-[#0f1220]">
                {e.role} <span className="font-semibold text-[#4338ca]">· {e.company}</span>
              </h3>
              <p className="text-[10.5px] font-medium text-[#5b6070]">
                {e.start} – {e.end}
                {e.location && ` · ${e.location}`}
              </p>
            </div>
          ))}
        </Section>

        <Section title="Additional">
          <Bullets
            items={[
              ...resume.strengths,
              `Languages: ${resume.languages}`,
              `Availability: ${site.availability}`,
            ]}
          />
        </Section>
      </article>

      <p className="mx-auto mt-5 max-w-[210mm] px-4 text-center text-[12.5px] text-muted print:hidden sm:px-0">
        Interactive version with case studies:{" "}
        <a href={withBase("/projects/")} className="text-fg underline-offset-2 hover:underline">
          all projects
        </a>
      </p>
    </div>
  );
}
