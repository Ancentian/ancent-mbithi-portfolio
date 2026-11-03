import { profile } from '@/data/site';

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-navy-dark text-white/55">
      <div className="container-page flex flex-col gap-3 py-7 text-[13px] sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {new Date().getFullYear()} {profile.name}. Built with Next.js.
        </p>
        <ul className="flex gap-6">
          <li>
            <a href={profile.github} target="_blank" rel="noopener" className="hover:text-white">
              GitHub
            </a>
          </li>
          <li>
            <a href={profile.linkedin} target="_blank" rel="noopener" className="hover:text-white">
              LinkedIn
            </a>
          </li>
          <li>
            <a href={`mailto:${profile.email}`} className="hover:text-white">
              Email
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
