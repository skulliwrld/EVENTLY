import { getEventById, getRelatedEventsByCategory } from '@/lib/actions/events.actions'
import { SearchParamProps } from '@/public/type'
import React from 'react'
import Image from 'next/image'
import { SlCalender } from 'react-icons/sl'
import { formatDateTime } from '@/lib/utils'
import { MdLocationPin } from 'react-icons/md'
import EventsCollections from '@/components/shared/Collection'
import Checkoutbutton from '@/components/shared/Checkoutbutton'



const EventDetails = async({params:{id}, searchParams} : SearchParamProps) => {

    const events = await getEventById(id)

    const relatedEvents = await getRelatedEventsByCategory({
        categoryId:events.category._id,
        eventId:events._id,
        page:searchParams.page as string
    })
   
  return (
    <>
        <section className="flex justify-center bg-primary-50 bg-dotted-pattern bg-contain">
            <div className="grid grid-cols-1 md:grid-cols-2 2xl:max-w-7xl">
                <Image src={events.imageUrl} alt="image" width={1000} height={1000}
                className="h-full min-h-[300px] object-cover object-center" />

                <div className="flex w-full flex-col gap-8 p-5 md:p-10">
                    <div className="flex flex-col gap-6">
                        <h2 className="h2-bold">{events.title}</h2>
                        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                            <div className="flex gap-3 items-center">
                                <p className="p-bold-20 rounded-full  bg-green-500/10 px-5 py-2 text-green-700">
                                    {events.isFree ? "FREE" : `${events.price}`}
                                </p>
                                <p className="p-medium-16 rounded-full  bg-gray-500/10 px-4 py-2 text-gray-500">
                                    {events.category.name}
                                </p>
                            </div>

                            <p className='p-medium-18 ml-2 mt-2 sm:mt-0'>
                                by {""}
                                <span className="text-primary-500">{events.organizer.firstName} {events.organizer.lastName}</span>
                            </p>
                        </div>
                    </div>
                    {/* CHECKOUT BUTTON */}
                    <Checkoutbutton event={events} />
                    <div className="flex flex-col gap-5">
                        <div className='flex gap-2 md:gap-3 items-center'>
                            <SlCalender size={20} className="text-orange-500" />
                            <div className="flex gap-2 p-medium-16 lg:p-regular-20 flex-wrap">
                                <p>
                                    {formatDateTime(events.startDateTime).dateOnly} {""}
                                    {formatDateTime(events.endDateTime).timeOnly}
                                </p>
                                    {"|"} 
                                <p>
                                    {formatDateTime(events.endDateTime).dateOnly} {""}
                                    {formatDateTime(events.endDateTime).timeOnly}
                                </p>
                            </div>
                            </div>

                            <div className="p-regular-20 flex items-center gap-3">
                                <MdLocationPin size={20} className="text-orange-600"/>
                            
                                <p className="p-medium-16 ">
                                    {events.location}
                                </p>
                            </div>
                        </div>

                        <div className= "flex flex-col gap-2">
                            <p className="p-bold-20 text-gray-600">
                                What You'll Learn:
                            </p>

                            <p className="p-medium-16 md:p-regular-18">{events.description}</p>

                            <p className="p-medium-16 md:p-regular-18 truncate text-primary-500 underline">{events.url}</p>
                        
                        </div>

                    </div>

                
                </div>
        </section>
        
        {/* Events from the same category */}
        <div className='my-3'>
            <h2 className="h2-bold text-center md:flex-start mb-3">
                Related Events
            </h2>
            <div className="flex-center md:block">
                <EventsCollections
                data={relatedEvents?.data}
                emptyStateSubtext = "Come Back Later"
                emptyTitle="No Events Found" 
                collectionType = "All_Events"
                limit={6}
                page={1}
                totalPage={2}/>
            </div>
            
        </div>
    </>
  )
}

export default EventDetails