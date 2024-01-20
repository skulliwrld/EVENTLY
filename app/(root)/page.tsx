import Hero from '@/components/Hero'


export default function Home() {
  
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
     </section>
    </main>
  )
}
