import { get } from 'lodash'

export const getData = obj => get(obj, 'data')

export const getError = e => {
  let erro
  console.log(e.response)
  if (e && e.response && e.response.data) {
    const resp = e.response.data
    erro = resp.message || resp.mensagem
    return Promise.reject(erro)
  } else if (typeof e === 'string') {
    erro = e
    return Promise.reject(erro)
  }
  erro = 'Oops.. Erro inesperado.'
  return Promise.reject(erro)
}

export const mountPathQueryString = obj => {
  let path = '?'
  if (typeof obj === 'object') {
    for (let atributo in obj) {
      path += `${atributo}=${obj[atributo]}&`
    }
  }
  return path
}
