<template>
  <div>
    <hero />
    <v-container>
      <v-row>
        <v-col>
          <p style="text-align:center; padding: 30px 0;">{{uvodArray[0].hlavnitext}}</p>
        </v-col>
      </v-row>
    
    
    <h1 style="text-transform:uppercase;">Aktuality</h1>
    <ul class="prispevekpreview">
      <li v-for="prispevek in prispevky" :key="prispevek.title" class="aktuality">
        <Nuxt-link :to="`/prispevky/${prispevek.url}`">
          <v-card>
            <v-card-title>
              {{prispevek.title}}
            </v-card-title>
            <v-card-subtitle>
              {{prispevek.date}}
            </v-card-subtitle>
            <v-card-text>
              {{prispevek.shorttext}}
            </v-card-text>
          </v-card>
          <!--<div class="prispevekdiv">
            <h1 style="font-size:25px; text-align:center;">{{prispevek.title}}</h1>
            <div class="aktualitatext" style="text-align:center; margin-top:10px;">
              <prispevek-preview :html="prispevek.shorttext" />
            </div>
          </div>-->
        </Nuxt-link>
      </li>
      <li class="vice-aktualit">
        <nuxt-link :to="'/prispevky/'">
          <div class="btn">
            <p style="text-transform: uppercase; font-weight:bold;">
              Více aktualit >
            </p>
          </div>
        </nuxt-link>
      </li>
    </ul>
    </v-container>
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
  layout: 'main',
  components: {
    hero,
    WpContent,
    PrispevekPreview
  },
  async asyncData(){
        let prispevky = []
        let i = 0;
        const result = await db.collection('prispevky').orderBy('date', 'desc').limit(3).get();
        result.forEach(doc => {
          //console.log(doc.id, '=>', doc.data());
          prispevky.push(doc.data());
          var datumDate = new Date(prispevky[i].date)
          prispevky[i].date = datumDate.getDate()+". "+(datumDate.getMonth()+1)+". "+datumDate.getFullYear();
          i++;
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
body{
  background-color:#001942;
  color:#fff;
  font-size:18px;
}

.vice-aktualit{
  width:10%;
}

.prispevekpreview{
  display:flex;
  flex-wrap: nowrap;
  justify-content: center;
  list-style-type: none;
  margin-top:20px;
}

.prispevekpreview li{
  width:100%;
  margin: 0px;
  padding-right:15px;
}

.prispevekpreview li a{
  text-decoration: none;
  color:#fff;
}

.prispevekpreview li a:link{
  text-decoration: none;
  color:#fff;
}

.prispevekpreview li a:visited{
  text-decoration: none;
  color:#fff;
}

.btn{
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
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
