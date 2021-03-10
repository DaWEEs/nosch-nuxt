<template>
  <div>
    <h1>{{prispevek[0].title}}</h1>
    <p>{{prispevek[0].text}}</p>
  </div>
</template>

<script>
import {db, firebase} from '~/plugins/firebase.js'
import 'firebase/auth'
import 'firebase/firestore'
export default {
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