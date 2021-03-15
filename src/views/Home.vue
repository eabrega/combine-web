<template>
    <div class="home">
        <FieldTable msg="Welcome to Your Vue.js + TypeScript App" />
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import FieldTable from "@/components/FieldTable.vue";
import store from "@/store";

@Component({
    components: {
        FieldTable,
    },
})
export default class Home extends Vue {
    constructor() {
        super();
    }

    mounted() {
        store.dispatch("getFields");
    }
}
</script>

<style lang="scss" scoped>
.home{
    margin-left: 100px;
    margin-right: 100px;
}
</style>