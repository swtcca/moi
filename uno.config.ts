import { defineConfig, presetWind, presetIcons, presetAttributify, presetTagify, presetTypography, transformerDirectives, extractorSplit } from "unocss";
import presetChinese from "unocss-preset-chinese"
import { presetForms } from '@julr/unocss-preset-forms'
import extractorPug from '@unocss/extractor-pug'
import { presetAnu, presetIconExtraProperties } from 'anu-vue'
import { presetThemeDefault } from '@anu-vue/preset-theme-default'

export default defineConfig({
  content: {
    pipeline: {
      include: [
        // the default
        /.*\/anu-vue\.js(.*)?$/, './**/*.vue', './**/*.md',
        /\.(vue|svelte|[jt]sx|mdx?|astro|elm|php|phtml|html)($|\?)/,
        // include js/ts files
        'src/**/*.{js,ts}',
      ],
    }
  },
  presets: [
    // presetAttributify(),
    presetWind(),
    presetTagify(),
    presetTypography(),
    presetIcons({
      extraProperties: {
        ...presetIconExtraProperties,
        // 'display': 'inline-block',
        // 'vertical-align': 'middle',
      },
    }),
    // anu-vue preset
    // presetAnu({colors: ['secondary'],}),
    presetAnu(),
    presetThemeDefault({ shortcutOverrides: {
        'a-select-floating': '[--slide-y-translateY:6px] z-500',
        'a-select-options-container': 'z-510'
      }
    }),
    // presetHeadlessUi(),
    presetChinese(),
    presetForms(),
  ],
  transformers: [
    transformerDirectives(),
  ],
  extractors: [
    extractorPug(),
    extractorSplit,
  ],
  // include: [/.*\/anu-vue\.js(.*)?$/, './**/*.vue', './**/*.md'],
  safelist: 'prose prose-sm m-auto text-left font-chinese font-helvetica font-italics font-song font-li'.split(' '),
})
