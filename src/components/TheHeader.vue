<template>
  <div>
    <v-app-bar class="transparent" app absolute flat>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>{{ name }}</v-toolbar-title>
    </v-app-bar>

    <v-navigation-drawer app fixed v-model="drawer">
      <v-list>
        <v-list subheader>
          <v-list-item>
            <v-list-item-avatar>
              <v-img :src="user.icon"></v-img>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title class="title">
                {{ user.name }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item>
            <v-btn block depressed>Logout</v-btn>
          </v-list-item>
        </v-list>

        <v-divider />

        <v-list nav dense>
          <v-list-item-group color="primary">
            <v-list-item to="/page">
              <v-list-item-icon>
                <v-icon>mdi-note</v-icon>
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title>Page</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

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
    drawer: true
  })
}
</script>
