export async function load({ fetch }) {
  const data = await fetch('https://sqlsamurai.fike.io/api/warriors');
  const warriors: any[] = await data.json();
  return { warriors };
}