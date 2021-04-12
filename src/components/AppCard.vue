<template>
  <v-card class="pa-6">
    <v-card-title class="px-0">
      {{ title }}
      <v-spacer />
      <v-btn icon @click="expanded = !expanded">
        <v-icon>{{ expanded ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
      </v-btn>
    </v-card-title>
    <v-expand-transition>
      <div v-show="expanded">
        <v-divider></v-divider>
        <v-card-text>
          {{ description }}
          <slot name="description" />
        </v-card-text>
      </div>
    </v-expand-transition>

    <slot />
  </v-card>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    },
    description: {
      type: [String, Boolean],
      required: true
    }
  },

  data: () => ({
    expanded: false
  })
}
</script>
