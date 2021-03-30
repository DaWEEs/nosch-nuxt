<template>  
  <v-card
  min-height="100vh"
  max-width="100vw"
  tile
  flat
  style="border-radius:0;"
  >
  <nuxt keep-alive />
    <v-toolbar
        color="#001942"
    >
      <v-toolbar-title><h3 style="color:#fff;">ADMIN PANEL - SPRÁVA STRÁNEK</h3></v-toolbar-title>
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
      <Nuxt-link to="/admin/dashboard">
        <v-tab>
          <v-icon left>
            mdi-account
          </v-icon>
          Zprávy z formuláře
        </v-tab>
      </Nuxt-link>
      <Nuxt-link to="/admin/aktuality">
      <v-tab>
        <v-icon left>
          mdi-pen
        </v-icon>
        Správa aktualit
      </v-tab>
      </Nuxt-link>
      <Nuxt-link to="/admin/stranky">
      <v-tab>
        <v-icon left>
          mdi-pencil
        </v-icon>
        Správa stránek
      </v-tab>
      </Nuxt-link>
      <Nuxt-link to="/admin/kontakty">
      <v-tab>
        <v-icon left>
          mdi-contacts
        </v-icon>
        Správa kontaktů
      </v-tab>
      </Nuxt-link>
      <Nuxt-link to="/admin/socsite">
      <v-tab>
        <v-icon left>
          mdi-facebook
        </v-icon>
        Správa soc. sítí
      </v-tab>
      </Nuxt-link>
      <Nuxt-link to="/admin/zmenahesla">
      <v-tab>
        <v-icon left>
          mdi-form-textbox-password
        </v-icon>
        Změna hesla
      </v-tab>
      </Nuxt-link>
      <Nuxt-link to="/admin/dokumenty">
      <v-tab>
        <v-icon left>
          mdi-file-document-outline
        </v-icon>
        Dokumenty
      </v-tab>
      </Nuxt-link>
      <v-divider></v-divider>
      <a href="https://console.firebase.google.com/u/1/project/noschmaturita/" target="_blank">
        <v-tab>
          <v-icon left>
            mdi-firebase
          </v-icon>
          Firebase
        </v-tab>
      </a>

      <!--Správa stránek-->
      <v-tab-item :eager="false">
        <v-card flat>
          <v-card-text>
            <spravastranek />
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
  },
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

 

.v-dialog__container--active {
    display: block; 
}
</style>