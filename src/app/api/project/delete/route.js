import { NextResponse } from "next/server";
import User from "@/models/User";
import Project from "@/models/Project";
import { dbConnect } from "@/lib/db";
export async function POST(req) {
    try {
        await dbConnect();
        const { owner, name } = await req.json();
        const user = await User.findOne({ id: owner }).populate('projects');

        if (!user)
            throw new Error('User not found');
        const index = user.projects.findIndex(project => project.name === name);
        if(index==-1){
            throw new Error('Project not found');
        }

        const project = user.projects[index];

        if(project.owner!=owner){
            throw new Error('You are not permitted to delete this project!!!');
        }

        for(let i=0;i<project.writers.length;i++){
            const writer = await User.findOne({username:project.writers[i]});
            const deleteIndex = writer.projects.findIndex(p=>p.name==name);
            if(deleteIndex==-1) continue;
            writer.projects.splice(deleteIndex,1);
            await writer.save();
        }

        user.projects.splice(index, 1);
        await user.save();
        await Project.findOneAndDelete({owner:owner,name:name});

        return NextResponse.json({ success: true });
    } catch (e) {
        return NextResponse.json({ error: e.message });
    }
}