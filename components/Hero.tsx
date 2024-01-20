import React from 'react'
import { Button } from './ui/button'
import Link from 'next/link'
import Image from 'next/image'

function Hero() {
  return (
    <section className="md:px-16 md:py-8 grid md:grid-cols-12 gap-10 bg-[#f0f9ff] py-3 px-2 justify-center">

      <div className="flex flex-col md:items-start gap-3 justify-center col-span-5 items-center">
        <h2 className="font-bold md:text-5xl text-4xl  md:text-start">Host, Connect, Celebrate: Your Events, Our Plaform</h2>
        <p>
          Book and learn helpful tips from 2,113+ mentors in world-class companies with our global community
        </p>
        <Link href="/" className="text-start md:w-auto w-full">
          <Button size='lg' className="bg-purple-600 text-white rounded-full w-full">Explore Now</Button>
        </Link>
      </div>

      <div className="col-span-7 md:ml-28 px-12 md:px-0">
        <Image src='/assets/images/hero.png' width={280} height={30} alt="hero"/>
      </div>
    </section>
  )
}

export default Hero