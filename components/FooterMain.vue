<template>
  <v-footer
    padless
    dark
    class="border"
  >
  
    <v-card
      class="modra flex"
      flat
      tile
    >
    <v-container>
      <v-card-title class="teal">
        <strong class="subheading">Zůstaňte s námi ve spojení!</strong>

        <v-spacer></v-spacer>
        <div>
          <v-btn
            v-for="icon in icons"
            :key="icon.title"
            class="mx-4"
            dark
            icon
          >
            <a :href='`${icon.link}`'>
              <v-icon size="24px">
                {{ icon.icon }}
              </v-icon>
            </a>
          </v-btn>
        </div>
      </v-card-title>

      <v-row>
        <v-col>
          <ul>
            <li
              v-for="contact in contacts"
              :key="contact.value"
              class="contact"
            >
              <v-icon size="20px">
                {{contact.icon}}
              </v-icon>
              {{contact.value}}
            </li>
          </ul>
        </v-col>
        <v-col>
          <ul class="right">
            <li>
              <NuxtLink :to="`/`">
                Úvod
              </NuxtLink>
            </li>
            <li v-for="link in linky" :key="link.title">
              <NuxtLink :to="`/${link.url}`">
                {{link.title}}
              </NuxtLink>
            </li>
          </ul>
        </v-col>
      </v-row>

      <v-card-text class="py-2 white--text text-center">
        {{ new Date().getFullYear() }} — <strong>SOŠ Net Office Orlová spol. s.r.o</strong>
      </v-card-text>
      </v-container>
    </v-card>
  </v-footer>
</template>

<script>
import {db, firebase} from '~/plugins/firebase.js'
import 'firebase/auth'
import 'firebase/firestore'
export default {
  data: () => ({
      icons: {
        title:"",
        icon:"",
        link:"",
      },

      contacts:{
        value:"",
        icon:""
      },

      linky:{
        title:'',
        text:"",
        url:"",
        checkbox:false,
      },
    }),

  async created () {
    this.initialize()
  },

  methods:{
    async initialize () {
      this.contacts = [];
      const result = await db.collection('udaje').where("value", "!=", "").get();
      result.forEach(doc => {
        //console.log(doc.id, '=>', doc.data());
        this.contacts.push(doc.data());
      });

      this.icons = [];
      const result2 = await db.collection('socsite').where("link", "!=", "").get();
      result2.forEach(doc => {
        //console.log(doc.id, '=>', doc.data());
        this.icons.push(doc.data());
      });

      this.linky = [];
      const result3 = await db.collection("stranky").where('checkbox', '==', true).get();
      result3.forEach(doc => {
        //console.log(doc.id, '=>', doc.data());
        this.linky.push(doc.data());
      });
    }
  }
}
</script>

<style lang="scss" scoped>
.border{
  border-top:2px solid #fff !important;
  border-radius: 5px 5px 0 0;
}
.modra{
  background-color: #001942 !important;
}
ul{
  list-style-type:none;
  padding:10px;
  & li{
  font-size:17px;
    & a{
      &:link{
        color:white;
        text-decoration:none;
      }
      &:visited{
        color:white;
        text-decoration:none;
      }
    }
  }
}
.contact{
  margin-bottom:3px;
}
a:link{
  color:white;
  text-decoration:none;
}
.center{
  text-align:center;
}
.right{
  text-align:right;
}
@media screen and (max-width:768px){
  .col{
    min-width:100%;
    text-align:left;
  }
  .center{
    text-align:left;
  }
  .right{
    text-align:left;
  }
}
</style>