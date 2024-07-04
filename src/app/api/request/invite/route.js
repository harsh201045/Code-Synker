import { NextResponse } from "next/server";
import User from "@/models/User";
import Project from "@/models/Project";
import Request from "@/models/Request";
import { dbConnect } from "@/lib/db";
export async function POST(req) {
    try {
        await dbConnect();
        const { from, to, name } = await req.json();

        const sender = await User.findById(from).populate("projects");
        const receiver = await User.findOne({ username: to }).populate("projects");

        if (!receiver || !sender)
            throw new Error("Enter valid username");

        if (sender.id == receiver.id)
            throw new Error("You can't send request to yourself");

        const index = sender.projects.findIndex(p => p.name == name);
        if (index == -1) 
            throw new Error("Project Not Found");
        
        const check = sender.projects[index];
        if (check.owner.toString() != sender._id.toString()) 
            throw new Error("You are not permitted to invite!!");
        
        const checkRequest = await Request.findOne({ from: sender._id, to: receiver._id, projectId: check._id });
        if (checkRequest) 
            throw new Error("User is already invited for this project");

        const writersIndex = check.writers.findIndex(p => p.toString() == receiver._id.toString());
        if (writersIndex != -1) 
            throw new Error("User is already writer for this project");

        await Request.create({ from: sender._id, to: receiver._id, projectId: check._id });
        return NextResponse.json({ success: "request successfully sent!!!" });
    } catch (e) {
        return NextResponse.json({ error: e.message });
    }
}