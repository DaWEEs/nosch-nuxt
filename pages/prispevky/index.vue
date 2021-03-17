<template>
<div>
  <h1 style="text-transform:upprecase; text-align:center;">Aktuality</h1>
  <ul class="prispevekpreview">
    <li v-for="prispevek in prispevky" :key="prispevek.title" style="padding:15px;">
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
  </ul>
</div>
</template>

<script>
import {db, firebase} from '~/plugins/firebase.js'
import 'firebase/auth'
import 'firebase/firestore'

export default {
  layout: 'pages',
  components: {
  },
  async asyncData(){
    let prispevky = []
    var i = 0;
    const result = await db.collection('prispevky').orderBy('date', 'desc').get();
    result.forEach(doc => {
      //console.log(doc.id, '=>', doc.data());
      prispevky.push(doc.data());
      var datumDate = new Date(prispevky[i].date)
      prispevky[i].date = datumDate.getDate()+". "+(datumDate.getMonth()+1)+". "+datumDate.getFullYear();
      i++;
    });

    return{
      prispevky: prispevky,
    }
  },
}
</script>

<style lang="scss" scoped>
.prispevekpreview{
  display:flex;
  flex-wrap: wrap;
  justify-content: center;
  list-style-type: none;
  flex-direction: row;
  margin-top:20px;
  height:100%;
    & li{
      width:33.33%;
      height:100%;
    }
}
</style>