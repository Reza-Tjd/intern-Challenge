<script lang="ts" setup>
  import { getPosts, Post } from '@/api/api';
  import { onBeforeMount, ref } from 'vue';
  import Pagination from '../Components/Pagination.vue';

  const posts = ref<Post[]>();

  onBeforeMount(() => loadPosts());

  async function loadPosts() {
    posts.value = (await getPosts()).posts;
  }
</script>

<template>
  <div class="container">
    <Pagination :all-data="posts" />

  </div>
</template>

<style scoped>
.container{
  max-width: 900px;
  margin: 0 auto;
  padding: 20px;
}
</style>
