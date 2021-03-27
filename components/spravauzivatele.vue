<template>
  <div>
    <v-card max-width="800px" style="margin:0 auto;">
      <v-card-title>
        <h3 style="width:100%;text-align:center;">ZMĚNA HESLA</h3>
      </v-card-title>
      <v-form @submit.prevent="changePass" ref="form">
        <v-container fluid>
          <v-row>
            <v-col
              cols="12"
              sm="6"
              style="margin: 0 auto;"
            >
            <v-text-field
              v-model="email"
              :emailRules="[emailRules]"
              label="E-mail"
              required
            ></v-text-field>

              <v-text-field
                v-model="password"
                :append-icon="show3 ? 'mdi-eye' : 'mdi-eye-off'"
                :rules="[rules.required, rules.min]"
                :type="show3 ? 'text' : 'password'"
                name="input-10-1"
                label="Původní heslo"
                @click:append="show3 = !show3"
              ></v-text-field>

              <v-text-field
                v-model="newpassword1"
                :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                :rules="[rules.required, rules.min]"
                :type="show1 ? 'text' : 'password'"
                name="input-10-1"
                label="Nové heslo"
                hint="Nejméně 8 písmen"
                @click:append="show1 = !show1"
              ></v-text-field>

              <v-text-field
                v-model="newpassword2"
                :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                :rules="[rules.required, rules.min]"
                :type="show2 ? 'text' : 'password'"
                name="input-10-1"
                label="Nové heslo znovu"
                hint="Nejméně 8 písmen"
                @click:append="show2 = !show2"
              ></v-text-field>

              <v-btn 
                block 
                style="margin-top:10px;"
                v-on:click="changePass()"
              >
                Změnit heslo
              </v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-form>
    </v-card>
    <v-snackbar
    v-model="snackbar"
    :timeout="timeout"
    >
      {{error}}

      <template v-slot:action="{ attrs }">
        <v-btn
          color="#001942"
          style="color:#fff;"
          text
          v-bind="attrs"
          @click="snackbar = false"
        >
          Zavřít
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
export default {
    data () {
      return {
        snackbar:false,
        timeout:2000,
        show1: false,
        show2: false,
        show3: false,
        email: "",
        password: '',
        newpassword1: '',
        newpassword2: '',
        error: ``,
        rules: {
          required: value => !!value || 'Vyžadováno',
          min: v => v.length >= 8 || 'Nejméně 8 písmen',
          emailMatch: () => (`The email and password you entered don't match`),
        },
        emailRules: [
        v => !!v || 'E-mail je vyžadován',
        v => /.+@.+/.test(v) || 'E-mail musí být ve správném formátu.',
      ],
      }
    },  

  methods:{
    changePass(){
      firebase.auth().signInWithEmailAndPassword(this.email, this.password)
      .then((userCredential) => {
        if(this.newpassword1 == this.newpassword2){
          var user = firebase.auth().currentUser;
          user.updatePassword(this.newpassword1).then(function(error) {
            this.error = "Heslo bylo úspěšně změněno."
            alert(this.error)
            this.snackbar=true;
          }).catch(function(error) {
            this.snackbar=true;
            this.error = "Někde se objevil problém, zkuste akci opakovat později.";
          });
        } else {
          this.snackbar=true;
          this.error = "Nová hesla se neshodují.";
        }
      })
      .catch((error) => {
        this.snackbar=true;
        this.error = "Původní údaje jsou neplatné.";
      });
    }
  }
}
</script>

<style>

</style>