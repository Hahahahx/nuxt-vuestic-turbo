import { colors } from './themes'

export default defineNuxtConfig({
  modules: [
    '@vueuse/nuxt',
    '@unocss/nuxt',
    '@nuxtjs/i18n',
    '@pinia/nuxt',
    '@vuestic/nuxt',
    '@nuxt/devtools',
  ],
  css: ['@unocss/reset/tailwind.css'],
  vuestic: {
    config: {
      colors: {
        variables: {
          ...colors,
        },
      },
      components: {
        VaButton: {
        },
      },
    },
  },
  // unocss: {
  //   attributify: true,
  //   icons: true,
  //   components: false,
  //   shortcuts: [
  //     ['btn', 'px-4 py-1 rounded inline-block bg-teal-600 text-white cursor-pointer hover:bg-teal-700 disabled:cursor-default disabled:bg-gray-600 disabled:opacity-50'],
  //   ],
  // },
  i18n: {
    locales: [
      {
        code: 'en',
        file: 'en-US.json',
      },
      {
        code: 'zh',
        file: 'zh-CN.json',
      },
    ],
    detectBrowserLanguage: {
      useCookie: true,
      cookieCrossOrigin: true,
    },
    lazy: true,
    langDir: '../../packages/locales',
    defaultLocale: 'zh',
  },
  postcss: {
    plugins: {
      'postcss-nested': {},
    },
  },
})
