import { IEvent } from '@/models/event.model'
import React from 'react'
import Card from './Card'

interface CollectionProps{
    data:IEvent[],
    emptyTitle:string,
    emptyStateSubtext:string,
    limit:number,
    totalPage?:number,
    page:number | string,
    urlParamName?: string,
    collectionType?: "Events_Organized" | "My_Tickets" | "All_Events"
}

function EventsCollections({data, emptyTitle,emptyStateSubtext,limit, totalPage=0, collectionType,page, urlParamName}:CollectionProps) {
  return (
    <section>
        {data.length > 0 ? (
            <div className="flex flex-col items-center gap-10">
                <ul className="grid grid-cols-1 w-full gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:gap-10">
                    
                        {data.map((event) =>{
                        const hasOrderLink = collectionType === 'Events_Organized';

                        const hidePrice = collectionType === "My_Tickets"

                        return (
                            <li key={event._id}>
                                <Card events={event} hasOrderLink={hasOrderLink}
                                 hidePrice={hidePrice}/>
                            </li>
                        )}


                        )}
                
                    
                </ul>
                
            </div>
        ):(
            <div className="flex-center wrapper min-h-[200px] w-full flex-col gap-3 rounded-[14px] bg-gray-50 py-38 text-center">
                <h3 className="p-bold-20 md:h5-bold">
                    {emptyTitle}
                </h3>
                <p className="p-regular-14">
                    {emptyStateSubtext}
                </p>
            </div>
        )}
    </section>
  )
}

export default EventsCollections