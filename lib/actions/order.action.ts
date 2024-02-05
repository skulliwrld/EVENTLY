"use server"
import Event from "@/models/event.model"
import { connectToDB } from "../Database/ConnectToDB"
import Order, { IOrder } from "@/models/order.model"
import { revalidatePath } from "next/cache"

type createOrderParams = {
    eventId:string,
    orders:IOrder[],
    path:string

}
export async function createOrder({ eventId, orders, path }:createOrderParams) {
    try {
      await connectToDB()
  
      const event = await Event.findById(eventId)
      if (!event) throw new Error('Events not found')
  
      const newOrder = await Order.create({ ...orders,  eventta:event  })
      revalidatePath(path)
  
      return JSON.parse(JSON.stringify(newOrder))
    } catch (error) {
      console.log(error)
    }
  }
  