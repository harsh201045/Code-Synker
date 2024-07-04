import { NextResponse } from "next/server";
import User from "@/models/User";
import Project from "@/models/Project";
import Request from "@/models/Request";
import { dbConnect } from "@/lib/db";
export async function POST(req) {
    try {
        await dbConnect();
        const { id } = await req.json();
        const requests = await Request.find({ to: id }).populate('projectId', 'name');
        const requestList = [];
        for (let i = 0; i < requests.length; i++) {
            const name = await User.findById(requests[i].from, 'username');
            requestList.push({ from: name.username, name: requests[i].projectId.name, projectId: requests[i].projectId._id });
        }
        if (!requests)
            throw new Error('User not found');
        return NextResponse.json({ success: requestList });
    } catch (e) {
        return NextResponse.json({ error: e.message });
    }
}