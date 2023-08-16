import mongoose from 'mongoose';

export const validateMongoId = (id: string): boolean => {
    return mongoose.Types.ObjectId.isValid(id);
};
