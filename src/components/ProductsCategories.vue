<template>
    <div class="categories">
        <el-row :gutter="12">
            <el-col :span="6" v-for="(category, id) in categories" :key="id">
                <div class="cards" :class="[category.id === activeCard ? 'active-card' : '']" @click="activeCards(category)">
                    {{ category.name }}
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
export default {
    name:"ProductsCategories",
    data(){
        return {
            activeCard:1,
            categories:[
            {
                id:1,
                name:"Все",
                value:"all"
            },
            {
                id:2,
                name:"Водоснабжения",
                value:"used"
            },
            {
                id:3,
                name:"Фитинги",
                value:"kanal"
            },
            {
                id:4,
                name:"Канализация",
                value:"wood"
            }
            ]
        }
    },
    methods:{
        activeCards(cat){
            this.activeCard = cat.id
            this.$emit("filterCategory", cat.value) 
        },
    }
}
</script>

<style scoped>
.categories{
    background-color: #003aff;
    margin-bottom: 16px;
}
.cards{
    padding: 40px !important;
    display: flex;
    justify-content: center;
    background-color: #00BaFF;
    border-radius: 12px;
    color: #fff;
    cursor: pointer;
}
.active-card{
    background-color: #74ff00;
}
</style>