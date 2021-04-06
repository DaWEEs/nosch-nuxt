<template>
  <div class="prispevek">
    <v-container>
      <h1>{{stranka[0].title}}</h1>
      <wp-content :html="stranka[0].text" />
      <div v-if="stranka[0].formular">
        <hr>
        <div style="padding:30px 0;">
          <h3 style="padding-bottom:20px;">Máte dotaz? Kontaktujte nás!</h3>
          <formular />
        </div>
      </div>
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

    ul{
      padding-left:30px;
    }

    ol{
      padding-left:30px;
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