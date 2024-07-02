import { NextResponse } from "next/server";
import User from "@/models/User";
import Project from "@/models/Project";
import { dbConnect } from "@/lib/db";
export async function POST(req){
    try{
        await dbConnect();
        const {owner, name} = await req.json();
        const user = await User.findOne({id: owner}).populate('projects', 'name');
        if(!user)
            throw new Error('User not found');
        const index = user.projects.findIndex(project => (project.name === name && project.owner==owner));

        if(index !== -1)
            throw new Error('Project with this name already exists');
        const project = new Project({
            owner, 
            name,
            writers: [],
            folders: [],
            files: []
        });
        await project.save();
        user.projects.push(project._id);
        await user.save();
        return NextResponse.json({success: true});
    }catch(e){
        return NextResponse.json({error: e.message});
    }
}