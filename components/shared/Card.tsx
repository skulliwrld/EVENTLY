import React from 'react'
import Link from 'next/link'
import { IEvent } from '@/models/event.model'
import Image from 'next/image'
import { SlCalender } from 'react-icons/sl'
import { formatDateTime } from '@/lib/utils'
import { auth } from '@clerk/nextjs'
import DeleteEvents from './Delete'


interface EventsProps {
    events:IEvent,
    hidePrice?:boolean
    hasOrderLink?:boolean
}
function Card({events,hidePrice,hasOrderLink}:EventsProps) {
const {sessionClaims} = auth()
const  userId = sessionClaims?.userId as string;

const isCreator = userId === events.organizer._id.toString();


  return (
    <section className="group relative min-h-[380px] w-full flex-col max-w-[400px] overflow-hidden rounded-xl bg-white shadow-md transition-all hover:shadow-lg md:min-h-[438px]">
        <div className="">
            <Link href={`events/${events._id}`}>
                <Image src={events.imageUrl} width={1000} height={1000} alt="image" className=" rounded-xl object-contain  rounded-b-none">
                </Image>
            </Link>

            {/* IS EVENT CREATOR */}
            {isCreator && !hidePrice && (
                <div className='absolute right-2 top-2 flex flex-col rounded-xl bg-white p-3 shadow-sm transition-all gap-3'>
                    <Link href={`/events/${events._id}/update`}>
                    <Image src={"/assets/icons/edit.svg"} alt="edit" width={20} height={20} />
                    </Link>
                    <DeleteEvents eventId={events._id} />
                </div>  
            ) 
                
            }

            {!hidePrice  &&
            <div className="flex gap-3 py-3">
                <p className="font-bold rounded-full bg-green-500/10 px-5 py-2 text-green-700">
                    {events.isFree ? "FREE" : `#${events.price}`}
                </p>
                <p className="p-medium-16 rounded-full  bg-gray-500/10 px-4 py-2 text-gray-500 line-clamp-1">
                    {events.category.name}
                </p>
            </div>  }

            <h2 className="font-bold pl-3 ">{events.title}</h2>
            <div className="flex gap-3 items-center py-2 px-2">
                <SlCalender size={20} className="text-orange-500" />

                <p>
                    {formatDateTime(events.startDateTime).dateOnly} {""}
                    {formatDateTime(events.endDateTime).timeOnly}
                </p>
            </div>
            
            <div className="px-2 flex justify-between relative">
                <p className='text-sm font-bold ml-2 mt-20 md:mt-2'>
                By {""}
                <span className="">
                    {events.organizer.firstName} {events.organizer.lastName}
                </span>
                </p>

                {hasOrderLink &&(
                    <Link href={`/orders?eventId=${events._id}`} className="flex gap-3 absolute right-5 bottom-1">
                        <p className="text-primary-500">
                            Order Details
                        </p>
                        <Image src="/assets/icons/arrow (1).svg" width={10} height={10} alt="arrow" />
                    </Link> 
                )}
            </div>
           
        </div>
    </section>
  )
}

export default Card