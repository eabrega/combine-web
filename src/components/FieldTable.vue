<template>
    <div class="fields">
        <b-table
            id="fields"
            small
            hover
            :items="loadFields"
            :fields="COULUMNS"
            :current-page="curentPage"
            :per-page="pageSize"
            responsive="sm"
        >
            <template #cell(Id)="data">
                {{ data.item.Id }}
            </template>
            <template #cell(Name)="data">
                {{ data.item.Name }}
            </template>
            <template #cell(actions)="row">
                <b-button size="sm" @click="info(row.item.Id)" class="mr-1">Dell</b-button>
            </template>
            <template #table-busy>
                <div class="text-center text-primary loading">
                    <b-spinner class="align-middle"></b-spinner>
                    <strong>Загрузка...</strong>
                </div>
            </template>
        </b-table>
        <b-pagination
            v-if="total > pageSize"
            v-model="curentPage"
            :total-rows="total"
            :per-page="pageSize"
            aria-controls="fields"
        ></b-pagination>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Field, IFieldsResponse } from "../store/models/field";
import { BTable, BootstrapVueIcons, BSpinner, BButton, BPagination } from "bootstrap-vue";

@Component
export default class FieldTable2 extends Vue {
    private curentPage = 1;
    private total = 0;
    private readonly baseURL = "https://api.combine.hive-hh.ru/fields/";

    @Prop({ default: "Input Property" })
    pageSize!: number;

    constructor() {
        super();

        Vue.use(BootstrapVueIcons);
        Vue.component("b-table", BTable);
        Vue.component("b-spinner", BSpinner);
        Vue.component("b-button", BButton);
        Vue.component("b-pagination", BPagination);
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

    async loadFields(ctx: any): Promise<Field[]> {
        const response = (await fetch(this.URL(ctx.currentPage, ctx.perPage))).json() as Promise<
            IFieldsResponse
        >;

        this.total = (await response).totalCount;
        return (await response).items.map((i) => new Field(i));
    }

    private URL(page: number, size: number): string {
        return `${this.baseURL}?page=${page}&size=${size}`;
    }

    private info(item: number) {
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
