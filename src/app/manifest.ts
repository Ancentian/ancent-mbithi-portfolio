import type { MetadataRoute } from 'next';
import { profile, seo } from '@/data/site';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${profile.name} · ${profile.role}`,
    short_name: profile.name,
    description: seo.description,
    start_url: '/',
    display: 'browser',
    background_color: '#fff9f5',
    theme_color: '#081d4d',
    icons: [{ src: '/icon.svg', sizes: 'any', type: 'image/svg+xml' }],
  };
}
