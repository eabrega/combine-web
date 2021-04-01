import Vue from 'vue'
import Vuex from 'vuex'
import { FieldResponse, Field, IFieldsResponse } from './models/field';

Vue.use(Vuex)

export interface IState {
    pageUrl: string,
    pageNumber: number,
    pageSize: number,
    fields: FieldResponse;
}

export default new Vuex.Store({
    state: () => ({
        pageUrl: "https://api.combine.hive-hh.ru/fields",
        pageNumber: 1,
        pageSize: 20,
        fields: {},
    }) as IState,
    mutations: {
    },
    actions: {
    },
    getters: {
    }
})
