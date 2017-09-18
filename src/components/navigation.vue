<template>
  <v-card height="200px">
    <div class="headline text-xs-center pa-5">Active: {{ selected_button }}</div>
    <v-bottom-nav absolute :value="true" :active.sync="selected_button" class="transparent">
      <v-btn flat class="teal--text" value="path">
        <span>Path</span>
      </v-btn>
      <v-btn flat class="teal--text" value="variables">
        <span>Variables</span>
      </v-btn>
    </v-bottom-nav>
  </v-card>
</template>

<script>
  export default {
    data () {
      return {
        selected_button: 'path'
      }
    }
  }
</script>