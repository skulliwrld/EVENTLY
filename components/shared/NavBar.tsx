"use client"
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { NavItems } from '@/lib/Data'
import NavView from '../NavView'
import { Button } from '../ui/button'
import { useState } from 'react'
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import { FaBars, FaTimes } from 'react-icons/fa'

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"



export const NavBar = () => {

  const [click, setClick] = useState(false)
  const handleClick = () =>{
    setClick(!click)
  }
  return (
    <header className="w-full border-b">
      <div className="wrapper flex justify-between items-center">
        <div>
          <Link href="/">
          <Image src="/assets/icons/cover.png" className="rounded-md" alt="logo" width={128} height={40}/>
          </Link>
        </div>
        {/* Desktop view */}
        <div className=" md:flex justify-between gap-3 hidden">
          {NavItems.map((data) =>(
            <NavView key={data.title} title={data.title} icons={data.icons} links={data.link} />
          ))}
        </div>
        
    
        
        {/* Mobile Views === using cleark for authentication and user management */}
        <div className="flex w-32 justify-end gap-3 items-center">
          <SignedIn>
            <UserButton afterSignOutUrl='/' />
          </SignedIn>
          
          <div className="md:hidden ">
            <Sheet>
              <SheetTrigger>
               <FaBars size={28}/>
              </SheetTrigger>

              <SheetContent className="flex flex-col gap-10 min-h-screen text-xl py-24 bg-white text-black items-center">

              <SheetHeader>
                <SheetTitle className="text-4xl text-start text-purple-700">Skulli Events</SheetTitle>
                <SheetDescription className="text-start">
                  Welcome to Skulli Event Managements Website
                </SheetDescription>
              </SheetHeader>

                {NavItems.map((data) =>(
                <NavView key={data.title} title={data.title} icons={data.icons} links={data.link} />
              ))}
            </SheetContent>
          </Sheet>
          </div>
          

        
          <SignedOut>
            <Button asChild className="bg-teal-600 rounded-md" size="lg">
              <Link href="/sign-in">log in</Link>
            </Button>
          </SignedOut>

        </div>
      </div>
      
    </header>
  )
}
