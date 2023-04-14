import {
  defineConfig, presetAttributify, presetIcons,
  presetMini, presetTypography, presetUno,
  presetWebFonts, transformerDirectives, transformerVariantGroup,
} from 'unocss'
import { presetExtra } from 'unocss-preset-extra'
import {
  presetTheme, theme,
} from './themes'

export default defineConfig({
  shortcuts: [],
  theme,
  presets: [
    presetUno(),
    presetMini(),
    presetAttributify(),
    presetTheme,
    presetIcons(),
    presetExtra(),
    presetTypography(),
    presetWebFonts({
      fonts: {
        // ...
      },
    }),
  ],
  transformers: [
    transformerDirectives(), transformerVariantGroup(),
  ],
})
