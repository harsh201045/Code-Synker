import { NextResponse } from "next/server";
import User from "@/models/User";
import Project from "@/models/Project";
import { dbConnect } from "@/lib/db";
export async function POST(req) {
    try {
        await dbConnect();
        const { id, name, owner} = await req.json();
        const user = await User.findById(id).populate('projects');
        if (!user)
            throw new Error('User not found');

        if(user.username != owner)
            throw new Error('You are not permitted to delete this project');

        const index = user.projects.findIndex(p => (p.name == name && p.owner.toString() == id));
        if(index == -1)
            throw new Error('Project not found');
        
        const project = user.projects[index];
        if (project.owner.toString() != id)
            throw new Error('You are not permitted to delete this project');

        for (let i = 0; i < project.writers.length; i++) {
            const writer = await User.findById(project.writers[i]);
            const writerProjects = await User.findById(project.writers[i]).populate('projects', ['name', 'owner']);
            const deleteIndex = writerProjects.projects.findIndex(p => (p.name == name && p.owner.toString() == id));
            if(deleteIndex != -1){
                writer.projects.splice(deleteIndex, 1);
                await writer.save();
            }
        }

        user.projects.splice(index, 1);
        await user.save();
        await Project.findOneAndDelete({ owner: id, name: name });
        return NextResponse.json({ success: "Project deleted successfully" });
    } catch (e) {
        return NextResponse.json({ error: e.message });
    }
}