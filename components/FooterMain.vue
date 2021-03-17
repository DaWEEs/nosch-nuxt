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
            :key="icon.name"
            class="mx-4"
            dark
            icon
          >
            <a :href='icon.url'>
              <v-icon size="24px">
                {{ icon.name }}
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
          <ul class="center">
            <li>
              <strong>Střední odborná škola NET OFFICE Orlová, spol. s r.o.</strong>
            </li>
            <li>
              Energetiků 144, 735 14 Orlová – Lutyně
            </li>
            <li>
              Datová schránka: n3q8ki6
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
            <li>
              <NuxtLink :to="`/`">
                Uchazeč
              </NuxtLink>
            </li>
            <li>
              <NuxtLink :to="`/`">
                Veřejnost
              </NuxtLink>
            </li>
            <li>
              <NuxtLink :to="`/`">
                Student
              </NuxtLink>
            </li>
            <li>
              <NuxtLink :to="`/`">
                O nás
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
      icons: [
        {name:'mdi-facebook',url:"https://www.facebook.com/sosnetoffice/"},
        {name:'mdi-instagram',url:"https://www.instagram.com/sosnetoffice/"},
        {name:'mdi-linkedin',url:"https://www.linkedin.com/company/so%C5%A1-net-office/"},
      ],

      contacts:{
        value:"",
        icon:""
      }
    }),

  async created () {
    this.initialize()
  },

  methods:{
    async initialize () {
      this.contacts = [];
      const result = await db.collection('udaje').get();
      result.forEach(doc => {
        //console.log(doc.id, '=>', doc.data());
        this.contacts.push(doc.data());
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