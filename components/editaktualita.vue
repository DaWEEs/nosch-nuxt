<template>
<v-container>
  <v-text-field
    label="Název aktuality*"
    :rules="rules"
    hide-details="auto"
    v-model="propTitle"
  ></v-text-field>

  <v-text-field
    label="Krátký popis aktuality*"
    :rules="rules"
    hide-details="auto"
    v-model="propShortText"
  ></v-text-field>

  <div style="padding: 20px 0px;">
    <!-- Use the component in the right place of the template -->
    <tiptap-vuetify 
    v-model="propText" 
    :extensions="extensions" 
    placeholder="Zde můžete začít psát svůj text." 
    />
  </div>  

    <v-row>
      <v-col>
        <v-checkbox
            v-model="propForm"
            :label="`Přidat formulář`"
        ></v-checkbox>
      </v-col>
    </v-row>

  <div style="padding: 20px 0;">
    <v-btn block v-on:click="addaktualita()">
      Uložit změny
    </v-btn>
  </div>

  <v-expansion-panels>
    <v-expansion-panel>
      <v-expansion-panel-header>
        Ukázka
      </v-expansion-panel-header>
      <v-expansion-panel-content>
        <div class="tiptap-vuetify-editor__content" style="font-size:1.8rem;" v-html="propTitle" />
        <div class="tiptap-vuetify-editor__content" v-html="propText"/>
      </v-expansion-panel-content>
    </v-expansion-panel>
    <v-expansion-panel>
      <v-expansion-panel-header>
        HTML
      </v-expansion-panel-header>
      <v-expansion-panel-content>
        <div class="mt-3">&lt;h1&gt;{{ propTitle }}&lt;/h1&gt;</div>
        <div class="mt-3">{{ propText }}</div>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>

  <v-snackbar
    v-model="snackbar"
    :timeout="timeout"
  >
    Aktualita byla úspěšně odeslána

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
</v-container>
</template>

<script>
import Vuetify from 'vuetify/lib'
import firebase from 'firebase/app';
  //import editoru
  import {
    // component
    TiptapVuetify,
    // extensions
    Heading,
    Bold,
    Italic,
    Strike,
    Underline,
    Code,
    Paragraph,
    BulletList,
    OrderedList,
    ListItem,
    Link,
    Blockquote,
    HardBreak,
    HorizontalRule,
    History,
    Image
  } from 'tiptap-vuetify'

export default {
components: { TiptapVuetify },
props:[
  "propTitle",
  "propText",
  "propUrl",
  "propShortText",
  "propForm"
],
data: () => ({
    extensions: [
      History,
      Blockquote,
      Link,
      Underline,
      Strike,
      Italic,
      ListItem, // if you need to use a list (BulletList, OrderedList)
      BulletList,
      OrderedList,
      [
        Heading,
        {
          // Options that fall into the tiptap's extension
          options: {
            levels: [1, 2, 3]
          }
        }
      ],
      Bold,
      Link,
      Code,
      HorizontalRule,
      Paragraph,
      HardBreak, // line break on Shift + Ctrl + Enter
      Image
    ],

        
    headers: [
      { text: 'Název souboru', align: 'start', value: 'name', },
      { text: 'Akce', value: 'actions', sortable: false },
    ],

    rules: [
        value => !!value || 'Vyžadováno.',
        value => (value && value.length >= 3) || 'Minimálně 3 písmena',
      ],

    aktualita:{
        title:'',
        shorttext:'',
        text:"",
        url:"",
        date:"",
        formular:false
    },

    files:[],
    editedIndex: -1,
    dialog1: false,
    dialogDelete1: false,
    dialogEdit1: false,
    content: "",
    vysledek:"",
    soubory:[],
    editedItem: [],
    defaultItem: [],
    snackbar:false,
    timeout:2000,
    search:"",


    snackbar:false,
    timeout:2000,
  }),

  methods:{
    addaktualita(){
      this.aktualita.url = this.propUrl;
      this.aktualita.date = new Date().toJSON();
      this.aktualita.title = this.propTitle;
      this.aktualita.shorttext = this.propShortText;
      this.aktualita.text = this.propText;
      this.aktualita.formular = this.propForm;
      for(let i = 0; i < this.files.length; i++){
        const ref = firebase.storage().ref("/"+`${this.aktualita.url}`).child(`${this.files[i].name}`)
        ref.put(this.files[i]).then((snapshot) => {

        });
      }
      firebase.firestore()
      .collection("prispevky")
      .doc(this.aktualita.url)
      .set(this.aktualita)
      .then(()=>{
        this.vysledek = "Aktualita byla úspěšně editována"
        this.snackbar = true;
      });
    },
    async deleteItemConfirm() {
      this.soubory.splice(this.editedIndex, 1)
      const storageRef = firebase.storage().ref();
      var desertRef = storageRef.child(`${this.editedItem._delegate.fullPath}`);
      // Delete the file
      desertRef.delete().then(() => {
        // File deleted successfully
        this.vysledek = "Soubor byl úspěšně smazán"
        this.snackbar = true;
      }).catch((error) => {
        // Uh-oh, an error occurred!
        this.vysledek = "Někde se objevil problém"
        this.snackbar = true;
      });
      this.closeDelete()
    },

    closeDelete () {
      this.dialogDelete1 = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    deleteItem (item) {
      this.editedIndex = this.soubory.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete1 = true
    },

    close () {
      this.dialog1 = false
      this.dialogEdit1 = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    async initialize(){
      this.soubory = [] 
      const storageRef = firebase.storage().ref();
      var listRef = storageRef.child(`/${this.propUrl}`);
      // Find all the prefixes and items.
      listRef.listAll()
      .then((res) => {
        res.items.forEach((itemRef) => {
          this.soubory.push(itemRef);
          console.log(itemRef)
        });
      }).catch((error) => {
        // Uh-oh, an error occurred!
      });
    }
  }
}
</script>

<style>

</style>