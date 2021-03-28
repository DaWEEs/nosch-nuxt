<template>
  <div>
    <hero />
    <v-container>

      <v-row>
        <v-col>
          <p class="maintext"><wp-content :html="uvodArray[0].text" /></p>
        </v-col>
      </v-row>
  
    <h1 style="text-transform:uppercase;">Aktuality</h1>
    <v-lazy
        v-model="isActive"
        :options="{
          threshold: .5
        }"
        min-height="200"
        transition="fade-transition"
    >
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
        </Nuxt-link>
      </li>
      <li class="vice-aktualit">
        <nuxt-link :to="'/prispevky/'">
          <div class="btn">
            <p style="text-transform: uppercase; font-weight:bold;">
              Více aktualit <v-icon color="#fff">mdi-arrow-right</v-icon>
            </p>
          </div>
        </nuxt-link>
      </li>
    </ul>
    </v-lazy>

    </v-container>
  </div>
</template>

<script>
import hero from '~/components/hero.vue'
import Axios from 'axios'
import {db, firebase} from '~/plugins/firebase.js'
import 'firebase/auth'
import 'firebase/firestore'
import WpContent from '~/components/WpContent.vue'


export default {
  layout: 'main',
  components: {
    hero,
    WpContent,
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
        const prispevek = db.collection('stranky').doc(`index`);
        const doc = await prispevek.get();
        if (!doc.exists) {
          console.log('No such document!');
        } else {
          uvodArray.push(doc.data());
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

<style lang="scss">
/*Navigation{
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}*/
body{
  background-color:#F2F2F8;
  color:#000;
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

  & li{
    width:100%;
    margin: 0px;
    padding-right:15px;

    & a{
    text-decoration: none;
    color:#fff;

      &:link{
        text-decoration: none;
        color:#fff;
      }

      &:visited{
        text-decoration: none;
        color:#fff;
      }
    }
  }
}

@media screen and (max-width:768px){
  .prispevekpreview{
    flex-wrap:wrap;
      & li{
        padding-right:0;
        padding-top: 15px;
      }
  }
  .btn{
    min-height: 80px;
    background-color: #66b3ff;
    border-radius: 5px;
  }
  .maintext{
    padding: 80px 15px !important;
  }
}

.btn{
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background-color: #66b3ff;
  border-radius: 5px;
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

    & p{
      padding-top: 10px;
    }
}

.row{
  display:flex;
  flex-wrap: wrap;
  flex-direction: row;
}

.maintext{
  text-align:center;
  padding: 120px;
}
</style>

<style lang="scss" scoped>
  .prispevekpreview{
    padding-bottom: 80px;
    & li {
      & div.v-card{
        height:100% !important;
      }
    }
  }
</style>
