<template>
  <div id="app">
   <v-app id="inspire">
    <v-data-table
      :headers="headers"
      :items="stranky"
      sort-by="date"
      :sort-desc="true"
      class="elevation-1"
      :search="search"
    >
      <template v-slot:top>
        <v-toolbar
          flat
        >
          <v-toolbar-title>STRÁNKY</v-toolbar-title>
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
            v-model="dialog"
            fullscreen
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                color="#001942"
                style="color:#fff;"
                dark
                class="mb-2"
                v-bind="attrs"
                v-on="on"
              >
                Nová stránka
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">Nová stránka</span>
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
  
              <v-card-text>
                <novastranka />
              </v-card-text>
  
            </v-card>
          </v-dialog>
          <v-dialog
            v-model="dialogEdit"
            fullscreen
          >
            <v-card>
              <v-card-title>
                <span class="headline">Editovat stránku</span>
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
              <v-card-text>
                <editstranka :propTitle="editedItem.title" :propUrl="editedItem.url" :propText="editedItem.text" :propCheck="editedItem.checkbox"/>
              </v-card-text>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialogDelete" fullscreen>
            <v-card>
              <v-card-title class="headline">Opravdu chcete smazat tuto stránku?</v-card-title>
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
          mdi-pencil
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
      { text: 'Název stránky', align: 'start', value: 'title', },
      { text: 'URL', value: 'url' },
      { text: 'Akce', value: 'actions', sortable: false },
    ],
    stranky: [],
    editedIndex: -1,
    editedItem: {
      text: '',
      title: '',
      url: '',
      checkbox: false,
    },
    defaultItem: {
      text:'',
      title: '',
      url: '',
      checkbox:false,
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
      this.stranky = [];
      const result = await db.collection('stranky').get();
      result.forEach(doc => {
        //console.log(doc.id, '=>', doc.data());
        this.stranky.push(doc.data());
      });
    },

    editItem (item) {
      this.editedIndex = this.stranky.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogEdit = true
    },

    deleteItem (item) {
      this.editedIndex = this.stranky.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
      console.log(this.editedItem)
    },

    async deleteItemConfirm() {
      this.stranky.splice(this.editedIndex, 1)
      const storageRef = firebase.storage().ref();
      var listRef = storageRef.child(`/${this.editedItem.url}`);
      // Find all the prefixes and items.
      listRef.listAll()
      .then((res) => {
        res.items.forEach((itemRef) => {
          var desertRef = storageRef.child(`${itemRef.fullPath}`);
          // Delete the file
          desertRef.delete().then(() => {
          }).catch((error) => {
          });
        });
      }).catch((error) => {
        // Uh-oh, an error occurred!
      });
      const sma = await db.collection('stranky').doc(this.editedItem.url);
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

<style lang="scss">
  
</style>