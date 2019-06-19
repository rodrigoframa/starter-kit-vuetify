const mensagemErro = {
  email: 'inválido',
  minLength: 'não atingiu o limite mínimo',
  required: 'obrigatório',
  maxLength: 'ultrapassou o limite máximo'
}

export default function (model, nameLabel = 'Campo') {
  const errors = []
  if (!model.$dirty) return errors
  const params = model.$params
  for (let validators in params) {
    !model[validators] && errors.push(`${nameLabel} ${mensagemErro[validators]}`)
  }
  return errors
}
