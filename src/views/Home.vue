<template>
  <div class="home">
    <MessagesSection/>
  </div>
</template>

<script lang="ts">
  import {Component, Vue} from "vue-property-decorator";
  import MessagesSection from "@/components/MessagesSection.vue";

  @Component({
    components: {
      MessagesSection,
    }
  })
  export default class Home extends Vue {}
</script>

<style scoped lang="scss">
  .home {
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
  }
</style>
