<template>
  <div>
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
      <v-row justify="end">
        <v-col cols="12" md="2">
          <v-btn block :disabled="limit.is" @click="test">{{ limit.display }}</v-btn>
        </v-col>
        <v-col cols="12" md="2">
          <v-btn block :disabled="!complete" @click="next">Next Page</v-btn>
        </v-col>
      </v-row>
    </v-footer>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
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

    headers: [
      { text: "Word", value: "word" },
      { text: "Meaning", value: "meaning" },
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
    add() {
      if (!this._validate()) return
      const { word, meaning } = this
      this.$store.commit('page/write', { word, meaning, miss: true })
      this._erase()
    },
    test() {
      this.$router.push('/page/test')
    },
    next() {
      // MVP Specifications
      this.$store.commit('page/reset')
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
