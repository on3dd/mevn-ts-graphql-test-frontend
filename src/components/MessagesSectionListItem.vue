<template>
  <div class="messages-section__list__item">
    <span class="messages-section__list__item__author">{{data.author.name}}</span>
    <span class="messages-section__list__item__time">{{localedDate}}</span>
    <span
        v-if="!isChanging"
        :key="isChanging"
        class="messages-section__list__item__text"
    >
      {{data.text}}
    </span>
    <input
        v-else
        :key="isChanging"
        v-model="inputText"
        type="text"
        ref="input"
        class="messages-section__list__item__text__input"
    >
    <section class="messages-section__list__item__controls">
      <button
          @click="updateItem"
          class="control"
      >
        <FontAwesomeIcon
            icon="edit"
            :style="styleOptions('#27ae60', 'white')"
        />
      </button>
      <button
          @click="deleteItem"
          class="control"
      >
        <FontAwesomeIcon
            icon="minus"
            :style="styleOptions('#c0392b', 'white')"
        />
      </button>
    </section>
  </div>
</template>

<script lang="ts">
  import {Component, Vue, Prop} from "vue-property-decorator";
  import updateMessageQuery from "@/graphql/updateMessage";
  import deleteMessageQuery from "@/graphql/deleteMessage";
  import IMessage from "@/types/Message";
  import {IStatus} from "@/types/Status";
  import getMessages from "@/graphql/getMessages";

  @Component
  export default class MessagesSectionListItem extends Vue {
    $refs!: {
      input: HTMLInputElement;
    };

    @Prop({type: Object, required: true}) data!: IMessage;

    private isChanging = false;
    private inputText = this.data.text;

    mounted() {
      console.log(this.data);
    }

    private async updateItem() {
      if (!this.isChanging) {
        this.isChanging = true;
        await this.$nextTick();
        this.$refs.input.focus();
      } else {
        const response = await this.$apollo.mutate({
          mutation: updateMessageQuery,
          variables: {
            id: this.data._id,
            newText: this.inputText,
          },
          update: (cache, {data}) => {
            // console.log(data);
            if (data?.updateMessage === undefined) return;

            const responseStatus = data.updateMessage.status;
            if (responseStatus.status === 'error') return console.error(responseStatus.message);

            const messages = cache.readQuery({
              query: getMessages,
            }) as { messages: IMessage[] };

            // console.log(messages.messages);

            const currentMessage = messages.messages.find((el: IMessage) => el._id === this.data._id);
            if (currentMessage === undefined) return console.error(`Cannot find message with id ${this.data._id}`);

            currentMessage.text = this.inputText;

            cache.writeQuery({
              query: getMessages,
              data: messages,
            });
          },
        }) as { data: { updateMessage: { status: IStatus } } };

        console.log(response.data.updateMessage);
        this.isChanging = false;
      }
    }

    private async deleteItem() {
      const response = await this.$apollo.mutate({
        mutation: deleteMessageQuery,
        variables: {
          id: this.data._id,
        },
        update: (cache, {data}) => {
          // console.log(data);
          if (data?.deleteMessage === undefined) return;

          const responseStatus = data.deleteMessage.status;
          if (responseStatus.status === 'error') return console.error(responseStatus.message);

          const messages = cache.readQuery({
            query: getMessages,
          }) as { messages: IMessage[] };

          // console.log(messages.messages);

          const idx = messages.messages.findIndex((el: IMessage) => el._id === this.data._id);
          if (idx === -1) return console.error(`Cannot find message with id ${this.data._id}`);

          messages.messages.splice(idx, 1);

          cache.writeQuery({
            query: getMessages,
            data: messages,
          });
        },
      }) as { data: { deleteMessage: { status: IStatus } } };

      console.log(response.data.deleteMessage);
    }

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

      &__input {
        display: block;
        margin: 0 0;
        height: 22px;
      }
    }

    &__controls {
      position: absolute;
      top: 0;
      right: 0;

      .control {
        padding: 0;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        height: 1.5rem;
        width: 1.5rem;
        display: inline-block;
        margin-right: 5px;
        transition: all .1s ease-out;
        background-color: transparent;

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