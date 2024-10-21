import { mapActions, mapState, mapMutations } from 'vuex';

import requester from "@/store/requester";
import io from "socket.io-client";

export default {
    extends: 'layouts/default',
    head() {
        return {
            title: requester.BASE
        }
    },
    data() {
        return {
            confirmationmsg: null,
            comfimationsbj: null,
            opennotificationsbody: false,
            msgpopupopen: false,
            profilebody: false,
            errorMessage: null,
            successMessage: null,
            applyformopen: false,
            BASE_URL: requester.BASE,
            socket: null
        }
    },
    computed: {
        ...mapState({
            client: state => state.auth.client,
            clientToken: state => state.auth.clientToken,
            currentadmin: state => state.admin.currentadmin,
            admintoken: state => state.admin.admintoken,
            account: state => state.auth.account,
            cards: state => state.auth.cards,
            authError: state => state.auth.authError,
            loading: state => state.loading.loading,
            loadingmsg: state => state.loading.loadingmsg,
            spinneron: state => state.loading.showspinner,
            spinnerverbiage: state => state.loading.spinnerverbiage,
            donemsg: state => state.loading.donemsg,
            users: state => state.admin.users,
            userprofile: state => state.admin.user,
            showconfirmpopup: state => state.loading.showconfirmpopup,
            clienttransactions: state => state.client.clienttransactions,
            loans: state => state.items.loans,
            investmentplans: state => state.items.investmentplans,
            savingsplans: state => state.items.savingsplans,
            usertxns: state => state.admin.usertxns,
            interaxs: state => state.admin.interaxs,
            generalnotifications: state => state.items.generalnotifications,
            notifications: state => state.items.usernotifications,
            usermsgs: state => state.admin.usermsgs,
            quickcontacts: state => state.client.quickcontacts,
            userloans: state => state.client.userloans,
            userinvestments: state => state.client.userinvestments,
            usersavingsplans: state => state.client.usersavingsplans,
            currentitemdetails: state => state.admin.currentitemdetails
        }),
        user() {
            return this.$route.query.user ? this.$route.query.user : this.$route.params.overview;
        },
        clientnotifs() {
            const { notifications, generalnotifications } = this;

            return [...generalnotifications, ...notifications];
        },
        unreadclientnotifs() {
            const { notifications, generalnotifications } = this;

            const unread = [...generalnotifications, ...notifications].filter(notif => notif.read === false);

            return unread
        },
        generalloans() {
            const { loans } = this;

            if (loans.length) {
                const generalloans = loans.filter(loan => !loan.foruser)
                return generalloans;
            }
        },
        withdrawals() {
            const { clienttransactions } = this;

            const transfers = clienttransactions.filter(clienttransaction => clienttransaction.type === 'withdrawal');

            return transfers;
        },
        deposits() {
            const { clienttransactions } = this;

            const transfers = clienttransactions.filter(clienttransaction => clienttransaction.type === 'deposit');

            return transfers;
        },
        transfers() {
            const { clienttransactions } = this;

            const transfers = clienttransactions.filter(clienttransaction => clienttransaction.type === 'transfer');

            return transfers;
        },
        currntroute() {
            return this.$route.name
        },
        masterc() {
            const { cards } = this;

            if (cards && cards.length) {
                const masterc = cards.find(card => card.type === 'Master');

                return masterc
            }

            return {}
        },
        visac() {
            const { cards } = this;

            if (cards && cards.length) {
                const visac = cards.find(card => card.type === 'Visa');

                return visac
            }

            return {}
        },
        adminid() {
            const id = this.$route.query.admin;

            if (id) {
                return id;
            }

            return null
        }
    },
    methods: {
        ...mapActions('auth', ['checkauthdup', 'register', 'login', 'logout', 'showautherror', 'removeautherror', 'getcurrentclient', 'uploadfile', 'confirmemail']),
        ...mapActions('loading', ['triggerloading', 'endloading', 'onspinner', 'offspinner', 'toggleverbiage', 'setdonemsg']),
        ...mapActions('admin', [
            'adminentry',
            'admincreate',
            'getusers',
            'getuser',
            'getusertransactions',
            'getUserInteracs',
            'createnotification',
            'updateuserprofile',
            'updateusercard',
            'updateuseraccount',
            'createusertransaction',
            'getusermsgs',
            'getcurrentadmin',
            'createloanitem',
            'updateloanitem',
            'updateinvestmentitem',
            'updatesavingsitem',
            'deleteitem',
            'createinvestmentitem',
            'createsavingsitem',
            'senduseramessage',
            'editusertransaction',
            'edituserInterac',
            'edituserloan',
            'editusersaving',
            'edituserinvestment',
            'removeuser',
            'getitemdetails',
            'getuserdocs'
        ]),
        ...mapActions('client', [
            'createtransfer',
            'gettransfers',
            'marknotificationsasread',
            'supportcontact',
            'joininvestmentprog',
            'createcontact',
            'getcontacts',
            'submitloanrequest',
            'getuserloans',
            'getusersavingsplans',
            'getuserinvestments',
            'joinsavingsplan',
            'deposittosavingsitem'
        ]),
        ...mapActions('items', ['getloans', 'getinvestmentplans', 'getsavingsplans', 'getnotifications', 'getusernotifications']),
        toroute(route) {
            const { client } = this;

            if (client) {
                return this.$router.push(`/${route}?user=${client._id}`)
            }
        },
        connect(userid) {
            if (userid) {
                let socket = io(`${this.BASE_URL}`, {
                    query: {
                        userid,
                    },
                });

                this.socket = socket;
            } else {
                let socket = io(`${this.BASE_URL}`);

                this.socket = socket;
            }
        },
        closeErrorSuccess() {
            this.successMessage = null;
            this.errorMessage = null;
        },
        toadminroute(route) {
            const { currentadmin } = this;

            if (route.includes('?')) {
                return this.$router.push(`/${route}&admin=${currentadmin._id}`)
            } else {
                return this.$router.push(`/${route}?admin=${currentadmin._id}`)
            }
        },
        limitTextLength(text, maxLength) {
            if (text.length <= maxLength) {
                return text;
            }
            return text.slice(0, maxLength) + "...";
        },
        currnt(val) {
            return this.currntroute.includes(val) ? true : false
        },
        isOnlyLetters(input) {
            const str = `${input}`.trim().replace(/\s+/g, '');
            return /^[A-Za-z]+$/.test(str);
        },
        returnSpecifiedArrLength(arr, length) {
            if (arr.length > length) {
                return arr.slice(0, length);
            }

            return arr;
        },
        toPercentage(decimal) {
            return decimal * 100 + "%";
        },
        roundUpToNearestDecimal(numStr) {
            const num = parseFloat(numStr);
            return Math.ceil(num);
        },
        formatNumber(num, maxLength) {
            // Convert number to string with commas as thousands separators
            let formattedNumber = parseFloat(num).toLocaleString('en-US', {
                maximumFractionDigits: 20  // Allow up to 20 decimal places
            });

            // If the formatted string is longer than the specified max length
            while (formattedNumber.length > maxLength) {
                // Remove one decimal place and reformat
                const decimalIndex = formattedNumber.indexOf('.');
                if (decimalIndex !== -1) {
                    formattedNumber = parseFloat(formattedNumber).toLocaleString('en-US', {
                        maximumFractionDigits: formattedNumber.length - decimalIndex - 2
                    });
                } else {
                    // If there's no decimal point, just truncate the string
                    formattedNumber = `${formattedNumber.substring(0, maxLength)}...`;
                    break;
                }
            }

            return formattedNumber;
        },
        formatDate(dateString) {
            const options = { year: 'numeric', month: 'long', day: 'numeric' };

            // Check if dateString is a string and if it can be converted to a valid date
            if (typeof dateString === 'string' && !isNaN(new Date(dateString).getTime())) {
                const date = new Date(dateString);
                return date.toLocaleDateString(undefined, options);
            }

            // If not a valid date string, return an error message or handle it accordingly
            return dateString;
        },
        isOnlyNumbers(input) {
            return /^\d+$/.test(input);
        },
        clearinputs() {
            window.location.reload()
        },
        setconfirmationsbj(subj) {
            this.comfimationsbj = subj;
        },
        setconfirmationmsg(msg) {
            this.confirmationmsg = msg;
        },
        openconfirmation(subj, msg) {
            this.setconfirmationsbj(subj);
            this.setconfirmationmsg(msg)
        },
        closeconfirmation(subj, msg) {
            this.setconfirmationsbj(null);
            this.setconfirmationmsg(null)
        },
        openmsgform() {
            this.msgpopupopen = true;
        },
        closemsgform() {
            this.msgpopupopen = false;
        },
        openprofiledrop() {
            this.profilebody = true;
        },
        opennotifications() {
            this.opennotificationsbody = true;
            this.marknotificationsasread().then(() => {
                this.getusernotifications(this.user);
            });
        },
        closedrops() {
            this.opennotificationsbody = false;
            this.profilebody = false;
        },
        returnFloat(value) {
            if (value) {
                return parseFloat(value.replace(/,/g, ""));
            }
        },
        removeCommasAfterDot(inputString) {
            const withoutCommasAfterDot = inputString.replace(/(\.\d*)/g, (match) =>
                match.replace(/,/g, "")
            );
            return withoutCommasAfterDot;
        },
        customSplitByDot(inputString) {
            const dotIndex = inputString.indexOf(".");
            if (dotIndex !== -1) {
                const firstPart = inputString.slice(0, dotIndex + 1);
                const secondPart = inputString.slice(dotIndex + 1);
                return [firstPart, secondPart];
            } else {
                return [inputString, ""];
            }
        },
        removePeriodAndCommas(array) {
            const withoutPeriodAndCommas = array.map((str, index) => {
                if (index === 1) {
                    return str.replace(/[.,]/g, "");
                }

                return str;
            });

            return withoutPeriodAndCommas.join("");
        },
        triggerlogout() {
            this.onspinner();
            this.logout()
                .then(() => {
                    this.offspinner();
                    this.$router.push('/');
                })
        },
        openapplyform() {
            this.applyformopen = true;
        },
        closeapplyform() {
            this.applyformopen = false
        }
    }
}