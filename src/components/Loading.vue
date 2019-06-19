<template>
  <div class="text-xs-center">
    <v-dialog
      v-model="loading"
      persistent
      max-width="500"
    >
      <v-card color="primary" dark>
        <v-card-text>
          {{ mensagem }}
          <v-progress-linear
            indeterminate
            color="white"
            class="mb-0"
          ></v-progress-linear>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: 'Loading',
  props: {
    loading: { type: Boolean, default: false },
    mensagem: { type: String, default: 'Aguarde, está processando' }
  }
}
</script>

<style scoped>

</style>
