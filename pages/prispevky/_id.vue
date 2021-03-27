<template>
  <div class="prispevek">
    <v-container>
      <h1>{{prispevek[0].title}}</h1>
      <p style="text-align:center; color:#808080;">{{prispevek[0].date}}</p>
      <wp-content :html="prispevek[0].text" />
      <hr>
      <p style="text-align:right;">
        <a @click="$router.go(-1)">
          <v-icon color="#000">mdi-arrow-left</v-icon>
          Vrátit se zpět
        </a>
      </p>
    </v-container>
  </div>
</template>

<script>
import {db, firebase} from '~/plugins/firebase.js'
import 'firebase/auth'
import 'firebase/firestore'
import WpContent from '~/components/WpContent.vue'
export default {
  layout: 'pages',
  components: { WpContent },
  async asyncData(context){
      let pris = [];
      const prispevek = db.collection('prispevky').doc(context.params.id);
      const doc = await prispevek.get();
      if (!doc.exists) {
        pris.push({
          title:"Stránka nenalezena :(",
          text:"<p style='text-align:center;'><a href='/'>Zpět na hlavní stránku</a></p>"
        })
        return {prispevek : pris};
      } else {
        pris.push(doc.data());
        var datumDate = new Date(pris[0].date)
        pris[0].date = datumDate.getDate()+". "+(datumDate.getMonth()+1)+". "+datumDate.getFullYear();
        return {prispevek : pris};
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

    img{
      display: block;
      margin-left: auto;
      margin-right: auto;
      width:auto;
      height: auto;
      max-width:100%;
      max-height: 50vh;
    }
  }

  @media screen and (max-width:768px){
    .prispevek{
      max-width:90%;
    }
  }
</style>

<style lang="scss" scoped>
.prispevek{
  h1{
      text-align:center;
      text-transform: uppercase;
      &:first-child{
        padding-bottom:0;
      }
    }
  }
</style>