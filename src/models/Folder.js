import mongoose from 'mongoose';

const FolderSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    folders: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Folder'
    }],
    files : [{
        type: String
    }],
}, {
    timestamps: true
});

export default mongoose.models.Folder || mongoose.model('Folder', FolderSchema);
