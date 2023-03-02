import { ref } from "vue"
export const class_font = ref("font-chinese")
export const toggleFonts = () => {
  const fonts = ["font-chinese", "font-helvetica", "font-italics", "font-song", "font-li"]
  class_font.value = fonts[(fonts.indexOf(class_font.value) + 1) % fonts.length]
}

export const useFonts = () => ({class_font, toggleFonts})