<template>
<v-form
    ref="form"
    v-model="valid"
    lazy-validation
  >
    <v-text-field
      v-model="zprava.name"
      :rules="nameRules"
      label="Jméno"
      required
    ></v-text-field>

    <v-text-field
      v-model="zprava.email"
      :rules="emailRules"
      label="E-mail"
      required
    ></v-text-field>

    <v-textarea
        name="input-7-1"
        label="Zpráva"
        v-model="zprava.text"
        hint="Zde můžete psát svou zprávu"
        no-resize
        rows="4"
    ></v-textarea>
    <v-row>
    <v-col>
    <v-checkbox
      v-model="checkbox"
      :rules="[v => !!v || 'Musíte souhlasit s Zásadou ochrany osobních údajů!']"
      label="Souhlasíte se zpracováním osobních údajů?"
      required
    ></v-checkbox> 
    </v-col>
    <v-col>
    <div v-for="linky in link" :key="linky.value" style="width:100%; height:100%; justify-content: center;
    align-content: center;
    text-align: center;"> <a :href="`${linky.value}`">Naše zásada ochrany osobních údajů</a></div>
    </v-col>
    </v-row>
    

    <v-btn
      :disabled="!valid"
      color="success"
      class="mr-4"
      block
      @click="validate"
      style="color:#000"
    >
      Odeslat
    </v-btn>

    <div class="text-center">

    <v-snackbar
      v-model="snackbar"
      :timeout="timeout"
    >
      {{ snackText }}

      <template v-slot:action="{ attrs }">
        <v-btn
          color="blue"
          text
          v-bind="attrs"
          @click="snackbar = false"
        >
          Zavřít
        </v-btn>
      </template>
    </v-snackbar>
  </div>
  </v-form>
</template>

<script>
import {db, firebase} from '~/plugins/firebase.js'
import 'firebase/auth'
import 'firebase/firestore'
  export default {
    data: () => ({
      valid: true,
      snackbar: false,
      snackText:"",
      timeout:2000,
      nameRules: [
        v => !!v || 'Jméno je vyžadováno!',
      ],
      emailRules: [
        v => !!v || 'E-mail je vyžadován!',
        v => /.+@.+\..+/.test(v) || 'E-mail musí být napsán správně!',
      ],
      checkbox: false,
      zprava:{
        name: '',
        text: "",
        email: '',
        url: "",
        date: "",
        id: "",
      },
      link:[{
        id:"",
        value:""
      }]
    }),

  async mounted () {
    this.initialize()
  },

  methods: {
      validate () {
        if(this.$refs.form.validate()){
          this.zprava.url = $nuxt.$route.path;
          this.zprava.date = new Date().toJSON()
          this.zprava.id = this.zprava.date + this.zprava.email
          db.collection("formular")
          .doc(this.zprava.id)
          .set(this.zprava)
          .then(()=>{
            this.snackText = "Formulář byl úspěšně odeslán! Odpovíme Vám, co nejdříve budeme moct. :)"
            this.snackbar = true;
            this.zprava.name=""
            this.zprava.email=""
            this.zprava.text=""
          });
        } else {
            this.snackText = "Ověřte hodnoty zadané do formuláře a poté to zkuste znovu!"
            this.snackbar = true;
        }
      },
      async initialize () {
      this.link = [];
      const result = await db.collection('linky').where("id", "==", "GDPR").get();
      result.forEach(doc => {
        //console.log(doc.id, '=>', doc.data());
        this.link.push(doc.data());
      });
    },
  },
}
</script>

<style>

</style>