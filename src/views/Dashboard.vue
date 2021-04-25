<template>
  <default>
    <template #header>
      <the-header name="Dashboard" :user="user" />
    </template>

    <template #body>
      <v-row justify="center">
        <v-col cols="12" xl="8">
          <app-card title="Heatmap" description>
            <template #description>
              A calendar heatmap to visualize activity.
              The criterion is the number of words registered.
            </template>

            <heatmap :data="data" />
          </app-card>
        </v-col>
      </v-row>
    </template>
  </default>
</template>

<script>
import { mapGetters } from 'vuex'

import Default from '@/layouts/Default.vue'
import TheHeader from '@/components/TheHeader.vue'
import AppCard from '@/components/AppCard.vue'
import Heatmap from '@/components/Heatmap.vue'

export default {
  components: {
    Default,
    TheHeader,
    AppCard,
    Heatmap
  },

  created() {
    this.$store.dispatch('auth/request', {
      url: '/api/notes/daily',
      cb: ({ data }) => {
        this.data = data.daily
      }
    })
  },

  data: () => ({
    data: []
  }),

  computed: {
    ...mapGetters({
      user: 'auth/user'
    })
  }
}
</script>
