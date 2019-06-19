<template>
  <v-container grid-list-xl fluid>
    <v-layout row wrap>
      <v-flex lg12>
        <BaseWidget title="Selecionar Eventos">
          <v-layout v-show="eventos" row wrap>
            <v-flex xs12 sm6>
              <v-autocomplete
                label="Evento"
                clearable
                v-model="modelBusca.evento"
                :items="eventos"
                item-value="codEvento"
                item-text="nomeEvento"
                @change="mudouPesquisa($v.modelBusca.evento)"
                @click:clear="$nextTick(() => modelBusca.evento=null)"
                :error-messages="eventoErro"
              >
              </v-autocomplete>
            </v-flex>
            <v-flex xs12 sm6>
              <v-autocomplete
                label="Empresa"
                clearable
                v-model="modelBusca.empresa"
                :items="empresas"
                item-value="codEmpresa"
                item-text="descricao"
                @change="mudouPesquisa($v.modelBusca.empresa)"
                @click:clear="$nextTick(() => modelBusca.empresa=null)"
                :error-messages="empresaErro"
              >
              </v-autocomplete>
            </v-flex>
            <v-flex xs12 sm6>
              <v-switch
                v-model="modelBusca.inclusao"
                label="Informações novas"
                color="primary"
                @change="resultadoPesquisa = []"
              ></v-switch>
            </v-flex>
            <v-flex xs12 sm12>
              <v-layout row wrap>
                <v-btn :disabled="$v.$invalid"
                       @click="buscarInformacoes"
                       color="primary">buscar
                </v-btn>
                <v-btn
                  @click="limparDados"
                >limpar
                </v-btn>

              </v-layout>
            </v-flex>
          </v-layout>
        </BaseWidget>
      </v-flex>
    </v-layout>
    <v-layout row wrap>
      <v-flex xs12>
        <v-toolbar flat dense color="white" class="elevation-1">
          <v-toolbar-title><h5>Informações</h5></v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn
            :disabled="!selecionados.length"
            @click="enviarInformacoes"
            color="primary">enviar
          </v-btn>
          <v-btn
            :disabled="!selecionados.length"
            @click="atualizarInformacoes"
            color="primary">reimportar
          </v-btn>
        </v-toolbar>
        <v-data-table v-show="!!resultadoPesquisa.length"
                      v-model="selecionados"
                      :headers="headers"
                      :items="resultadoPesquisa"
                      item-key="id"
                      select-all
                      class="elevation-1"
        >
          <template slot="items" slot-scope="props">
            <td>
              <v-checkbox
                v-model="props.selected"
                primary
                hide-details
              ></v-checkbox>
            </td>
            <td v-for="(header, index) in headers" :key="index">
              <template v-if="header.type === 'chip'">
                <v-chip dark :color="props.item[header.value].type">
                  <v-avatar v-if="props.item[header.value].type === 'error'">
                    <v-icon> {{ props.item[header.value].type }}</v-icon>
                  </v-avatar>
                  {{ props.item[header.value].msg }}
                </v-chip>
              </template>
              <template v-else-if="header.type === 'action'">
                <v-icon
                  medium
                  title="Exibir Detalhes"
                  @click="visualizarDetalhesCat(props.item['idItPeople'])"
                >
                  view_list
                </v-icon>
              </template>
              <template v-else-if="header.type === 'nested'">{{ props.item[header.value][header.valueChild] }}</template>
              <template v-else>{{ props.item[header.value] }}</template>
            </td>
          </template>
          <template slot="no-data">
            <v-alert :value="true" color="warning" icon="warning">
              Sem dados
            </v-alert>
          </template>
        </v-data-table>
        <DetalhesDialog :show="dialogDetalhes" :cat="catDetalhe" @fechar="dialogDetalhes = false"
                          title="Detalhe da Cat"/>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required } from 'vuelidate/lib/validators'
import BaseWidget from '../components/BaseWidget'
import handleErrors from '../support/handleErrors'
import { getDetalhesCat, getInformacoesEnvio, postImportacao, postInformacoesEnvio } from '../services'
import { mapActions, mapMutations } from 'vuex'
import fieldsHeaders from '../support/headers'
import mixinGetEmpresaEvento from './mixinGetEmpresaEvento'
import DetalhesDialog from '../components/DetalhesDialog'

