<template>
  <v-container grid-list-xl fluid>
    <v-layout row wrap>
      <v-flex lg12>
        <BaseWidget title="Selecionar Filtros">
          <v-layout row wrap>
            <v-flex xs12 sm6 md4 lg4>
              <v-autocomplete
                label="Evento"
                clearable
                :items="eventos"
                item-value="codEvento"
                item-text="nomeEvento"
                v-model="modelFiltro.evento"
                @change="$v.modelFiltro.evento.$touch()"
                @blur="$v.modelFiltro.evento.$touch()"
                @click:clear="$nextTick(() => modelFiltro.evento=null)"
                :error-messages="eventoErro"
              >
              </v-autocomplete>
            </v-flex>
            <v-flex xs12 sm6 md4 lg4>
              <v-autocomplete
                label="Empresa"
                clearable
                :items="empresas"
                item-value="codEmpresa"
                item-text="descricao"
                v-model="modelFiltro.empresa"
                @change="$v.modelFiltro.empresa.$touch()"
                @blur="$v.modelFiltro.empresa.$touch()"
                @click:clear="$nextTick(() => modelFiltro.empresa=null)"
                :error-messages="empresaErro"
              >
              </v-autocomplete>
            </v-flex>
            <v-flex xs12 sm6 md4 lg4>
              <v-autocomplete
                label="Status"
                clearable
                :items="statusList"
                item-value="codStatus"
                item-text="descricao"
                v-model="modelFiltro.status"
                @click:clear="$nextTick(() => modelFiltro.status=null)"
              >
              </v-autocomplete>
            </v-flex>
            <v-flex xs12 sm6 md4 lg4>
              <v-menu
                ref="menu1"
                v-model="menu1"
                :close-on-content-click="false"
                :nudge-right="40"
                lazy
                transition="scale-transition"
                offset-y
                full-width
                max-width="290px"
                min-width="290px"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    v-model="dataIniFormatada"
                    label="Data Inicial"
                    persistent-hint
                    prepend-icon="event"
                    @blur="dataIni = parseDate(dataIniFormatada)"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker v-model="dataIni" no-title @input="menu1 = false"></v-date-picker>
              </v-menu>
            </v-flex>
            <v-flex xs12 sm6 md4 lg4>
              <v-menu
                ref="menu2"
                v-model="menu2"
                :close-on-content-click="false"
                :nudge-right="40"
                lazy
                transition="scale-transition"
                offset-y
                full-width
                max-width="290px"
                min-width="290px"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    v-model="dataFimFormatada"
                    label="Data Final"
                    persistent-hint
                    prepend-icon="event"
                    @blur="dataFim = parseDate(dataFimFormatada)"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker v-model="dataFim" no-title @input="menu2 = false"></v-date-picker>
              </v-menu>
            </v-flex>
            <v-flex xs12 sm6 md4 lg4>
              <v-btn
                :disabled="$v.$invalid"
                @click="buscarInformacoesEventos"
                color="primary">Consultar
              </v-btn>
            </v-flex>
          </v-layout>
        </BaseWidget>
      </v-flex>
      <v-flex>
        <ErrorDialogWidget :show="dialogoExclusao" :erros="mensagensErros" @fechar="dialogoExclusao = false"
                           id="dialogoMostrarErro" title="Exibicao de erross"/>
      </v-flex>
    </v-layout>
    <v-layout row wrap>
      <v-flex v-if="informacoes.length">

        <v-data-table
          v-model="selected"
          :headers="headers"
          :items="informacoes"
          item-key="name"
          select-allempresa
          class="elevation-1"
        >
          <template slot="items" slot-scope="props">
            <td v-for="(header, index) in headers" :key="index">
              <v-chip dark v-if="header.type === 'chip'" :color="props.item[header.value].cor">
                {{ props.item[header.value].descricao}}
              </v-chip>
              <template v-else-if="header.type === 'action' && props.item[header.value].codigo != 3">
                <v-icon
                  medium
                  title="Exibir Erros"
                  @click="visualizarErrosEventos(props.item[header.value].erros)"
                >
                  view_list
                </v-icon>
              </template>
              <template v-else-if="header.type === 'action' && props.item[header.value].codigo == 3">
              </template>
              <template v-else>{{ props.item[header.value] }}</template>
            </td>
          </template>
        </v-data-table>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required } from 'vuelidate/lib/validators'
import BaseWidget from '../components/BaseWidget'
import ErrorDialogWidget from '../components/ErrorDialogWidget'
import handleErrors from '../support/handleErrors'
import { getInformacoesConsultaEventoGeral } from '../services'
import { mapActions, mapMutations } from 'vuex'
import mixinGetEmpresaEvento from './mixinGetEmpresaEvento'

