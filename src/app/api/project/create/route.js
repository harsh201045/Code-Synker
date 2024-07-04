import { NextResponse } from "next/server";
import User from "@/models/User";
import Project from "@/models/Project";
import { dbConnect } from "@/lib/db";
export async function POST(req) {
    try {
        await dbConnect();
        const { id, name } = await req.json();
        const user = await User.findById(id).populate('projects', ['name', 'owner']);
        if (!user)
            throw new Error('User not found');
        const index = user.projects.findIndex(project => (project.name === name && project.owner.toString() === id));
        if (index !== -1)
            throw new Error('Project with this name already exists');
        
        const project = new Project({
            owner: id,
            name,
            writers: [],
            folders: [],
            files: []
        });
        await project.save();
        user.projects.push(project._id);
        await user.save();
        return NextResponse.json({ success: true });
    } catch (e) {
        return NextResponse.json({ error: e.message });
    }
}