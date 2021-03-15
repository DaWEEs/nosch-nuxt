<template>
  <div>
    <navigationhero />
    
    <Nuxt />

    <footer-main/>
  </div>
</template>

<script>
import quicknav from '~/components/quicknav.vue'
import navigationhero from '~/components/navigationhero.vue'
import FooterMain from '~/components/FooterMain.vue'
export default {
  components: {
    navigationhero,
    quicknav,
    FooterMain
}
}
</script>

<style>

</style>