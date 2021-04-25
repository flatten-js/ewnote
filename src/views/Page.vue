<template>
  <default>
    <template #header>
      <the-header name="Page" :user="user" />
    </template>

    <template #body>
      <v-row>
        <v-col cols="12" md="6">
          <app-card title="Register" description>
            <template #description>
              If a word has more than one meaning, you can separate them with commas.
              Also, if the word has already been registered, the meaning will be updated.
            </template>

            <v-row>
              <v-col>
                <v-form ref="form" lazy-validation>
                  <v-row>
                    <v-col>
                      <v-text-field
                        v-model="word"
                        :rules="rule.word"
                        label="Word"
                        autocomplete="off"
                        required
                      />
                    </v-col>
                  </v-row>

                  <v-row>
                    <v-col>
                      <v-text-field
                        v-model="meaning"
                        :rules="rule.meaning"
                        label="Meaning"
                        autocomplete="off"
                        required
                      />
                    </v-col>
                  </v-row>

                  <v-row>
                    <v-spacer />
                    <v-col cols="12" md="3">
                      <v-btn block color="primary" @click="add">ADD</v-btn>
                    </v-col>
                  </v-row>
                </v-form>
              </v-col>
            </v-row>
          </app-card>
        </v-col>

        <v-col cols="12" md="6">
          <app-card title="Data Table" description>
            <template #description>
              You can check the data you have registered.
              In the "Listening" section, you can listen to the pronunciation of the words,
              and in the "Miss" section, the results of the test will be reflected.
            </template>

            <v-row>
              <v-col>
                <page-table :page="page" />
              </v-col>
            </v-row>
          </app-card>
        </v-col>
      </v-row>
    </template>

    <template #footer>
      <v-row class="ma-0" dense>
        <v-spacer />
        <v-col cols="12" md="2">
          <v-btn block :disabled="limit.is" @click="test">{{ limit.display }}</v-btn>
        </v-col>
        <v-col cols="12" md="2">
          <v-btn block :disabled="!complete" @click="next">Next Page</v-btn>
        </v-col>
      </v-row>
    </template>

    <template #dependence>
      <v-dialog
        content-class="v-dialog--custom"
        v-model="dialog.restore"
        persistent
      >
        <v-card>
          <v-card-title class="headline">
            Do you want to restore the page?
          </v-card-title>
          <v-card-text>
            The last time you operated on a page, it was interrupted in the middle.
            Please select Restore to operate the page with the previous data.
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn @click="dialog.restore = false">
              Cancel
            </v-btn>
            <v-btn color="primary" @click="restore">
              Restore
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </template>
  </default>
</template>

<style lang="scss">
  @import '~vuetify/src/styles/styles.sass';

  @media #{map-get($display-breakpoints, 'md-and-up')} {
    .v-dialog--custom {
      width: 50% !important;
    }
  }
</style>

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

  mounted() {
    if (this.page.line) return
    if (!localStorage.getItem('page/data')) return
    this.dialog.restore = true
  },

  data: () => ({
    word: "",
    meaning: "",
    rule: {
      word: [
        v => !!v || "Word is required"
      ],
      meaning: [
        v => !!v || "Meaning is required"
      ]
    },

    dialog: {
      restore: false
    }
  }),

  methods: {
    _validate() {
      return this.$refs.form.validate()
    },
    _erase() {
      this.$refs.form.reset()
    },
    add() {
      if (!this._validate()) return

      const { word, meaning } = this

      this.$store.dispatch('auth/request', {
        url: '/api/gcp/text-to-speech',
        params: { text: word },
        cb: ({ data }) => {
          this.$store.commit('page/write', { word, file: data.file, meaning, miss: true })
          this._erase()
        }
      })
    },
    test() {
      this.$router.push('/page/test')
    },
    next() {
      this.$store.dispatch('auth/request', {
        method: 'post',
        url: '/api/notes/add',
        params: { page: this.page },
        cb: () => {
          this.$store.commit('page/reset')
        }
      })
    },
    restore() {
      this.dialog.restore = false
      this.$store.commit('page/restore')
    }
  },

  computed: {
    ...mapGetters({
      user: 'auth/user',
      page: 'page/get',
      complete: 'page/complete'
    }),
    limit() {
      const state = this.$store.getters['page/limit']
      return {
        display: state ? `${state} MORE` : 'DO TEST',
        is: !!state
      }
    }
  }
}
</script>
