import { NextResponse } from "next/server";
import User from "@/models/User";
import Project from "@/models/Project";
import Request from "@/models/Request";
import { dbConnect } from "@/lib/db";
export async function POST(req){
    try{
        await dbConnect();
        const {owner} = await req.json();
        const requests = await Request.find({to: owner}).populate('projectId','name');
        if(!requests)
            throw new Error('User not found');
        
        return NextResponse.json({success: requests});
    }catch(e){
        return NextResponse.json({error: e.message});
    }
}