<template>
  <div class="prispevek">
    <v-container>
      <h1>{{stranka[0].title}}</h1>
      <wp-content :html="stranka[0].text" />
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
  async asyncData(context){
      let stranka = [];
      const prispevek = db.collection('stranky').doc(context.params.stranky);
      const doc = await prispevek.get();
      if (!doc.exists) {
        stranka.push({
          title:"Stránka nenalezena :(",
          text:"<p style='text-align:center;'><a href='/'>Zpět na hlavní stránku</a></p>"
        })
        return {stranka: stranka};
      } else {
        stranka.push(doc.data());
        return {stranka : stranka};
      }
  }
}
</script>

<style lang="scss">
.prispevek{
    min-height:75vh;
    max-width:50%;
    margin:0 auto;
    margin-top: 100px;

    h1{
      text-align:center;
      text-transform: uppercase;
    }

    p{
      padding: 15px 0;
      & a{
        text-decoration: none;
        cursor: pointer;
        &:link{
          color:#000;
        }
        &:visited{
          color:#000;
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