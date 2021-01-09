<template>
  <div>
    <hero />
  <div class="container">

    <v-container>
      <v-row>
        <v-col>
          <h1>O SOŠ Net Office</h1>
          <p>{{uvod[0].hlavnitext}}</p>
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
      <li v-for="prispevek in prispevky.slice(0,3)" :key="prispevek.titul">
        <h1>{{prispevek.titul}}</h1>
        <p>{{prispevek.popis}}</p>
      </li>
    </ul>
    </div>
  </div>
</template>

<script>
import hero from '~/components/hero.vue'
import Axios from 'axios'
import {db, firebase} from '~/plugins/firebase.js'
import 'firebase/auth'
import 'firebase/firestore'


export default {
  layout: 'pages',
  components: {
    hero,
  },
  async asyncData(){
        let prispevky = []
        const result = await db.collection('prispevky').get();
        result.forEach(doc => {
          //console.log(doc.id, '=>', doc.data());
          prispevky.push(doc.data());
        });

        let uvodArray = []
        const result2 = await db.collection('stranky').where('hlavnitext', '!=', false).get();
        result2.forEach(doc => {
          //console.log(doc.id, '=>', doc.data());
         uvodArray.push(doc.data());
        });
    
        return{
          prispevky: prispevky,
          uvod: uvodArray,
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
