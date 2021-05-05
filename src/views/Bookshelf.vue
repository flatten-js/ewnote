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
                <v-btn color="primary" block @click="open('new')">New</v-btn>
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
                        <v-list-item-subtitle>Updated on {{ note.update_date }}</v-list-item-subtitle>
                      </v-list-item-content>
                      <v-list-item-action>
                        <v-menu bottom left>
                          <template v-slot:activator="{ on, attrs }">
                            <v-btn icon v-bind="attrs" v-on="on">
                              <v-icon>mdi-dots-vertical</v-icon>
                            </v-btn>
                          </template>

                          <v-list>
                            <v-list-item link @click="openDelete(note.name)">
                              <v-list-item-title>Delete</v-list-item-title>
                            </v-list-item>
                          </v-list>
                        </v-menu>
                      </v-list-item-action>
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
        v-model="dialog.new"
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
                autocomplete="off"
                @input="input"
                :error-messages="error"
              />
              <v-text-field
                v-model="description"
                label="Description"
                autocomplete="off"
                hide-details
              />
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn @click="cancel('new')">Cancel</v-btn>
            <v-btn color="primary" @click="create">Create Note</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-dialog
        content-class="v-dialog--custom"
        v-model="dialog.delete"
        persistent
      >
        <v-card>
          <v-card-title class="headline">
            Are you absolutely sure?
          </v-card-title>
          <v-card-text>
            <p>
              This action is irreversible.
              This will completely delete the pages and words in
              <strong>{{ focus.original }}</strong>
            </p>
            <p class="ma-0">
              To delete, type <strong>{{ focus.original }}</strong>
            </p>
            <v-text-field
              v-model="focus.name"
              autocomplete="off"
              hide-details
            />
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn @click="cancelDelete">Cancel</v-btn>
            <v-btn
              color="error"
              :disabled="!confirmDelete"
              @click="_delete"
            >Delete Note</v-btn>
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

    checking: false,
    error: '',

    focus: {
      original: '',
      name: ''
    },

    dialog: {
      new: false,
      delete: false
    }
  }),

  methods: {
    _reset() {
      this.$refs.form.reset()
      this.cancel('new')
    },
    _validate() {
      const validate = this.$refs.form.validate()
      return validate && !(this.checking || this.error)
    },
    _exists(cb) {
      this.$store.dispatch('auth/request', {
        url: '/api/notes/exists',
        params: { name: this.name },
        cb: ({ data }) => cb(data.count)
      })
    },
    _dialog(name, cond) {
      this.$set(this.dialog, name, cond)
    },
    open(name) {
      this._dialog(name, true)
    },
    cancel(name) {
      this._dialog(name, false)
    },
    openDelete(name) {
      this.$set(this.focus, 'original', name)
      this.open('delete')
    },
    cancelDelete() {
      this.focus = { original: '', name: '' }
      this.cancel('delete')
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
      this.checking = true
      this.name = (name || '').split(/\s/).join('-')

      clearTimeout(this.timeid)
      this.timeid = setTimeout(() => {
        this._exists(count => {
          if (count) this.error = `The note ${this.name} already exists`
          else this.error = ''
          this.checking = false
        })
      }, 500)
    },
    create() {
      if (!this._validate()) return

      const { name, description } = this
      this.$store.dispatch('auth/request', {
        url: '/api/notes/create',
        params: { name, description },
        cb: () => {
          this._reset()
          this.all()
        }
      })
    },
    _delete() {
      this.$store.dispatch('auth/request', {
        url: '/api/notes/delete',
        params: { name: this.focus.name },
        cb: () => {
          this.cancelDelete()
          this.all()
        }
      })
    }
  },

  computed: {
    ...mapGetters({
      user: 'auth/user'
    }),
    confirmDelete() {
      const { focus } = this
      return focus.name && focus.original == focus.name
    }
  }
}
</script>
