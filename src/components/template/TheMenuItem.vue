<template>
  <v-list-tile :to="{'name': routeName}"
               exact
               active-class="white--text"
               class="item-menu"
  >
    <v-list-tile-action>
      <v-icon class="item-menu">{{ icon }}</v-icon>
    </v-list-tile-action>
    <v-list-tile-content>
      <v-list-tile-title> {{ title }}</v-list-tile-title>
    </v-list-tile-content>
  </v-list-tile>
</template>

<script>
export default {
  name: 'MenuItem',
  props: {
    icon: String,
    title: String,
    routeName: String
  }
}
</script>

<style scoped>
  .item-menu {
    color: #a7b1c2;
  }

</style>
