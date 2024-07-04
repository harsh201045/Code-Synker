import mongoose from 'mongoose';

const RequestSchema = new mongoose.Schema({
    from: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    to: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    projectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
    }
}, {
    timestamps: true
});

export default mongoose.models.Request || mongoose.model('Request', RequestSchema);
