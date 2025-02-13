import { NextResponse } from "next/server";
import User from "@/models/User";
import Project from "@/models/Project";
import Request from "@/models/Request";
import { dbConnect } from "@/lib/db";
export async function POST(req) {
    try {
        await dbConnect();
        const { from, to, projectId } = await req.json();
        const project = await Project.findById(projectId);
        if (!project) 
            throw new Error('Project not found');
        
        const sender = await User.findOne({ username: from });
        const receiver = await User.findById(to);

        if (!receiver || !sender) 
            throw new Error("User not found");

        project.writers.push(receiver._id);
        await project.save();

        receiver.projects.push(projectId);
        await receiver.save();

        await Request.findOneAndDelete({ from: sender._id, to: receiver._id, projectId: projectId });

        return NextResponse.json({ success: "Project successfully added!!!" });
    } catch (e) {
        return NextResponse.json({ error: e.message });
    }
}