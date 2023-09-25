<template>
 <v-row>
   <v-col cols="12" sm="3"  v-for="item in $store.state.listOfPokemons">
     <pokemon-card  :card="item"></pokemon-card>
   </v-col>
 </v-row>
</template>

<script>
import { defineComponent } from 'vue';
import pokemonCard from "@/components/pokemonCard";

// Components

export default defineComponent({
  name: 'HomeView',
  components: {
    pokemonCard
  },
  data:() => ({
  }),
  mounted() {
    this.$store.dispatch('getAllList')
  },

});
</script>
