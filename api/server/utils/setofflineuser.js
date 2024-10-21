import User from '../models/user';

async function setofflineuser(userId) {
    if (!userId) {
        return;
    }

    try {
        const currentTime = Date.now();

        const result = await User.findByIdAndUpdate(
            userId,
            { online: false, lastSeen: currentTime },
            { new: true, runValidators: true }
        );

        if (!result) {
            throw new Error('User not found');
        }

        return result._id;
    } catch (error) {
        console.error('Error setting user online status:', error);
        throw error;
    }
}

export default setofflineuser;