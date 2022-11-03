<template>
  <div class="product" @click="addProduct(product)">
    <h5>{{ product.title }}</h5>
    <p>{{ product.cost }} $</p>
    <p>{{ product.weight }} {{ product.sort }}</p>
    <el-progress :percentage="product.progress"></el-progress>
  </div>
</template>

<script>
import store from '@/store'
export default {
  name:"ProductsView",
  props:{
    product:{
      type:Object,
      require:true
    },
  },
  data(){
    return{
      customColors: [
      {color: '#f56c6c', percentage: 20},
      {color: '#e6a23c', percentage: 40},
      {color: '#5cb87a', percentage: 60},
      {color: '#1989fa', percentage: 80},
      {color: '#6f7ad3', percentage: 100}
      ]
    }
  },
  methods:{
    addProduct(product){
      store.dispatch("product/addBasketProduct", product)
    }
  }
}
</script>

<style scoped>
.product{
  padding: 8px;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  border-radius: 12px;
}
.product h5, p {
  margin: 0;
  font-weight: bold;
  margin-bottom: 8px;
}
</style>