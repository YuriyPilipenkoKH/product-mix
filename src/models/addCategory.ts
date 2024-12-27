import { z, ZodType } from 'zod';

export const addNewCategorySchema: ZodType<{
    name: string;

}> = z.object({
    name: z
    .string()
    .min(3, 'Category should be at least 3 characters long')
    .regex(/^[a-zA-Z]+$|^[0-9]+$|^[\w\s]+$|^[\w\s_]+$/, { 
        message: "Use letters, numbers & underscore" 
    }),      

    
})

export type addNewCategorySchemaType = z.infer<typeof addNewCategorySchema>

