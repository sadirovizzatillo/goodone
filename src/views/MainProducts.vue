<template>
    <div class="main-products">
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
            @input="filterProducts(productFilter)"
            class="search-input"
            placeholder="Type something"
            suffix-icon="el-icon-search">
        </el-input>
        <button class="el-button" @click="logout"><i class="el-icon-switch-button"></i></button>
    </div>
    
</div>
<div class="breadcumb-wrapper">
    <el-breadcrumb separator=">">
        <el-breadcrumb-item>
            <router-link :to="{ path: '/' }">Главная</router-link>
        </el-breadcrumb-item>
    </el-breadcrumb>
</div>

<main class="product-main">
    <ProductsCategories @filterCategory="filterCategory"/>
    <div class="product-list">
        <ProductsView :product="product" v-for="(product, id) in products" :key="id"/>
    </div>
</main>
</div>
</template>

<script>
import store from '@/store'
// import store from '@/store'
import ProductsCategories from "../components/ProductsCategories.vue"
import ProductsView from "../components/ProductsView.vue"

export default {
    name:"MainProducts",
    components:{
        ProductsCategories,
        ProductsView
    },
    data(){
        return{
            switchVal:false,
            productFilter:"",
            category:[],
            products:[]
        }
    },
    async mounted(){
        await store.dispatch("product/getProducts")
        await this.getDatas()
    },
    computed:{
    },
    methods:{
        async logout(){
            store.dispatch("auth/logout")
        },  
        async filterCategory(cat){
            await this.getDatas()
            if(cat !== "all"){
                this.products = await this.products.filter(c => c.category === cat)
            }
        },
        async filterProducts(productFilter){
            await this.getDatas()
            if(productFilter !== ""){
                this.products = await this.products.filter(p => p.title.toLowerCase().includes(productFilter.trim().toLowerCase()))
            }
        },
        async getDatas(){
            this.products = await store.state.product.products
        }
    }
}
</script>

<style>
.product-list{
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    gap: 8px;
}
.breadcumb-wrapper a{
    color: #fff !important;
    text-decoration: none !important;
    font-weight: bold !important;
}
.main-products{
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
}
.main-products__header h2{
    margin: 0;
    color: #fff;
}
.main-products__header{
    padding: 14px;
    background-color: lightskyblue;
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.main-products__right{
    display: flex;
    align-items: center;
}
.search-input .el-input__inner{
    background-color: inherit !important;
    border: none !important;
    border-bottom: 1px solid #fff !important;
    color: #fff !important;
}
.el-icon-search:before{
    color: #fff !important;
}
.main-products__header .el-button{
    background: inherit;
    border: none;
}
.main-products__header .el-button:hover{
    background: none;
    color: #fff;
}
.breadcumb-wrapper{
    background-color: #0083ff;
    padding: 12px;
}
.product-main{
    background-color: #003aff;
    padding: 10px;
    flex-grow: 1;
}
</style>