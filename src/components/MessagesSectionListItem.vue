<template>
  <div class="messages-section__list__item">
    <span class="messages-section__list__item__author">{{data.author.name}}</span>
    <span class="messages-section__list__item__time">{{data.date}}</span>
    <span class="messages-section__list__item__text">{{data.text}}</span>
  </div>
</template>

<script lang="ts">
  import {Component, Vue, Prop} from "vue-property-decorator";
  import IMessage from "@/types/Message";

  @Component
  export default class MessagesSectionListItem extends Vue {
    @Prop({type: Object, required: true}) data!: IMessage;
  }
</script>

<style scoped lang="scss">
  .messages-section__list__item {
    display: block;
    margin-bottom: 10px;

    &__author {
      font-size: 1.25rem;
      font-weight: 600;
      margin-right: 10px;
    }

    &__time {
      font-size: .9rem;
      font-weight: 200;
    }

    &__text {
      display: block;
    }
  }
</style>