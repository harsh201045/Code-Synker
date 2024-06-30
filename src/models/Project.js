import mongoose from 'mongoose';

const ProjectSchema = new mongoose.Schema({
    owner: {
        type: String,
        required: true
    },
    writers: [{
        type: String,
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
