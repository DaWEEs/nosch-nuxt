<template>  
<v-card
  min-height="100vh"
  max-width="100vw"
  tile
  flat
  >
    <v-toolbar
        color="#64B5F6"
    >
      <v-toolbar-title>CMS ADMIN PANEL</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn right v-on:click="logout()">
          Odhlásit se
      </v-btn>
    </v-toolbar>
    <v-tabs vertical>
      <v-tab>
        <v-icon left>
          mdi-account
        </v-icon>
        Dashboard
      </v-tab>
      <v-tab>
        <v-icon left>
          mdi-pen
        </v-icon>
        Nová aktualita
      </v-tab>
      <v-tab>
        <v-icon left>
          mdi-account-group-outline
        </v-icon>
        Uživatelé
      </v-tab>

      <!--Dashboard-->
      <v-tab-item>
        <v-card flat>
          <v-card-text>
            
          </v-card-text>
        </v-card>
      </v-tab-item>

      <!--Nová aktualita-->
      <v-tab-item>
        <v-card flat>
          <v-card-text>
            <v-text-field
                label="Název aktuality*"
                :rules="rules"
                hide-details="auto"
                v-model="aktualita.title"
              ></v-text-field>
            <div style="padding: 20px 0px;">
              <!-- Use the component in the right place of the template -->
              <tiptap-vuetify v-model="content" :extensions="extensions" />
            </div>  
              <v-expansion-panels>
                <v-expansion-panel>
                  <v-expansion-panel-header>
                    Ukázka
                  </v-expansion-panel-header>
                  <v-expansion-panel-content>
                    <div class="tiptap-vuetify-editor__content" v-html="content"/>
                  </v-expansion-panel-content>
                </v-expansion-panel>
                <v-expansion-panel>
                  <v-expansion-panel-header>
                    HTML
                  </v-expansion-panel-header>
                  <v-expansion-panel-content>
                    <div class="mt-3">{{ content }}</div>
                  </v-expansion-panel-content>
                </v-expansion-panel>
              </v-expansion-panels>
            <div style="padding-top: 50px;">
              <v-btn v-on:click="addaktualita()">
                Přidat aktualitu
              </v-btn>
            </div>
          </v-card-text>
        </v-card>
      </v-tab-item>
      <v-tab-item>
        <v-card flat>
          <v-card-text>
            <p>
              Fusce a quam. Phasellus nec sem in justo pellentesque facilisis. Nam eget dui. Proin viverra, ligula sit amet ultrices semper, ligula arcu tristique sapien, a accumsan nisi mauris ac eros. In dui magna, posuere eget, vestibulum et, tempor auctor, justo.
            </p>

            <p class="mb-0">
              Cras sagittis. Phasellus nec sem in justo pellentesque facilisis. Proin sapien ipsum, porta a, auctor quis, euismod ut, mi. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nam at tortor in tellus interdum sagittis.
            </p>
          </v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs>
  </v-card>
</template>

<script>
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
import firebase from 'firebase/app';
import 'firebase/auth'
import { getUserFromCookie, getUserFromSession } from '@/helpers/cookie.js'
import Vuetify from 'vuetify/lib'
import Editor from '../components/Editor'

export default {
    components: { TiptapVuetify },
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
    content: `<p>Zde můžete začít psát svůj text.</p>`,
    //Pravidla inputu
    rules: [
        value => !!value || 'Vyžadováno.',
        value => (value && value.length >= 3) || 'Minimálně 3 písmena',
      ],
    //Polozky menu
    items: [
          { title: 'Dashboard', icon: 'mdi-home-city' },
          { title: 'Přidat aktualitu', icon: 'mdi-pencil' },
          { title: 'Uživatelé', icon: 'mdi-account-group-outline' },
        ],
    //Data aktualit
    aktualita:{
        title:'',
        link:'',
        text:'',
    }
  }),

  async asyncData({ req, redirect }) {
    if (process.server) {
      console.log('server', req.headers)
      const user = getUserFromCookie(req)
      //   console.log('b', getUserFromCookie(req))
      if (!user) {
        console.log('redirecting server')
        redirect('/admin')
      }
    } else {
      var user = firebase.auth().currentUser
      if (!user) {
        redirect('/admin')
      }
    }
    //   console.log($nuxt.$router)
    
      const uziv = firebase.auth().currentUser;
      let email;
      if(uziv != null){
        email = uziv.email;
      }
      return{
        email
      }
  },
  beforeCreate(){
      
  },
  methods:{
    logout() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.replace({ name: 'index' })
        })
    },

    addaktualita(){
      firebase.firestore().collection("prispevky").doc(this.aktualita.title).set(this.aktualita);
    }
  }
}
</script>