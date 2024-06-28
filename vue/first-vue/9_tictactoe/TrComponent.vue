<template>
    <tr>
        <td-component v-for="(cellData, index) in rowData" :key="index" :cell-data="cellData" :cell-index="index" :row-index="rowIndex"></td-component>
    </tr>
</template>

<script>
import TdComponent from './TdComponent.vue';

export default {
    components: {
        TdComponent,
    },
    data() {
        return {
            parent : 'tr is Parent',
        }
    },
    props: {
        rowData: Array,
        rowIndex: Number,
    }
}
</script>