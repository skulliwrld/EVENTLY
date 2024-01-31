"use server"

import Category from "@/models/category.model";
import { connectToDB } from "../Database/ConnectToDB"
import { handleError } from "../utils"

//ADDING CATEGORIES
export const  addCategory = async (props:{categoryName:string}) =>{
    try {
        await connectToDB();

        const newCategory = await Category.create({name:props.categoryName})

        return JSON.parse(JSON.stringify(newCategory));
        
    } catch (error) {
        handleError(error)
    }
}

//GETTING ALL CATEGORIES
export const GetCategories = async () =>{
    try {
        await connectToDB();

        const getCategories = await Category.find();

        return JSON.parse(JSON.stringify(getCategories));
        
    } catch (error) {
        handleError(error)
    }
}