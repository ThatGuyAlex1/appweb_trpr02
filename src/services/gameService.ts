import axios from 'axios'
import type Player from '../scripts/playerScore'
// import { API } from '@/shared/config'

// Note sur le gestion des erreurs:
// - Dans ce projet, la gestion des erreurs (try/catch) est gérée par le code qui utilise ce service.
// - Dans un contexte d'entreprise, il serait utile de loguer les erreurs qui surviennent dans ce service et ensuite de les relancer en précisant le contexte de l'erreur.

const API_URL = 'http://127.0.0.1:3000'

async function getShips () {
  const { data } = await axios.get(`${API_URL}/ships`)
  return data
}

async function getCharacters () {
  const { data } = await axios.get(`${API_URL}/characters`)
  return data
}

async function getRankings () {
  const { data } = await axios.get(`${API_URL}/ranking`)
  return data
}

async function postRanking (name : string, score : number) {
  const dataSent = {
    name: name,
    score: score
  };
  const { data } = await axios.post(`${API_URL}/ranking`, dataSent)
  return data
}


export const gameService = {
  getShips,
  getCharacters,
  getRankings,
  postRanking
}