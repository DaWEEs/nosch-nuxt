<template>
  <v-footer
    padless
    dark
    class="border"
  >
    <v-card
      class="modra flex"
      flat
      tile
    >
      <v-card-title class="teal">
        <strong class="subheading">Zůstaňte s námi ve spojení!</strong>

        <v-spacer></v-spacer>

        <v-btn
          v-for="icon in icons"
          :key="icon"
          class="mx-4"
          dark
          icon
        >
          <v-icon size="24px">
            {{ icon }}
          </v-icon>
        </v-btn>
      </v-card-title>

      <v-card-text class="py-2 white--text text-center">
        {{ new Date().getFullYear() }} — <strong>SOŠ Net Office Orlová spol. s.r.o</strong>
      </v-card-text>
    </v-card>
  </v-footer>
</template>

<script>
export default {
  data: () => ({
      icons: [
        'mdi-facebook',
        'mdi-twitter',
        'mdi-linkedin',
        'mdi-instagram',
      ],
    }),
}
</script>

<style scoped>
.border{
  border-top:2px solid #fff !important;
  border-radius: 5px 5px 0 0;
}
.modra{
  background-color: #001942 !important;
}
</style>