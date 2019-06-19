const headerEvento = {
  1060: [
    { text: 'Filial', value: 'codFilial' },
    { text: 'AmbTrab', value: 'idAmbTrabalhoGm' },
    { text: 'Nome', value: 'nome' },
    { text: 'Data Inicio', value: 'dataInicio' },
    { text: 'Situação', value: 'ativo' }
  ],
  2210: [
    { text: 'CPF', value: 'cpfTrab' },
    { text: 'Data Acidente', value: 'dataAcidente' },
    { text: 'Hora Acidente', value: 'horaAcidente' },
    { text: 'Detalhe Cat', type: 'action' }
  ],
  2220: [
    { text: 'Nº Guia', value: 'idGuia' },
    { text: 'CPF', value: 'funcionario', type: 'nested', valueChild: 'cpfTrab' },
    { text: 'Data Aso', value: 'dataAso' },
    { text: 'Resultado Aso', value: 'resultadoAso' },
    { text: 'Tipo Exame', value: 'tipoExame' },
    { text: 'Médico', value: 'medicoAso', type: 'nested', valueChild: 'nome' },
    { text: 'CRM', value: 'medicoAso', type: 'nested', valueChild: 'nrCRM' }
  ],
  2221: [
    { text: 'CPF', value: 'cpfTrab' },
    { text: 'Data do Exame', value: 'dtExame' },
    { text: 'Recusou Exame?', value: 'indRecusa' },
    { text: 'Médico', value: 'nmMed' },
    { text: 'CRM médico', value: 'nrCrm' },
    { text: 'CNPJ Lab', value: 'cnpjLab' }
  ],
  2240: [
    { text: 'CPF', value: 'cpfTrab' },
    { text: 'Data Condição', value: 'dtIniCondicao' },
    { text: 'Descrição Ativ.', value: 'dscAtivdes' },
    { text: 'Obs. Reg. Ambientais', value: 'obs' }
  ],
  2245: [
    { text: 'CPF', value: 'cpfTrab' },
    { text: 'Codigo', value: 'codigo' },
    { text: 'Treinamento', value: 'observacaoTreinamento' }
  ]
}

export default codEvento => {
  return [{ text: 'Id', align: 'left', sortable: false, value: 'id' },
    { text: 'Empresa', align: 'left', sortable: false, value: 'codEmpresa' },
    ...headerEvento[codEvento],
    { text: 'Observação', value: 'observacao', type: 'chip' },
    { text: 'Número Recibo eSocial', value: 'numRecibo' }
  ]
}
