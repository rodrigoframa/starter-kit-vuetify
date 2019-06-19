import { getEmpresas, getEventos } from '../services'

export default {
  mounted () {
    this.setLoading(true)
    Promise.all([getEventos(), getEmpresas()])
      .then(data => {
        this.eventos = data[0]
        this.empresas = data[1]
      })
      .catch(e => {
        console.log(e)
        this.snackError(e)
      })
      .finally(() => this.setLoading(false))
  }
}
