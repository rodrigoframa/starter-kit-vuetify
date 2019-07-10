<template>
  <v-toolbar
    app>
    <v-toolbar-side-icon class="primary"
      @click.stop="$emit('drawer')"
    ></v-toolbar-side-icon>
    <v-toolbar-title class="headline text-uppercase mr-4">
      <span>{{ titleApp }}</span>
      <span class="font-weight-light"> App {{ appMode }}</span>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items>
      <v-btn flat>trocar de módulo</v-btn>
      <v-btn flat @click="deslogar">sair</v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
export default {
  name: 'Header',
  computed: {
    appMode () {
      return process.env.VUE_APP_MODE || ''
    },
    titleApp () {
      return process.env.VUE_APP_TITLE || 'RH-It Happens'
    }
  },
  methods: {
    deslogar () {
      window.location.href = 'http://www.google.com'
    }
  }
}
</script>

<style scoped>

</style>
