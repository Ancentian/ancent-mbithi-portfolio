import type { MetadataRoute } from 'next';
import { profile } from '@/data/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return [
    { url: profile.siteUrl, lastModified, changeFrequency: 'monthly', priority: 1 },
    { url: `${profile.siteUrl}/work/milk-cooperative`, lastModified, changeFrequency: 'yearly', priority: 0.7 },
  ];
}
