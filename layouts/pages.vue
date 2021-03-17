<template>
  <div>
    <pagesnavigation />
    <Nuxt style="margin-top:110px;"/>
    <footer-main/>
  </div>
</template>

<script>
import quicknav from '~/components/quicknav.vue'
import navigationhero from '~/components/navigationhero.vue'
import FooterMain from '~/components/FooterMain.vue'
import Pagesnavigation from '~/components/pagesnavigation.vue'
export default {
  components: {
    navigationhero,
    quicknav,
    FooterMain,
    Pagesnavigation
}
}
</script>

<style>
body{
  font-size:18px;
}
#__nuxt, #__layout{
  min-height: 100vh;
}
</style>