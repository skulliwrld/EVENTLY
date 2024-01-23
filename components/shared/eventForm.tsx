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




function EventForm(props:{type:"create" | "update", userId:string}) {
    const [files, setFiles] = useState<File[]>([])
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
  function onSubmit(values: z.infer<typeof EvenFormSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
  }

  return (
    <div>
        <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5">
            <div className="flex flex-col gap-5 md:flex-row">
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem className="w-ful">
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
                        <FormItem className="w-ful">
                        <FormControl>
                            <Dropdown onchangeHandler={field.onChange}  value={field.value}/>
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                /> 
            </div>

            <div className="flex flex-col gap-5 md:flex-row">
                <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem className="w-ful">
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
                            <FormItem className="w-ful">
                            <FormControl className="h-72">
                                <FileUploader onFieldChange={field.onChange} imageUrl={field.value}
                                setFiles={setFiles} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                    />
            </div>

            <div>
                
            </div>

        
        <Button type="submit">Submit</Button>
      </form>
    </Form>
    </div>
  )
}

export default EventForm