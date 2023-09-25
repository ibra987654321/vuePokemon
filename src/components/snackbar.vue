<template>
  <div class="text-center ma-2">
    <v-snackbar
        v-model="$store.state.snackbar.model"
    >
      {{ $store.state.snackbar.text }}

      <template v-slot:actions>
        <v-btn
            color="pink"
            variant="text"
            @click="$store.state.snackbar.model = false"
        >
          Закрыть
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
export default {
  name: "snackbar"
}
</script>

<style scoped>

</style>
