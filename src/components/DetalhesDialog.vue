<template>
  <div id="errordialog">
    <v-layout row justify-center>
      <v-dialog :value="show" persistent full-width>
        <v-card>
          <v-card-title class="headline">{{ title }}</v-card-title>
          <v-card-text>
            <v-data-table
              :headers="headers"
              :items="detalhe"
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
  name: 'DetalhesDialog',
  props: {
    title: {
      type: String
    },
    show: {
      type: Boolean
    },
    cat: {
      type: Object
    }
  },
  data () {
    return {
      dialog: false
    }
  },
  computed: {
    detalhe () {
      if (!this.cat) return []
      const cat = {
        ...this.cat,
        nome: this.cat['funcionario']['nome'],
        situacao: this.cat['situacao']['descricao'],
        tipo_cat: this.cat['tipo_cat']['descricao'],
        local_acidente: this.cat['local_acidente_cat']['descricao_local']
      }
      return [{ ...cat }]
    },
    headers () {
      return [
        { text: 'Nome', value: 'nome' },
        { text: 'CPF', value: 'cpf' },
        { text: 'Data Acidente', value: 'data_acidente' },
        { text: 'Hora Acidente', value: 'hora_acidente' },
        { text: 'Situacao', value: 'situacao' },
        { text: 'Tipo Cat', value: 'tipo_cat' },
        { text: 'Local Acidente', value: 'local_acidente' },
        { text: 'Observacao', value: 'observacao' }
      ]
    }
  }
}
</script>
