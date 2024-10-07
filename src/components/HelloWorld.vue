// ExampleComponent.vue

<template>
  <div>
    <h1>Test API</h1>
    <div v-if="post">
      <h2>{{ post.title }}</h2>
      <p>{{ post.body }}</p>
    </div>
    <button class="px-4 py-1 bg-blue-500 rounded-sm " @click="fetchPost">Fetch Post</button>
  </div>
</template>

<script>
import { testApi } from '@/api/index';

export default {
  name: 'HelloWorld',
  data() {
    return {
      post: null,
    };
  },
  methods: {
    async fetchPost() {
      try {
        const data = await testApi();
        this.post = data;
      } catch (error) {
        console.error(error);
      }
    }
  }
};
</script>