export default {
  name: 'EnvioEvento',
  components: { BaseWidget, DetalhesDialog },
  mixins: [validationMixin, mixinGetEmpresaEvento],
  data () {
    return {
      eventos: [],
      empresas: [],
      modelBusca: {
        evento: null,
        empresa: null,
        inclusao: true
      },
      selecionados: [],
      resultadoPesquisa: [],
      dialogDetalhes: false,
      catDetalhe: null
    }
  },
  computed: {
    eventoErro () {
      return handleErrors(this.$v.modelBusca.evento)
    },
    empresaErro () {
      return handleErrors(this.$v.modelBusca.empresa, 'Empresa')
    },
    headers () {
      const { evento } = this.modelBusca
      return evento ? fieldsHeaders(evento) : []
    }
  },
  methods: {
    ...mapActions(['snackSuccess', 'snackError', 'snackWarning', 'snackInfo']),
    ...mapMutations(['setLoading']),
    buscarInformacoes () {
      this.selecionados = []
      const codEvento = this.modelBusca.evento
      const codEmpresa = this.modelBusca.empresa
      const inclusao = this.modelBusca.inclusao
      this.setLoading(true)
      getInformacoesEnvio({ codEvento, codEmpresa, inclusao })
        .then(data => {
          if (Array.isArray(data)) {
            this.resultadoPesquisa = data.map(o => {
              return { ...o, esocial: 'Pendente' }
            })
          } else {
            this.snackWarning('Não trouxe resultados')
          }
        })
        .catch(e => this.snackError(e))
        .finally(() => this.setLoading(false))
    },
    mudouPesquisa (model) {
      this.resultadoPesquisa = []
      this.selecionados = []
      model.$touch()
    },
    enviarInformacoes () {
      const tipoLote = this.modelBusca.evento
      const empresa = this.modelBusca.empresa
      const objFlatten = this.selecionados.reduce((acc, o) => {
        const op = o.operacao
        if (acc.hasOwnProperty(op)) {
          acc[op].push(o.id)
          acc = { ...acc }
        }
        return acc
      }, { ALTERACAO: [], INCLUSAO: [], EXCLUSAO: [], NORMAL: [] })
      let resultado = []
      for (let operacao in objFlatten) {
        if (objFlatten[operacao].length > 0) {
          resultado = [...resultado, { tipoLote, empresa, ids: objFlatten[operacao], parametros: { operacao } }]
        }
      }
      console.log(resultado)
      if (resultado.length === 0) {
        this.snackInfo('Nenhuma informação para enviar')
        return
      }
      const promises = resultado.map(obj => postInformacoesEnvio(obj))
      this.setLoading(true)
      Promise.all(promises)
        .then(data => {
          console.log('resultado', data)
          this.snackSuccess(data[0].mensagem)
        })
        .catch(e => {
          console.log(e)
          this.snackError('Aconteceu algum erro')
        })
        .finally(() => {
          this.buscarInformacoes()
          this.setLoading(false)
        })
    },
    atualizarInformacoes () {
      const listaIds = this.selecionados.map(o => o.id)
      const codEvento = this.modelBusca.evento
      this.setLoading(true)
      postImportacao({ listaIds, codEvento })
        .then(data => {
          this.snackSuccess(data)
        })
        .catch(e => this.snackError(e))
        .finally(() => {
          this.setLoading(false)
          this.buscarInformacoes()
        })
    },
    limparDados () {
      this.modelBusca = { evento: null, empresa: null, inclusao: true }
      this.resultadoPesquisa = []
      this.selecionados = []
      this.$v.$reset()
    },
    visualizarDetalhesCat (idCat) {
      console.log('id it people', idCat)
      getDetalhesCat(idCat)
        .then(data => {
          console.log(data)
          this.catDetalhe = data
          this.dialogDetalhes = true
        })
        .catch(e => console.log(e))
    }
  },
  validations: {
    modelBusca: {
      evento: { required },
      empresa: { required }
    }

  }
}

</script>
