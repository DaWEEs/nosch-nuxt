<template>
  <v-simple-table>
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left">
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

  async fetch(){
      let i = 0;
      this.prispevky = [];
      const result = await db.collection('prispevky').get();
      result.forEach(doc => {
        //console.log(doc.id, '=>', doc.data());
        this.prispevky.push(doc.data());
      });
  },
}
</script>

<style>

</style>