<template>
  <section class="messages-section">
    <MessagesSectionList :data="[{author: 'Vova Putin', date: '02.02 14:88', text:'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur excepturi, fugit maiores minus placeat vel?'}]"/>
  </section>
</template>

<script lang="ts">
  import {Component, Vue} from "vue-property-decorator";
  import MessagesSectionList from "./MessagesSectionList.vue";

  @Component({
    components: {
      MessagesSectionList,
    }
  })
  export default class MessagesSection extends Vue {

  }
</script>

<style scoped lang="scss">
  .messages-section {
    display: flex;
    flex-direction: column;
  }
</style>