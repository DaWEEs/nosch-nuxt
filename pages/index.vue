<template>
  <div>
    <hero />
  <div class="container">

    <v-container>
      <v-row>
        <v-col>
          <h1>O SOŠ Net Office</h1>
          <p>{{uvodArray[0].hlavnitext}}</p>
        </v-col>
        <v-col>
          <h1>Mohlo by Vás zajímat</h1>
          <ul>
            <li></li>
          </ul>
        </v-col>
      </v-row>
    </v-container>
    
    <h1>Aktuality</h1>
    <ul>
      <li v-for="prispevek in prispevky.slice(0,3)" :key="prispevek.title">
        <h1><Nuxt-link :to="`/prispevky/${prispevek.url}`">{{prispevek.title}}</Nuxt-link></h1>
        <div class="aktualitatext">
          <prispevek-preview :html="prispevek.text" />
        </div>
      </li>
    </ul>
    </div>
  </div>
</template>

<script>
import hero from '~/components/hero.vue'
import WpContent from '~/components/WpContent.vue'
import Axios from 'axios'
import {db, firebase} from '~/plugins/firebase.js'
import 'firebase/auth'
import 'firebase/firestore'
import PrispevekPreview from '~/components/PrispevekPreview.vue'


export default {
  layout: 'pages',
  components: {
    hero,
    WpContent,
    PrispevekPreview
  },
  async asyncData(){
        let prispevky = []
        const result = await db.collection('prispevky').get();
        result.forEach(doc => {
          //console.log(doc.id, '=>', doc.data());
          prispevky.push(doc.data());
        });

        let uvodArray = []
        const prispevek = db.collection('stranky').doc(`uvod`);
        const doc = await prispevek.get();
        if (!doc.exists) {
          console.log('No such document!');
        } else {
          uvodArray.push(doc.data());
          console.log(uvodArray);
        }
    
        return{
          prispevky: prispevky,
          uvodArray: uvodArray,
        }
    },


  /*mounted () {
    Axios
      .get('https://noschmaturita-default-rtdb.europe-west1.firebasedatabase.app/prispevek.json')
      .then(response => (console.log(response.data)))
  },*/
  methods:{

  }
}
</script>

<style>
/*Navigation{
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}*/
.aktualitatext h1,h2,h3,h4,p{
    display: inline;
    margin-block-start: 1em;
    margin-block-end: 1em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    font-size: 16px;
    font-weight: normal;
}
.container{
  padding-top:0;
  padding: 12px;
  margin-right: auto;
  margin-left: auto;
}

.item{
  max-width: 50%;
  float:left;
}

.item p{
  padding-top: 10px;
}

.row{
  display:flex;
  flex-wrap: wrap;
  flex-direction: row;
}
</style>
