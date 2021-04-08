<template>
  <div>
    <navigationhero />
    <Nuxt />
    <footer-main/>
  </div>
</template>

<script>
import navigationhero from '~/components/navigationhero.vue'
import FooterMain from '~/components/FooterMain.vue'
export default {
  components: {
    navigationhero,
    FooterMain
  }
}
</script>

<style>

</style>