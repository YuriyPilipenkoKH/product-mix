import { z } from "zod";

// Register Schema Factory
export const getRegisterSchema = (t: (key: string) => string) => {
  const schema = z.object({
    name: z
      .string()
      .trim()
      .min(3, t('name.min'))
      .max(32, t('name.max'))
      .regex(/^[a-zA-Z0-9]+$/, t('name.regex'))
      .refine((val) => !val.toLowerCase().startsWith('qwe'), {
        message: t('name.forbiddenPrefix'),
      })
      .superRefine((val, ctx) => {
        const forbidden = process.env.NAMES_TO_AVOID?.split(",")
          .map((name) => name.toLowerCase()) || [];
        if (forbidden.includes(val.toLowerCase())) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: t('name.forbiddenName'),
          });
        }
      }),

    email: z
      .string()
      .email(t('email.invalid'))
      .refine((val) => !val.toLowerCase().startsWith('admin'), {
        message: t('email.forbiddenPrefix'),
      })
      .refine((val) => !val.endsWith('.ru'), {
        message: t('email.unsupportedDomain'),
      }),

    password: z
      .string()
      .min(6, t('password.min'))
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d$#&]*$/, {
        message: t('password.requirements'),
      }),
  });

  return schema;
};

// Register Schema Type
export type RegInput = z.infer<ReturnType<typeof getRegisterSchema>>;

// Login Schema Factory
export const getLoginSchema = (t: (key: string) => string) => {
  const schema = z.object({
    email: z
      .string()
      .email(t('email.invalid'))
      .refine((val) => !val.endsWith('.ru'), {
        message: t('email.unsupportedDomain'),
      }),

    password: z
      .string()
      .min(6, t('password.min'))
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d$#&]*$/, {
        message: t('password.requirements'),
      }),
  });

  return schema;
};

// Login Schema Type
export type LogInput = z.infer<ReturnType<typeof getLoginSchema>>;



  //  export type RegInput = z.infer <typeof RegisterSchema >
  //  export type LogInput = z.infer <typeof LoginSchema >

// name validation
// 1 variant
  //  .refine((val) => {
  //   const forbidden = process.env.NAMES_TO_AVOID?.split(",").map((name) => name.toLowerCase()) || [];
  //   return !forbidden.includes(val.toLowerCase());
  // }, {
  //   message: `Name is not allowed`,
  // }),
// 2 variant
