import { Certifications } from '@/components/Certifications';
import { Contact } from '@/components/Contact';
import { Experience } from '@/components/Experience';
import { Expertise } from '@/components/Expertise';
import { Footer } from '@/components/Footer';
import { Hero } from '@/components/Hero';
import { Navbar } from '@/components/Navbar';
import { Projects } from '@/components/Projects';
import { StatsStrip } from '@/components/StatsStrip';
import { Testimonials } from '@/components/Testimonials';
import { certifications, profile, seo } from '@/data/site';

const personId = `${profile.siteUrl}/#person`;

const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Person',
      '@id': personId,
      name: profile.name,
      jobTitle: profile.role,
      description: seo.description,
      url: profile.siteUrl,
      image: `${profile.siteUrl}${profile.photo}`,
      email: `mailto:${profile.email}`,
      telephone: profile.phone,
      address: { '@type': 'PostalAddress', addressLocality: 'Nairobi', addressCountry: 'KE' },
      sameAs: [profile.github, profile.linkedin],
      alumniOf: { '@type': 'CollegeOrUniversity', name: 'Kenyatta University' },
      worksFor: { '@type': 'Organization', name: 'Razzo Africa Ltd' },
      knowsAbout: seo.knowsAbout,
      hasCredential: certifications.map((c) => ({
        '@type': 'EducationalOccupationalCredential',
        name: c.name,
        recognizedBy: { '@type': 'Organization', name: c.issuer },
      })),
    },
    {
      '@type': 'WebSite',
      '@id': `${profile.siteUrl}/#website`,
      url: profile.siteUrl,
      name: profile.name,
      inLanguage: 'en-KE',
      publisher: { '@id': personId },
    },
    {
      '@type': 'ProfilePage',
      url: profile.siteUrl,
      name: seo.title,
      mainEntity: { '@id': personId },
    },
  ],
};

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <Navbar />
      <main id="main">
        <Hero />
        <StatsStrip />
        <Expertise />
        <Projects />
        <Experience />
        <Certifications />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
