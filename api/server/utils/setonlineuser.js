import User from '../models/user';

async function setonlineuser(userId) {
    if (!userId) {
        throw new Error('userId is required');
    }

    try {
        const result = await User.findByIdAndUpdate(
            userId,
            { online: true },
            { new: true, runValidators: true }
        );

        if (!result) {
            throw new Error('User not found');
        }

        console.log('result:', result)

        return result._id;
    } catch (error) {
        console.error('Error setting user online status:', error);
        throw error;
    }
}

export default setonlineuser;