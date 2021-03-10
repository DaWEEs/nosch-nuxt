<template>
  <v-simple-table>
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left">
            <v-btn
            fab
            small
            style="margin-right: 10px;"
            @click="refresh"
            >
            <v-icon>
              mdi-refresh
            </v-icon>
          </v-btn>
            Jméno aktuality
          </th>
          <th class="text-left">

          </th>
        </tr>
      </thead>
      <tbody>
          <tr v-for="prispevek in prispevky" :key="prispevek.title">
            <td>{{ prispevek.title }}</td>
            <td>{{ prispevek.title }}</td>
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

  async beforeMount(){
      let i = 0;
      const result = await db.collection('prispevky').get();
      result.forEach(doc => {
        console.log(doc.id, '=>', doc.data());
        this.prispevky[i] = doc.data();
        //prispevky.push(doc.data());
        i++;
      });
      console.log(this.prispevky);
  },

  methods:{
    refresh() {
        this.$nuxt.refresh()
      }
  }
}
</script>

<style>

</style>