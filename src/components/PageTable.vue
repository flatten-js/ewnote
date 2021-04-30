<template>
  <v-data-table
    :headers="headers"
    :items="page.data"
  >
    <template v-slot:item.file="{ item }">
      <div class="text-right">
        <audio
          class="audio d-block my-2"
          :src="item.file | soundsPath"
          controls
        />
      </div>
    </template>
    <template v-slot:item.miss="{ item }">
      <v-simple-checkbox
        v-model="item.miss"
        disabled
      />
    </template>
  </v-data-table>
</template>

<style scoped>
  .audio:focus {
    outline: 0;
  }
</style>

<script>
export default {
  props: {
    page: {
      type: Object,
      default: () => ({})
    }
  },

  filters: {
    soundsPath(file) {
      return `/sounds/${file}`
    }
  },

  data: () => ({
    headers: [
      { text: "Word", value: "word" },
      { text: "Meaning", value: "meaning" },
      { text: "Listening", value: "file" },
      { text: "Miss", value: "miss" }
    ],
  })
}
</script>
