import { z } from 'zod';

export const passwordSchema = z
  .string({ required_error: 'password is required' })
  .min(8, 'must be 8 or more characters')
  .regex(/[A-Z]/, 'upper & lowercase required')
  .regex(/[a-z]/, 'upper & lowercase required')
  .regex(/[0-9]/, 'at least one number required');

export const emailSchema = z
  .string({ required_error: 'email is required' })
  .email('must enter a valid email');

// Name should only contain letters and numbers
export const nameSchema = z
  .string({ required_error: 'Name is required' })
  .min(4, 'must be atleast 4 characters')
  .regex(/^(?!\s*$)[a-zA-Z0-9 ]+$/, 'Symbols are not allowed');

export const nameRegex = /^(?!\s*$)[a-zA-Z0-9 ]+$/;
