import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';
import embeds from 'astro-embed/integration';

export default defineConfig({
    base: '/',
    integrations: [react(), mdx(), embeds()],
    legacy: {
        astroFlavoredMarkdown: true,
    },
});
