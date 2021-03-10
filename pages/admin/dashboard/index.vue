<template>  
  <v-card
  min-height="100vh"
  max-width="100vw"
  tile
  flat
  >
  <nuxt keep-alive />
    <v-toolbar
        color="#64B5F6"
    >
      <v-toolbar-title>CMS ADMIN PANEL</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn right v-on:click="logout()">
          Odhlásit se
      </v-btn>
    </v-toolbar>
    <v-tabs vertical>
      <v-tab>
        <v-icon left>
          mdi-account
        </v-icon>
        Dashboard
      </v-tab>
      <v-tab>
        <v-icon left>
          mdi-pen
        </v-icon>
        Nová aktualita
      </v-tab>
      <v-tab>
        <v-icon left>
          mdi-pen
        </v-icon>
        Správa aktualit
      </v-tab>
      <v-tab>
        <v-icon left>
          mdi-account-group-outline
        </v-icon>
        Nastavení účtu
      </v-tab>




      <!--Dashboard-->
      <v-tab-item>
        <v-card flat>
          <v-card-text>
            
          </v-card-text>
        </v-card>
      </v-tab-item>

      <!--Nová aktualita-->
      <v-tab-item>
        <v-card flat>
          <v-card-text>
            <novaaktualita />
          </v-card-text>
        </v-card>
      </v-tab-item>


      <!--Uživatelé-->
      <v-tab-item>
        <v-card flat>
          <v-card-text>
            <spravaaktualit />
          </v-card-text>
        </v-card>
      </v-tab-item>


      <!--Uživatelé-->
      <v-tab-item>
        <v-card flat>
          <v-card-text>
          </v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs>
  </v-card>
</template>

<script>

import firebase from 'firebase/app';
import 'firebase/auth'
import { getUserFromCookie, getUserFromSession } from '@/helpers/cookie.js'
import Vuetify from 'vuetify/lib'
import novaaktualita from '@/components/novaaktualita'

export default {
    data: () => ({
    //Polozky menu
    items: [
          { title: 'Dashboard', icon: 'mdi-home-city' },
          { title: 'Přidat aktualitu', icon: 'mdi-pencil' },
          { title: 'Uživatelé', icon: 'mdi-account-group-outline' },
        ],
    //Data aktualit
  }),

  async asyncData({ req, redirect }) {
    if (process.server) {
      console.log('server', req.headers)
      const user = getUserFromCookie(req)
      //   console.log('b', getUserFromCookie(req))
      if (!user) {
        console.log('redirecting server')
        redirect('/admin')
      }
    } else {
      var user = firebase.auth().currentUser
      if (!user) {
        redirect('/admin')
      }
    }
    //   console.log($nuxt.$router)
    
      const uziv = firebase.auth().currentUser;
      let email;
      if(uziv != null){
        email = uziv.email;
      }
      return{
        email
      }
  },
  beforeCreate(){
      
  },
  methods:{
    logout() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.replace({ name: 'index' })
        })
    },
  }
}
</script>