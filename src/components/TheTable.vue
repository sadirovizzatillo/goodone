<template>
    <el-table
    :highlight-current-row="true"
    :data="tableData"
    style="width: 100%">
    <el-table-column type="expand">
        <template slot-scope="props">
            <div class="add-column">
                <el-button icon="el-icon-edit" type="warning" circle></el-button>
                <el-badge :value="3" class="item">
                    <el-button type="success" @click="oneDiscount(props.row)" icon="el-icon-discount" circle>
                    </el-button>

                    <el-dialog
                    title="Скидка"
                    :visible.sync="onediscount"
                    width="30%">
                    <div class="one-discount__item">
                        <el-input type="number" v-model="singleDiscount" min="0" max="100"></el-input>
                        <el-input type="number" :value="computDiscount" disabled></el-input>
                    </div>
                    <span slot="footer" class="dialog-footer">
                        <el-button @click="oneDiscount">Cancel</el-button>
                        <el-button type="primary" @click="confirmDiscount(props.row)">Confirm</el-button>
                    </span>
                </el-dialog>
                
            </el-badge>
            <el-button type="primary" icon="el-icon-box" circle=""></el-button>
            <div class="number-quantity">
                <el-button @click="decQuantity(props.row)">-</el-button>
                <el-input type="number" v-model="props.row.quantity"></el-input>
                <el-button @click="incQuantity(props.row)">+</el-button>
            </div>
            <el-button type="danger" icon="el-icon-delete" circle></el-button>
        </div>
        <p class="product-amount">{{ props.row.weight }} {{ props.row.sort }}</p>
    </template>
</el-table-column>


<el-table-column
prop="title"
label="Наименование"
width="120">
</el-table-column>

<el-table-column
label="Кол"
width="120">
<template #default="scope">
    <p>{{ scope.row?.quantity }}</p>
</template>
</el-table-column>

<el-table-column
prop="cost"
label="Цена">
</el-table-column>

<el-table-column
prop="cost"
label="Сумма">
</el-table-column>

</el-table>

</template>

<script>
import { mapGetters } from 'vuex'
import store from '@/store'
export default {
    name:"TheTable",
    data(){
        return{
            singleDiscount:0,
            expandRowKeys: [],
            productQuantity:0,
            onediscount:false,
            totalCost:0
        }
    },
    props:{
        tableData:{
            type:Array,
            required:true
        }
    },
    methods:{   
        oneDiscount(cost){
            this.onediscount = !this.onediscount
            if(cost){
                this.totalCost = cost.cost
            }
        },
        confirmDiscount(product){
            store.dispatch("product/setDiscount", { product:product,  discount: this.computDiscount })
            this.onediscount = !this.onediscount
        },  
        incQuantity(product){
            var realProduct = null
            store.state.product.products.forEach(item => {
                if(item._id === product._id){
                    realProduct = item
                }
            })
            store.dispatch("product/incerementQuantity", realProduct)
        },
        decQuantity(product){
            var realProduct = null
            store.state.product.products.forEach(item => {
                if(item._id === product._id){
                    realProduct = item
                }
            })
            
            store.dispatch("product/decrementQuantity", realProduct)
        }
    },
    computed:{
        ...mapGetters({
            allSum: "product/allSum"
        }),
        computDiscount(){
            return this.totalCost * ( (100 - this.singleDiscount ) / 100) 
        }
    }
}
</script>

<style>
.el-table .el-table__cell{
    padding: 4px 0;
}
.add-column{
    display: flex;
    justify-content: space-between !important;
}
.el-table__expanded-cell{
    background-color: lightskyblue !important;
    padding: 8px 16px !important;
}
.product-amount{
    color: gray !important;
    font-weight: bold;
    font-size: 18px;
}
.number-quantity{
    display: flex;
}
.one-discount__item .el-input__inner{
    margin-bottom: 12px;
}
.number-quantity .el-input__inner{
    max-width: 80px;
    margin-right: 6px;
    margin-left: 6px;
}
</style>
