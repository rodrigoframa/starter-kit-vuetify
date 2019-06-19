<template>
  <div id="errordialog">
      <v-layout row justify-center>
        <v-dialog :value="show" persistent max-width="1000" width="800">
          <v-card>
            <v-card-title class="headline">Erros de processamento</v-card-title>
            <v-card-text>
              <v-data-table
                :headers="headers"
                :items="erros"
                item-key="name"
                select-allempresa
                class="elevation-1"
              >
                <template slot="items" slot-scope="props">
                  <td v-for="(header, index) in headers" :key="index">
                    <template>{{ props.item[header.value] }}</template>
                  </td>
                </template>
              </v-data-table>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="green darken-1" flat @click="$emit('fechar')">Fechar</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-layout>
  </div>
</template>

<script>
export default {
  name: 'ErrorDialogWidget',
  props: {
    title: {
      type: String
    },
    show: {
      type: Boolean
    },
    erros: {
      type: Array
    }
  },
  data () {
    return {
      dialog: false
    }
  },
  computed: {
    headers () {
      return [
        { text: 'Código', value: 'codigo' },
        { text: 'Descrição', value: 'descricao' }
      ]
    }
  }
}
</script>
