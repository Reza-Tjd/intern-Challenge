<template>
  <h1>Posts list</h1>
  <div class="pagination-container">
    <!-- items -->

    <ul class="post-list">
      <li v-for="data in visibleItems" :key="data.id" class="post-item">
        <RouterLink :to="{ name: 'post', params: { postId: data.id } }" class="post-link">
          <h3>{{ data.id }} - {{ data.title }}</h3>
          <p>{{ data.body }}</p>
        </RouterLink>
      </li>
    </ul>
    <!-- pagination bar -->
    <div class="pagination-buttons">
      <button @click="FirstPageHandler">First</button>
      <button
        @click="gotoPage(number)"
        v-for="number in pageNumbers"
        :key="number"
        :class="{ active: currentPage === number }"
      >
        {{ number }}
      </button>
      <button @click="lastPageHandler">Last</button>
    </div>
  </div>
</template>

<script setup>
  import { computed, ref } from 'vue';
  const props = defineProps({ allData: Array });
  const currentPage = ref(1);
  const itemPerPage = 3;
  const totalPage = computed(() => {
    return Math.ceil(props.allData.length / itemPerPage);
  });

  //   logic for showing items
  const visibleItems = computed(() => {
    const start = (currentPage.value - 1) * itemPerPage;
    const end = currentPage.value * itemPerPage;
    return props.allData.slice(start, end);
  });

  //   btns logic

  function FirstPageHandler() {
    currentPage.value = 1;
  }

  function lastPageHandler() {
    currentPage.value = totalPage.value;
  }

  //   pagination logic

  const pageNumbers = computed(() => {
    const numbers = [];
    const total = totalPage.value;
    const maxButtons = 5;
    let start = Math.max(currentPage.value - 2, 1);
    let end = Math.min(start + maxButtons - 1, total);

    if (end - start < maxButtons - 1) {
      start = Math.max(end - maxButtons + 1, 1);
    }

    for (let i = start; i <= end; i++) numbers.push(i);
    return numbers;
  });

  function gotoPage(number) {
    currentPage.value = number;
  }
</script>

<!-- styles -->
<style scoped>
  h1 {
    text-align: center;
    color: #333;
    font-family: Arial, sans-serif;
  }
  .pagination-container {
    max-width: 900px;
    margin: 0 auto;
    padding: 20px;
    font-family: Arial, sans-serif;
  }

  .post-list {
    list-style: none;
    padding: 0;
    margin: 20px 0;
  }

  .post-item {
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 15px;
    margin-bottom: 15px;
    transition: background-color 0.3s;
    line-height: 21px;
  }

  .post-item:hover {
    background-color: #f9f9f9;
  }

  .post-link {
    text-decoration: none;
    color: inherit;
  }

  .post-link h3 {
    margin: 0 0 10px;
    color: #007bff;
  }

  .post-link p {
    color: #555;
  }

  .pagination-buttons {
    display: flex;
    justify-content: center;
    margin: 0 auto;
    gap: 5px;
    flex-wrap: wrap;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    padding: 12px;
    background: white;
  }

  .pagination-buttons button {
    padding: 6px 12px;
    border: 1px solid #ccc;
    border-radius: 4px;
    background-color: #fff;
    cursor: pointer;
    transition: all 0.2s;
  }

  .pagination-buttons button:hover {
    background-color: #e6e6e6;
  }

  .pagination-buttons button.active {
    background-color: #007bff;
    color: white;
    border-color: #007bff;
  }

  @media (max-width: 600px) {
    .pagination-container {
      padding: 10px;
    }

    .post-item {
      padding: 10px;
    }

    .pagination-buttons button {
      padding: 5px 8px;
    }
  }
</style>
