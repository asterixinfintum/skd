import requester from './requester';

const { posttoserver, getfromserver, BASE } = requester;

export const state = () => ({
    client: null,
    clientToken: null,
    authError: null,
    account: null,
    cards: null
});

export const mutations = {
    SET_CLIENT(state, data) {
        state.client = data;
    },
    SET_CLIENT_TOKEN(state, data) {
        state.clientToken = data;
    },
    SET_AUTH_ERROR(state, data) {
        state.authError = data
    },
    SET_ACCOUNT(state, data) {
        state.account = data;
    },
    SET_CARDS(state, data) {
        state.cards = data;
    }
}

export const actions = {
    async uploadfile({ commit }, file) {
        return new Promise((resolve, reject) => {
            try {
                const token = localStorage.getItem('873__jh6bdjklkjhghn');
                if (!token) {
                    throw new Error('Authorization token not found.');
                }

                const formData = new FormData();
                formData.append("file", file);

                const xhr = new XMLHttpRequest();

                xhr.upload.addEventListener("progress", (event) => {
                    if (event.lengthComputable) {
                        const uploadProgress = Math.round((event.loaded / event.total) * 100);
                        commit("SET_UPLOAD_PROGRESS", uploadProgress);
                    }
                });

                xhr.open('POST', `${BASE}/client/upload/verification`);
                xhr.setRequestHeader('Authorization', `Bearer ${token}`);

                xhr.onload = () => {
                    if (xhr.status === 200) {
                        const responseObject = JSON.parse(xhr.response);
                        resolve(responseObject);
                    } else {
                        reject('File upload failed: ' + xhr.statusText);
                    }
                };

                xhr.onerror = () => {
                    reject('Error during file upload: ' + xhr.statusText);
                };

                xhr.send(formData);
            } catch (error) {
                reject('File upload encountered an error: ' + error);
            }
        });
    },
    async checkauthdup({ commit }, credentials) {
        try {
            const { email, phonenumber } = credentials;

            const data = await posttoserver({ body: { email, phonenumber }, path: 'checkduplicateuser' });

            if (!data.success) {
                throw new Error();
            }

            return data.success
        } catch (error) {
            throw error;
        }
    },
    register({ commit }, newuser) {
        return new Promise(async (resolve, reject) => {
            const data = await posttoserver({ body: newuser, path: 'signup' });

            if (data.success) {
                const { content } = data.success;
                const { _id, email, firstname, lastname, phonenumber, notifications, tokens } = content;
                const client = {
                    _id,
                    username: `${firstname} ${lastname}`,
                    phonenumber,
                    email,
                    token: tokens[0],
                    notifications
                };

                commit('SET_CLIENT', client);
                commit('SET_CLIENT_TOKEN', tokens[0]);
                localStorage.setItem('873__jh6bdjklkjhghn', tokens[0]);
                resolve(_id);
            } else {
                reject('error')
            }
        });
    },
    login({ commit }, credentials) {
        return new Promise(async (resolve, reject) => {
            const data = await posttoserver({ body: credentials, path: 'login' });

            if (data.success) {
                const { content } = data.success;
                const { _id, email, firstname, lastname, phonenumber, notifications, tokens } = content;
                const client = {
                    _id,
                    username: `${firstname} ${lastname}`,
                    phonenumber,
                    email,
                    token: tokens[0],
                    notifications
                };

                commit('SET_CLIENT', client);
                commit('SET_CLIENT_TOKEN', client.token);
                localStorage.setItem('873__jh6bdjklkjhghn', client.token);
                resolve(_id);
            } else {
                reject('error')
            }
        });
    },
    logout({ commit }) {
        return new Promise(async (resolve, reject) => {
            try {
                localStorage.removeItem('873__jh6bdjklkjhghn');
                commit('SET_CLIENT', null);
                commit('SET_CLIENT_TOKEN', null);

                resolve('');
            } catch (error) {

            }
        })
    },
    showautherror({ commit }, autherror) {
        commit('SET_AUTH_ERROR', autherror);
    },
    removeautherror({ commit }) {
        commit('SET_AUTH_ERROR', null)
    },
    async getcurrentclient({ commit }, id) {
        return new Promise(async (resolve, reject) => {
            const token = localStorage.getItem('873__jh6bdjklkjhghn');

            if (token) {
                const data = await getfromserver({ token: token, path: `currentclient?id=${id}` });

                if (data.success) {
                    const { content } = data.success;
                    const { account, user, cards } = content;
                    const { _id, email, firstname, lastname, phonenumber, notifications, tokens, emailcofirmed, accountInteracCryptoEmail } = user;

                    const client = {
                        _id,
                        email,
                        firstname,
                        lastname,
                        phonenumber,
                        notifications,
                        token: tokens[0],
                        emailcofirmed,
                        accountInteracCryptoEmail
                    }

                    //console.log(client)

                    commit('SET_ACCOUNT', account);
                    commit('SET_CARDS', cards);
                    commit('SET_CLIENT', client);
                    commit('SET_CLIENT_TOKEN', client.token)
                }
            } else {
                reject('no user token')
            }
        })
    },
    async confirmemail({ commit }, id) {
        return new Promise(async (resolve, reject) => {
            const token = localStorage.getItem('873__jh6bdjklkjhghn');

            if (token) {
                const data = await posttoserver({ token: token, path: `confirmemail?id=${id}` });

                if (data.success) {
                    resolve(data);
                }
            } else {
                reject('no user token')
            }
        })
    }
}