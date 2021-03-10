<template>
  <v-simple-table>
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left">
            Jméno aktuality
          </th>
          <th class="text-left">
            URL
          </th>
          <th class="text-left">

          </th>
        </tr>
      </thead>
      <tbody>
          <tr v-for="prispevek in prispevky" :key="prispevek.title">
            <td style="text-align:center"><Nuxt-link :to="`/prispevky/${prispevek.url}`" target="_blank">{{ prispevek.title }}</Nuxt-link></td>
            <td style="text-align:center">/prispevky/{{ prispevek.url }}</td>
            <td style="text-align:center">
              <Nuxt-link :to="`/`">
              <v-btn
              color="#64B5F6"
              elevation="2"
              >Upravit</v-btn>
              </Nuxt-link>
              <v-btn
              color="#64B5F6"
              elevation="2"
              @click="del(prispevek.url)"
              >Smazat</v-btn>
          </td>
          </tr>
      </tbody>
    </template>
  </v-simple-table>
</template>

<script>
import {db, firebase} from '~/plugins/firebase.js'
import 'firebase/auth'
import 'firebase/firestore'

export default {
  data: () => ({
    prispevky: [],
  }),

  async fetch(){
      let i = 0;
      this.prispevky = [];
      const result = await db.collection('prispevky').get();
      result.forEach(doc => {
        //console.log(doc.id, '=>', doc.data());
        this.prispevky.push(doc.data());
      });
  },

  methods:{
      async del(url){
        const sma = await db.collection('prispevky').doc(url);
        sma.delete();
        this.$nuxt.refresh()
      }
  }
}
</script>

<style>

</style>