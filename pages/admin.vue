<template>
<div class="login" style="margin:0 auto; width:100%;">
  <h3>Přihlášení do admin sekce</h3>
  <v-form @submit.prevent="pressed">
    <v-container fill-height>
      <v-row>
        <v-col
          cols="12"
          md="4"
        >
          <v-text-field
            v-model="email"
            :rules="[emailRules]"
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
          <v-btn
          depressed
          elevation="5"
          large
          block
          type="submit"
        >Přihlásit</v-btn>
        </v-col>
      </v-row>
    </v-container>
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
        redirect('/dashboard')
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
        this.$router.push('/dashboard')
      })
      .catch(error => this.error = error);
    }
  }
}
</script>

<style>

</style>
