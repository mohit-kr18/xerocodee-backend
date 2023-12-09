import mongoose from 'mongoose';

const prefSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    accountType: {
        type: String,
        required: true
    },
    accountName: {
        type: String,
        required: true
    },
    developmentOptions: {
        type: String,
        required: true
    }
});

const Pref = mongoose.model('Pref', prefSchema);
export default Pref;
