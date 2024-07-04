import { NextResponse } from "next/server";
import User from "@/models/User";
import Project from "@/models/Project";
import { dbConnect } from "@/lib/db";
export async function POST(req) {
    try {
        await dbConnect();
        const { id } = await req.json();
        const user = await User.findById(id).populate('projects', ['name', 'owner']);
        const projects = [];
        for (let i = 0; i < user.projects.length; i++) {
            const name = await User.findById(user.projects[i].owner, 'username');
            projects.push({ name: user.projects[i].name, owner: name.username });
        }
        if (!user)
            throw new Error('User not found');
        return NextResponse.json({ success: projects });
    } catch (e) {
        return NextResponse.json({ error: e.message });
    }
}