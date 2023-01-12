<template>
    <el-container>
        <span v-if="!init">Загрузка...</span>
        <el-main v-else>
            <ExamplePage v-if="page==='DEFAULT'"/>
            <ExamplePage2 v-if="page==='page-2'"/>
            <CallCard v-if="page==='CALL_CARD'" msg="test"/>
        </el-main>
    </el-container>
</template>

<script setup lang="ts">
import {BX24Dev, BX24} from '@slavmak2486/bx24ts';
import { provide, ref } from 'vue';
import CallCard from './components/callCard.vue';
import ExamplePage from './components/pages/examplePage.vue';
import ExamplePage2 from './components/pages/examplePage2.vue';

    const init = ref(false);
    const page = ref('DEFAULT');
    const options= ref<Record<string, any>>({});

    if (import.meta.env.MODE == 'development') {
        const bx24 = new BX24Dev({
            access_token: String(import.meta.env.VITE_ACCESS_TOKEN),
            domain: String(import.meta.env.VITE_DOMAIN),
            expires_in: Number(import.meta.env.VITE_EXPIRES),
            member_id: String(import.meta.env.VITE_MEMBER_ID),
            refresh_token: String(import.meta.env.VITE_REFRESH_TOKEN),
            client_id: String(import.meta.env.VITE_CLIENT_ID),
            client_secret: String(import.meta.env.VITE_CLIENT_SECRET),
        }, () => {
            onInit(bx24);
        });
        window.BX24 = bx24;
        provide('BX24', bx24);
    }
    else {
        const bx24 = new BX24(() => {
            onInit(bx24);
        });
        window.BX24 = bx24;
        provide('BX24', bx24);
    }

    const onInit=(bx24:BX24|BX24Dev)=>{
        init.value = true;
        const infoPlacement=bx24.placement.info();
        page.value=infoPlacement?.placement||'DEFAULT';
        options.value=infoPlacement?.options??{};
        if (page.value==='DEFAULT'&&options.value.page){
            page.value=options.value.page;
        }
    }
</script>
