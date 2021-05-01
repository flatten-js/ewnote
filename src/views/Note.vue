<template>
  <default>
    <template #header>
      <the-header name="Bookshelf" :user="user" />
    </template>

    <template #body>
      <v-row justify="center">
        <v-col cols="12" xl="8">
          <app-card :title="name" :description="description">
            <page-table :page="current" />
            <v-pagination
              v-model="page"
              :length="size"
              total-visible="7"
              @input="selected"
            />
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
import PageTable from '@/components/PageTable.vue'
import AppCard from '@/components/AppCard.vue'

export default {
  components: {
    Default,
    TheHeader,
    PageTable,
    AppCard
  },

  created() {
    this.name = this.$route.params.name

    this.selected(this.page)
    this.$store.dispatch('auth/request', {
      url: '/api/notes/size',
      params: { name: this.name },
      cb: ({ data }) => {
        this.size = data.count
      }
    })
  },

  data: () => ({
    name: '',
    description: '',

    page: 1,

    current: {},
    size: 0
  }),

  methods: {
    selected(i) {
      this.$store.dispatch('auth/request', {
        url: '/api/notes/open',
        params: { name: this.name, offset: i - 1 },
        cb: ({ data }) => {
          this.description = data.description
          this.current = data.page || {}
        }
      })
    }
  },

  computed: {
    ...mapGetters({
      user: 'auth/user'
    })
  }
}
</script>
