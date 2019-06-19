import { httpGerador, httpImportador, httpItPeople } from '../plugins/http'
import { getData, getError, mountPathQueryString } from '../support/get'

export const getEmpresas = () => httpImportador.get('empresas/').then(getData).catch(getError)

export const getEventos = () => httpImportador.get('esocial/eventos/').then(getData).catch(getError)

export const getInformacoesEnvio = params => {
  const path = mountPathQueryString(params)
  return httpImportador.get(`esocial/informacoes/${path}`).then(getData).catch(getError)
}

export const getInformacoesConsultaEventoGeral = params => {
  const pathConsultaInfo = mountPathQueryString(params)
  const resultConsulta = httpGerador.get(`eventos/buscar/${pathConsultaInfo}`).then(getData).catch(getError)
  console.log(JSON.stringify(resultConsulta))
  return resultConsulta
}
export const postInformacoesEnvio = obj => {
  return httpGerador.post('eventos/enviar', obj).then(getData).catch(getError)
}

export const postImportacao = obj => {
  return httpImportador.post('importacao/', obj).then(getData).catch(getError)
}

export const getDetalhesCat = idCat => {
  return httpItPeople.get(`cat/${idCat}/`).then(getData).catch(getError)
}
