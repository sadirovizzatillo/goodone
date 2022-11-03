
<template>
    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm" label-position="top" size="medium">
        <el-form-item label="Email" prop="email">
            <el-input type="email" v-model="ruleForm.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Password" prop="password">
            <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
        </el-form-item>
        
        <el-form-item >
            <div class="login-form_btns">
                <el-button type="primary" @click="submitForm('ruleForm')">Submit</el-button>
                <router-link to="/register">Will you register?</router-link>
            </div>
        </el-form-item>
    </el-form>   
</template>

<script>
import store from '@/store';
export default {
    name:"LoginView",
    data() {
        return {
            ruleForm: {
                password: '',
                email: ''
            },
            rules: {
                email:[
                { required: true, message: 'Please input email address', trigger: 'blur' },
                { type: 'email', message: 'Please input correct email address', trigger: ['blur', 'change'] }
                ],
                password: [
                { required:true, message: 'Please input the Password', trigger: 'blur' },
                { min: 8, max: 24, message: 'Length should be 8 to 24', trigger: 'blur' }
                ],
            }
        };
    },
    methods: {
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    store.dispatch("auth/login", this.ruleForm)
                } else {
                    return false;
                }
            });
        },
    }
}
</script>

<style scoped>
.login-form_btns{
    display: flex;
    justify-content: flex-end !important;
}
.login-form_btns .el-button{
    margin-right: 16px;
}
</style>
