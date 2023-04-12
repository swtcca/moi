/**
 * Handle Markdown files
 * @module Md
 * @group Files
 * */

import yamlify from "yamlify-object";
import markdown from "markdown-it";
import externalLinks from "markdown-it-external-links";
import { parse } from 'ultramatter'

import { preWrapperPlugin } from '../../composables/file/plugins/preWrapper'
import { containerPlugin } from '../../composables/file/plugins/containers'
import hljs from "highlight.js"
import highlightPlugin from "markdown-it-highlightjs"
import 'highlight.js/styles/github.css'


export interface MdContent {
  frontmatter?: {
    title?: string
    icon?: string
    cover?: string
  };
  content?: string;
}

/**
 *  Merge markdown content with a frontmatter object and render to a string
 */
export function createMd({
  frontmatter = null,
  content = "",
}: MdContent) {
  let front = "";
  if (frontmatter && typeof frontmatter == "object" && Object.keys(frontmatter).length > 0) {
    front = yamlify(frontmatter, {
      indent: '',
      prefix: '---\n',
      postfix: '\n---\n'
    });
  }
  return front + content;

}

/**
 * Parse text content of a markdown file into an object
 * @param file - Text form of an uploaded file
 * @returns An object with md frontmatter and content
 */
export function parseMd(file: string): MdContent {
  return parse(file)
}


let md: markdown
/**
 * Markdown-it instance to parse MD content
 * @returns Markdown-it instance
 */
export function useMd() {
  if (!md) {
    md = new markdown({
      html: true,
      linkify: true,
      typographer: true,
    });

    md.use(preWrapperPlugin)
      .use(containerPlugin)
      .use(highlightPlugin, {auto: true, inline: true, hljs})
    md.use(externalLinks, {
      externalRel: 'noreferrer',
      externalTarget: "_blank",
    });
  }
  return md;
}
