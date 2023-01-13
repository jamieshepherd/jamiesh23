import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';
import embeds from 'astro-embed/integration';
import compress from 'astro-compress';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
    site: 'https://jamie.sh',
    base: '/',
    integrations: [react(), mdx(), embeds(), compress(), sitemap()],
    legacy: {
        astroFlavoredMarkdown: true,
    },
});
