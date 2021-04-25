<template>
  <default>
    <template #header>
      <the-header name="Bookshelf" :user="user" />
    </template>

    <template #body>
      <v-row justify="center">
        <v-col cols="12" md="8">
          <app-card title="Note" description>
            <template #description>
              This is the notebook where I keep all the pages that passed the test.
            </template>

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
import AppCard from '@/components/AppCard.vue'
import PageTable from '@/components/PageTable.vue'

export default {
  components: {
    Default,
    TheHeader,
    AppCard,
    PageTable
  },

  created() {
    this.selected(this.page)
    this.$store.dispatch('auth/request', {
      url: '/api/notes/size',
      cb: ({ data }) => {
        this.size = data.count
      }
    })
  },

  data: () => ({
    page: 1,

    current: {},
    size: 0
  }),

  methods: {
    selected(i) {
      this.$store.dispatch('auth/request', {
        url: '/api/notes/open',
        params: { offset: i - 1 },
        cb: ({ data }) => {
          this.current = data.page
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
