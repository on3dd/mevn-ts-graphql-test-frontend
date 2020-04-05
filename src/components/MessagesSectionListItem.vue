<template>
  <div class="messages-section__list__item">
    <span class="messages-section__list__item__author">{{data.author.name}}</span>
    <span class="messages-section__list__item__time">{{localedDate}}</span>
    <span class="messages-section__list__item__text">{{data.text}}</span>
    <section class="messages-section__list__item__controls">
      <span class="control">
        <FontAwesomeIcon icon="edit" :style="styleOptions('#27ae60', 'white')"/>
      </span>
      <span class="control">
        <FontAwesomeIcon icon="minus" :style="styleOptions('#c0392b', 'white')"/>
      </span>
    </section>
  </div>
</template>

<script lang="ts">
  import {Component, Vue, Prop} from "vue-property-decorator";
  import IMessage from "@/types/Message";

  @Component
  export default class MessagesSectionListItem extends Vue {
    @Prop({type: Object, required: true}) data!: IMessage;

    private get localedDate(): string {
      return new Date(this.data.date).toLocaleString();
    }

    private styleOptions = (backgroundColor: string, color: string) => {
      return {
        'background-color': backgroundColor,
        'color': color,
      };
    }
  }
</script>

<style scoped lang="scss">
  .messages-section__list__item {
    position: relative;
    display: block;
    margin-bottom: 10px;
    width: 500px;

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

    &__controls {
      position: absolute;
      top: 0;
      right: 0;

      .control {
        border-radius: 50%;
        height: 1.5rem;
        width: 1.5rem;
        display: inline-block;
        margin-right: 5px;
        transition: all .1s ease-out;
        cursor: pointer;

        &:hover {
          filter: brightness(75%);
        }

        &:last-child {
          margin-right: 0;
        }

        svg {
          height: 1.5rem;
          width: 1.5rem;
          border-radius: 50%;
          padding: 5px;
        }
      }
    }
  }
</style>