<template>
  <v-app>
    <v-main>
      <v-container fluid fill-height>
        <v-row justify="center">
          <slot name="v-col" />
        </v-row>
      </v-container>
    </v-main>
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
