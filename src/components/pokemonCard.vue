<template>
  <v-card v-if="!loading" @click="routing(card.name)">
    <v-img
        :src="url"
        class="align-end"
        gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
        height="400px"
        cover
    >
      <v-card-title class="text-white" v-text="card.name"></v-card-title>
    </v-img>

    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn size="small" color="surface-variant" variant="text" icon="mdi-heart"></v-btn>
      <v-btn size="small" color="surface-variant" variant="text" icon="mdi-bookmark"></v-btn>
      <v-btn size="small" color="surface-variant" variant="text" icon="mdi-share-variant"></v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: {
    card: Object
  },
  name: "pokemonCard",
  data:() => ({
    pakemon: {},
    loading: true,
    url: ''
  }),
  mounted() {
    this.listOfData()
  },
  watch: {
    '$store.state.searchQuery'(v) {
      if (v) {
        this.listOfData()
        return
      }
      setTimeout(() => this.listOfData(), 100)
    },
    '$store.state.selected'(v) {
        setTimeout(() => this.listOfData(), 100)
    },
  },
  methods: {
    listOfData() {
      this.loading = true
      this.$store.dispatch('getPakemonId', this.card.name)
          .then(r => {
            this.url = r.data.sprites.other['official-artwork'].front_default
            this.loading = false
          })
          .catch(e => {
            this.$store.commit('setSnackbar', 'Что то пошло не так!')
            this.loading = false
          })
    },
    routing(name) {
      this.$router.push('/detail/' + name)
    }
  }
}
</script>

<style scoped>

</style>
