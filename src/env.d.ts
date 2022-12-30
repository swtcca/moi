import type { AttributifyAttributes } from '@unocss/preset-attributify'
/// <reference types="vite/client" />
/// <reference types="vite-plugin-pages/client" />
/// <reference types="vite4-plugin-vue-layouts/client" />

declare module '@vue/runtime-dom' {
  interface HTMLAttributes extends AttributifyAttributes {}
}

declare module '*.vue' {
  import { DefineComponent } from 'vue'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>
  export default component
}
