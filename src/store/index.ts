import Vue from 'vue'
import Vuex from 'vuex'
import { FieldResponse, Field, IFieldsResponse } from './models/fielad';

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
        SET_FIELDS(state, val: FieldResponse) {
            state.fields = val;
        },
        SET_PAGE_NUMBER(state, val:number) {
            state.pageNumber = val;
        }
    },
    actions: {
        setFields: async ({ state, commit }) => {
            const fields = await loadFields(state).then();
            commit("SET_FIELDS", new FieldResponse(fields))
        },
        setPageNumber: async ({state, commit }, val) => {
            commit("SET_PAGE_NUMBER", val)
            const fields = await loadFields(state).then();
            commit("SET_FIELDS", new FieldResponse(fields))
        }
    },
    getters: {
        FIELDS: (state) => state.fields,
    }
})

async function loadFields(state: IState): Promise<IFieldsResponse> {
    let resp = await fetch(`${state.pageUrl}/?page=${state.pageNumber}&size=${state.pageSize}`);   
    return resp.json();
}