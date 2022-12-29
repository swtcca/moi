import path from "path"
const dirname = __dirname

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import Unocss from 'unocss/vite'
import { presetUno, presetIcons, transformerDirectives, extractorSplit } from "unocss";
import extractorPug from '@unocss/extractor-pug'

import { VitePWA } from 'vite-plugin-pwa'
import replace from '@rollup/plugin-replace'
import Layouts from 'vite4-plugin-vue-layouts'

import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import VueI18n from '@intlify/unplugin-vue-i18n/vite'
import Pages from 'vite-plugin-pages'

const moduleExclude = match => {
  const m = id => id.indexOf(match) > -1
  return {
    name: `exclude-${match}`,
    resolveId(id) {
      if (m(id)) return id
    },
    load(id) {
      if (m(id)) return `export default {}`
    },
  }
}

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '~/': `${path.resolve(dirname, 'src')}/`,
      '@/': `${path.resolve(dirname, 'src')}/`,
      '@src': `${path.resolve(dirname, 'src')}`,
      '#composables': path.resolve(dirname, 'src/gun-vue/composables'),
      '#components': path.resolve(dirname, 'src/gun-vue/components'),
      // '#composables': '@gun-vue/composables',
      // '@components': '@gun-vue/components',
      // process: "process/browser",
      stream: "stream-browserify",
      // zlib: "browserify-zlib",
      // util: "util",
      // web3: path.resolve(dirname, "./node_modules/web3/dist/web3.min.js"),
    },
  },
  plugins: [
    moduleExclude("text-encoding"),
    // moduleExclude('vue-demi'),
    vue(),
    // https://github.com/hannoeru/vite-plugin-pages
    Pages({
      extensions: ['vue', 'md'],
    }),
    // https://github.com/JohnCampionJr/vite-plugin-vue-layouts
    Layouts(),
    // https://github.com/antfu/unplugin-vue-components
    Components({
      // allow auto load markdown components under `./src/components/`
      dirs: ["src/components", "src/gun-vue/components"],
      // dirs: ["src/components"],
      directoryAsNamespace: false,
      globalNamespaces: ["global"],
      extensions: ['vue'],
      // allow auto import and register components used in markdown
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
      exclude: [/node_modules/, /\.git/],
      resolvers: [
        IconsResolver({
          componentPrefix: '',
          // enabledCollections: ['mdi', "ri", "ph"]
        }),
      ],
      dts: 'src/components.d.ts',
    }),
    // Unocss(),
    Unocss({
      presets: [
        presetIcons({
          extraProperties: {
            'display': 'inline-block',
            'vertical-align': 'middle',
          },
        }),
        presetUno()
      ],
      transformers: [
        transformerDirectives(),
      ],
      extractors: [
        extractorPug(),
        extractorSplit,
      ],
    }),
    // https://github.com/antfu/unplugin-icons
    Icons({
      compiler: "vue3",
      autoInstall: true,
    }),
    AutoImport({
      imports: [
        'vue',
        'vue-router',
        'vue-i18n',
        '@vueuse/head',
        '@vueuse/core',
      ],
      dts: 'src/auto-imports.d.ts',
    }),
    VueI18n({
      runtimeOnly: true,
      compositionOnly: true,
      include: [path.resolve(__dirname, 'locales/**')],
    }),
    VitePWA(),
    // VitePWA({
    //   workbox: {
    //     maximumFileSizeToCacheInBytes: 9000000
    //   },
    //   mode: 'development',
    //   base: '/',
    //   includeAssets: ['favicon.svg'],
    //   manifest: {
    //     name: 'MOI',
    //     short_name: 'MOI',
    //     display: "standalone",
    //     theme_color: '#ccebff',
    //     icons: [
    //       {
    //         src: 'pwa-192x192.png', // <== don't add slash, for testing
    //         sizes: '192x192',
    //         type: 'image/png',
    //       },
    //       {
    //         src: '/pwa-512x512.png', // <== don't remove slash, for testing
    //         sizes: '512x512',
    //         type: 'image/png',
    //       },
    //       {
    //         src: 'pwa-512x512.png', // <== don't add slash, for testing
    //         sizes: '512x512',
    //         type: 'image/png',
    //         purpose: 'any maskable',
    //       },
    //     ],
    //   },
    // }),
    replace({
      __DATE__: new Date().toISOString(),
    }),
  ],
  base: '/',
  build: {
    target: "esnext",
    minify: !process.env.TAURI_DEBUG ? 'esbuild' : false,
    sourcemap: !!process.env.TAURI_DEBUG,
    brotliSize: true,
    assetsInlineLimit: 100000000,
    chunkSizeWarningLimit: 100000000,
    cssCodeSplit: false,
    external: ["vue"],
    rollupOptions: {
      output: {
        minifyInternalExports: false,
        inlineDynamicImports: true,
        globals: {
          vue: "Vue",
        },
      }
    }
  },
  optimizeDeps: {
    include: [
      'vue',
      'vue-router',
      '@vueuse/core',
      // '@vueuse/head',
      'gun',
      'gun/gun',
      'gun/sea',
      'gun/sea.js',
      'gun/lib/then',
      'gun/lib/unset',
      'gun/lib/not',
      'gun/lib/open',
      'gun/lib/load',
      'gun/lib/webrtc',
      'gun/lib/radix',
      'gun/lib/radisk',
      'gun/lib/store',
      'gun/lib/rindexed',
      // 'interactjs',
    ]
  },
})
