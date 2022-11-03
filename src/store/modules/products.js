import api  from "@/api/api"
export default {
    namespaced:true,
    state:{
        products:[],
        filteredProducts:[],
        basket:[],
        isItem:false
    },
    getters:{
        allSum(state) {
            const result = state.basket.reduce((total, value) => total += value.cost, 0)
            return result
        },
        elementCount(state){
            const elements = state.basket.filter((item, index) => state.basket.indexOf(item) === index);
            return elements.length
        },
    },
    mutations:{
        ADD_BASKET_PRODUCT(state, payload){
            state.isItem = false
            state.basket.forEach(item => {
                if(item._id === payload._id){
                    state.isItem = true
                    item.quantity += 1
                    item.cost += payload.cost
                }
            })
            if(state.isItem === false){
                state.basket.push({
                    title:payload.title,
                    category:payload.category,
                    cost:payload.cost,
                    weight:payload.weight,
                    sort:payload.sort,
                    _id:payload._id,
                    quantity:1
                })
            }
        },
        GET_PRODUCTS(state, payload){
            state.products = payload
        },
        SET_DISCOUNT(state, discount){
            state.basket.forEach(item => {
                if(item._id === discount.product._id){
                    item.cost = discount.discount
                }
            })
        },
        CLEAR_DATA(state){
            state.basket = []
        },
        INCREMENT_QUANTITY(state, payload){
            state.basket.forEach(item => {
                if(item._id === payload._id){
                    item.quantity += 1,
                    item.cost += payload.cost
                }
            })
        },
        ALL_DISCOUNT(state, payload){
            console.log(state)
            payload.oldSum = payload.payload
        },
        DECREMENT_QUANTITY(state, payload){
            state.basket.forEach(item => {
                if(item._id === payload._id){
                    console.log(item.cost, payload.cost)
                    item.quantity -= 1,
                    item.cost -= payload.cost
                }
            })
        }
    },
    actions:{
        setDiscount(_, payload){
            _.commit("SET_DISCOUNT", payload)
        },
        incerementQuantity(_, product){
            _.commit("INCREMENT_QUANTITY", product)
        },
        decrementQuantity(_, product){
            _.commit("DECREMENT_QUANTITY", product)
        },
        addBasketProduct(_, product){
            _.commit("ADD_BASKET_PRODUCT", product)
        },
        filterProduct(_, payload){
            _.commit("FILTER_PRODUCT", payload)
        },
        async getProducts(_){
            const { data } = await api.get("/product");
            if(data){
                _.commit("GET_PRODUCTS", data)
            }
        },
        allDiscount(_, payload){
            _.commit("ALL_DISCOUNT", { oldSum:_.getters.allSum, payload:payload})
        },
        async clearData(_){
            _.commit("CLEAR_DATA")
        }
    }
}
