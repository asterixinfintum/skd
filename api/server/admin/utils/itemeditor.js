import Loan from '../../models/loan';
import Investmentplan from '../../models/investmentplan';
import Savingsplan from '../../models/savingsplan';
import Notification from '../../models/notification';

class ItemEditor {
    static createLoan(data) {
        return new Promise(async (resolve, reject) => {
            try {
                const newLoan = new Loan(data);

                await newLoan.save();

                resolve({ message: 'success', type: 'admin item create', content: newLoan });
            } catch (error) {
                reject({ message: 'error', type: 'admin item create', reason: error });
            }
        })
    }

    static createInvestmentplan(data) {
        return new Promise(async (resolve, reject) => {
            try {
                const newInvestmentplan = new Investmentplan(data);

                await newInvestmentplan.save();

                resolve({ message: 'success', type: 'admin item create', content: newInvestmentplan });
            } catch (error) {
                reject({ message: 'error', type: 'admin item create', reason: error });
            }
        })
    }

    static createSavingsplan(data) {
        return new Promise(async (resolve, reject) => {
            try {
                const newSavingsplan = new Savingsplan(data);

                await newSavingsplan.save();

                resolve({ message: 'success', type: 'admin item create', content: newSavingsplan });
            } catch (error) {
                reject({ message: 'error', type: 'admin item create', reason: error });
            }
        })
    }

    static createNotification(data) {
        return new Promise(async (resolve, reject) => {
            try {
                const newNotification = new Notification(data);

                await newNotification.save();

                resolve({ message: 'success', type: 'admin item create', content: newNotification });
            } catch (error) {
                reject({ message: 'error', type: 'admin item create', reason: error });
            }
        })
    }

    static async getLoans() {
        const loans = await Loan.find();

        return loans
    }

    static async getInvestmentplans() {
        const investmentplans = await Investmentplan.find();

        return investmentplans
    }

    static async getSavingsplans() {
        const savingsplans = await Savingsplan.find();

        return savingsplans
    }

    static async getNotifications() {
        const notifications = await Notification.find();

        const notifictions = notifications.filter(notif => notif.user === null)

        return notifictions;
    }

    static async getNotificationsByUser(userid) {
        const notifications = await Notification.find({ user: userid });

        return notifications
    }

    static async updateLoan(_id, body) {
        return new Promise((resolve, reject) => {
            try {
                Loan.findOne({ _id }, (err, loan) => {
                    if (err) {
                        console.error(err);
                    } else {

                        Loan.updateOne({ _id: loan._id }, { $set: body }, async (err, update) => {
                            if (err) {
                                console.error(err);
                            } else {
                                const result = await Loan.findOne({ _id });
                                resolve({ message: 'success', type: 'admin item update', content: result });
                            }
                        });
                    }
                });
            } catch (error) {
                reject({ message: 'error', type: 'admin item update', reason: error });
            }
        })
    }

    static async updateInvestmentplan(_id, body) {
        return new Promise((resolve, reject) => {
            try {
                Investmentplan.findOne({ _id }, (err, investmentplan) => {
                    if (err) {
                        console.error(err);
                    } else {

                        Investmentplan.updateOne({ _id: investmentplan._id }, { $set: body }, async (err, update) => {
                            if (err) {
                                console.error(err);
                            } else {
                                const result = await Investmentplan.findOne({ _id });
                                resolve({ message: 'success', type: 'admin item update', content: result });
                            }
                        });
                    }
                });
            } catch (error) {
                reject({ message: 'error', type: 'admin item update', reason: error });
            }
        })
    }

    static async updateSavingsplan(_id, body) {
        return new Promise((resolve, reject) => {
            try {
                Savingsplan.findOne({ _id }, (err, savingsplan) => {
                    if (err) {
                        console.error(err);
                    } else {

                        Savingsplan.updateOne({ _id: savingsplan._id }, { $set: body }, async (err, update) => {
                            if (err) {
                                console.error(err);
                            } else {
                                const result = await Savingsplan.findOne({ _id });
                                resolve({ message: 'success', type: 'admin item update', content: result });
                            }
                        });
                    }
                });
            } catch (error) {
                reject({ message: 'error', type: 'admin item update', reason: error });
            }
        })
    }

    static async updateNotification(_id, body) {
        return new Promise((resolve, reject) => {
            try {
                Notification.findOne({ _id }, (err, notification) => {
                    if (err) {
                        console.error(err);
                    } else {

                        Notification.updateOne({ _id: notification._id }, { $set: body }, async (err, update) => {
                            if (err) {
                                console.error(err);
                            } else {
                                const result = await Notification.findOne({ _id });
                                resolve({ message: 'success', type: 'admin item update', content: result });
                            }
                        });
                    }
                });
            } catch (error) {
                reject({ message: 'error', type: 'admin item update', reason: error });
            }
        })
    }

    static async deleteLoan(_id) {
        return new Promise((resolve, reject) => {
            try {
                Loan.deleteOne({ _id }, (err, loan) => {
                    if (err) {
                        reject({ message: 'error', type: 'admin item delete', reason: err });
                    } else {
                        const result = `Deleted Loan with ID ${_id}`
                        resolve({ message: 'success', type: 'admin item update', content: result });
                    }
                });
            } catch (error) {
                reject({ message: 'error', type: 'admin item delete', reason: error });
            }
        })
    }

    static async deleteInvestmentPlan(_id) {
        return new Promise((resolve, reject) => {
            try {
                Investmentplan.deleteOne({ _id }, (err, investmentplan) => {
                    if (err) {
                        reject({ message: 'error', type: 'admin item delete', reason: err });
                    } else {
                        const result = `Deleted Investmentplan with ID ${_id}`
                        resolve({ message: 'success', type: 'admin item update', content: result });
                    }
                });
            } catch (error) {
                reject({ message: 'error', type: 'admin item delete', reason: error });
            }
        })
    }

    static async deleteSavingsPlan(_id) {
        return new Promise((resolve, reject) => {
            try {
                Savingsplan.deleteOne({ _id }, (err, savingsplan) => {
                    if (err) {
                        reject({ message: 'error', type: 'admin item delete', reason: err });
                    } else {
                        const result = `Deleted Savingsplan with ID ${_id}`;
                        resolve({ message: 'success', type: 'admin item update', content: result });
                    }
                });
            } catch (error) {
                reject({ message: 'error', type: 'admin item delete', reason: error });
            }
        })
    }

    static async deleteNotification(_id) {
        return new Promise((resolve, reject) => {
            try {
                Notification.deleteOne({ _id }, (err, notification) => {
                    if (err) {
                        reject({ message: 'error', type: 'admin item delete', reason: err });
                    } else {
                        const result = `Deleted Notification with ID ${_id}`;
                        resolve({ message: 'success', type: 'admin item update', content: result });
                    }
                });
            } catch (error) {
                reject({ message: 'error', type: 'admin item delete', reason: error });
            }
        })
    }
}

export default ItemEditor;