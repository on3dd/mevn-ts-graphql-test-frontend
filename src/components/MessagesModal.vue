<template>
  <div class="messages-modal-wrapper" ref="modalWrapper">
    <section class="messages-modal">
      <h1 class="messages-modal__header">Add new message</h1>
      <form class="messages-modal__form">
        <label
            for="author"
            class="messages-modal__form__label"
        >
          Author
        </label>
        <input
            id="author"
            class="messages-modal__form__input"
            type="text"
            v-model="author"
        >

        <label
            for="text"
            class="messages-modal__form__label"
        >
          Text
        </label>
        <textarea
            id="text"
            class="messages-modal__form__input"
            v-model="text"
        />

        <button
            @click.prevent="addItem"
            class="messages-modal__form__submit-button"
        >
          Submit
        </button>
      </form>
    </section>
  </div>
</template>

<script lang="ts">
  import {Component, Vue, Prop} from "vue-property-decorator";
  import addMessageQuery from "@/graphql/addMessage";
  import getMessages from "@/graphql/getMessages";
  import IMessage from "@/types/Message";

  @Component
  export default class MessagesModal extends Vue {
    $refs!: {
      modalWrapper: HTMLDivElement;
    };

    @Prop({type: Boolean, required: false}) isVisible!: boolean;

    private author = '';
    private text = '';

    mounted() {
      document.addEventListener('click', (evt: MouseEvent) => {
        if (evt.target === this.$refs.modalWrapper) this.$emit('modalClose');
      })
    }

    private async addItem() {
      const response = await this.$apollo.mutate({
        mutation: addMessageQuery,
        variables: {
          message: {
            text: this.text,
            date: new Date().toLocaleString(),
            author: {
              name: this.author,
            },
          },
        },
        update: (cache, {data}) => {
          // console.log(data);
          if (data?.addMessage === undefined) return;

          const message = data.addMessage;
          // console.log(message);

          const messages = cache.readQuery({
            query: getMessages,
          }) as { messages: IMessage[] };

          // console.log(messages.messages);

          messages.messages.push(message);
          // console.log('messages:', messages);

          cache.writeQuery({
            query: getMessages,
            data: messages,
          });
        },
      }) as { data: { addMessage: IMessage } };

      console.log(response.data.addMessage);
      this.$emit('modalClose');
    }
  }
</script>

<style scoped lang="scss">
  .messages-modal-wrapper {
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background: rgba(0, 0, 0, .75);
  }

  .messages-modal {
    padding: 1rem 2rem;
    position: absolute;
    top: 50%;
    left: 50%;
    background: #ffffff;
    transform: translate(-50%, -50%);
    border-radius: 20px;
    box-shadow: 0 10px 20px 0 rgba(0, 0, 0, .2);

    &__header {
      text-align: center;
    }

    &__form {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 400px;

      &__label {
        margin-bottom: 5px;
      }

      &__input {
        display: block;
        border: 1px solid rgba(0, 0, 0, .5);
        font-size: 1rem;
        width: 75%;
      }

      &__submit-button {
        margin: 1rem auto;
        background: #2980b9;
        padding: 10px 15px;
        border: none;
        border-radius: 10px;
        font-size: 1rem;
        font-weight: 600;
        color: #ffffff;
        transition: all .1s ease-out;
        cursor: pointer;

        &:hover {
          background: darken(#2980b9, 10%);
        }
      }
    }
  }
</style>