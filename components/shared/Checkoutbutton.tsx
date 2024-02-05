"use client"
import { IEvent } from '@/models/event.model'
import { SignedOut, useUser } from '@clerk/nextjs'
import React from 'react'
import { Button } from '../ui/button'
import Link from 'next/link'
import { SignedIn } from '@clerk/clerk-react'
import Checkout from './checkout'

const Checkoutbutton = ({event}:{event:IEvent}) => {

    const hasEventEnded = new Date(event.endDateTime) < new Date()
    
    const { user } = useUser();
    const userId = user?.publicMetadata.userId as string

  return (
    <section className="flex gap-3 items-center">
        {/* cannot buy past events */}
        {hasEventEnded ? (
            <p className="p-3 text-red-400">sorry, tickets are no longer avaliable</p>
        ):(
            <>
                <SignedOut>
                    <Button asChild className="button rounded-lg" size="lg">
                        <Link href='/sign-in'>
                            Get Tickets
                        </Link>
                    </Button>
                </SignedOut>

                <SignedIn>
                    <Checkout event={event} userId={userId} />
                </SignedIn>
            </>
        )}
    </section>
  )
}

export default Checkoutbutton