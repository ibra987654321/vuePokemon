import { createStore } from 'vuex'
import axios from 'axios'
export default createStore({
  state: {
    listOfPokemons: [],
    searchQuery: '',
    snackbar: {
      model: false,
      text: `Hello, I'm a snackbar`,
    },
    selected:    null,
    selectItems: [
      {
        number: 1,
        name: 'normal'
      },
      {
        number: 2,
        name: 'fighting'
      },
      {
        number: 3,
        name: 'flying'
      },
      {
        number: 4,
        name: 'poison'
      },
      {
        number: 5,
        name: 'ground'
      },
    ],
        loading: false
  },
  getters: {
  },
  mutations: {
    setSnackbar(state, value) {
      state.snackbar.model = true
      state.snackbar.text = value
    }
  },
  actions: {
    getAllList(store) {
     return  axios.get('https://pokeapi.co/api/v2/pokemon')
         .then(r => {
           store.state.listOfPokemons = r.data.results
         })
         .catch(e => {
           store.commit('setSnackbar', 'Что то пошло не так!')
         })
    },
    getPakemonId(_, id) {
     return  axios.get('https://pokeapi.co/api/v2/pokemon/' + id)
    },
    getPakemonDescription(_, name) {
     return  axios.get('https://pokeapi.co/api/v2/pokemon-species/' + name)
    },
    getPakemonByType(store, number) {
      store.state.loading = true
     return  axios.get('https://pokeapi.co/api/v2/type/' + number)
         .then(r => {
           store.state.listOfPokemons = []
           for (let i = 0; i < 10; i++) {
             store.state.listOfPokemons.push(r.data.pokemon[i].pokemon)
           }
           store.state.loading = false
         })
         .catch(e => {
           store.commit('setSnackbar', 'Что то пошло не так!')
           store.state.loading = false
         })
    },
  },
  modules: {
  }
})
