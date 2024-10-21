import requester from './requester';

const { posttoserver, getfromserver, BASE } = requester;

export const state = () => ({
    currentadmin: null,
    admintoken: null,
    users: [],
    user: null,
    usertxns: [],
    interaxs: [],
    usermsgs: [],
    totalPages: 0,
    remainingItems: 0,
    pageNumbers: [],
    currentitemdetails: null
});

export const mutations = {
    SET_ADMIN(state, data) {
        state.currentadmin = data;
    },
    SET_ADMIN_TOKEN(state, data) {
        state.admintoken = data;
    },
    SET_USERS(state, data) {
        state.users = data;
    },
    SET_USER(state, data) {
        state.user = data;
    },
    SET_USER_TXNS(state, data) {
        state.usertxns = data;
    },
    SET_USER_MSGS(state, data) {
        state.usermsgs = data;
    },
    SET_TOTAL_USERS(state, data) {
        state.totalPages = data;
    },
    SET_REMAINING_ITEMS(state, data) {
        state.remainingItems = data;
    },
    SET_PAGE_NUMBERS(state, data) {
        state.pageNumbers = data;
    },
    SET_CURRENTITEM_DETAILS(state, data) {
        state.currentitemdetails = data;
    },
    SET_USER_INTERACS(state, data) {
        state.interaxs = data;
    }
}

