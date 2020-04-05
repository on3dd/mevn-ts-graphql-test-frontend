<template>
  <div class="messages-section__list__item">
    <span class="messages-section__list__item__author">{{data.author}}</span>
    <span class="messages-section__list__item__time">{{data.date}}</span>
    <span class="messages-section__list__item__text">{{data.text}}</span>
  </div>
</template>

<script lang="ts">
  import {Component, Vue, Prop} from "vue-property-decorator";

  @Component
  export default class MessagesSectionListItem extends Vue {
    @Prop({type: Object, required: true}) data!: any;
  }
</script>

<style scoped lang="scss">

</style>