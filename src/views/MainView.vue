<template>
  <div class="main">
    <div class="main-views">
      <router-view></router-view>
    </div>
    <MainFeatures />
  </div>
</template>


<script>
import MainFeatures from '@/components/MainFeatures.vue';
export default {
  name:"MainView",
  data(){
    return{
      data:null
    }
  },
  components:{
    MainFeatures
  }
}
</script>

<style scoped>
  .main{
    display: flex;
    height: 100%;
  }
  .main-views{
    width: 100%;
    max-width: 60%;
  }
</style>