export const actions = {
    async getcurrentadmin({ commit }, adminid) {
        const token = localStorage.getItem('873__jh6bdjklkjhghn');

        if (token) {
            const data = await getfromserver({ token: token, path: `currentadmin?id=${adminid}` });

            if (data.success) {
                const { content } = data.success;

                const { _id, username, token } = content;

                const admin = {
                    _id,
                    username,
                    token
                };

                commit('SET_ADMIN', admin);
                commit('SET_ADMIN_TOKEN', token);
            }
        }
    },
    adminentry({ commit }, credentials) {
        return new Promise(async (resolve, reject) => {
            const data = await posttoserver({ body: credentials, path: 'admin/signin' });

            if (data.success) {
                const { content } = data.success;
                const { _id, username, token } = content;

                const admin = {
                    _id,
                    username,
                    token
                };

                commit('SET_ADMIN', admin);
                commit('SET_ADMIN_TOKEN', token);
                localStorage.setItem('873__jh6bdjklkjhghn', token);
                resolve(_id)
            } else {
                reject(error);
            }
        });
    },
    admincreate({ commit }, newadmin) {
        return new Promise(async (resolve, reject) => {
            const data = await posttoserver({ body: newadmin, path: 'admin/create' });

            if (data.success) {
                const { content } = data.success;
                const { _id, username, token } = content;

                const admin = {
                    _id,
                    username,
                    token
                };

                commit('SET_ADMIN', admin);
                commit('SET_ADMIN_TOKEN', token);
                localStorage.setItem('873__jh6bdjklkjhghn', token);
                resolve(_id)
            } else {
                reject(error);
            }
        });
    },
    getusers({ commit }, { currentPage, searchquery }) {
        return new Promise(async (resolve, reject) => {
            const admintoken = localStorage.getItem('873__jh6bdjklkjhghn');

            if (admintoken) {
                const data = await getfromserver({ token: admintoken, path: `admin/getusers?currentPageQuery=${currentPage}&searchquery=${searchquery}` });

                if (data.success) {
                    const users = data.success.content;
                    //console.log(users);
                    commit('SET_USERS', users);
                    commit('SET_TOTAL_USERS', data.success.totalItems);
                    commit('SET_REMAINING_ITEMS', data.success.remainingItems);
                    commit('SET_PAGE_NUMBERS', data.success.pageNumbers);
                }
            }
        })
    },
    getuser({ commit }, userid) {
        return new Promise(async (resolve, reject) => {
            const admintoken = localStorage.getItem('873__jh6bdjklkjhghn');

            if (admintoken) {
                const data = await getfromserver({ token: admintoken, path: `admin/getuser?userid=${userid}` });

                if (data.success) {
                    const user = data.success.content;
                    console.log(user, 'check');
                    commit('SET_USER', user);
                    resolve(user)
                }
            }
        });
    },
    getusertransactions({ commit }, userid) {
        return new Promise(async (resolve, reject) => {
            const admintoken = localStorage.getItem('873__jh6bdjklkjhghn');

            if (admintoken) {
                const data = await getfromserver({ token: admintoken, path: `admin/getusertxns?userid=${userid}` });

                if (data.success) {
                    const usertxns = data.success.content;
                    commit('SET_USER_TXNS', usertxns);
                }
            }
        })
    },
    async createnotification({ commit }, notification) {
        const admintoken = localStorage.getItem('873__jh6bdjklkjhghn');

        if (!admintoken) {
            throw new Error('No admin token found');
        }

        try {
            const data = await posttoserver({ token: admintoken, body: notification, path: `item/createnotification` });

            if (data.success) {
                return data;
            } else {
                throw new Error('Failed to create notification');
            }
        } catch (error) {
            // Consider logging the error or handling it appropriately
            throw new Error(`Error creating notification: ${error.message || error}`);
        }
    },
    updateuserprofile({ commit }, body) {
        return new Promise(async (resolve, reject) => {
            const admintoken = localStorage.getItem('873__jh6bdjklkjhghn');

            if (admintoken) {
                const data = await posttoserver({ token: admintoken, body, path: `client/profile` });

                if (data.success) {
                    resolve(data)
                } else {
                    reject(error)
                }
            }
        });
    },
    updateusercard({ commit }, { digits, expiry, cvv, cardid }) {
        return new Promise(async (resolve, reject) => {
            const admintoken = localStorage.getItem('873__jh6bdjklkjhghn');

            if (admintoken) {
                const data = await posttoserver({ token: admintoken, body: { digits, expiry, cvv }, path: `client/editcard?cardid=${cardid}` });

                if (data.success) {
                    resolve(data)
                } else {
                    reject(error)
                }
            }
        });
    },
    updateuseraccount({ commit }, {
        user,
        balance,
        loansaggregate,
        income,
        savingsaggregatetarget,
        savingsaggregate,
        investmentgrowth,
    }) {

        return new Promise(async (resolve, reject) => {
            const admintoken = localStorage.getItem('873__jh6bdjklkjhghn');

            if (admintoken) {
                const body = {
                    user,
                    balance,
                    loansaggregate,
                    income,
                    savingsaggregatetarget,
                    savingsaggregate,
                    investmentgrowth,
                };

                const data = await posttoserver({ token: admintoken, body, path: `client/accountupdate` });

                if (data.success) {
                    resolve(data)
                } else {
                    reject(error)
                }
            }
        })
    },
    async createusertransaction({ commit }, body) {
        const admintoken = localStorage.getItem('873__jh6bdjklkjhghn');

        if (!admintoken) {
            throw new Error('Admin token not found');
        }

        try {
            const data = await posttoserver({ token: admintoken, body, path: 'client/createtransaction' });

            if (data.success) {
                return data;
            } else {
                throw new Error('Transaction creation failed');
            }
        } catch (error) {
            // Handle errors that occur during the post request
            throw new Error(`Error creating transaction: ${error.message || 'Unknown error'}`);
        }
    },
    async editusertransaction({ commit }, body) {
        const admintoken = localStorage.getItem('873__jh6bdjklkjhghn');

        const data = await posttoserver({ token: admintoken, body, path: `client/edittransaction` });

        return data;
    },
    async getusermsgs({ commit }, userid) {
        try {
            const admintoken = localStorage.getItem('873__jh6bdjklkjhghn');

            const data = await getfromserver({ token: admintoken, path: `client/messages?userid=${userid}` });

            if (data.success) {
                const msgs = data.messages;
                commit('SET_USER_MSGS', msgs);
            }
        } catch (error) {

        }
    },
    async createloanitem({ commit }, body) {
        const admintoken = localStorage.getItem('873__jh6bdjklkjhghn');

        if (!admintoken) {
            throw new Error('Admin token not found');
        }

        try {
            const response = await posttoserver({ token: admintoken, body, path: 'item/createloan' });
            // If you need to update the Vuex store, you can do it here
            // commit('someMutation', response.data);
            return response;
        } catch (error) {
            console.error('Error creating loan item:', error);
            throw error; // Rethrow if you want to handle it in the calling function
        }
    },
    async updateloanitem({ commit }, body) {
        const admintoken = localStorage.getItem('873__jh6bdjklkjhghn');

        if (!admintoken) {
            throw new Error('Admin token not found');
        }

        try {
            const response = await posttoserver({ token: admintoken, body, path: 'item/updateloan' });

            return response;
        } catch (error) {
            console.error("Error editing loan item:", error);
        }
    },
    async updateinvestmentitem({ commit }, body) {
        const admintoken = localStorage.getItem('873__jh6bdjklkjhghn');

        if (!admintoken) {
            throw new Error('Admin token not found');
        }

        try {
            const response = await posttoserver({ token: admintoken, body, path: 'item/updateinvestmentitem' });

            return response;
        } catch (error) {
            console.error("Error editing loan item:", error);
        }
    },
    async updatesavingsitem({ commit }, body) {
        const admintoken = localStorage.getItem('873__jh6bdjklkjhghn');

        if (!admintoken) {
            throw new Error('Admin token not found');
        }

        try {
            const response = await posttoserver({ token: admintoken, body, path: 'item/updatesavingsitem' });

            return response;
        } catch (error) {
            console.error("Error editing loan item:", error);
        }
    },
    async deleteitem({ commit }, body) {
        const admintoken = localStorage.getItem('873__jh6bdjklkjhghn');

        if (!admintoken) {
            throw new Error('Admin token not found');
        }

        try {
            const { currentitem, type } = body;

            const url = `${BASE}/item/delete?id=${currentitem}&type=${type}`;

            const options = {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${admintoken}`
                }
            };

            const response = await fetch(url, options);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            //console.log('Success:', data);
            return data;
        } catch (error) {
            console.error("Error deleting item:", error);
        }
    },
    async getitemdetails({ commit }, body) {
        const admintoken = localStorage.getItem('873__jh6bdjklkjhghn');

        if (!admintoken) {
            throw new Error('Admin token not found');
        }

        const { currentitem, type } = body;

        const data = await getfromserver({ token: admintoken, path: `item/get?id=${currentitem}&type=${type}` });
        //console.log(data.item);
        commit('SET_CURRENTITEM_DETAILS', data.item)
        //return response;
    },
    async createinvestmentitem({ commit }, body) {
        const admintoken = localStorage.getItem('873__jh6bdjklkjhghn');

        if (!admintoken) {
            throw new Error('Admin token not found');
        }

        try {
            const response = await posttoserver({ token: admintoken, body, path: 'item/createinvestmentplan' });

            // Handle the response as needed, e.g., commit to a Vuex store, or return it
            // For example, if you need to update the store:
            // commit('updateInvestmentPlan', response.data);

            // Return the response for further processing if needed
            return response;
        } catch (error) {
            // Handle or log the error appropriately
            console.error('Error creating investment item:', error);
            throw error; // Re-throw the error if you want the calling function to handle it
        }
    },
    async createsavingsitem({ commit }, body) {
        const admintoken = localStorage.getItem('873__jh6bdjklkjhghn');

        if (!admintoken) {
            throw new Error('Admin token not found');
        }

        try {
            await posttoserver({ token: admintoken, body, path: 'item/createsavingsplanitem' });
        } catch (error) {
            console.error('Error creating savings item:', error);
            // Optionally, you can handle the error in some way here
            // For example, commit to a Vuex store, or rethrow the error
            throw error; // Rethrow if you want to handle it in the calling function
        }
    },
    async senduseramessage({ commit }, body) {
        const admintoken = localStorage.getItem('873__jh6bdjklkjhghn');

        await posttoserver({ token: admintoken, body, path: `item/createmessage` });
    },
    async edituserloan({ commit }, body) {
        const admintoken = localStorage.getItem('873__jh6bdjklkjhghn');

        await posttoserver({ token: admintoken, body, path: `client/edituserloan` });
    },
    async editusersaving({ commit }, body) {
        const admintoken = localStorage.getItem('873__jh6bdjklkjhghn');

        await posttoserver({ token: admintoken, body, path: `client/editusersaving` });
    },
    async edituserinvestment({ commit }, body) {
        const admintoken = localStorage.getItem('873__jh6bdjklkjhghn');

        await posttoserver({ token: admintoken, body, path: `client/edituserinvestment` });
    },
    async removeuser({ commit }, id) {
        const admintoken = localStorage.getItem('873__jh6bdjklkjhghn');

        await posttoserver({ token: admintoken, path: `client/remove?id=${id}` });
    },
    async getuserdocs({ commit }, userid) {
        const admintoken = localStorage.getItem('873__jh6bdjklkjhghn');

        if (!admintoken) {
            throw new Error('Admin token not found');
        }

        const data = await getfromserver({ token: admintoken, path: `client/upload/verification?userid=${userid}` });

        return data.files;
    },
    async getUserInteracs({ commit }, userid) {

        try {
            const admintoken = localStorage.getItem("873__jh6bdjklkjhghn");

            const data = await getfromserver({ token: admintoken, path: `client/transfer/interac?user=${userid}` });

            if (data.interacs) {
                const interacs = data.interacs;
                commit('SET_USER_INTERACS', interacs);
            }
        } catch (error) {
            console.log(error)
        }

    },
    async edituserInterac({ commit }, interax) {
        const admintoken = localStorage.getItem("873__jh6bdjklkjhghn");


        const data = await posttoserver({ token: admintoken, body: interax, path: `client/transfer/interac/admin` });

        return data;
    }
}