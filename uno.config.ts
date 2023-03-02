import { defineConfig, presetUno, presetIcons, presetAttributify, presetTagify, presetTypography, transformerDirectives, extractorSplit } from "unocss";
import presetChinese from "unocss-preset-chinese"
import { presetHeadlessUi } from 'unocss-preset-primitives'
import { presetForms } from '@julr/unocss-preset-forms'
import extractorPug from '@unocss/extractor-pug'
import { presetAnu, presetIconExtraProperties } from 'anu-vue'
import { presetThemeDefault } from '@anu-vue/preset-theme-default'

export default defineConfig({
  presets: [
    // presetAttributify(),
    presetUno(),
    presetTagify(),
    presetTypography(),
    presetIcons({
      extraProperties: {
        ...presetIconExtraProperties,
        // 'vertical-align': 'middle',
      },
    }),
    // anu-vue preset
    presetAnu(),
    presetHeadlessUi(),
    presetChinese(),
    presetForms(),
    presetThemeDefault(),
  ],
  transformers: [
    transformerDirectives(),
  ],
  extractors: [
    extractorPug(),
    extractorSplit,
  ],
  safelist: 'prose prose-sm m-auto text-left font-chinese font-helvetica font-italics font-song font-li'.split(' '),
})
