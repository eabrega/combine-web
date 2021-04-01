<template>
    <div class="home">
        <FieldTable :pageSize="20"/>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import FieldTable from "@/components/FieldTable.vue";

@Component({
    components: {
        FieldTable,
    },
})
export default class Home extends Vue {
    constructor() {
        super();
    }
}
</script>

<style lang="scss" scoped>
.home{
    margin-left: 100px;
    margin-right: 100px;
}
</style>