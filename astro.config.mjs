import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';
import embeds from 'astro-embed/integration';
import compress from 'astro-compress';
import sitemap from '@astrojs/sitemap';
import robotsTxt from 'astro-robots-txt';

export default defineConfig({
    base: '/',
    integrations: [
        react(),
        mdx(),
        embeds(),
        compress(),
        sitemap(),
        robotsTxt(),
    ],
    legacy: {
        astroFlavoredMarkdown: true,
    },
});
