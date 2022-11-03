<template>
  <div class="main-features">
    <header class="features-header">
      <button class="el-button bg-lightgray"><i class="el-icon-shopping-bag-1"></i> Корзина</button>
      <button class="el-button bg-darkgray"><i class="el-icon-notebook-2"></i> Заявки</button>
    </header>
    <main class="main-features__main">
      <TheTable :tableData="basketProducts"/>
    </main>
    
    <footer class="main-features__footer">
      <ul class="features-list">
        <li>
          <div class="features-list__item">
            <h4>Обшая Сумма</h4>
            <p>{{ allSum }} UZS</p>
          </div>
        </li>
        <li>
          <div class="features-list__item">
            <h5>Скидка</h5>
            <p>90 UZS</p>
          </div>
        </li>
        <li>
          <div class="features-list__item">
            <h5>Елементы</h5>
            <p>{{ elementCount }}</p>
          </div>
        </li>
        <li>
          <div class="features-list__item">
            <h5>Клиент</h5>
            <p>Klient Tanlar</p>
          </div>
        </li>
        <li>
          <div class="features-list__item">
            <h5>Кассир ( Продовец )</h5>
            <p>{{ cashier }}</p>
          </div>
        </li>
      </ul>
      <div class="button-list">
        <el-button class="el-button" @click="discountModal(true)">Обшая скидка</el-button>
        <el-dialog
        title="Обшая Скидка"
        class="all-discount"
        :visible.sync="discModal"
        width="30%">
        <div class="one-discount__item">
          <el-input type="number" v-model="allDiscount" min="0" max="100"></el-input>
          <el-input type="number" :value="computAllDiscount" disabled></el-input>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="discountModal">Cancel</el-button>
          <el-button type="primary" @click="confirmAllDiscount">Confirm</el-button>
        </span>
      </el-dialog>
      <el-button class="el-button">Клиент</el-button>
      <el-button class="el-button">Печатъ</el-button>
      <el-button class="el-button" type="danger">Очиститъ</el-button>
      <el-button class="el-button" type="primary" >Отсрочка</el-button>
      <el-button class="el-button" type="success" @click="(() => $router.push({name:'CalculateProduct'}))">Оплатитъ</el-button>
    </div>
  </footer>
</div>
</template>

<script>
import store from '@/store'
import { mapGetters } from 'vuex'
import TheTable from "./TheTable.vue"
export default {
  name:"MainFeatures",
  components:{
    TheTable
  },
  data(){
    return{
      tableData: [],
      allDiscount:0,
      discModal:false
    }
  },
  methods:{
    discountModal(bool){
      this.discModal = !this.discModal
      if(bool === true){
        this.totalAllCost = this.allSum
      }
    },
    confirmAllDiscount(){
      store.state("product/allDiscount", this.computAllDiscount);
      this.discModal = !this.discModal
    }
  },
  computed:{
    ...mapGetters({
      allSum: "product/allSum",
      elementCount: "product/elementCount"
    }),
    basketProducts(){
      return store.state.product.basket
    },
    cashier(){
      return JSON.parse(localStorage.getItem("user")).name
    },
    computAllDiscount(){
      return this.totalAllCost * ( (100 - this.allDiscount ) / 100) 
    }
  }
}
</script>

<style>
.main-features__footer{
  background-color: lightgray;
  padding: 8px;
}
.main-features{
  width: 100%;
  max-width: 40%;
  display: flex;
  flex-direction: column;
}
.features-header{
  display: flex;
}
.features-header .el-button{
  margin: 0 !important;
  padding: 27px 15px;
}
.features-header .bg-lightgray{
  background-color: lightgray;
  width: 50%;
}
.features-header .bg-darkgray{
  background-color: darkgray;
  width: 50%;
}
.main-features__main{
  flex-grow: 1;
}
.features-list{
  list-style-type: none;
  padding: 0;
  margin: 0;
}
.features-list__item{
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}
.features-list__item h5, h4, p{
  margin: 0;
}
.button-list{
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 12px;
}
.button-list .el-button{
  margin: 0 !important;
}
</style>