<template>
  <notice>
    <template #v-col>
      <v-col cols="12" sm="6" md="5" lg="4">
        <v-card class="pa-6">
          <v-card-title class="text-h4 justify-center">
            Login Account
          </v-card-title>

          <v-card-text class="text-center">
            You need to log in with your Google account to use the app.
            If you don't have a Google account,
            <a href="https://www.google.com/intl/ja/account/about/">click here</a>.
          </v-card-text>

          <v-card-actions class="justify-center">
            <v-btn href="/api/auth/google">
              <!-- <v-icon>mdi-google</v-icon> -->
              Google with Login
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </template>
  </notice>
</template>

<script>
import Notice from '@/layouts/Notice.vue'

export default {
  components: {
    Notice
  }
}
</script>
