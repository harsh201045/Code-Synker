import mongoose from 'mongoose';

const RequestSchema = new mongoose.Schema({
    from: {
        type: String,
        required: true
    },
    to: {
        type: String,
        required: true
    },
    projectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
    }
}, {
    timestamps: true
});

export default mongoose.models.Request || mongoose.model('Request', RequestSchema);
