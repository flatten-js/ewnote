<template>
  <div>
    <v-app-bar class="transparent" app absolute flat>
      <v-btn
        class="mr-4"
        color="white"
        elevation="1"
        :ripple="false"
        fab
        small
        @click="drawer = !drawer"
      >
        <v-icon color="grey">mdi-dots-vertical</v-icon>
      </v-btn>
      <v-toolbar-title>{{ name }}</v-toolbar-title>
    </v-app-bar>

    <v-navigation-drawer app fixed v-model="drawer">
      <v-list>
        <v-list subheader>
          <v-list-item>
            <v-list-item-avatar>
              <v-img :src="user.picture"></v-img>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title class="title">
                {{ user.name }}
              </v-list-item-title>
              <v-list-item-subtitle>Logged In</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-list-item>
            <v-btn block depressed @click="logout">Logout</v-btn>
          </v-list-item>
        </v-list>

        <v-divider />

        <v-list nav dense>
          <v-list-item-group color="primary">
            <template v-for="item in items">
              <v-list-item :to="item.to" :key="item.title">
                <v-list-item-icon>
                  <v-icon>{{ item.icon }}</v-icon>
                </v-list-item-icon>

                <v-list-item-content>
                  <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </template>
          </v-list-item-group>
        </v-list>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<style scoped>
  .v-btn::before {
    background-color: inherit;
    transition: all 0s;
  }
</style>

<script>
export default {
  props: {
    name: {
      type: String,
      default: ''
    },
    user: {
      type: Object,
      default: () => ({})
    }
  },

  data: () => ({
    _drawer: null,

    items: [
      { title: 'Dashboard', icon: 'mdi-view-dashboard', to: '/' },
      { title: 'Page', icon: 'mdi-book-open-page-variant-outline', to: '/page' }
    ]
  }),

  methods: {
    logout() {
      this.$store.dispatch('auth/logout')
    }
  },

  computed: {
    drawer: {
      get () {
        return this.$data._drawer
      },
      set (state) {
        this.$data._drawer = state
      }
    }
  }
}
</script>
