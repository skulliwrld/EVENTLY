import React, { startTransition, useState } from 'react'
import {Select,SelectContent,SelectItem,SelectTrigger,SelectValue,
} from "@/components/ui/select"


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

import { ICategory } from '@/models/category.model'
import { Input } from '../ui/input'
  


function Dropdown(props:{value:string, onchangeHandler:()=> void}) {
    const [categories, setCategories]  = useState<ICategory[]>([])
    const [newCategory, setNewCategory] = useState("")

    const handleAddCategory = () =>{
        
    }
  return (
    <section>
        <Select onValueChange ={props.onchangeHandler} defaultValue={props.value}>
            <SelectTrigger className="select-field">
            <SelectValue placeholder="Categories" />
            </SelectTrigger>
            <SelectContent>
                {categories.length > 0 && categories.map((category) =>(
                    <SelectItem key={category._id} value={category._id} onChange={(e:any)=> setCategories(e.target.value)} className="select-item p-regular-14">{category.name}</SelectItem>
                ))}

                <AlertDialog>
                    <AlertDialogTrigger className="p-medium-14 flex w-full rounded-sm py-3 pl-8 text-primary-500 hover:bg-primary-50 focus:text-primary-500">Add Categories</AlertDialogTrigger>
                    <AlertDialogContent className="bg-white">
                        <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            <Input type="text" placeholder='category' className="input-field mt-3" onChange={(e)=>setNewCategory(e.target.value)}/>
                        </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={() =>{
                            startTransition(handleAddCategory)
                        }}>Add New Category</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>

            </SelectContent>
        </Select>

    </section>
  )
}

export default Dropdown