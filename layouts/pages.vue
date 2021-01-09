<template>
  <div>
    <quicknav />
    <navigation />
    
    <Nuxt />
  </div>
</template>

<script>
import quicknav from '~/components/quicknav.vue'
import navigation from '~/components/navigation.vue'
export default {
  components: {
    navigation,
    quicknav
  },
}
</script>

<style>

</style>