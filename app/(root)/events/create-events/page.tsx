import React from 'react'
import EventForm from '@/components/shared/eventForm'
import {auth} from "@clerk/nextjs"

function page() {

    const { sessionClaims} = auth()
    const userId =sessionClaims?.userId as string
    console.log(userId)
    

  return (
    <>
        <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
            <h3 className="wrapper h3-bold text-center sm:text-left">Create Events</h3>
        </section>
        <div className="wrapper my-8">
            <EventForm type="Create" userId={userId}/>
        </div>
    </>
  )
}

export default page