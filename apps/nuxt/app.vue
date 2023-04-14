<script setup>
const {
  locale, locales, setLocale,
} = useI18n()
const availableLocales = computed(() => {
  return (locales.value).filter((i) => i.code !== locale.value)
})
</script>

<template>
  <main class="py-20 px-12 text-center">
    <span text="blue 5xl hover:red" cursor="default">Hello Nuxt 3</span>
    <br>
    <div i-carbon-car text-4xl inline-block />
    <br>
    <VaButton to="/" active-class="ring-3 ring-blue">
      test
    </VaButton>
    <button btn>
      {{ $t('account.bot') }}
    </button>

    <a
      v-for="locale in availableLocales"
      :key="locale.code"
      href="#"
      @click.prevent.stop="setLocale(locale.code)"
    >{{ locale.name }}</a>
  </main>
</template>

<style>
body{
  /* --uno: bg-primary/10; */
}
</style>
