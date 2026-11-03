import { ArrowUpRight, FileText } from 'lucide-react';
import { featuredProject, profile, projects } from '@/data/site';
import { DashboardMockup } from './DashboardMockup';
import { LiveSites } from './LiveSites';
import { Button } from './ui/Button';
import { GithubIcon } from './ui/BrandIcons';
import { Reveal } from './ui/Reveal';
import { SectionHeader } from './ui/SectionHeader';
import { TagList } from './ui/Tag';

export function Projects() {
  return (
    <section id="projects" aria-labelledby="projects-heading" className="border-y border-line-soft bg-white py-24 lg:py-32">
      <div className="container-page">
        <SectionHeader
          id="projects-heading"
          eyebrow="Selected work"
          heading="Systems I've built and shipped."
          aside="Most of my work runs inside organisations rather than on public URLs. Here is what I can show."
        />

        <Reveal>
          <article className="group/feat grid overflow-hidden rounded-2xl border border-line/70 bg-cream transition-[border-color,box-shadow] duration-300 hover:border-orange/30 hover:shadow-[0_30px_60px_-40px_rgba(7,27,82,0.5)] lg:grid-cols-2">
            <div className="flex flex-col justify-center p-7 sm:p-10 lg:p-12">
              <p className="inline-flex items-center gap-2 text-xs font-semibold text-orange-ink">
                <span className="relative flex size-2">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-orange/60 motion-reduce:animate-none" />
                  <span className="relative inline-flex size-2 rounded-full bg-orange" />
                </span>
                {featuredProject.status}
              </p>
              <h3 className="mt-4 text-[1.75rem] leading-[1.15] text-ink sm:text-[2rem]">{featuredProject.title}</h3>
              <p className="mt-4 text-[15px] leading-relaxed text-muted">{featuredProject.summary}</p>
              <div className="mt-6">
                <TagList items={featuredProject.tags} />
              </div>
              <div className="mt-9 flex flex-wrap gap-3">
                <Button href={featuredProject.caseStudy} arrow icon={<FileText aria-hidden className="size-4" />}>
                  View Case Study
                </Button>
                <Button
                  href={featuredProject.code}
                  variant="outline-dark"
                  target="_blank"
                  rel="noopener"
                  icon={<GithubIcon />}
                >
                  View Code
                </Button>
              </div>
            </div>
            <div className="relative bg-navy-dark p-6 sm:p-10 lg:p-12">
              <div
                aria-hidden
                className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_100%_0%,rgba(91,72,168,0.35),transparent_70%)]"
              />
              <div className="relative flex h-full items-center">
                <div className="w-full transition-transform duration-500 ease-out-soft group-hover/feat:-translate-y-1.5 group-hover/feat:scale-[1.015]">
                  <DashboardMockup />
                </div>
              </div>
            </div>
          </article>
        </Reveal>

        <ul className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          {projects.map((p, i) => {
            const link = p.links[0];
            return (
            <Reveal
              as="li"
              key={p.title}
              delay={(i % 3) * 0.06}
              className={`group relative flex flex-col rounded-[14px] border border-line/70 bg-white p-6 transition-[transform,border-color,box-shadow] duration-200 ${
                link ? 'hover:-translate-y-1 hover:border-orange/40 hover:shadow-[0_16px_32px_-20px_rgba(7,27,82,0.35)]' : ''
              }`}
            >
              <h3 className="flex items-start justify-between gap-3 text-base leading-snug text-ink">
                {link ? (
                  <>
                    <a href={link.href} target="_blank" rel="noopener" className="after:absolute after:inset-0">
                      {p.title}
                    </a>
                    <ArrowUpRight
                      aria-hidden
                      className="size-4 shrink-0 text-muted transition-[color,transform] duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-orange"
                    />
                  </>
                ) : (
                  <>
                    {p.title}
                    <span className="shrink-0 rounded border border-line px-1.5 py-0.5 text-[10px] font-semibold text-muted">
                      Client work
                    </span>
                  </>
                )}
              </h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{p.summary}</p>
              <div className="mt-5">
                <TagList items={p.tags} />
              </div>
            </Reveal>
            );
          })}
        </ul>

        <LiveSites />

        <Reveal className="mt-10">
          <a
            href={profile.github}
            target="_blank"
            rel="noopener"
            className="group inline-flex items-center gap-2 text-sm font-semibold text-ink hover:text-orange-ink"
          >
            <GithubIcon />
            More on GitHub
            <ArrowUpRight aria-hidden className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
