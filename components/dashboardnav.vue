<template>
  <v-card
    height="100vh"
    width="256"
    class="mx-auto"
  >
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title">
            {{emailUziv}}
          </v-list-item-title>
          <v-list-item-subtitle>
            Jste přihlášeni
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>


    <v-tabs
      v-model="tab"
      background-color="primary"
      dark
    >
      <v-tab
        v-for="item in items"
        :key="item.title"
      >
        <v-icon>{{ item.icon }}</v-icon>
        <v-list-item-title>{{ item.title }}</v-list-item-title>
      </v-tab>
    </v-tabs>
    <v-tabs-items v-model="tab">
      <v-tab-item
        v-for="item in items"
        :key="item.tab"
      >
        <v-card flat>
          <v-card-text>{{ item.content }}</v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
         
  </v-card>
</template>

<script>
import firebase from 'firebase/app';
import 'firebase/auth'

export default {
  props: ['email'],
}
</script>

<style>

</style>