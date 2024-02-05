import EventsCollections from '@/components/shared/Collection'
import { Button } from '@/components/ui/button'
import { getEventsByUser } from '@/lib/actions/events.actions'
import { auth } from '@clerk/nextjs'
import Link from 'next/link'
import React from 'react'

const ProfilePage = async () => {
    const {sessionClaims} = auth()
    const userId = sessionClaims?.userId as string

    const OrganizedEvents = await getEventsByUser({
        userId, page:1
    }) 

  return (
    <>
        {/* My Tickets */}
        <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
            <div className="wrapper flex items-center justify-center sm:justify-between">
                <h3 className="h3-bold text-center sm:text-left">My Ticket</h3>
                <Button asChild size="lg" className="button sm:flex hidden">
                    <Link href='/#events'>Explore more events</Link>
                </Button>
            </div>

            {/* <div className="wrapper my-8">
                <EventsCollections
                data={EVENTS?.data}
                emptyStateSubtext = "No worries - Plenty of exciting events to explore"
                emptyTitle="No Events Ticket Purchase Yets" 
                collectionType = "My_Tickets"
                limit={3}
                page={1}
                totalPage={2}
                urlParamName='ordersPage' />
           
            </div> */}
        </section>

        {/* My Organizser */}
        <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
            <div className="wrapper flex items-center justify-center sm:justify-between">
                <h3 className="h3-bold text-center sm:text-left">Event Organized</h3>
                <Button asChild className="button sm:flex hidden">
                    <Link href='/events/create-events'>Create More Events</Link>
                </Button>
            </div>

                <div className="wrapper my-8">
                <EventsCollections
                data={OrganizedEvents?.data}
                emptyStateSubtext = "Go create some now"
                emptyTitle="No Events have been created yet" 
                collectionType = "Events_Organized"
                limit={6}
                page={1}
                totalPage={2}
                urlParamName='eventsPage' />
            </div>
        </section>

    </>
  )
}

export default ProfilePage