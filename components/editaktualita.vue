<template>
<v-container>
  <v-text-field
    label="Název aktuality*"
    :rules="rules"
    hide-details="auto"
    v-model="propTitle"
  ></v-text-field>

  <div style="padding: 20px 0px;">
    <!-- Use the component in the right place of the template -->
    <tiptap-vuetify v-model="propText" :extensions="extensions" placeholder="Zde můžete začít psát svůj text." />
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


  <div style="padding-top: 50px;">
    <v-btn v-on:click="addaktualita()">
      Uložit změny
    </v-btn>
  </div>


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
    History
  } from 'tiptap-vuetify'

export default {
components: { TiptapVuetify },
props:[
  "propTitle",
  "propText",
  "propUrl"
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
      HardBreak // line break on Shift + Ctrl + Enter
    ],

    rules: [
        value => !!value || 'Vyžadováno.',
        value => (value && value.length >= 3) || 'Minimálně 3 písmena',
      ],

    aktualita:{
        title:'',
        text:"",
        url:"",
        date:"",
    },


    snackbar:false,
    timeout:2000,
  }),

  methods:{
    addaktualita(){
      this.aktualita.url = this.propUrl;
      this.aktualita.date = new Date().toJSON();
      this.aktualita.title = this.propTitle;
      this.aktualita.text = this.propText;
      firebase.firestore()
      .collection("prispevky")
      .doc(this.aktualita.url)
      .set(this.aktualita)
      .then(()=>{
        this.snackbar = true;
        this.aktualita.title = "";
        this.aktualita.text = "";
        this.aktualita.url = "";
        this.aktualita.date = "";
      });
    }
  }
}
</script>

<style>

</style>