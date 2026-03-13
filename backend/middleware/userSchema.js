const { z } = require('zod');

const registerUserSchema = z.object({
  firstName: z
    .string()
    .min(1, { message: 'First Name is Required' })
    .toLowerCase(),
  lastName: z
    .string()
    .min(1, { message: 'Last Name is Required' })
    .toLowerCase(),
  email: z.email({ message: 'Invalid Email Address' }).toLowerCase(),
  birthDay: z.string().min(1, { message: 'Birthday is Required' }),
  isActive: z.boolean().default(true),
  password: z.string().min(8, { message: 'Minimum of 8 Characters' }),
});

const loginUserSchema = z.object({
  email: z.email({ message: 'This Field is Required' }).trim(),
  password: z.string().min(1, { message: 'This Field is Required' }),
});

const updateUserSchema = z.object({
  firstName: z
    .string()
    .min(1, { message: 'First Name is Required' })
    .toLowerCase(),
  lastName: z
    .string()
    .min(1, { message: 'Last Name is Required' })
    .toLowerCase(),
  email: z.email({ message: 'Invalid Email Address' }).toLowerCase(),
  birthDay: z.string().min(1, { message: 'Birthday is Required' }),
});
module.exports = { registerUserSchema, loginUserSchema, updateUserSchema };
