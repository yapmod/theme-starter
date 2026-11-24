import { mkdir, readFile, readdir, rm, writeFile } from 'node:fs/promises';

const root = new URL('../', import.meta.url);
const dist = new URL('dist/', root);
const collection = JSON.parse(await readFile(new URL('collection.json', root), 'utf8'));
if (typeof collection.name !== 'string' || !collection.name.trim()) {
  throw new Error('Give the collection a name in collection.json.');
}

const files = (await readdir(new URL('themes/', root))).filter(file => file.endsWith('.css')).sort();
const themes = [];
await rm(dist, { recursive: true, force: true });
await mkdir(new URL('themes/', dist), { recursive: true });

for (const file of files) {
  if (!/^[a-z0-9-]+(?:\.theme)?\.css$/.test(file)) {
    throw new Error(`Use lowercase letters, digits and hyphens in the theme filename: ${file}`);
  }
  const url = `themes/${file}`;
  const css = await readFile(new URL(url, root), 'utf8');
  const header = /^\s*\/\*\*([\s\S]*?)\*\//.exec(css)?.[1] ?? '';
  const fields = Object.fromEntries(
    Array.from(header.matchAll(/^\s*\*\s*@(name|author|description)[ \t]+(.+)$/gm),
      ([, key, value]) => [key, value.trim()])
  );
  if (!fields.name) throw new Error(`Add an @name line to the CSS header in ${file}.`);
  themes.push({ ...fields, url });
  await writeFile(new URL(url, dist), css);
}

await writeFile(new URL('index.json', dist), JSON.stringify({
  schemaVersion: 1, name: collection.name, description: collection.description, themes
}, null, 2) + '\n');
