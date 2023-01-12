<template>
    <el-container direction="vertical">
        <el-row>
            Привет, {{ name }}!
            <el-button class="ml-2" @click="openPage2">Посмотри на вторую страницу?</el-button>
        </el-row>
    </el-container>
</template>

<script lang="ts" setup>
    import { BX24 } from '@slavmak2486/bx24ts';
    import { ElNotification } from 'element-plus';
    import { inject, ref } from 'vue';

    const bx24=inject('BX24') as BX24;

    const name=ref('Аноним');

    const openPage2=()=>{
        bx24.openApplication({page:'page-2'}, ()=>{});
    }

    bx24.callMethod('profile', {}, res=>{
        if (res.error()){
            ElNotification({
                title: 'Ошибка',
                message: res.error(),
                type: 'error',
            });
        }
        name.value=res.data().NAME
    })
</script>