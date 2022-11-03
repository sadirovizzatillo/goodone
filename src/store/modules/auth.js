import api from "@/api/api"
import router from "@/router";
import store from "..";
export default {
    namespaced:true,
    state: {
        isUser: !!localStorage.getItem("user")
    },
    getters: {
    },
    mutations: {
    },
    actions: {
        async logout(){
            await localStorage.clear()
            await router.push({ name: 'Login' })
            window.location.reload()
        },
        async register(_, form){
            try {
                const { data } = await api.post("/user", form);
                console.log(data)
            }catch(err){
                store.dispatch("toast/error", { title: err.name, message: err.message})
            }
        },
        async login(_, form){
            try {
                const { data } = await api.post("/auth", form);
                await localStorage.setItem("user", JSON.stringify(data))
                await store.dispatch("toast/success", { title: 'success', message: data.name + '  ' + 'platformamizga xush kelibsiz!'})
                await router.push({ name:"Main" })
                window.location.reload()
            }catch(err){
                store.dispatch("toast/error", { title: err.name, message: err.message})
            }
        }
    },
}
