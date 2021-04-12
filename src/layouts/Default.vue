<template>
  <v-app>
    <slot name="header" />

    <v-main>
      <div class="fill">
        <v-container>
          <slot name="body" />
        </v-container>
        <v-spacer />
        <v-divider />
        <v-footer color="grey lighten-4">
          <slot name="footer" />
        </v-footer>
      </div>
    </v-main>

    <slot name="dependence" />
  </v-app>
</template>

<style lang="scss" scoped>
  @import '~vuetify/src/styles/styles.sass';

  .v-application {
    &.theme--light {
      background-color: map-get($grey, 'lighten-3');
    }

    .fill {
      display: flex;
      flex-flow: column;
      height: 100%;
    }
  }
</style>
