import { NextResponse } from "next/server";
import User from "@/models/User";
import { dbConnect } from "@/lib/db";
export async function POST(req){
    try{
        await dbConnect();

        const {username,newusername} = await req.json();


        const user = await User.findOne({username:newusername});


        if(user){
            throw new Error("Username is already taken!!!");
        }

        const user2= await User.findOne({username:username});

        if(!user2){
            throw new Error("Username not found");
        }

        user2.username=newusername;

        await user2.save();
        return NextResponse.json({success: "Username changed successfully!!!"});
    }catch(e){
        return NextResponse.json({error: e.message});
    }
}