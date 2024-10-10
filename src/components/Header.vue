<template>
    <header class="bg-gray-800 text-white">
      <nav class="container mx-auto flex justify-between items-center py-4">
        <!-- Logo -->
        <div class="text-xl font-bold">GizmoShop</div>
        
        <!-- Navigation Links -->
        <ul class="flex space-x-4">
          <li><a href="#" class="hover:text-gray-400">Home</a></li>
          <li><a href="#" class="hover:text-gray-400">Products</a></li>
          <li><a href="#" class="hover:text-gray-400">About</a></li>
          <li><a href="#" class="hover:text-gray-400">Contact</a></li>
        </ul>
        
        <!-- User Actions -->
        <div>
          <a href="/login" class="px-4 py-2 bg-blue-500 rounded hover:bg-blue-600">Login</a>
        </div>
      </nav>
    </header>
  </template>
  
  <script>
  export default {
    name: 'HeaderComponent'
  }
  </script>
  
  <style scoped></style>
  