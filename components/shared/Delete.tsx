"use client"

import React, { useTransition } from 'react'
import Image from 'next/image'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
import { usePathname } from 'next/navigation'
import { deleteEvent } from '@/lib/actions/events.actions'

interface dataDelete {
    eventId:String
}
function DeleteEvents({eventId}:dataDelete) {
    const pathName = usePathname()
    let [isPending , startTransition] = useTransition()
  return (
    <section>
        <AlertDialog>
                    <AlertDialogTrigger>
                        <Image src="/assets/icons/delete.svg" alt="edit" width={20} height={20}></Image>
                    </AlertDialogTrigger>
                    <AlertDialogContent className="bg-white">
                        <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        
                        <AlertDialogDescription className="textarea-field">
                            You will parmanently delete this event
                        </AlertDialogDescription>
                        </AlertDialogHeader>

                        <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={() =>{
                            startTransition(async ()=>{
                                await deleteEvent({eventId, path:pathName})
                            })
                        }}>{isPending ? "Deleting.... ": "Delete"}</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>

        
    </section>
  )
}

export default DeleteEvents