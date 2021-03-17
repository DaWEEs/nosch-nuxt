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
      <v-toolbar-title>ADMIN PANEL</v-toolbar-title>
      <v-spacer></v-spacer>
      <!--<v-btn
            fab
            small
            style="margin-right: 10px;"
            @click="refresh()"
            >
            <v-icon>
              mdi-refresh
            </v-icon>
      </v-btn>-->
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
        Správa aktualit
      </v-tab>
      <v-tab>
        <v-icon left>
          mdi-pencil
        </v-icon>
        Správa stránek
      </v-tab>
      <v-tab>
        <v-icon left>
          mdi-form-textbox-password
        </v-icon>
        Změna hesla
      </v-tab>
      <v-divider></v-divider>
      <a href="https://console.firebase.google.com/u/1/project/noschmaturita/" target="_blank">
        <v-tab>
          <v-icon left>
            mdi-firebase
          </v-icon>
          Firebase
        </v-tab>
      </a>




      <!--Dashboard-->
      <v-tab-item>
        <v-card flat>
          <v-card-text>
            
          </v-card-text>
        </v-card>
      </v-tab-item>

      <!--Správa aktualit-->
      <v-tab-item>
        <v-card flat>
          <v-card-text>
            <spravaaktualit />
          </v-card-text>
        </v-card>
      </v-tab-item>


      <!--Správa stránek-->
      <v-tab-item>
        <v-card flat>
          <v-card-text>
            <spravastranek />
          </v-card-text>
        </v-card>
      </v-tab-item>

      <!--Správa uživatele-->
      <v-tab-item>
        <v-card flat>
          <v-card-text>
            <spravauzivatele />
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

export default {
    data: () => ({
    //Polozky menu
    items: [
          { title: 'Dashboard', icon: 'mdi-home-city' },
          { title: 'Přidat aktualitu', icon: 'mdi-pencil' },
          { title: 'Uživatelé', icon: 'mdi-form-textbox-password' },
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

    refresh() {
        this.$nuxt.refresh()
    }
  }
}
</script>

<style lang="scss" scoped>
a{
  text-decoration:none;
  color: rgba(0, 0, 0, 0.54);
  &:visited{
    color:rgba(0, 0, 0, 0.54);
  }
}
</style>