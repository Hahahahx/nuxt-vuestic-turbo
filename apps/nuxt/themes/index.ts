import unoPresetTheme from 'unocss-preset-theme'
import { colors as TailWColor } from '@unocss/preset-mini'
import type { Theme } from '@unocss/preset-mini'
import {
  colorsPreset, thresholdsPreset,
} from 'vuestic-ui'

function convertNumbersToCssUnits(obj: any, unit = 'px') {
  return Object.entries(obj).reduce((acc, [
    key, value,
  ]) => ({
    ...acc,

    [key]: `${value}${unit}`,
  }), {})
}

export const colors = {
  primary: TailWColor.indigo[500],
  secondary: TailWColor.violet[500],
  // success: CssColor;
  // info: CssColor;
  // danger: CssColor;
  // warning: CssColor;
  // backgroundPrimary: CssColor;
  // backgroundSecondary: CssColor;
  // backgroundElement: CssColor;
  // backgroundBorder: CssColor;
  // textPrimary: CssColor;
  // textInverted: CssColor;
  // shadow: CssColor;
  // focus: CssColor;
}

export const theme: Theme = {

  colors: {
    ...colorsPreset.light,
    ...colors,
  },
  breakpoints: convertNumbersToCssUnits(thresholdsPreset),
}

export const presetTheme = unoPresetTheme<Theme>({
  // prefix: '--va',
  theme: {
    // Configure dark themes
    dark: {
      colors: {
        ...colorsPreset.dark,
        ...colors,
      },
    },
    // Configure compact themes
    compact: {
    },
  },
})
