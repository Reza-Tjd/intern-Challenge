<script lang="ts" setup>
  import { getPost, Post } from '@/api/api';
  import { computed, onBeforeMount, ref } from 'vue';
  import { useRoute } from 'vue-router';

  const route = useRoute();
  const postId = computed(() => +route.params.postId as Post['id']);
  const post = ref<Post>();

  onBeforeMount(() => loadPost());

  async function loadPost() {
    post.value = await getPost(postId.value);
  }
</script>

<template>
  <div class="single-post-container">
    <h1>Post {{ postId }}</h1>
    <RouterLink class="back" to="/">Back</RouterLink>
    <div class="post-detail">
      <template v-if="post">
        <h3>{{ post.title }}</h3>
        <p>{{ post.body }}</p>
      </template>
    </div>
  </div>
</template>

<style scoped>
  /* .back {
    color: #46f;
  } */
  .single-post-container {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    font-family: Arial, sans-serif;
  }

  .back {
    display: inline-block;
    margin-bottom: 15px;
    color: #007bff;
    text-decoration: none;
    transition: color 0.2s;
  }

  .back:hover {
    color: #0056b3;
  }

  .post-detail {
    border: 1px solid #ddd;
    padding: 20px;
    border-radius: 8px;
    background-color: #fafafa;
    line-height: 21px;
  }

  .post-detail h1 {
    margin-top: 0;
    color: #333;

  }

  .post-detail p {
    color: #555;
  }

  .loading {
    color: #aaa;
  }

  @media (max-width: 600px) {
    .single-post-container {
      padding: 10px;
    }

    .post-detail {
      padding: 15px;
    }
  }
</style>
