<template>
  <div class="prispevek">
    <v-container>
      <h1>Stránka nenalezena :(</h1>
      <p style='text-align:center;'><a href='/'>Zpět na hlavní stránku</a></p>
    </v-container>
  </div>
</template>

<script>
import {db, firebase} from '~/plugins/firebase.js'
import 'firebase/auth'
import 'firebase/firestore'
import FooterMain from '~/components/FooterMain.vue'
import pagesnavigation from '~/components/pagesnavigation.vue'

export default {
  components: { pagesnavigation, FooterMain },
  layout: 'pages',
}
</script>

<style lang="scss">
.prispevek{
    min-height:75vh;
    max-width:70%;
    margin:0 auto;
    margin-top: 100px;

    h1{
      text-align:center;
      text-transform: uppercase;
    }

    p{
      padding: 15px 0;
      & a{
        text-decoration: underline;
        cursor: pointer;
        &:link{
          color:$secondary-color;
        }
        &:visited{
          color:$secondary-color;
        }
      }
    }
}
</style>

<style scoped lang="scss">
.prispevek{
  h1{
    &:first-child{
      padding-bottom: 20px;
    }
  }
}
</style>