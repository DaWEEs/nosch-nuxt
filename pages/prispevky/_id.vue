<template>
  <div>
    <h1>{{prispevek[0].title}}</h1>
    <wp-content :html="prispevek[0].text" />
  </div>
</template>

<script>
import {db, firebase} from '~/plugins/firebase.js'
import 'firebase/auth'
import 'firebase/firestore'
import WpContent from '~/components/WpContent.vue'
export default {
  components: { WpContent },
  async asyncData(context){
      let pris = [];
      const prispevek = db.collection('prispevky').doc(context.params.id);
      const doc = await prispevek.get();
      if (!doc.exists) {
        console.log('No such document!');
      } else {
        pris.push(doc.data());
        return {prispevek : pris};
      }
  }
}
</script>

<style>

</style>