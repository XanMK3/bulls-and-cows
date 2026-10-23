import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
import path from 'path';
import fs from 'fs';

function svgSpritePlugin() {
    function getSprite() {
        const svgDir = path.resolve(__dirname, 'src/assets/svg');
        if (!fs.existsSync(svgDir)) return '';

        const files = fs.readdirSync(svgDir).filter((file) => file.endsWith('.svg'));
        const symbols = files.map((file) => {
            const id = path.basename(file, '.svg');
            const content = fs.readFileSync(path.resolve(svgDir, file), 'utf-8');
            const viewBoxMatch = content.match(/viewBox="([^"]+)"/);
            const viewBox = viewBoxMatch ? viewBoxMatch[1] : '0 0 24 24';
            const inner = content
                .replace(/<\?xml[^>]*\?>/g, '')
                .replace(/<svg[^>]*>/, '')
                .replace(/<\/svg>/, '')
                .trim();
            return `    <symbol id="${id}" viewBox="${viewBox}" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">\n        ${inner}\n    </symbol>`;
        });

        return `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="display: none;">\n${symbols.join('\n')}\n</svg>\n`;
    }

    return {
        name: 'svg-sprite-generator',
        configureServer(server) {
            server.middlewares.use((req, res, next) => {
                if (req.url === '/assets/sprite.svg') {
                    res.setHeader('Content-Type', 'image/svg+xml');
                    res.end(getSprite());
                    return;
                }
                next();
            });
        },
        generateBundle() {
            this.emitFile({
                type: 'asset',
                fileName: 'assets/sprite.svg',
                source: getSprite(),
            });
        },
    };
}

function directoryIndexPlugin() {
    const extensions = ['.jsx', '.js', '.scss', '.css', '.json'];
    const aliases = {
        components: path.resolve(__dirname, 'src/components'),
        const: path.resolve(__dirname, 'src/const'),
        hooks: path.resolve(__dirname, 'src/hooks'),
        styles: path.resolve(__dirname, 'src/styles'),
        utils: path.resolve(__dirname, 'src/utils'),
        assets: path.resolve(__dirname, 'src/assets'),
    };

    function tryResolve(target) {
        if (fs.existsSync(target)) {
            if (fs.statSync(target).isDirectory()) {
                for (const ext of ['.jsx', '.js']) {
                    const indexFile = path.join(target, `index${ext}`);
                    if (fs.existsSync(indexFile)) return indexFile;
                }
            } else {
                return target;
            }
        }
        for (const ext of extensions) {
            const file = `${target}${ext}`;
            if (fs.existsSync(file)) return file;
        }
        return null;
    }

    return {
        name: 'directory-index-resolver',
        resolveId(source, importer) {
            for (const [alias, dir] of Object.entries(aliases)) {
                if (source === alias || source.startsWith(`${alias}/`)) {
                    const subPath = source.slice(alias.length).replace(/^\//, '');
                    const fullTarget = subPath ? path.join(dir, subPath) : dir;
                    const resolved = tryResolve(fullTarget);
                    if (resolved) return resolved;
                }
            }
            if (importer && (source.startsWith('./') || source.startsWith('../'))) {
                const target = path.resolve(path.dirname(importer), source);
                const resolved = tryResolve(target);
                if (resolved) return resolved;
            }
            return null;
        },
    };
}

export default defineConfig({
    base: './',
    plugins: [
        directoryIndexPlugin(),
        react(),
        svgSpritePlugin(),
        VitePWA({
            registerType: 'autoUpdate',
            injectRegister: 'auto',
            manifest: {
                name: 'Bulls & Cows',
                short_name: 'b&c',
                description: 'Bulls & Cows game',
                lang: 'en-US',
                display: 'fullscreen',
                orientation: 'portrait',
                start_url: './',
                background_color: '#606060',
                theme_color: '#606060',
                icons: [
                    {
                        src: 'assets/icons/pwa-192x192.png',
                        sizes: '192x192',
                        type: 'image/png',
                    },
                    {
                        src: 'assets/icons/pwa-512x512.png',
                        sizes: '512x512',
                        type: 'image/png',
                    },
                ],
            },
            workbox: {
                globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
                globIgnores: ['service-worker.js'],
            },
        }),
    ],
    resolve: {
        alias: {
            components: path.resolve(__dirname, 'src/components'),
            const: path.resolve(__dirname, 'src/const'),
            hooks: path.resolve(__dirname, 'src/hooks'),
            styles: path.resolve(__dirname, 'src/styles'),
            utils: path.resolve(__dirname, 'src/utils'),
            assets: path.resolve(__dirname, 'src/assets'),
        },
        extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.scss', '.css'],
    },
    css: {
        preprocessorOptions: {
            scss: {
                api: 'modern-compiler',
                silenceDeprecations: ['legacy-js-api', 'import'],
                additionalData: (content, filepath) => {
                    if (filepath.replace(/\\/g, '/').endsWith('src/styles/variables.scss')) {
                        return content;
                    }
                    return `@import "${path.resolve(__dirname, 'src/styles/variables.scss').replace(/\\/g, '/')}";\n${content}`;
                },
            },
        },
    },
    server: {
        port: 3000,
        open: true,
    },
    build: {
        outDir: 'dist',
    },
});
