<template>
  <div>
    <navigation />
    <div>
      <hero />
    </div>
  <div class="container">
    <h1>Aktuality</h1>
    <ul>
      <!--
      <li v-for="prispevek in prispevky" :key="prispevek.titul">
        
      </li>
      -->
      <li v-for="prispevek in prispevky.slice(0,3)" :key="prispevek.titul">
        {{prispevek}}
      </li>
    </ul>
    <br>
    <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur facilis officia sit minus fuga placeat architecto in velit ipsum provident incidunt, nulla deleniti omnis nam magnam, tenetur cum eveniet eligendi.
      Quas vitae, libero suscipit ullam ea veniam rerum eum aperiam tempora asperiores minus possimus quis blanditiis. Iusto ipsum eius non voluptatem iure sit praesentium, pariatur aperiam quod cum aliquid dignissimos.
      Optio, veritatis. Consequatur provident, rem ad voluptates qui quis est dignissimos nulla quibusdam deleniti magni in, veniam laboriosam aliquid maiores soluta dolorem esse quod totam ratione, cumque iusto at non.
      Ut vero, quod delectus nostrum facere quam alias quisquam dolorum rem sit tenetur earum unde, minima, illo cum veniam expedita. Repudiandae dolorum ullam dignissimos tempore esse minima sint hic fugit.
      Ad expedita reiciendis dolore iste nobis nemo adipisci alias non, facilis eum officia et dolorum distinctio possimus excepturi fugit nostrum suscipit itaque neque, in obcaecati? Necessitatibus molestiae ex sed ea.
      Iste autem, quia ullam inventore, adipisci blanditiis at sunt, tenetur suscipit illum reprehenderit tempora quibusdam iusto repellat quaerat quae reiciendis laboriosam perspiciatis facere dolor placeat. Quis voluptates exercitationem distinctio facilis!
      Explicabo iusto magnam veniam. Distinctio nobis iusto error, inventore soluta optio ut autem earum laboriosam suscipit id quod assumenda, ullam dolore. Aliquid magni odit libero. Soluta laboriosam placeat atque sunt!
      Molestias quis unde velit repellat veritatis porro voluptate cupiditate sapiente officia voluptatem accusamus maiores iure perspiciatis, voluptas facilis voluptates eligendi? Nulla ipsum iste quo unde veritatis architecto itaque at harum.
      Hic optio vitae sapiente odio voluptates illum dolores neque aperiam magnam, aut sequi, officiis temporibus, esse tempore? Quos iste at, corporis, ducimus perspiciatis nobis quidem mollitia architecto repellendus cupiditate voluptatum?
      Cumque aperiam consequuntur quisquam quasi rerum commodi itaque deleniti ex quibusdam voluptas beatae nisi qui minus numquam quam veritatis rem tempore non ut quod, ab incidunt. Sequi exercitationem ullam excepturi.
    </p>
    </div>
  </div>
</template>

<script>
import Navigation from '~/components/navigation.vue'
import hero from '~/components/hero.vue'
import Axios from 'axios'
import {db, firebase} from '~/plugins/firebase.js'
import 'firebase/auth'
import 'firebase/firestore'

export default {
  components: {
    Navigation,
    hero
  },
  async asyncData(){
        const result = await db.collection('prispevky').get();
        let prispevky = []
        result.forEach(doc => {
          //console.log(doc.id, '=>', doc.data());
          prispevky.push(doc.data());
        });
      
        let uvodArr = []
        const doc = await db.collection("stranky").doc("uvod").get();
        if(!doc.exists){
          console.log("Tenhle dokument neexistuje")
        }else{
          uvodArr.push(doc.data());
        }
        console.log(prispevky)
        console.log(uvodArr)

        return {prispevky}
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
  max-width: 70%;
}
#linknav{
  margin-top:30px;
}
</style>
