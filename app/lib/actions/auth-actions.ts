'use server';

import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
import { z } from 'zod';

const SignInFormSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address' }),
});

export async function signInWithEmail(
  _prevState: string | undefined,
  formData: FormData,
) {
  try {
    const result = SignInFormSchema.safeParse({
      email: formData.get('email'),
    });

    if (!result.success) {
      return 'Please enter a valid email address';
    }

    await signIn('email', { email: result.data.email });
  } catch (e) {
    if (e instanceof AuthError) {
      switch (e.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials';
        default:
          return 'Something went wrong';
      }
    }
    throw e;
  }
}