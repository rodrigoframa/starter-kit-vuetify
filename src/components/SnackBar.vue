<template>
  <v-snackbar
    v-model="localShow"
    :color="type"
    :timeout="timeOut"
    :right="true"
    @input="onDismissed"
  >
    {{ text }}
    <v-btn
      dark
      flat
      @click="onDismissed"
    >
      Fechar
    </v-btn>
  </v-snackbar>
</template>

<script>

export default {
  name: 'SnackBar',
  props: {
    show: { type: Boolean },
    type: { type: String, default: 'default' },
    text: { type: String, default: '' },
    timeOut: { type: Number, default: 6000 }
  },
  data () {
    return {
      localShow: this.show
    }
  },
  methods: {
    onDismissed () {
      this.$emit('dismissed')
    }
  },
  watch: {
    show () {
      this.localShow = this.show
    }
  }
}
</script>
