// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import mdx from '@astrojs/mdx';

export default defineConfig({
  output: 'static',
  integrations: [mdx()],
  devToolbar: { enabled: false },
  fonts: [
    {
      // Variable width and weight: wide for big numbers, normal for reading.
      provider: fontProviders.google(),
      name: 'Archivo',
      cssVariable: '--font-archivo',
      weights: ['100 900'],
      styles: ['normal'],
      subsets: ['latin'],
      options: { experimental: { variableAxis: { wdth: [['62', '125']] } } },
    },
    {
      provider: fontProviders.google(),
      name: 'JetBrains Mono',
      cssVariable: '--font-mono',
      weights: ['400', '700'],
      styles: ['normal'],
      subsets: ['latin'],
    },
  ],
});
