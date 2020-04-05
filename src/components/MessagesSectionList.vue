<template>
  <div class="messages-section__list">
    <MessagesSectionListItem
        v-for="(item, idx) in data"
        :key="idx"
        :data="item"
    />
  </div>
</template>

<script lang="ts">
  import {Component, Vue, Prop} from "vue-property-decorator";
  import MessagesSectionListItem from "@/components/MessagesSectionListItem.vue";
  import IMessage from "@/types/Message";

  @Component({
    components: {
      MessagesSectionListItem,
    }
  })
  export default class MessagesSectionList extends Vue {
    @Prop({type: Array, required: true}) data!: IMessage[];
  }
</script>

<style scoped>

</style>