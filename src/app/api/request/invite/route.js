import { NextResponse } from "next/server";
import User from "@/models/User";
import Project from "@/models/Project";
import Request from "@/models/Request";
import { dbConnect } from "@/lib/db";
export async function POST(req){
    try{
        await dbConnect();
        const {from,to,name} = await req.json();
        const sender = await User.findOne({username:from}).populate("projects")
        const receiver = await User.findOne({username:to}).populate("projects")
       
        if(!receiver){
            throw new Error("Enter valid username");
        }
        const index = sender.projects.findIndex(p=>p.name==name);
        if(index==-1){
            throw new Error("Project Not Found!!!");
        }
        const check = sender.projects[index];
        if(check.owner!=from){
            throw new Error("You are not permitted to invite!!");
        }
        const checkRequest = await Request.findOne({from:from,to:to,projectId:check._id});
        if(checkRequest){
            throw new Error("Request already exist!!");
        }
        
        await Request.create({from:from,to:to,projectId:check._id});

        return NextResponse.json({success: "request successfully sent!!!"});
    }catch(e){
        return NextResponse.json({error: e.message});
    }
}