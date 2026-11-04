import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ExternalLink, Mail } from 'lucide-react';
import { Footer } from '@/components/Footer';
import { Navbar } from '@/components/Navbar';
import { Button } from '@/components/ui/Button';
import { GithubIcon } from '@/components/ui/BrandIcons';
import { Reveal } from '@/components/ui/Reveal';
import { TagList } from '@/components/ui/Tag';
import { caseStudy, featuredProject, profile } from '@/data/site';

const description =
  'Case study: a live multi-tenant Laravel platform for Kenyan milk cooperatives with M-Pesa Daraja farmer payouts, reconciliation and SMS notifications.';

export const metadata: Metadata = {
  title: 'Milk Cooperative Management System: Case Study',
  description,
  alternates: { canonical: '/work/milk-cooperative' },
  openGraph: { type: 'article', title: 'Milk Cooperative Management System: Case Study', description, url: '/work/milk-cooperative' },
};

const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'SoftwareApplication',
      name: caseStudy.title,
      description,
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Web',
      author: { '@type': 'Person', '@id': `${profile.siteUrl}/#person`, name: profile.name },
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: profile.siteUrl },
        { '@type': 'ListItem', position: 2, name: 'Projects', item: `${profile.siteUrl}/#projects` },
        { '@type': 'ListItem', position: 3, name: caseStudy.title, item: `${profile.siteUrl}/work/milk-cooperative` },
      ],
    },
  ],
};

export default function CaseStudyPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <Navbar />
      <main id="main">
        <section className="relative overflow-hidden bg-navy-dark text-white">
          <div
            aria-hidden
            className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_85%_0%,rgba(91,72,168,0.45),transparent_70%),linear-gradient(180deg,#0b245c_0%,#081d4d_100%)]"
          />
          <div className="container-page relative pt-32 pb-16 sm:pt-36 lg:pt-40 lg:pb-20">
            <Link href="/#projects" className="inline-flex items-center gap-2 text-sm font-medium text-white/70 hover:text-white">
              <ArrowLeft aria-hidden className="size-4" /> Back to work
            </Link>
            <p className="mt-8 text-[11px] font-bold tracking-[0.2em] text-orange-light uppercase">
              Case study · {featuredProject.status}
            </p>
            <h1 className="mt-3 max-w-3xl text-4xl leading-[1.06] font-extrabold tracking-[-0.035em] sm:text-5xl">
              {caseStudy.title}
            </h1>
            <p className="mt-5 max-w-2xl text-[17px] leading-relaxed text-white/75">{caseStudy.intro}</p>
            <div className="mt-7">
              <TagList items={caseStudy.stack} tone="dark" />
            </div>
          </div>
        </section>

        <section className="py-20 lg:py-24">
          <div className="container-page grid gap-x-16 gap-y-12 md:grid-cols-2">
            {caseStudy.sections.map((s, i) => (
              <Reveal key={s.heading} delay={(i % 2) * 0.06}>
                <p className="font-mono text-xs text-orange-ink">0{i + 1}</p>
                <h2 className="mt-2 text-2xl text-ink">{s.heading}</h2>
                <p className="mt-3 text-[15px] leading-relaxed text-muted">{s.body}</p>
              </Reveal>
            ))}
          </div>

          <div className="container-page mt-16 flex flex-wrap gap-3 border-t border-line pt-10">
            <Button href={featuredProject.code} variant="outline-dark" target="_blank" rel="noopener" icon={<GithubIcon />}>
              View Code
            </Button>
            <Button
              href={featuredProject.live}
              variant="outline-dark"
              target="_blank"
              rel="noopener"
              icon={<ExternalLink aria-hidden className="size-4" />}
            >
              Visit live system
            </Button>
            <Button href="/#quote" arrow icon={<Mail aria-hidden className="size-4" />}>
              Request a quote for a similar project
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
