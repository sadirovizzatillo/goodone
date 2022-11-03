<template>
  <component :is="layout">
    <router-view :key="$route.fullPath"/>
  </component>
</template>

<script>
import AuthLayout from './layouts/AuthLayout.vue';
import MainLayout from './layouts/MainLayout.vue';
import router from './router';
export default {
  name:"App",
  data(){
    return{
      route:this.$route
    }
  },
  computed:{
    layout(){
      var result = null
      if(router.currentRoute.meta.layout.name === "AuthLayout"){
        result =  AuthLayout
      }
      if(router.currentRoute.meta.layout.name === "MainLayout"){
        result =   MainLayout
      }
      
      return result
    }
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
