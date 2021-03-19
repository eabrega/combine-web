<template>
    <div class="fields">
        <b-table
            small
            hover
            :items="ITEMS"
            :fields="COULUMNS"
            :busy="IS_BUSY"
            responsive="sm"
        >
            <template #cell(Id)="data">
                {{ data.item.Id }}
            </template>
            <template #cell(Name)="data">
                {{ data.item.Name }}
            </template>
            <template #cell(actions)="row">
                <b-button size="sm" @click="info(row.item.Id)" class="mr-1"
                    >Dell</b-button
                >
            </template>
            <template #table-busy>
                <div class="text-center text-primary loading">
                    <b-spinner class="align-middle"></b-spinner>
                    <strong>Загрузка...</strong>
                </div>
            </template>
        </b-table>
        <b-pagination
            v-model="CURRENT_PAGE"
            :total-rows="TOTAL_ROWS"
            :per-page="SIZE"
        ></b-pagination>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import {
    BTable,
    BootstrapVueIcons,
    BSpinner,
    BButton,
    BPagination,
} from "bootstrap-vue";
import store from "@/store";

@Component
export default class HelloWorld extends Vue {
    constructor() {
        super();

        Vue.use(BootstrapVueIcons);
        Vue.component("b-table", BTable);
        Vue.component("b-spinner", BSpinner);
        Vue.component("b-button", BButton);
        Vue.component("b-pagination", BPagination);
    }

    get CURRENT_PAGE() {
        return store.state.pageNumber
    }

    set CURRENT_PAGE(val: number) {
        console.log(val);
        store.dispatch("setPageNumber", val);
    }

    get TOTAL_ROWS() {
        return store.state.fields.TotalCount;
    }

    get SIZE() {
        return store.state.pageSize;
    }

    get ITEMS() {
        return store.state.fields.Items;
    }

    get IS_BUSY() {
        return false;
    }

    get COULUMNS() {
        return [
            {
                key: "Name",
                label: "Название",
                sortable: true,
            },
            {
                key: "Area",
                label: "Площадь",
                sortable: true,
            },
            {
                key: "Code",
                label: "ОКМО",
                sortable: true,
            },
            {
                key: "actions",
            },
        ];
    }

    info(item: number) {
        alert(item);
    }
}
</script>

<style scoped lang="scss">
.fields {
    width: 100%;
    text-align: left;
}
</style>
