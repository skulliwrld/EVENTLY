import React from 'react'
import Link from 'next/link'
import { IEvent } from '@/models/event.model'
import Image from 'next/image'
import { SlCalender } from 'react-icons/sl'
import { formatDateTime } from '@/lib/utils'

interface EventsProps {
    events:IEvent,
    hasPrice?:boolean
    hasOrderLink?:boolean
}
function Card({events,hasPrice,hasOrderLink}:EventsProps) {
  return (
    <section className="flex flex-col bg-primary-50 bg-dotted-pattern bg-contain rounded-lg px-5 py-2 shadow-md hover:shadow">
        <Link href={`events/${events._id}`}>
            <Image src={events.imageUrl} width={1000} height={1000} alt="image" className=" rounded-xl object-contain  rounded-b-none">
            </Image>
            <div className="flex gap-3 py-3">
                <p className="font-bold rounded-full bg-green-500/10 px-5 py-2 text-green-700">
                    {events.isFree ? "FREE" : `#${events.price}`}
                </p>
                <p className="p-medium-16 rounded-full  bg-gray-500/10 px-4 py-2 text-gray-500">
                    {events.category.name}
                </p>
            </div>
            <h2 className="font-bold ">{events.title}</h2>
            <div className="flex gap-3 items-center py-2">
                <SlCalender size={20} className="text-orange-500" />

                <p>
                    {formatDateTime(events.startDateTime).dateOnly} {""}
                    {formatDateTime(events.endDateTime).timeOnly}
                </p>
            </div>

            <p className='text-sm font-bold ml-2 mt-20 md:mt-2'>
                By {""}
                <span className="">
                    {events.organizer.firstName} {events.organizer.lastName}
                </span>
            </p>

        </Link>
    </section>
  )
}

export default Card