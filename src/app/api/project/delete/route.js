import { NextResponse } from "next/server";
import User from "@/models/User";
import Project from "@/models/Project";
import { dbConnect } from "@/lib/db";
export async function POST(req) {
    try {
        await dbConnect();
        const { owner, name } = await req.json();
        console.log("This", owner, name)
        const user = await User.findOne({ id: owner }).populate('projects', 'name');
        if (!user)
            throw new Error('User not found');
        const index = user.projects.findIndex(project => project.name === name);
        const deleted = await Project.findOneAndDelete({ name, owner });
        if (!deleted)
            throw new Error('Project not found');
        user.projects.splice(index, 1);
        await user.save();
        return NextResponse.json({ success: true });
    } catch (e) {
        return NextResponse.json({ error: e.message });
    }
}