/**
 * Handle Markdown files
 * @module Md
 * @group Files
 * */

import MarkdownIt from "markdown-it";
import externalLinks from "markdown-it-external-links";
import anchorPlugin from 'markdown-it-anchor'
import attrsPlugin from 'markdown-it-attrs'
import emojiPlugin from 'markdown-it-emoji'
import tocDonePlugin from 'markdown-it-toc-done-right'

import { tocPlugin, type TocPluginOptions } from '@mdit-vue/plugin-toc'
import { titlePlugin } from '@mdit-vue/plugin-title';
import { headersPlugin, type HeadersPluginOptions } from '@mdit-vue/plugin-headers'
import { frontmatterPlugin, type FrontmatterPluginOptions } from '@mdit-vue/plugin-frontmatter'
import { componentPlugin } from '@mdit-vue/plugin-component'
import { sfcPlugin, type SfcPluginOptions } from '@mdit-vue/plugin-sfc'
import { slugify } from '@mdit-vue/shared'
import type { Logger } from 'vite'

import { containerPlugin } from './plugins/containers'
import { highlight } from './plugins/highlight'
import { highlightLinePlugin } from './plugins/highlightLines'
import { imagePlugin } from './plugins/image'
import { lineNumberPlugin } from './plugins/lineNumbers'
import { preWrapperPlugin } from './plugins/preWrapper'
import { linkPlugin } from './plugins/link'

import type { ILanguageRegistration, IThemeRegistration } from 'shiki'
import type { MarkdownItEnv } from '@mdit-vue/types'
export const env: MarkdownItEnv = {}

export type ThemeOptions =
  | IThemeRegistration
  | { light: IThemeRegistration; dark: IThemeRegistration }

export interface MarkdownOptions extends MarkdownIt.Options {
  lineNumbers?: boolean
  config?: (md: MarkdownIt) => void
  anchor?: anchorPlugin.AnchorOptions
  attrs?: {
    leftDelimiter?: string
    rightDelimiter?: string
    allowedAttributes?: string[]
    disable?: boolean
  }
  defaultHighlightLang?: string
  frontmatter?: FrontmatterPluginOptions
  headers?: HeadersPluginOptions | boolean
  sfc?: SfcPluginOptions
  theme?: ThemeOptions
  languages?: ILanguageRegistration[]
  toc?: TocPluginOptions
  externalLinks?: Record<string, string>
}

let md: MarkdownIt 
/**
 * Markdown-it instance to parse MD content
 * @returns Markdown-it instance
 */
export function useMd(options: MarkdownOptions = {}, logger: Pick<Logger, 'warn'> = console) {
  if (!md) {
    md = new MarkdownIt({
      html: true,
      linkify: true,
      typographer: true,
      // highlight: options.highlight || await highlight(
      //     options.theme,
      //     options.languages,
      //     options.defaultHighlightLang,
      //     logger
      //   ),
      ...options
    });
    md.linkify.set({ fuzzyLink: false })
    // custom plugins
    md.use(componentPlugin)
      .use(highlightLinePlugin)
      .use(preWrapperPlugin)
      .use(containerPlugin)
      .use(imagePlugin)
      .use(
          linkPlugin,
          { target: '_blank', rel: 'noreferrer'},
          '/'
        )
      .use(lineNumberPlugin, options.lineNumbers)

    // 3rd party plugins
    md.use(externalLinks, {externalTarget: "_blank", rel: "noreferrer"})
    md.use(attrsPlugin)
      .use(emojiPlugin)

    // mdit-vue plugins
    md.use(anchorPlugin, {
          slugify,
          // permalink: anchorPlugin.permalink.linkInsideHeader({
          //   symbol: '&ZeroWidthSpace;',
          //   renderAttrs: (slug, state) => {
          //     // Find `heading_open` with the id identical to slug
          //     const idx = state.tokens.findIndex((token) => {
          //       const attrs = token.attrs
          //       const id = attrs?.find((attr) => attr[0] === 'id')
          //       return id && slug === id[1]
          //     })
          //     // Get the actual heading content
          //     const title = state.tokens[idx + 1].content
          //     return {
          //       'aria-label': `Permalink to "${title}"`
          //     }
          //   }
          // })
        } as anchorPlugin.AnchorOptions)
      .use(frontmatterPlugin, {
          grayMatterOptions: {
            excerpt: true,
            excerpt_separator: '<!-- more -->',
          },
        })
      .use(headersPlugin)
      .use(sfcPlugin)
      .use(titlePlugin)
      // .use(anchorPlugin, {slugify})
      .use(tocPlugin)
  }
  return md;
}