export default {
  name: 'ConsultaEvento',
  components: { BaseWidget, ErrorDialogWidget },
  mixins: [validationMixin, mixinGetEmpresaEvento],
  data () {
    return {
      eventos: [],
      empresas: [],
      statusList: [{ descricao: 'Enviado', codStatus: 3 },
        { descricao: 'Em processamento', codStatus: 5 },
        { descricao: 'Erro', codStatus: 4 }],
      modelFiltro: {
        evento: null,
        empresa: null,
        status: null
      },
      dataIni: null,
      dataIniFormatada: null,
      dataFim: null,
      dataFimFormatada: null,
      menu1: false,
      menu2: false,
      info: false,
      selected: [],
      informacoes: [],
      dialogoExclusao: false,
      mensagensErros: []
    }
  },
  computed: {
    eventoErro () {
      return handleErrors(this.$v.modelFiltro.evento)
    },
    empresaErro () {
      return handleErrors(this.$v.modelFiltro.empresa, 'Empresa')
    },
    headers () {
      const { evento } = this.modelFiltro
      let ar = [{ text: 'Empresa', value: 'empresa' }]
      if (evento === 1060) {
        ar = [...ar, { text: 'Filial', value: 'filial' },
          { text: 'AmbTrab', value: 'ambtrab' },
          { text: 'Nome', value: 'nome' },
          { text: 'Data Início', value: 'dtini' },
          { text: 'Data Fim', value: 'dtfim' }]
      } else if (evento === 2210) {
        ar = [...ar, { text: 'CPF', value: 'cpf' },
          { text: 'Data Acidente', value: 'data_acidente' },
          { text: 'Hora Acidente', value: 'hora_acidente' }]
      } else if (evento === 2220) {
        ar = [...ar, { text: 'CPF Colaborador', value: 'cpfTrab' },
          { text: 'Tipo Exame', value: 'tipoExame' },
          { text: 'Data Aso', value: 'dataAso' },
          { text: 'Resultado Aso', value: 'resultadoAso' },
          { text: 'Nome Médico', value: 'nomeMedico' },
          { text: 'CRM Médico', value: 'crmMedico' }]
      } else if (evento === 2221) {
        ar = [...ar, { text: 'CPF Colaborador', value: 'cpf_trab' },
          { text: 'Data Exame', value: 'data_exame' },
          { text: 'Recusou Exame?', value: 'recusa' },
          { text: 'Médico', value: 'nome_medico' },
          { text: 'CRM médico', value: 'crm_medico' },
          { text: 'CNPJ Lab', value: 'cnpj_lab' }]
      } else if (evento === 2245) {
        ar = [...ar, { text: 'CPF Colaborador', value: 'cpfTrab' },
          { text: 'Data Treinamento', value: 'dataTreinamento' },
          { text: 'Código', value: 'codigo' },
          { text: 'Observação', value: 'obsTreinamento' }]
      } else if (evento === 2240) {
        ar = [...ar, { text: 'CPF', value: 'cpfTrab' },
          { text: 'Data Condição', value: 'dtIniCondicao' },
          { text: 'Descrição Ativ.', value: 'dscAtivdes' },
          { text: 'Obs. Reg. Ambientais', value: 'obs' }]
      }
      ar = [...ar, { text: 'Situação', value: 'situacao', type: 'chip' },
        { text: 'Ação', value: 'situacao', type: 'action' }]
      return ar
    },
    computedDateFormatted () {
      return this.formatDate(this.date)
    }
  },
  watch: {
    dataIni (val) {
      this.dataIniFormatada = this.formatDate(this.dataIni)
    },
    dataFim (val) {
      this.dataFimFormatada = this.formatDate(this.dataFim)
    }
  },
  methods: {
    ...mapActions(['snackSuccess', 'snackError']),
    ...mapMutations(['setLoading']),
    buscarInformacoesEventos () {
      const codEvento = this.modelFiltro.evento
      const codEmpresa = this.modelFiltro.empresa
      const codStatus = this.modelFiltro.status || -1
      const dtIni = this.dataIni
      const dtFim = this.dataFim
      getInformacoesConsultaEventoGeral({ codEvento, codEmpresa, codStatus, dtIni, dtFim })
        .then(data => {
          console.log('result', JSON.stringify(data))
          this.informacoes = [...data]
        })
        .catch((e) => this.snackError(e))
    },
    formatDate (date) {
      if (!date) return null
      const [year, month, day] = date.split('-')
      return `${day}/${month}/${year}`
    },
    formatDatePeriod (date) {
      if (!date) return null
      const [year, month] = date.split('-')
      return `${month}/${year}`
    },
    parseDate (date) {
      if (!date) return null
      const [month, day, year] = date.split('/')
      return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
    },
    visualizarErrosEventos (erros) {
      this.mensagensErros = erros
      this.dialogoExclusao = true
    }
  },
  validations: {
    modelFiltro: {
      evento: { required },
      empresa: { required }
    }
  }
}

</script>
