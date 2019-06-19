<template>
  <v-content>
    <v-container fluid class="grey lighten-4">
      <router-view></router-view>
    </v-container>
  </v-content>
</template>

<script>
export default {
  name: 'Content'
}
</script>

<style scoped>
  .content {
    background-color: #f3f3f4;
  }

</style>
