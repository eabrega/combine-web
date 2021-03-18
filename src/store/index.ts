import Vue from 'vue'
import Vuex from 'vuex'
import { Field, IField } from './fielad';

Vue.use(Vuex)

export interface IState {
    fields: Array<Field>;
}

export default new Vuex.Store({
    state: {
        fields: Array<Field>()
    } as IState,
    mutations: {
        SET_FIELDS(state, val: Array<Field>) {
            state.fields = val;
        }
    },
    actions: {
        getFields: async ({ commit }) => {
            const fields = await loadFields().then();
            commit("SET_FIELDS", fields.map(f => new Field(f)))
        }
    },
    getters: {
        FIELDS: (state) => state.fields,
    }
})

async function loadFields(): Promise<Array<IField>> {
    let resp = await fetch("https://api.combine.hive-hh.ru/fields");
    return resp.json();
}