import axios from 'axios'
import { baseApiUrlWsImportador, baseApiUrlWsGerador, baseApiUrlWsItPeople } from '../config'

export const httpImportador = axios.create({
  baseURL: baseApiUrlWsImportador
})

export const httpGerador = axios.create({
  baseURL: baseApiUrlWsGerador
})

export const httpItPeople = axios.create({
  baseURL: baseApiUrlWsItPeople,
  headers: { 'Authorization': 'JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJjcGYiOiIwNDI4MjI1MzMwNCIsImNhcmdvIjoiUFJPR1JBTUFET1IgSlVOSU9SIElJIiwibm9tZSI6IlJPRFJJR08gRlJBWkFPIE1BSUEifQ.pxPosuOmW8vSSXlM0Y-4EdO_85pnQO4ts3A2oMdcsCQ' }
})
