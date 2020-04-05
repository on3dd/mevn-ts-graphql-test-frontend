<template>
  <section class="messages-section">
    <h1 class="messages-section__header">Messages</h1>
    <MessagesSectionList :data="messages"/>
  </section>
</template>

<script lang="ts">
  import {Component, Vue} from "vue-property-decorator";
  import MessagesSectionList from "./MessagesSectionList.vue";
  import getMessagesQuery from "@/graphql/messages";
  import IMessage from "@/types/Message";

  @Component({
    components: {
      MessagesSectionList,
    },
    apollo: {
      messages: () => getMessagesQuery,
    }
  })
  export default class MessagesSection extends Vue {
    private messages: IMessage[] = [];

    async mounted() {
      console.log(this.messages);
    }
  }
</script>

<style scoped lang="scss">
  .messages-section {
    display: flex;
    flex-direction: column;

    &__header {
      font-size: 2rem;
      text-align: center;
    }
  }
</style>