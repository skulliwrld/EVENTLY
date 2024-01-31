"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

// BUIDINF OUR FORM UIS
import { Button } from "@/components/ui/button"
import {Form,FormControl,FormField,FormItem,FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {EvenFormSchema} from "@/lib/validator"
import Dropdown from "./Dropdown"
import { Textarea } from "@/components/ui/textarea"
import {FileUploader} from "./FileUploader"
import { useState } from "react"
import { MdLocationPin } from "react-icons/md";
import { SlCalender } from "react-icons/sl";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaDollarSign } from "react-icons/fa6";
import { Checkbox } from "@/components/ui/checkbox"
import { GoLink } from "react-icons/go";
import {useUploadThing} from "@/lib/uploadthing"

import { useRouter } from "next/navigation"
import { createEvent } from "@/lib/actions/events.actions"


type EventFormProps = {
    userId:string,
    type: "Create" | "Update"
}

function EventForm({userId, type}: EventFormProps) {
    const [files, setFiles] = useState<File[]>([])
    
    const Router = useRouter()

    const {startUpload} = useUploadThing("imageUploader")
    // 1. Define your form.
    const form = useForm<z.infer<typeof EvenFormSchema>>({
    resolver: zodResolver(EvenFormSchema),
    defaultValues: {
      title: "",
      location:"",
      imageUrl:"",
      price:"",
      endDateTime: new Date(),
      startDateTime:new Date(),
      isFree:false,
      url:"",
      categoryId:"",
      description:""
    },
  })
 
  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof EvenFormSchema>) {

    let uploadImageUrl = values.imageUrl
    if(files.length > 0){
        const uploadedimage = await startUpload(files)
        if(!uploadedimage){
            return
        }
        uploadImageUrl = uploadedimage[0].url 
    }
    if (type === "Create"){
        try {
           const newEvent = await createEvent({
            event:{...values, imageUrl: uploadImageUrl},
            userId,
            path:"/profile"
           }) 

           if(newEvent){
            form.reset();
            Router.push(`/events/${newEvent._id}`)
           }
        } catch (error) {
            
        }
    }

}
  return (
    <div>
        <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5">
            <div className="flex flex-col gap-5 md:flex-row w-full">
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem className="md:w-1/2 w-full">
                        <FormControl>
                            <Input placeholder="Event title" {...field}  className="input-field"/>
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="categoryId"
                    render={({ field }) => (
                        <FormItem className="md:w-1/2 w-full">
                        <FormControl>
                            <Dropdown onchangeHandler={field.onChange}  value={field.value}/>
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                /> 
            </div>

            <div className="flex flex-col gap-5 md:flex-row w-full">
                <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem className="md:w-1/2 w-full">
                            <FormControl className="h-72">
                                <Textarea placeholder="description" {...field}  className="textarea rounded-2xl"/>
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                    />

                <FormField
                    control={form.control}
                    name="imageUrl"
                    render={({ field }) => (
                        <FormItem className="md:w-1/2 w-full">
                        <FormControl className="h-72">
                            <FileUploader onFieldChange={field.onChange} imageUrl={field.value}
                            setFiles={setFiles} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                />
            </div>

                    <FormField
                        control={form.control}
                        name="location"
                        render={({ field }) => (
                            <FormItem className="w-full">
                            <FormControl className="h-72">
                                <div className="flex w-full items-center gap-2 input-field">
                                    <MdLocationPin size={36} className="text-teal-600" />
                                    <Input  {...field} className="input-field"  placeholder="Events Location or Online "/>
                                </div>
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                    />

            <div className="flex flex-col gap-5 md:flex-row w-full">
                <FormField
                    control={form.control}
                    name="startDateTime"
                    render={({ field }) => (
                        <FormItem className="md:w-1/2 w-full">
                        <FormControl className="h-72">
                            <div className="flex w-full items-center gap-2 input-field">
                                <SlCalender size={25} className="text-teal-600" />
                                <p className="text-sm text-gray-600">Start Date</p>
                                <DatePicker selected={field.value} onChange={(date:Date) => field.onChange(date)} showTimeSelect
                                timeInputLabel="Time:" 
                                dateFormat="mm/dd/yyyy h:mm aa"
                                wrapperClassName="dataPicker"/>
                            </div>
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="endDateTime"
                    render={({ field }) => (
                        <FormItem className="md:w-1/2 w-full">
                        <FormControl className="h-72">
                            <div className="flex w-full items-center gap-2 input-field">
                                <SlCalender size={25} className="text-teal-600" />
                                <p className="text-sm text-gray-600">End Date</p>
                                <DatePicker selected={field.value} onChange={(date:Date) => field.onChange(date)} showTimeSelect
                                timeInputLabel="Time:" 
                                dateFormat="mm/dd/yyyy h:mm aa"
                                wrapperClassName="dataPicker"/>
                            </div>
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                />
                </div>

                <div className="flex flex-col md:flex-row gap-5 w-full">
                    <FormField
                        control={form.control}
                        name="price"
                        render={({ field }) => (
                            <FormItem className="md:w-1/2 w-full">
                            <FormControl className="h-72">
                                <div className="flex w-full items-center gap-2 input-field">
                                    <FaDollarSign size={25} className="text-teal-600" />
                                    <div className="flex justify-between w-full items-center">
                                        <Input type="number" placeholder="Price" {...field} className="p-regular-16 border-0 bg-gray-50 outline-offset-0 focus:border-0 focus-visible:ring-0 focus-visible:ring-offset-0"/>

                                        <FormField
                                        control={form.control}
                                        name="isFree"
                                        render={({ field }) => (
                                            <FormItem>
                                            <FormControl>

                                                <div className="flex  items-center justify-between">
                                                    <label htmlFor="isFree" className="whitespace-nowrap p-3 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-78">
                                                        Free Ticket
                                                    </label>
                                                    <Checkbox onCheckedChange={field.onChange} checked={field.value} id="isFree" className="mr-2 border-2 h-5 w-5" />
                                                </div>
                                            </FormControl>
                                            <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    </div>
                                </div>
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                    control={form.control}
                    name="url"
                    render={({ field }) => (
                        <FormItem className="md:w-1/2 w-full">
                        <FormControl className="h-72">
                            <div className="flex w-full items-center gap-2 input-field">
                                <GoLink size={25} className="text-teal-600" />
                                <Input className="input-field" {...field} placeholder="Event Link"/>
                            </div>
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                />


                    
                </div>
            <div>
                
        </div>
        
        <Button type="submit" size="lg" disabled={form.formState.isSubmitting} className="button col-span-2 w-full">{form.formState.isSubmitting ? "submitting..." : `${type} Event`}</Button>
      </form>
        </Form>
    </div>
  )
}

export default EventForm