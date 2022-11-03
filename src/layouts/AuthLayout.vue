<template>
    <div>
        <div class="auth-header">
            <h2>MAX</h2>
        </div>
        <main class="main-layout__wrapper">    
            <router-view></router-view>
        </main>
    </div>
</template>

<script>
export default {
    name:"AuthLayout"
}
</script>

<style scoped>
.main-layout__wrapper{
    max-width: 600px;
    margin: 0 auto;
}
.auth-header h2{
    margin: 0;
    color: #fff;
}
.auth-header{
    padding: 14px;
    background-color: lightskyblue;
    display: flex;
    align-items: center;
    justify-content: space-between;
}
</style>