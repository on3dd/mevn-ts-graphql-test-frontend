<template>
  <section class="messages-section">
    <h1 class="messages-section__header">Messages</h1>
    <h2
        v-if="apolloLoading"
        class="messages-section__loading"
    >
      Loading...
    </h2>
    <MessagesSectionList :data="messages"/>
    <button
        @click="isModalVisible = true"
        class="messages-section__button-new"
    >New message
    </button>

    <transition name="fade">
      <MessagesModal
          v-if="isModalVisible"
          @modalClose="isModalVisible = false"
      />
    </transition>
  </section>
</template>

<script lang="ts">
  import {Component, Vue} from "vue-property-decorator";
  import MessagesSectionList from "./MessagesSectionList.vue";
  import MessagesModal from "./MessagesModal.vue";
  import getMessagesQuery from "@/graphql/getMessages";
  import IMessage from "@/types/Message";

  @Component({
    components: {
      MessagesSectionList,
      MessagesModal,
    },
    apollo: {
      messages: () => getMessagesQuery,
    }
  })
  export default class MessagesSection extends Vue {
    private apolloLoading = 0;
    private messages: IMessage[] = [];

    private isModalVisible = false;

    async mounted() {
      console.log('server messages:', this.messages);
    }
  }
</script>

<style scoped lang="scss">
  .messages-section {
    display: flex;
    flex-direction: column;
    align-items: center;

    &__header {
      font-size: 2rem;
      text-align: center;
    }

    &__button-new {
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
</style>