<template>
  <section>
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

    <v-container>
      <v-row>
        <v-col>
          <h1>Page</h1>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" md="6">
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
                  <v-col cols="12" md="4">
                    <v-btn block @click="add">ADD</v-btn>
                  </v-col>
                </v-row>
              </v-form>
            </v-col>
          </v-row>
        </v-col>

        <v-col cols="12" md="6">
          <v-row>
            <v-col>
              <v-data-table :headers="headers" :items="page.data">
                <template v-slot:item.file="{ item }">
                  <div class="text-right">
                    <audio class="audio d-block my-2" :src="item.file | soundsPath" controls></audio>
                  </div>
                </template>
                <template v-slot:item.miss="{ item }">
                  <v-simple-checkbox
                    v-model="item.miss"
                    disabled
                  />
                </template>
              </v-data-table>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>

    <v-footer fixed>
      <v-row>
        <v-spacer></v-spacer>
        <v-col cols="12" md="2">
          <v-btn block :disabled="limit.is" @click="test">{{ limit.display }}</v-btn>
        </v-col>
        <v-col cols="12" md="2">
          <v-btn block :disabled="!complete" @click="next">Next Page</v-btn>
        </v-col>
      </v-row>
    </v-footer>
  </section>
</template>

<style lang="scss">
  @import '~vuetify/src/styles/styles.sass';

  @media #{map-get($display-breakpoints, 'md-and-up')} {
    .v-dialog--custom {
      width: 50% !important;
    }
  }
</style>

<style scoped>
  .audio:focus {
    outline: 0;
  }
</style>

<script>
import { mapGetters } from 'vuex'

export default {
  filters: {
    soundsPath(file) {
      return `sounds/${file}`
    }
  },

  mounted() {
    if (this.page.line) return
    if (!localStorage.getItem('page/data')) return
    this.dialog.restore = true
  },

  data: () => ({
    dialog: {
      restore: false
    },

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

    headers: [
      { text: "Word", value: "word" },
      { text: "Meaning", value: "meaning" },
      { text: "Listening", value: "file" },
      { text: "Miss", value: "miss" }
    ]
  }),

  methods: {
    _validate() {
      return this.$refs.form.validate()
    },
    _erase() {
      this.$refs.form.reset()
    },
    async add() {
      if (!this._validate()) return

      const { word, meaning } = this
      const params = { text: word }
      const { data } = await this.axios.get('/api/gcp/text-to-speech', { params })

      this.$store.commit('page/write', { word, file: data.file, meaning, miss: true })
      this._erase()
    },
    test() {
      this.$router.push('/page/test')
    },
    next() {
      // MVP Specifications
      this.$store.commit('page/reset')
    },
    restore() {
      this.dialog.restore = false
      this.$store.commit('page/restore')
    }
  },

  computed: {
    ...mapGetters({
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
