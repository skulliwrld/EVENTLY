import Hero from '@/components/Hero'
import EventsCollections from '@/components/shared/Collection'
import { getAllEvents } from '@/lib/actions/events.actions'


export default async function Home() {
 
    const EVENTS = await getAllEvents({
        query: "",
        category: "",
        page:1,
        limit: 6
    })
  return (
    <main>
     <Hero />
     <section className="wrapper my-8 flex flex-col md:gap-12">
        <h2 className="text-3xl font-bold">
          Trusted my <br/>Thousand of Events
        </h2>
        <div>
          search
          category
        </div>
        <EventsCollections
            data={EVENTS.data}
            emptyStateSubtext = "Come Back Later"
            emptyTitle="No Events Found" 
            collectionType = "All_Events"
            limit={6}
            page={1}
            totalPage={2}
        />
     </section>
    </main>
  )
}
