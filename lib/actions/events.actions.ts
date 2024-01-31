"use server"
import { CreateEventParams, GetAllEventsParams } from "@/public/type"
import { connectToDB } from "../Database/ConnectToDB"
import User from "@/models/user.model"
import Event from "@/models/event.model"
import Category from "@/models/category.model"
import { EvenFormSchema } from "../validator"


const populateEvent = async (query:any) =>{
    return query
    .populate({path:"organizer" , model:User, select:"_id firstName lastName"})
    .populate({path:"category" , model:Category, select:"_id name"})
}


export const createEvent = async ({event, userId, path}:CreateEventParams) =>{
    try {
        await connectToDB()

        const organizer = await User.findById(userId);

        if(!organizer){
            throw new Error("Organizer does not exist")
        }

        const newEvents = await Event.create({ ...event,
             category:event.categoryId,
             organizer:userId
            });

        return JSON.parse(JSON.stringify(newEvents));
    } catch (error) {
       console.log(error)
    }

}


export const getEventsById = async (eventId:string) =>{
    try {
        await connectToDB();

        const getEvents = await populateEvent(Event.findById(eventId))

        if(!getEvents){
            throw new Error("Events not found")
        }

        return JSON.parse(JSON.stringify(getEvents));
        
    } catch (error) {
        console.log(error)
    }
}


export const getAllEvents = async ({query, limit=6, page ,category}: GetAllEventsParams) =>{
    try {
        await connectToDB();

        const condition = {}

        const eventQuery =  Event.find(condition)
        .sort({createdAt : "desc"})
        .skip(0)
        .limit(limit)

        const event =  await populateEvent(eventQuery);

        const eventCount = await Event.countDocuments(condition)


        return {
            data : JSON.parse(JSON.stringify(event)),
            totalPages: Math.ceil(eventCount / limit),
        }
        
    } catch (error) {
        console.log(error)
    }
}



