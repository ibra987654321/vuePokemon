<template>
  <v-card
      class="mx-auto"
      width="544"
      v-if="!loading"
  >
    <v-img
        :src="url"
        height="500px"
        cover
    ></v-img>

    <v-card-title >
      {{item.name }}
    </v-card-title>

    <v-card-subtitle>
      {{ item.text }}
    </v-card-subtitle>

    <v-card-actions>
      <v-btn
          color="orange-lighten-2"
          variant="text"
      >
        Explore
      </v-btn>

      <v-spacer></v-spacer>

      <v-btn
          :icon="show ? 'mdi-chevron-up' : 'mdi-chevron-down'"
          @click="show = !show"
      ></v-btn>
    </v-card-actions>

    <v-expand-transition>
      <div v-show="show">
        <v-divider></v-divider>

        <v-card-text>
          {{item.desc}}
        </v-card-text>
      </div>
    </v-expand-transition>
  </v-card>
</template>
<script>
export default {
  data:() => ({
    item: {},
    url: '',
    show: false,
    loading: true
  }),
  mounted() {
    this.$store.dispatch('getPakemonId', this.$route.params.name)
        .then(r => {
          this.url = r.data.sprites.other['official-artwork'].front_default
          this.loading = false
        })
        .catch(e => {
          this.$store.commit('setSnackbar', 'Что то пошло не так!')
          this.loading = false
        })
    this.$store.dispatch('getPakemonDescription', this.$route.params.name)
        .then(r => {
          this.item = r.data
          this.item.text = r.data.flavor_text_entries[2].flavor_text
          this.item.desc = `${r.data.flavor_text_entries[0].flavor_text } ${r.data.flavor_text_entries[1].flavor_text } ${r.data.flavor_text_entries[4].flavor_text }`
          this.loading = false
        })
        .catch(e => {
          this.$store.commit('setSnackbar', 'Что то пошло не так!')
          this.loading = false
        })
  }
}
</script>
