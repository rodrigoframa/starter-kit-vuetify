<template>
  <v-card>
    <v-toolbar color="transparent" flat dense card v-if="enableHeader">
      <v-toolbar-title><h5>{{title}}</h5></v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn icon @click="show = !show">
          <v-icon>{{ show ? 'keyboard_arrow_down' : 'keyboard_arrow_up' }}</v-icon>
        </v-btn>
      </v-toolbar-items>
      <slot name="widget-header-action"></slot>
    </v-toolbar>
    <v-divider v-if="enableHeader"></v-divider>
    <v-expand-transition>
      <v-card-text :class="contentBg" v-show="show">
        <v-container fluid fill-heigth>
          <slot/>
        </v-container>
      </v-card-text>
    </v-expand-transition>
  </v-card>
</template>

<script>
export default {
  name: 'BaseWidget',
  props: {
    title: {
      type: String
    },
    enableHeader: {
      type: Boolean,
      default: true
    },
    contentBg: {
      type: String,
      default: 'white'
    }
  },
  data: () => {
    return {
      show: true
    }
  }
}
</script>
