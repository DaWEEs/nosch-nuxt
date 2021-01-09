<template>  
  <v-card height="100vh">
    <v-navigation-drawer
      absolute
      permanent
      left
    >
      <template v-slot:prepend>
        <v-list-item two-line>
          <v-list-item-content>
            <v-list-item-title>{{emailUziv}}</v-list-item-title>
            <v-list-item-subtitle>Jste přihlášeni</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </template>

      <v-divider></v-divider>

      <v-list dense>
        <v-list-item
          v-for="item in items"
          :key="item.title"
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-btn bottom block v-on:click="logout()">
          Odhlásit se
        </v-btn>
      </v-list>
    </v-navigation-drawer>
  </v-card>
</template>

<script>
import firebase from 'firebase/app';
import 'firebase/auth'
import { getUserFromCookie, getUserFromSession } from '@/helpers/cookie.js'
import Vuetify from 'vuetify/lib'

export default {
  data(){
    return{
      items: [
          { title: 'Dashboard', icon: 'mdi-home-city' },
          { title: 'Můj účet', icon: 'mdi-account' },
          { title: 'Uživatelé', icon: 'mdi-account-group-outline' },
        ],
    }
  },





  asyncData({ req, redirect }) {
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
      let emailUziv;
      if(uziv != null){
        emailUziv = uziv.email;
      }
      return{
          emailUziv
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
    }
  }
}
</script>

<style>

</style>