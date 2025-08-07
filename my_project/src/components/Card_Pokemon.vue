<script setup lang="ts">

defineProps<{
  coverimage:string
  name:string
  url:string
}>();

</script>

<template>
<div>
  <div class="card ">
    <img :src="coverimage" :alt="name" style="width: 100%" />
    <div class="container">
      <h3 class="text-center">{{ name }}</h3>
      <p>{{ url }}</p>
    </div>
  </div>
  </div>
</template>

<style scoped>

*{
  background-color: white;
  border-radius: 20px;
}

.card{
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.3);
  transition: 0.3s;
  padding-bottom: 10px;

}

.card:hover{
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
}

.container{
  padding: 2px 16px;

}
</style>
