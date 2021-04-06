<template>
  <div id="app">
   <v-app id="inspire">
    <v-data-table
      :headers="headers"
      :items="soubory"
      class="elevation-1"
      :search="search"
    >
      <template v-slot:top>
        <v-toolbar
          flat
        >
          <v-toolbar-title>DOKUMENTY</v-toolbar-title>
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
            v-model="dialog1"
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
                Přidat soubor
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">Přidat soubor</span>
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
                <v-file-input
                  v-model="files"
                  placeholder="Zde nahrajte soubory"
                  label="Zde nahrajte soubory"
                  multiple
                  prepend-icon="mdi-paperclip"
                >
                  <template v-slot:selection="{ text }">
                    <v-chip
                      small
                      label
                      color="primary"
                    >
                      {{ text }}
                    </v-chip>
                  </template>
                </v-file-input>
              </v-card-text>

              <v-btn
                block
                @click="addsoubor()"
              >
                Přidat soubory
              </v-btn>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialogDelete1" fullscreen>
            <v-card>
              <v-card-title class="headline"><p class="text-center" style="width:100%;">Opravdu chcete smazat tuto stránku?</p></v-card-title>
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
      <template v-slot:[`item.actions`]="{ item }">
        <v-icon
          small
          class="mr-2"
          @click="editItem(item)"
        >
          mdi-content-copy
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
  <v-snackbar
    v-model="snackbar"
    :timeout="timeout"
  >
    {{snackbarText}}

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
</template>

<script>
import {db} from '~/plugins/firebase.js'
import firebase from 'firebase/app';
import 'firebase/auth'
import 'firebase/firestore'
import "firebase/storage";

export default {
  data: () => ({
    dialog: false,
    dialogDelete: false,
    dialogEdit: false,
    headers: [
      { text: 'Název souboru', align: 'start', value: 'name', },
      { text: 'Akce', value: 'actions', sortable: false },
    ],
    files:[],
    editedIndex: -1,
    dialog1: false,
    dialogDelete1: false,
    dialogEdit1: false,
    content: "",
    vysledek:"",
    soubory:[{
      bucket: "",
      fullPath: "",
      name: ""
    }],
    editedItem: {
      bucket: "",
      fullPath: "",
      name: ""
    },
    defaultItem: {
      bucket: "",
      fullPath: "",
      name: ""
    },
    snackbar:false,
    snackbarText:"",
    timeout:2000,
    search:"",
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

  async mounted () {
    this.initialize()
  },

  methods: {
    addsoubor(){
      for(let i = 0; i < this.files.length; i++){
        const ref = firebase.storage().ref("/soubory").child(`${this.files[i].name}`)
        ref.put(this.files[i]).then((snapshot) => {

        });
      }
      this.files = []
      this.snackbarText = "Soubory byly úspěšně nahrány."
      this.snackbar = true
      this.close()
    },

    async initialize () {
      this.soubory = [] 
      const storageRef = firebase.storage().ref();
      var listRef = storageRef.child(`/soubory`);
      // Find all the prefixes and items.
      listRef.listAll()
      .then((res) => {
        res.items.forEach((itemRef) => {
          this.soubory.push(itemRef);
        });
      }).catch((error) => {
        // Uh-oh, an error occurred!
      });
    },

    editItem (item) {
      this.editedIndex = this.soubory.indexOf(item)
      this.editedItem = Object.assign({}, item)
      const storageRef = firebase.storage().ref();
      storageRef.child(this.editedItem._delegate.fullPath).getDownloadURL()
      .then((url) => {
        try {
          this.$copyText(url);
          this.snackbarText = "Link souboru byl zkopírován do schránky."
          this.snackbar = true;
        } catch (e) {
          console.error(e);
        }
      })
      .catch((error) => {
        // Handle any errors
      });
    },

    deleteItem (item) {
      this.editedIndex = this.soubory.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete1 = true
    },

    async deleteItemConfirm() {
      this.soubory.splice(this.editedIndex, 1)
      const storageRef = firebase.storage().ref();
      var desertRef = storageRef.child(this.editedItem._delegate.fullPath);
      // Delete the file
      desertRef.delete().then(() => {
        this.snackbarText = "Soubor byl úspěšně odstraněn."
        this.snackbar = true
      }).catch((error) => {
        this.snackbarText = "Ajaj, chyba. Soubor se nepodařilo odstranit."
        this.snackbar = true
      });
      this.closeDelete()
    },

    close () {
      this.dialog1 = false
      this.dialogEdit1 = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    closeDelete () {
      this.dialogDelete1 = false
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