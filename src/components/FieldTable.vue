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
            <template #cell(Name)="data" class="eblo">
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
            aria-controls="my-table"
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
    get CURRENT_PAGE() {
        return 1;
    }

    get TOTAL_ROWS() {
        return 100;
    }

    get SIZE() {
        return 10;
    }

    get ITEMS() {
        return store.getters.FIELDS;
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

    mounted() {

    }

    constructor() {
        super();

        Vue.use(BootstrapVueIcons);
        Vue.component("b-table", BTable);
        Vue.component("b-spinner", BSpinner);
        Vue.component("b-button", BButton);
        Vue.component("b-pagination", BPagination);
    }
}
</script>

<style scoped lang="scss">
.fields {
    width: 100%;
    text-align: left;
    .eblo {
        background-color: re;
    }
}
</style>
