export const state = () => ({
    loading: false,
    loadingmsg: null,
    showspinner: false,
    spinnerverbiage: null,
    donemsg: null
});

export const mutations = {
    SET_LOADING(state, data) {
        state.loading = data
    },
    SET_LOADINGMSG(state, data) {
        state.loadingmsg = data
    },
    SET_SPINNERSTATE(state, data) {
        state.showspinner = data
    },
    SET_SPINNERVERBIAGE(state, data) {
        state.spinnerverbiage = data
    },
    SET_DONEMSG(state, data) {
        state.donemsg = data
    }
}

export const actions = {
    triggerloading({ commit }, message) {
        commit('SET_LOADINGMSG', message);
        commit('SET_LOADING', true);
    },
    async endloading({ commit }) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                //the settimeout is for dev purposes
                commit('SET_LOADING', false);
                commit('SET_LOADINGMSG', null);
                return resolve('done')
            }, 3000)
        })
    },
    async onspinner({ commit }) {
        commit('SET_SPINNERSTATE', true);
    },
    async offspinner({ commit }) {
        commit('SET_SPINNERSTATE', false);
    },
    async toggleverbiage({ commit }, verbiage) {
        commit('SET_SPINNERVERBIAGE', verbiage);
    },
    async setdonemsg({ commit }, donemsg) {
        commit('SET_DONEMSG', donemsg)
    }
}
