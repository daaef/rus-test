import { Octokit } from '@octokit/core'
import Vue from 'vue'
const octokit = new Octokit({
  auth: `26c357893f604bb91e8722b217a71f47184cf119`,
})

export const state = () => ({
  owner: '',
  repo: '',
  result: [],
  dataLoading: true,
  favIDs: [],
})

export const mutations = {
  setResult(state, result) {
    console.log('setting Results')
    state.result = result
  },
  setOwner(state, result) {
    console.log('setting owner')
    state.owner = result
    this.$cookies.set('owner', result)
  },
  setRepo(state, result) {
    console.log('setting repo')
    state.repo = result
  },
  setFavs(state, result) {
    console.log('setting FavID')
    state.favIDs = result
    this.$cookies.set('favIDs', result)
  },
  setLoading(state, result) {
    console.log('setting repo')
    state.dataLoading = result
  },
}

export const actions = {
  nuxtServerInit({ commit }, ctx) {
    const resp = ctx.$fire.database.ref('favs')
    resp.on('value', (snapshot) => {
      const data = snapshot.val()
      console.log('data is', typeof data)
    })
    if (this.$cookies.get('owner')) {
      commit('setOwner', this.$cookies.get('owner'))
    }
    if (this.$cookies.get('favIDs')[0] !== undefined) {
      commit('setFavs', this.$cookies.get('favIDs'))
    }
  },
  async search({ commit, state }, page) {
    console.log('Setting Forks')
    const data = await octokit.request('GET /repos/{owner}/{repo}/forks', {
      owner: this.$cookies.get('owner'),
      repo: state.repo,
      page,
      per_page: 20,
    })
    commit('setResult', data)
  },
}

export const getters = {
  result(state) {
    return state.result
  },
  owner(state) {
    return state.owner
  },
  repo(state) {
    return state.repo
  },
  dataLoading(state) {
    return state.dataLoading
  },
  favIDs(state) {
    return state.favIDs
  },
}
