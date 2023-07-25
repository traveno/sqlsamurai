export function load({ route, url }) {
  const { pathname } = url;
  return { route, pathname };
}

export const prerender = true;