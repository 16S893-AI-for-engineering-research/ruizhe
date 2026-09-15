const BASE = import.meta.env.BASE_URL;

/** Join a site-root-relative path with the deploy base path (`/ruizhe` in production). */
export function url(path: string): string {
  const clean = path.startsWith('/') ? path.slice(1) : path;
  const base = BASE.endsWith('/') ? BASE : `${BASE}/`;
  return `${base}${clean}`;
}

/** True when `href` is the page currently being rendered. */
export function isActive(current: string, href: string): boolean {
  const norm = (p: string) => p.replace(/\/+$/, '') || '/';
  return norm(current) === norm(href);
}
