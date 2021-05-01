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

            <v-row>
              <v-spacer />
              <v-col cols="12" md="2">
                <v-btn color="primary" block @click="dialog = true">New</v-btn>
              </v-col>
            </v-row>

            <v-row class="ma-0">
              <v-col class="px-0">
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

    <template #dependence>
      <v-dialog
        content-class="v-dialog--custom"
        v-model="dialog"
        persistent
      >
        <v-card>
          <v-card-title class="headline">
            Create a new note
          </v-card-title>
          <v-card-text>
            <v-form ref="form" lazy-validation>
              <v-text-field
                v-model="name"
                label="Name"
                :rules="rule.name"
                hint="Spaces will be replaced with hyphens to create the name"
                @input="input"
              />
              <v-text-field
                v-model="description"
                label="Description"
                hide-details
              />
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn @click="dialog = false">Cancel</v-btn>
            <v-btn color="primary" @click="create">Create Note</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </template>
  </default>
</template>

<style lang="scss" scoped>
  @import '~vuetify/src/styles/styles.sass';

  ::v-deep {
    @media #{map-get($display-breakpoints, 'md-and-up')} {
      .v-dialog--custom {
        width: 50% !important;
      }
    }
  }

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
    notes: [],

    name: '',
    description: '',
    rule: {
      name: [
        v => !!v || "Name is required"
      ]
    },

    dialog: false
  }),

  methods: {
    _validate() {
      return this.$refs.form.validate()
    },
    all() {
      this.$store.dispatch('auth/request', {
        url: '/api/notes/all',
        cb: ({ data }) => {
          this.notes = data.all
        }
      })
    },
    input(name) {
      this.name = name.split(/\s/).join('-')
    },
    create() {
      if (!this._validate()) return

      const { name, description } = this
      this.$store.dispatch('auth/request', {
        url: '/api/notes/create',
        params: { name, description },
        cb: () => {
          this.dialog = false
          this.all()
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
