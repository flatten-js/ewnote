<template>
  <div>
    <v-container>
      <v-row>
        <v-col>
          <h1>Test</h1>
        </v-col>
      </v-row>

      <template v-if="finished">
        <v-row>
          <v-col>
            <template v-for="text, i in question.text.split(',')">
              <p :key="i">{{ text }}</p>
            </template>
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <v-btn @click="$router.push('/page')">Return</v-btn>
          </v-col>
        </v-row>
      </template>

      <template v-else>
        <v-row>
          <v-col>
            <p>({{ question.i }}) Give the meaning of the following English words</p>
          </v-col>
        </v-row>

        <v-form ref="form">
          <v-row>
            <v-col>
              <v-text-field
                :value="question.word"
                label="Word"
                readonly
                disabled
              />
              <v-text-field
                ref="answer"
                v-model="answer"
                label="Meaning"
                :disabled="finished"
                autocomplete="off"
                required
              />
            </v-col>
          </v-row>
        </v-form>

        <v-row>
          <v-col>
            <v-btn :disabled="finished" @click="next">next</v-btn>
          </v-col>
        </v-row>
      </template>
    </v-container>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import utils from '@/utils'

export default {
  data: () => ({
    started: false,

    test: true,
    question: {},
    answers: [],
    answer: ''
  }),

  mounted() {
    this.start()
  },

  methods: {
    start() {
      this.started = true
      this.test = utils.shuffle(this.page.data).entries()
      this._next()
    },
    _next() {
      this._erase()

      const question = this.test.next()
      if (question.done) return this.finish()

      this.$refs.answer.focus()
      this.question = this._question(question.value)
    },
    next() {
      const { question, answer } = this
      this.answers.push({ word: question.word, meaning: answer || "" })
      this._next()
    },
    _erase() {
      this.$refs.form.reset()
    },
    _question([i, data]) {
      return { i: i + 1, ...data }
    },
    _check(answers = this.answers) {
      return answers.map(answer => {
        const line = this.page.data.find(line => line.word == answer.word)
        const check = answer.meaning.split('、').every(meaning => {
          return line.meaning.split('、').includes(meaning)
        })
        return { word: line.word, check: !check }
      })
    },
    finish() {
      const answers = this._check()
      this.$store.commit('page/update', { answers })

      this.test = null

      this.question = {
        text: 'All tests are complete,Please return to the Page to check the results'
      }
    }
  },

  computed: {
    ...mapGetters({
      page: 'page/get'
    }),
    finished() {
      return this.started && !this.test
    }
  }
}
</script>
