<template>
<div class="login" style="height:100vh">
  
  <v-form @submit.prevent="pressed" style="height:100vh"  >
    <v-card
  elevation="3"
  outlined
  max-width="500"
  style="margin:0 auto;position:relative;top:50px; left:0;"
    >
      <v-card-title style="justify-content:center">
        <span>Přihlášení do admin sekce</span>
      </v-card-title>
      <v-card-text>
          <v-text-field
            v-model="email"
            :emailRules="[emailRules]"
            label="E-mail"
            required
          ></v-text-field>

          <v-text-field
            v-model="password"
            :rules="[rules.required, rules.min]"
            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
            :type="show1 ? 'text' : 'password'"
            :counter="10"
            label="Heslo"
            name="input-10-1"
            @click:append="show1 = !show1"
          ></v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-btn
          depressed
          elevation="5"
          large
          block
          type="submit"
        >Přihlásit</v-btn>
      </v-card-actions>
    </v-card>
  </v-form>
  <div class="error" v-if="error">{{error.message}}</div>
</div>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/auth'
import { getUserFromCookie, getUserFromSession } from '@/helpers/cookie.js'

export default {
  data(){
    return{
      email: '',
      password: '',
      error: '',
      show1: false,
      rules: {
          required: value => !!value || 'Vyžadováno.',
          min: v => v.length >= 8 || 'Minimálně 8 písmen.',
          emailMatch: () => (`Zadaný e-mail a heslo se neshodují`),
        },
      emailRules: [
        v => !!v || 'E-mail je vyžadován',
        v => /.+@.+/.test(v) || 'E-mail musí být ve správném formátu.',
      ],
    }
  },
  asyncData({ req, redirect }){
    const user = getUserFromCookie(req)
      if(user){
        redirect('/admin/dashboard')
      }
  },
  methods:
  {
    pressed(){
      firebase
      .auth()
      .signInWithEmailAndPassword(this.email, this.password)
      .then(data => {
        console.log(data);
        this.$router.push('/admin/dashboard')
      })
      .catch(error => this.error = error);
    }
  }
}
</script>

<style>

</style>
