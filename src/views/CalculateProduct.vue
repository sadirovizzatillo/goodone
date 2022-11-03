<template>
  <div class="calculate-products">
    <div class="main-products__header">
      <h2>MAX</h2>
      <div class="main-products__right">
        <el-switch
        v-model="switchVal"
        active-color="#13ce66"
        >
      </el-switch>
      <el-input
      v-model="productFilter"
      class="search-input"
      placeholder="Type something"
      suffix-icon="el-icon-search"
      @input="filterProduct($event)">
    </el-input>
    
    <button class="el-button"><i class="el-icon-switch-button"></i></button>
  </div>
</div>
<div class="breadcumb-wrapper">
  <el-breadcrumb separator=">">
    <el-breadcrumb-item>
      <router-link :to="{ path: '/' }">Главная</router-link>
    </el-breadcrumb-item>
    <el-breadcrumb-item>
      <router-link to="$currentRoute">Оплата</router-link>
    </el-breadcrumb-item>
  </el-breadcrumb>
</div>
<main class="product-main">
  <div class="product-main__wrapper">
    <div class="product-display">
      <div class="all-sums">
        <ul class="all-sum__list">
          <li>
            <h5>Обшая Сумма</h5>
            <p>{{ allRealSum }} UZS</p>
          </li>
          <li>
            <h5>Скидка</h5>
            <p>{{ allDiscountedSum }} UZS</p>
          </li>
          <li>
            <h5>Елементы</h5>
            <p>{{ elementCount }}</p>
          </li>
        </ul>
        
        <h3>UZS</h3>
      </div>
      <div class="calculate-calculator">
        <el-input placeholder="Please input" v-model="sum"></el-input>
        <div class="calculate-btns">
          <el-button v-for="(btn, id) in calculateBtns" :key="id" @click="textInput(btn.value)">{{ btn.value }}</el-button>
          <el-button>.</el-button>
          <el-button @click="textInput(0)">0</el-button>
          <el-button @click="removeInput">back</el-button>
        </div>
      </div>
    </div>
    <div class="calculate-features__btns">
      <el-button type="success">Наличный</el-button>
      <el-button type="primary">Карта</el-button>
      <el-button type="danger">Комбинация</el-button>
      <el-button type="primary">Валюта</el-button>
    </div>
    <el-button type="success" style="width:100%" @click="payModalOpen">Оплатитъ</el-button>
    
    <el-dialog
    title="Здачи"
    :visible.sync="payModal"
    width="30%">
    <span>{{ showMoney }}</span>
    <span slot="footer" class="dialog-footer">
      <el-button @click="payModalOpen">Cancel</el-button>
      <el-button type="primary" @click="confirmPayModal">Confirm</el-button>
    </span>
  </el-dialog>
</div>
</main>
</div>
</template>

<script>
import store from '@/store';
import { mapGetters } from 'vuex';
export default {
  name:"CalculateProduct",
  data(){
    return{
      sum:"",
      addSum:"",
      switchVal:false,
      productFilter:null,
      showMoney:"",
      payModal:false,
      calculateBtns:[
      {
        id:1,
        value:"1"
      },
      {
        id:2,
        value:"2"
      },
      {
        id:3,
        value:"3"
      },
      {
        id:4,
        value:"4"
      },
      {
        id:5,
        value:"5"
      },
      {
        id:6,
        value:"6"
      },
      {
        id:7,
        value:"7"
      },
      {
        id:8,
        value:"8"
      },
      {
        id:9,
        value:"9"
      }
      ]
    }
  },
  computed:{
    ...mapGetters({
      elementCount: "product/elementCount",
      allRealSum:"product/allRealSum",
      allDiscountedSum:"product/allDiscountedSum"
    }),
  },
  methods:{
    textInput(val){
      this.addSum += val
      var addFakeSum =  this.addSum.replace(/(?!^)(?=(?:\d{3})+(?:\.|$))/gm, ' ');
      this.sum = addFakeSum
    },
    removeInput(){
      this.addSum = this.addSum.toString().slice(0, -1)
      this.sum = this.sum.toString().slice(0, -1)
    },
    payModalOpen(){
      this.payModal = !this.payModal
      let moreSum =  Number(this.addSum) - this.allRealSum 
      let moreFakeSum = moreSum.toString().replace(/(?!^)(?=(?:\d{3})+(?:\.|$))/gm, ' ');
      this.showMoney = moreFakeSum
    },
    confirmPayModal(){
      this.$router.push({ name: 'MainProducts'})
      store.dispatch("product/clearData")
    }
  }
}
</script>

<style>
.calculate-btns{
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
}
.breadcumb-wrapper a{
  color: #fff !important;
  text-decoration: none !important;
}
.calculate-features__btns{
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  max-width: 100%;
  width: 100%;
  margin-bottom: 16px;
}
.calculate-features__btns .el-button{
  padding: 24px;
}
.calculate-btns .el-button{
  margin: 0 !important;
  border-radius: 0 !important;
  padding: 20px;
}
.calculate-products{
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
}
.product-main__wrapper{
  width: 100%;
  max-width: 70%;
  margin: 0 auto;
}
.product-display{
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 20px;
  margin-bottom: 16px;
}
.calculate-calculator{
  background-color: #fff;
}
.calculate-calculator .el-input__inner{
  color: gray !important;
  text-align: right;
}
.all-sums{
  padding: 12px;
  background-color: #fff;
}
.all-sum__list{
  list-style-type: none;
  padding: 0;
  margin: 0;
}
.all-sum__list h5{
  margin: 0;
}
.all-sum__list li{
  margin: 0;
  margin-bottom: 32px;
}
</style>