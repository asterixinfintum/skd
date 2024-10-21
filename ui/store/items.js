import requester from "./requester";

const { posttoserver, getfromserver } = requester;

export const state = () => ({
    loans: [],
    investmentplans: [],
    savingsplans: [],
    generalnotifications: [],
    usernotifications: [],
});

export const mutations = {
    SET_LOANS(state, data) {
        state.loans = data;
    },
    SET_INVESTMENTPLANS(state, data) {
        state.investmentplans = data;
    },
    SET_SAVINGSPLANS(state, data) {
        state.savingsplans = data;
    },
    SET_GENERALNOTIFICATIONS(state, data) {
        state.generalnotifications = data;
    },
    SET_USERNOTIFICATIONS(state, data) {
        state.usernotifications = data;
    },
}

export const actions = {
    getloans({ commit }) {
        return new Promise(async (resolve, reject) => {
            const token = localStorage.getItem('873__jh6bdjklkjhghn');

            const data = await getfromserver({ token, path: `item/loans` });

            if (data.success) {
                const { content } = data.success;
                commit('SET_LOANS', content);
            } else {
                reject('fail')
            }
        })
    },
    getinvestmentplans({ commit }) {
        return new Promise(async (resolve, reject) => {
            const token = localStorage.getItem('873__jh6bdjklkjhghn');

            const data = await getfromserver({ token, path: `item/investments` });

            if (data.success) {
                const { content } = data.success;
                commit('SET_INVESTMENTPLANS', content);
            } else {
                reject('fail')
            }
        })
    },
    getsavingsplans({ commit }) {
        return new Promise(async (resolve, reject) => {
            const token = localStorage.getItem('873__jh6bdjklkjhghn');

            const data = await getfromserver({ token, path: `item/savingsplans` });

            if (data.success) {
                const { content } = data.success;
                //console.log(content)
                commit('SET_SAVINGSPLANS', content);
            } else {
                reject('fail')
            }
        })
    },
    getnotifications({ commit }) {
        return new Promise(async (resolve, reject) => {
            const token = localStorage.getItem('873__jh6bdjklkjhghn');

            const data = await getfromserver({ token, path: `items?type=notifications` });

            if (data.success) {
                const { content } = data.success;
                commit('SET_GENERALNOTIFICATIONS', content);
            } else {
                reject('fail')
            }
        });
    },
    getusernotifications({ commit }, userid) {
        return new Promise(async (resolve, reject) => {
            const token = localStorage.getItem('873__jh6bdjklkjhghn');

            const data = await getfromserver({ token, path: `client/notifications?userid=${userid}` });

            if (data.success) {
                const { content } = data.success;
                resolve(content);
                commit('SET_USERNOTIFICATIONS', content);
            }
        })
    },
}