import { ImageResponse } from 'next/og';
import { profile } from '@/data/site';

export const alt = 'Ancent Mbithi, Full Stack Developer in Nairobi, Kenya';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const chips = ['Laravel', 'React', '.NET Core', 'M-Pesa Daraja', 'KRA eTIMS', 'AWS'];

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '72px 80px',
          color: 'white',
          background:
            'radial-gradient(ellipse 70% 60% at 85% 0%, rgba(91,72,168,0.55), transparent 70%), linear-gradient(180deg, #0b245c 0%, #081d4d 100%)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div
            style={{
              display: 'flex',
              width: 56,
              height: 56,
              borderRadius: 14,
              background: '#ff641e',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 24,
              fontWeight: 800,
            }}
          >
            AM
          </div>
          <div style={{ display: 'flex', fontSize: 28, fontWeight: 700 }}>{profile.name}</div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', fontSize: 70, fontWeight: 800, lineHeight: 1.05, letterSpacing: -2 }}>
            I build software that
          </div>
          <div style={{ display: 'flex', fontSize: 70, fontWeight: 800, lineHeight: 1.05, letterSpacing: -2, color: '#ff641e' }}>
            solves real problems.
          </div>
          <div style={{ display: 'flex', marginTop: 24, fontSize: 28, color: 'rgba(255,255,255,0.75)' }}>
            Full Stack Developer · Systems & Cloud · Nairobi, Kenya
          </div>
        </div>

        <div style={{ display: 'flex', gap: 12 }}>
          {chips.map((c) => (
            <div
              key={c}
              style={{
                display: 'flex',
                padding: '8px 16px',
                borderRadius: 8,
                border: '1px solid rgba(255,255,255,0.22)',
                fontSize: 22,
                color: 'rgba(255,255,255,0.85)',
              }}
            >
              {c}
            </div>
          ))}
        </div>
      </div>
    ),
    size
  );
}
