<template>
  <div>
    <!-- Use the component in the right place of the template -->
    <editor-menu-bar :editor="editor" v-slot="{ commands }">
      <div class="menubar">
        <button
          class="menubar__button"
          @click="showImagePrompt(commands.image)"
        >
          <icon name="image" />
        </button>
      </div>
    </editor-menu-bar>
    <tiptap-vuetify v-model="content" :extensions="extensions" />
  </div>
</template>

<script>
// import the component and the necessary extensions
import {
  TiptapVuetify,
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
} from 'tiptap-vuetify'

export default {
  // specify TiptapVuetify component in "components"
  components: { TiptapVuetify },
  data: () => ({
    // declare extensions you want to use
    extensions: [
      History,
      Blockquote,
      Link,
      Underline,
      Strike,
      Italic,
      ListItem,
      BulletList,
      OrderedList,
      [
        Heading,
        {
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
      HardBreak,
    ],
    // starting editor's content
    content: '<p>Zde můžete psát text.</p>',

    //Pravidla inputu
    rules: [
        value => !!value || 'Vyžadováno.',
        value => (value && value.length >= 3) || 'Minimálně 3 písmena',
      ],

    snackbar: false,
    text: '',
    timeout: 2000,
  }),
}
</script>
