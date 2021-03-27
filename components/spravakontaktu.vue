<template>
  <v-app>
    <v-data-table
      :headers="headers"
      :items="stranky"
      sort-by="date"
      :sort-desc="true"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar
          flat
        >
          <v-toolbar-title>KONTAKTY</v-toolbar-title>
          <v-icon
             style="margin-left: 10px;"
            @click="initialize()"
            >
              mdi-refresh
            </v-icon>
          <v-dialog
            v-model="dialogEdit"
            fullscreen
          >
            <v-card>
                <v-card-title>
                  <span class="headline">{{ formTitle }}</span>
                  <v-spacer></v-spacer>
                </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col
                      cols="16"
                      sm="6"
                      md="4"
                    >
                      <v-text-field
                        v-model="editedItem.icon"
                        label="Ikona"
                      ></v-text-field>
                    </v-col>
                    <v-col
                      cols="16"
                      sm="6"
                      md="4"
                    >
                      <v-text-field
                        v-model="editedItem.value"
                        label="Hodnota"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="#001942"
                  text
                  @click="close"
                >
                  Zavřít
                </v-btn>
                <v-btn
                  color="#001942"
                  text
                  @click="save"
                >
                  Uložit
                </v-btn>
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
</template>

<script>
import {db} from '~/plugins/firebase.js'
import 'firebase/auth'
import 'firebase/firestore'
import firebase from 'firebase/app';

export default {
  data: () => ({
    dialog: false,
    dialogDelete: false,
    headers: [
      { text: 'Název kontaktu', align: 'start', value: 'title', },
      { text: 'Akce', value: 'actions', sortable: false },
    ],
    stranky: [],
    editStranka: {
      icon: "",
      title: "",
      value: ""
    },
    editedIndex: -1,
    editedItem: {
      icon: '',
      title: '',
      value: '',
    },
    defaultItem: {
      icon: '',
      title: '',
      value: '',
    },
    search: '',
  }),

  computed: {
    formTitle () {
      return this.editedIndex === -1 ? 'Nový kontakt' : 'Editovat kontakt'
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
      const result = await db.collection('udaje').get();
      result.forEach(doc => {
        //console.log(doc.id, '=>', doc.data());
        this.stranky.push(doc.data());
        console.log(this.stranky);
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
      this.editStranka.value = this.editedItem.value
      this.editStranka.icon = this.editedItem.icon
      this.editStranka.title = this.editedItem.title
      console.log(this.editStranka)
      firebase.firestore()
      .collection("udaje")
      .doc(this.editStranka.title)
      .set(this.editStranka)
      .then(()=>{
        this.close();
      });
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

<style>

</style>