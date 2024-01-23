import * as z from "zod"

// Form Schema Using Zod

export const EvenFormSchema = z.object({
    title: z.string().min(3, {
      message: "title must be at least 2 characters.",
    }),

    description: z.string().min(5, {
        message: "description must be at least 5 characters.",
      }).max(400,"description must be at less than 400 characters"),
    
      
    location: z.string().min(5, {
        message: "location must be at least 5 characters.",
      }).max(400,"location must be at less than 400 characters"),
    
      imageUrl: z.string().min(5, {
        message: "location must be at least 5 characters.",
      }).max(400,"location must be at less than 400 characters"),
      startDateTime: z.date(),
      endDateTime: z.date(),
      categoryId: z.string(),
      price: z.string(),
      isFree: z.boolean(),
      url:z.string().url()



    
  })