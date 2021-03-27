<template>
<v-container>
  <v-text-field
    label="Název stránky*"
    :rules="rules"
    hide-details="auto"
    v-model="propTitle"
  ></v-text-field>

  <div style="padding: 20px 0px;">
    <!-- Use the component in the right place of the template -->
    <tiptap-vuetify 
    v-model="propText" 
    :extensions="extensions" 
    placeholder="Zde můžete začít psát svůj text." 
    />
  </div>  

  <v-file-input
    v-model="files"
    color="#001942"
    label="Přiložení souborů"
    multiple
    placeholder="Vyberte soubory"
    prepend-icon="mdi-paperclip"
    outlined
  >
    <template v-slot:selection="{ index, text }">
      <v-chip
        v-if="index < 2"
        color="#001942"
        dark
        label
        small
      >
        {{ text }}
      </v-chip>

      <span
        v-else-if="index === 2"
        class="overline grey--text text--darken-3 mx-2"
      >
        +{{ files.length - 2 }} Souborů
      </span>
    </template>
  </v-file-input>

  <v-data-table
      :headers="headers"
      :items="soubory"
      sort-by="date"
      :sort-desc="true"
      class="elevation-1"
      :search="search"
    > 
      <template v-slot:top>
        <v-toolbar
          flat
        >
          <v-toolbar-title>SOUBORY</v-toolbar-title>
          <v-icon
             style="margin-left: 10px;"
            @click="initialize()"
            >
              mdi-refresh
            </v-icon>
          <v-spacer />
          <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Vyhledat"
          single-line
          hide-details
          ></v-text-field>
          <v-spacer />
          <v-dialog v-model="dialogDelete1" fullscreen>
            <v-card>
              <v-card-title class="headline">Opravdu chcete smazat tento soubor?</v-card-title>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="#001942" text @click="deleteItemConfirm">Ano</v-btn>
                <v-btn color="#001942" text @click="closeDelete">Ne</v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon
          small
          @click="deleteItem(item)"
        >
          mdi-delete
        </v-icon>
      </template>
      <template v-slot:no-data>
        <v-btn
          color="#001942"
          style="color:#fff;"
          @click="initialize"
        >
          Načíst znovu
        </v-btn>
      </template>
    </v-data-table>

  <v-checkbox
      v-model="propCheck"
      :label="`Zobrazit v navigaci`"
  ></v-checkbox>

  <div style="padding-bottom:30px;">
    <v-btn v-on:click="addstranky()">
      Editovat stránku
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
    {{vysledek}}

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
import "firebase/storage";
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
  "propCheck",
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

    editedIndex: -1,
    dialog1: false,
    dialogDelete1: false,
    dialogEdit1: false,
    content: "",
    stranky:{
      title:"",
      url:"",
      text:"",
      checkbox:false,
    },
    vysledek:"",
    soubory:[],
    editedItem: [],
    defaultItem: [],
    snackbar:false,
    timeout:2000,
  }),

  async created () {
    this.initialize()
  },

  watch: {
    dialog1 (val) {
      val || this.close()
    },
    dialogEdit1 (val) {
      val || this.close()
    },
    dialogDelete1 (val) {
      val || this.closeDelete()
    },
  },

  methods:{
    addstranky(){
      this.stranky.title = this.propTitle;
      this.stranky.url = this.propUrl;
      this.stranky.text = this.propText;
      this.stranky.checkbox = this.propCheck;
      for(let i = 0; i < this.files.length; i++){
        const ref = firebase.storage().ref("/"+`${this.stranky.url}`).child(`${this.files[i].name}`)
        ref.put(this.files[i]).then((snapshot) => {

        });
      }
      firebase.firestore()
      .collection("stranky")
      .doc(this.propUrl)
      .set(this.stranky)
      .then(()=>{
        this.vysledek = "Stránka byla úspěšně změněna"
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