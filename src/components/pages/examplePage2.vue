<template>
    <el-container direction="vertical">
        <el-row justify="end">
            <el-button @click="getData">Получить данные</el-button>
        </el-row>
        <el-row style="height: 500px">
            <el-auto-resizer #default="{ height, width }">
                    <el-table-v2
                        :columns="cols"
                        :data="data"
                        :width="width"
                        :estimated-row-height="40"
                        :height="height"
                        fixed
                    />
            </el-auto-resizer>
        </el-row>
    </el-container>
</template>

<script lang="ts" setup>
    import { BatchHelper, BX24 } from '@slavmak2486/bx24ts';
    import { ElNotification } from 'element-plus';
    import { inject, ref, computed } from 'vue';

    const bx24=inject('BX24') as BX24;

    const name=ref('Аноним');
    const data=ref<{
        ID:string,
        TITLE:string,
        NAME:string
    }[]>([]);

    const showError=(errorText:string)=>{
        ElNotification({
            title: 'Ошибка',
            message: errorText,
            type: 'error',
        });
    }

    const getData=()=>{
        data.value=[];
        const params={select:['ID', 'TITLE', 'NAME']};
        bx24.callMethod('crm.lead.list', params, async res=>{
            if (res.error()){
                showError(res.error());
                return;
            }
            if (res.total()>50){
                const batchHelper=new BatchHelper();
                batchHelper.getBatchForLength('crm.lead.list', 'getLead', res.total(), params)
                const arrBatch=batchHelper.getArrBatches();
                for (const batch of arrBatch){
                    const ress=await bx24.callBatch(batch);
                    for (const request in ress){
                        const res=ress[request];
                        if (res.error()){
                            showError(res.error());
                            continue;
                        }
                        data.value.push(...res.data());
                    }
                }
            }
            else{
                data.value.push(...res.data());
            }
        })
    }

    const cols=computed(()=>{
        if (!data.value[0]) return [];
        return Object.entries(data.value[0]).map(el=>({
            key:el[0],
            dataKey:el[0],
            title:el[0],
            width:100
        }));
    });
</script>