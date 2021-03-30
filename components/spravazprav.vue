<template>
  <div id="app">
   <v-app id="inspire">
    <v-data-table
      :headers="headers"
      :items="zpravy"
      sort-by="date"
      :sort-desc="true"
      class="elevation-1"
      :search="search"
    >
      <template v-slot:top>
        <v-toolbar
          flat
        >
          <v-toolbar-title>ZPRÁVY Z FORMULÁŘE</v-toolbar-title>
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
          <v-dialog
            v-model="dialogEdit"
            fullscreen
          >
            <v-card>
              <v-card-title>
              
              <span class="headline">Přečíst zprávu</span>
              <v-spacer></v-spacer>
              <v-card-actions>
               <v-btn
                  icon
                  @click="close"
                >
                  <v-icon>mdi-close</v-icon>
                </v-btn>
              </v-card-actions>
              
              </v-card-title>
              <v-container>
              <v-card-text>
                
                  <v-row>
                    <h1>{{editedItem.name}} odeslal(a) zprávu ze stránky {{editedItem.url}}</h1>
                  </v-row>
                  <v-row>
                    <h2>Email: <a :href="`mailto:${editedItem.email}`">{{editedItem.email}}</a></h2>
                  </v-row>
                  <v-row>
                    <p>Text:<br>{{editedItem.text}}</p>
                  </v-row>
                  <v-row>
                  <v-btn
                    elevation="3"
                    :href="`mailto:${editedItem.email}`"
                    block
                  >
                  Odpovědět
                  </v-btn>
                  </v-row>
                
              </v-card-text>
              </v-container>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialogDelete" fullscreen>
            <v-card>
              <v-card-title class="headline"><p class="text-center" style="width:100%;">Opravdu chcete smazat tuto zprávu?</p></v-card-title>
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
          class="mr-2"
          @click="editItem(item)"
        >
          mdi-email
        </v-icon>
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
  </v-app>
</div>
</template>

<script>
import {db} from '~/plugins/firebase.js'
import firebase from 'firebase/app';
import 'firebase/auth'
import 'firebase/firestore'
import "firebase/storage";
import Novastranka from './novastranka.vue'

export default {
  components: {Novastranka },
  data: () => ({
    dialog: false,
    dialogDelete: false,
    dialogEdit: false,
    headers: [
      { text: 'Jméno odesílatele', align: 'start', value: 'name', },
      { text: 'Formulář ze stránky', value: 'url' },
      { text: 'Datum', value: 'date' },
      { text: 'Akce', value: 'actions', sortable: false },
    ],
    stranky: [],
    editedIndex: -1,
    zpravy: {
      name: '',
      email: '',
      text: "",
      url: '',
      id: "",
    },
    editedItem: {
      name: '',
      email: '',
      text: "",
      url: '',
      id: "",
    },
    defaultItem: {
      name: '',
      email: '',
      text: "",
      url: '',
      id: "",
    },
    search: '',
  }),

  computed: {
    formTitle () {
      return this.editedIndex === -1 ? 'Nová stránka' : 'Editovat stránku'
    },
  },

  watch: {
    dialog (val) {
      val || this.close()
    },
    dialogEdit (val) {
      val || this.close()
    },
    dialogDelete (val) {
      val || this.closeDelete()
    },
  },

  async created () {
    this.initialize()
  },

  methods: {
    async initialize () {
      this.zpravy = [];
      let i = 0;
      const result = await db.collection('formular').get();
      result.forEach(doc => {
        //console.log(doc.id, '=>', doc.data());
        this.zpravy.push(doc.data());
        var datumDate = new Date(this.zpravy[i].date)
        this.zpravy[i].date = datumDate.getDate()+". "+(datumDate.getMonth()+1)+". "+datumDate.getFullYear();
        i++;
      });
    },

    editItem (item) {
      this.editedIndex = this.zpravy.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogEdit = true
    },

    deleteItem (item) {
      this.editedIndex = this.zpravy.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },

    async deleteItemConfirm() {
      this.zpravy.splice(this.editedIndex, 1)
      const sma = await db.collection('formular').doc(this.editedItem.id);
      sma.delete();
      this.closeDelete()
    },

    close () {
      this.dialog = false
      this.dialogEdit = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    closeDelete () {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    save () {
      if (this.editedIndex > -1) {
        Object.assign(this.stranky[this.editedIndex], this.editedItem)
      } else {
        this.stranky.push(this.editedItem)
      }
      this.close()
    },
  },
}

/*export default {
  data: () => ({
    headers: [
      {
        text: 'Název stránky',
        align: 'start',
        value: 'id',
      },
    ],
    stranky: [],
  }),

  async created () {
    this.initialize()
  },

  methods: {
    async initialize () {
      let i = 0;
      this.stranky = [];
      const result = await db.collection('stranky').get();
      result.forEach(doc => {
        //console.log(doc.id, '=>', doc.data());
        this.stranky.push(doc.data());
      });
    },
  },
}*/
  

/*export default {
  data: () => ({
    stranky: [],
  }),

  async fetch(){
      let i = 0;
      this.stranky = [];
      const result = await db.collection('stranky').get();
      result.forEach(doc => {
        //console.log(doc.id, '=>', doc.data());
        this.stranky.push(doc.data());
      });
  },

  methods:{
      async del(url){
        const sma = await db.collection('stranky').doc(url);
        sma.delete();
        this.$nuxt.refresh()
      }
  }
}*/
</script>

<style lang="scss" scoped>
  h1{
    padding-bottom:15px;
  }
  h2{
  padding-bottom:10px;
  }
</style>