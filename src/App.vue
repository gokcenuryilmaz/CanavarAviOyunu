<template>
  <div id="app">
    
    <canavar-oyunu></canavar-oyunu>
  </div>
</template>

<script>
import canavarOyunu from './components/canavarOyunu.vue'

export default {
  name: 'App',
  components: {
    canavarOyunu,
  }
}
</script>
