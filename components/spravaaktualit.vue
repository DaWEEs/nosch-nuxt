<template>
  <div id="app">
  <v-app id="inspire">
    <v-data-table
      :headers="headers"
      :items="prispevky"
      sort-by="date"
      :sort-desc="true"
      class="elevation-1"
      :search="search"
    >
      <template v-slot:top>
        <v-toolbar
          flat
        >
          <v-toolbar-title>AKTUALITY</v-toolbar-title>
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
                Nová aktualita
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">Nová aktualita</span>
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
                <novaaktualita />
              </v-card-text>
  
            </v-card>
          </v-dialog>
          <v-dialog
            v-model="dialogEdit"
            fullscreen
          >
            <v-card>
              <v-card-title>
                <span class="headline">Editovat aktualitu</span>
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
                <editaktualita :propText="editedItem.text" :propTitle="editedItem.title" :propShortText="editedItem.shorttext" :propUrl="editedItem.url" :propForm="editedItem.formular"/>
              </v-card-text>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialogDelete" fullscreen>
            <v-card>
              <v-card-title class="headline">
                <p class="text-center" style="width:100%;">Opravdu chcete smazat tuto aktualitu?</p>
              </v-card-title>
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
import {db, firebase} from '~/plugins/firebase.js'
import 'firebase/auth'
import 'firebase/firestore'
import novaaktualita from './novaaktualita.vue'
import Editaktualita from './editaktualita.vue'

export default {
  components: { novaaktualita, Editaktualita},
  data: () => ({
    dialog: false,
    dialogDelete: false,
    dialogEdit: false,
    headers: [
      {
        text: 'Název aktuality',
        align: 'start',
        value: 'title',
      },
      { text: 'URL', value: 'url' },
      { text: 'Datum', value: 'date' },
      { text: 'Akce', value: 'actions', sortable: false },
    ],
    prispevky: [],
    editedIndex: -1,
    editedItem: {
      title: '',
      shortText: '',
      url: '',
      date: '',
      text: '',
      formular: false,
    },
    defaultItem: {
      title: '',
      shortText: '',
      url: '',
      date: '',
      text: '',
      formular: false,
    },
    search: '',
  }),

  computed: {
    formTitle () {
      return this.editedIndex === -1 ? 'Nová aktualita' : 'Editovat aktualitu'
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
      let i = 0;
      this.prispevky = [];
      const result = await db.collection('prispevky').get();
      result.forEach(doc => {
        //console.log(doc.id, '=>', doc.data());
        this.prispevky.push(doc.data());
        var datumDate = new Date(this.prispevky[i].date)
        this.prispevky[i].date = datumDate.getDate()+". "+(datumDate.getMonth()+1)+". "+datumDate.getFullYear();
        i++;
      });
    },

    editItem (item) {
      this.editedIndex = this.prispevky.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogEdit = true
    },

    deleteItem (item) {
      this.editedIndex = this.prispevky.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },

    async deleteItemConfirm() {
      this.prispevky.splice(this.editedIndex, 1)
      const sma = await db.collection('prispevky').doc(this.editedItem.url);
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
        Object.assign(this.prispevky[this.editedIndex], this.editedItem)
      } else {
        this.prispevky.push(this.editedItem)
      }
      this.close()
    },

    aktualizovat(){
      this.$nuxt.reload();
    }
  },
}
  

/*export default {
  data: () => ({
    prispevky: [],
  }),

  async fetch(){
      let i = 0;
      this.prispevky = [];
      const result = await db.collection('prispevky').get();
      result.forEach(doc => {
        //console.log(doc.id, '=>', doc.data());
        this.prispevky.push(doc.data());
      });
  },

  methods:{
      async del(url){
        const sma = await db.collection('prispevky').doc(url);
        sma.delete();
        this.$nuxt.refresh()
      }
  }
}*/
</script>

<style>

</style>