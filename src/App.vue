<template>
  <v-app>
    <v-layout ref="app" class="rounded rounded-md">
      <v-app-bar color="grey-lighten-2" name="app-bar">
        <v-card
            class="mx-auto"
            color="grey-lighten-3"
            width="400"
        >
          <v-card-text>
            <v-select
                v-model="$store.state.selected"
                density="compact"
                variant="solo"
                label="Select type"
                :items="$store.state.selectItems"
                item-value="number"
                item-title="name"
                hide-details
            ></v-select>
          </v-card-text>
        </v-card>
        <v-card
            class="mx-auto"
            color="grey-lighten-3"
            width="400"
        >
          <v-card-text>
            <v-text-field
                v-model="$store.state.searchQuery"
                density="compact"
                variant="solo"
                label="Search templates"
                append-inner-icon="mdi-magnify"
                single-line
                hide-details
            ></v-text-field>
          </v-card-text>
        </v-card>
      </v-app-bar>


      <v-main class="d-flex align-center justify-center mt-7" style="min-height: 300px;">
        <router-view/>
      </v-main>

    </v-layout>
    <snackbar></snackbar>
  </v-app>
</template>

<script>
import snackbar from "@/components/snackbar";

export default {
  name: 'App',
components: {
  snackbar
},
  data: () => ({
  }),
  watch: {
    '$store.state.searchQuery'(v) {
      if (v) {
        this.$store.state.listOfPokemons = this.$store.state.listOfPokemons.filter(pakemon => pakemon.name.toLowerCase().includes(v));
        return
      }
      this.$store.dispatch('getAllList')
    },
    '$store.state.selected'(v) {
      if (v) {
        this.$store.dispatch('getPakemonByType', v)
      }

    },
  }
}
</script>
