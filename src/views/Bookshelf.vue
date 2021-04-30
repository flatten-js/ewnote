<template>
  <default>
    <template #header>
      <the-header name="Bookshelf" :user="user" />
    </template>

    <template #body>
      <v-row justify="center">
        <v-col cols="12" md="8">
          <app-card title="Notes" description>
            <template #description>
              This is the notebook where I keep all the pages that passed the test.
            </template>

            <!-- <v-row>
              <v-spacer />
              <v-col cols="12" md="2">
                <v-btn color="primary" block @click="new_">New</v-btn>
              </v-col>
            </v-row> -->

            <v-row>
              <v-col>
                <v-list three-line>
                  <template v-for="(note, idx) in notes">
                    <v-divider :key="idx" />
                    <v-list-item :key="note.name">
                      <v-list-item-content>
                        <v-list-item-title class="font-weight-bold">
                          <router-link :to="note.name | convertNotePath">{{ note.name }}</router-link>
                        </v-list-item-title>
                        <v-list-item-subtitle class="my-2">{{ note.description }}</v-list-item-subtitle>
                        <v-list-item-subtitle>Updated on {{ note.updated_at }}</v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                  </template>
                  <v-divider />
                </v-list>
              </v-col>
            </v-row>
          </app-card>
        </v-col>
      </v-row>
    </template>
  </default>
</template>

<style lang="scss" scoped>
  a {
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
</style>

<script>
import { mapGetters } from 'vuex'

import Default from '@/layouts/Default.vue'
import TheHeader from '@/components/TheHeader.vue'
import AppCard from '@/components/AppCard.vue'

export default {
  components: {
    Default,
    TheHeader,
    AppCard
  },

  filters: {
    convertNotePath(name) {
      return `/bookshelf/${name}`
    }
  },

  created() {
    this.all()
  },

  data: () => ({
    notes: []
  }),

  methods: {
    all() {
      this.$store.dispatch('auth/request', {
        url: '/api/notes/all',
        cb: ({ data }) => {
          this.notes = data.all
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
