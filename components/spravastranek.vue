<template>
  <v-data-table
    :headers="headers"
    :items="stranky"
    item-key="id"
    sort-by="id"
    group-by="id"
    class="elevation-1"
  ></v-data-table>
</template>

<script>
import {db, firebase} from '~/plugins/firebase.js'
import 'firebase/auth'
import 'firebase/firestore'

export default {
  components: { novaaktualita, Editaktualita},
  data: () => ({
    dialog: false,
    dialogDelete: false,
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
    },
    defaultItem: {
      title: '',
      shortText: '',
      url: '',
      date: '',
      text: '',
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
        this.prispevky[i].date = datumDate.getDate()+"."+datumDate.getMonth()+". "+datumDate.getFullYear();
        console.log(this.prispevky);
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