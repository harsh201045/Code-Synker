import { NextResponse } from "next/server";
import User from "@/models/User";
import { dbConnect } from "@/lib/db";
export async function POST(req){
    try{
        await dbConnect();
        const {owner} = await req.json();
        const user = await User.findOne({id: owner}).populate('projects');
        if(!user)
            throw new Error('User not found');
        
        return NextResponse.json({success: user.projects});
    }catch(e){
        return NextResponse.json({error: e.message});
    }
}