<template>
  <v-navigation-drawer
    class="menu-lateral"
    dark
    v-model="localDrawer"
    absolute
    overflow
    app
  >
    <v-toolbar flat class="transparent">
      <v-list class="pa-0">
        <v-list-tile avatar>
          <v-list-tile-avatar>
            <img src="https://randomuser.me/api/portraits/men/85.jpg">
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title> {{ userName }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-toolbar>
    <v-list dense>
      <v-divider></v-divider>
      <template v-for="(item, index) in itens">
        <MenuItem :icon="item.icon" :title="item.title" :route-name="item.routeName" :key="index"/>
      </template>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import MenuItem from './MenuItem'
import { menu } from '../../config'

export default {
  name: 'Menu',
  components: { MenuItem },
  props: { value: { type: Boolean } },
  computed: {
    itens () {
      return menu
    },
    userName () {
      return 'Usuário'
    }
  },
  data () {
    return {
      localDrawer: this.value
    }
  },
  watch: {
    value () {
      this.localDrawer = this.value
    },
    localDrawer () {
      this.$emit('input', this.localDrawer)
    }
  }
}
</script>

<style scoped>
  .menu-lateral {
    background-color: #2f4050;
    /*color: #293846;*/
  }

</style>
