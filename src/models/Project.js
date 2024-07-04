import mongoose from 'mongoose';

const ProjectSchema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    writers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    folders: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Folder'
    }],
    files: [{
        type: String
    }],
    name: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

export default mongoose.models.Project || mongoose.model('Project', ProjectSchema);
