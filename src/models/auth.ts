import { z } from "zod"

export const RegisterSchema = z.object({
    name: z
        .string()
        .trim()
        .min(3, 'At least 3 characters for name')
        .max( 32, 'Not longer than 32 characters')
        .regex(/^[a-zA-Z0-9]+$/, 'Only letters and numbers are allowed')
        .refine((val) => !val.toLowerCase().startsWith('qwe'), {
            message: 'Enter a different name'
          })
         .superRefine((val, ctx) => {
            const forbidden = process.env.NAMES_TO_AVOID?.split(",").map((name) => name.toLowerCase()) || [];
            if (forbidden.includes(val.toLowerCase())) {
              ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "Name is not allowed",
              });
            }
          }),

    email: z
        .string()
        .email('Email is not valid')
        .refine((val) => !val.toLowerCase().startsWith('admin'), {
            message: 'Enter a different email address'
          })  
        .refine((val) => !val.endsWith('.ru'), {
            message: 'Domain is not supported'
          })
        // .refine(async (fieldValue) => {
        //     const result = await emailAvailable(fieldValue);
        //     return result === undefined;
        // }, {
        //     message: 'Email already exists'
        // })  
        ,
    password: z
        .string()
        .min(6, "Minimum 6 characters for password")
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d$#&]*$/, { 
            message: "Include capital letters and numbers" 
        }),      
})


export const LoginSchema = z.object({

    email: z
        .string()
        .email('email is not valid')
        .refine((val) => !val.endsWith('.ru'), {
            message: 'Domain is not supported'
          })
        // .refine(async (fieldValue) => {
        //     const result = await emailAvailable(fieldValue);
        //     return result !== undefined;
        // }, {
        //     message: 'Email not found'
        // })  
      ,
    password: z
        .string()
        .min(6, "Minimum 6 characters for password")
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d$#&]*$/, { 
            message: "Don`t forget your password" 
        }),      
})

   export type RegInput = z.infer <typeof RegisterSchema >
   export type LogInput = z.infer <typeof LoginSchema >

// name validation
// 1 variant
  //  .refine((val) => {
  //   const forbidden = process.env.NAMES_TO_AVOID?.split(",").map((name) => name.toLowerCase()) || [];
  //   return !forbidden.includes(val.toLowerCase());
  // }, {
  //   message: `Name is not allowed`,
  // }),
// 2 variant
