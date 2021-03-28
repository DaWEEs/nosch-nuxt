<template>
  <div id="linknav">
    <ul>
      <li>
        <NuxtLink to="/">
          Úvod
        </NuxtLink>
      </li>
      <li v-for="link in linky" :key="link.title">
        <NuxtLink :to="`/${link.url}`">
          {{link.title}}
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>

<script>
import {db, firebase} from '~/plugins/firebase.js'
import 'firebase/auth'
import 'firebase/firestore'
export default{
data: () => ({
    linky:{
        title:'',
        text:"",
        url:"",
        checkbox:false,
    },
  }),

  async fetch () {
    this.initialize()
  },

  methods: {
    async initialize () {
      this.linky = [];
      const result = await db.collection("stranky").where('checkbox', '==', true).get();
      result.forEach(doc => {
        //console.log(doc.id, '=>', doc.data());
        this.linky.push(doc.data());
      });
    },
  }
}
</script>

<style lang="scss">

#linknav {
  width: 100%;
  margin: 0 auto;
  font-size: 18px;
  position: absolute;
  bottom: 0px;
  left:0px;
  /*background-color: #ffffff;*/
  z-index:9999;
  width:100%;
}

@media screen and (max-width: 1183px){
    #linkav ul li{
        flex-direction: column;
        width:100%;
    }
}

#linknav ul{
  display:flex;
  padding-bottom:30px;
  padding-top:20px;
  justify-content: center;
  align-items: center;
  width:100%;
  background-color:#001942;
  border-top: #fff solid 2px;
  border-radius:5px 5px 0px 0px;
  list-style-type: none;
}

#linknav ul li a{
  color:#fff;
  text-decoration: none;
  text-transform: uppercase;
  align-items:center;
  margin: 0 10px;
}

#linknav ul li a.nuxt-link-exact-active {
  color: #66b3ff;
  padding-bottom:8px;
  border-bottom: 2px solid #66b3ff;
}

@media screen and (max-width:768px){
  #linknav ul{
    display:block;
    flex-direction: column;
    text-align:center;
    list-style-type: none;
     & li{
       display:block;
       width:100%;
       height:auto;
       margin: 5px 0;
        & a.nuxt-link-exact-active {
          color: #66b3ff;
          padding-bottom:1px;
          border-bottom: 2px solid #66b3ff;
        }
       &::first-child{
        margin-left:0;
      }
     }
  }
}
</style>
