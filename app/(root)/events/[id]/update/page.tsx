import React from 'react'
import EventForm from '@/components/shared/eventForm'
import {auth} from "@clerk/nextjs"
import { getEventById } from '@/lib/actions/events.actions'

interface UpdateEventParams {
  params:{
    id:string
  }
}
async function page({params:{id}}:UpdateEventParams) {

    const { sessionClaims} = auth()
    const userId =sessionClaims?.userId as string
    const events = await  getEventById(id)

  return (
    <>
        <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
            <h3 className="wrapper h3-bold text-center sm:text-left">Update Events</h3>
        </section>

        <div className="wrapper my-8">
        <EventForm 
        userId={userId} 
        type="Update" 
        event={events} 
        eventId={events._id} />
        </div>
    </>
  )
}

export default page