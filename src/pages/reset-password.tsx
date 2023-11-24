import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast, Toaster } from 'react-hot-toast';
import { FormattedMessage } from 'react-intl';
import { z } from 'zod';

import { resetPassword } from '@/apihelpers/api';
import LoadingSpinner from '@/components/LoadingSpinner';
import { Checkmark } from '@/icons/checkmarkicon';
import { passwordSchema } from '@/schemas/schema';

type Form = z.infer<typeof formSchema>;

const formSchema: any = z.object({
  password: passwordSchema,
  // confirm password should be same as password
  confirmPassword: z.string({ required_error: 'Confirm password is required' }),
});

const ActiveCheckIcon = ({ active }: { active: boolean }) => {
  return (
    <div
      className={`flex h-[1rem] w-[1rem] items-center justify-center rounded-full p-[0.3rem] ${
        active ? 'bg-green-400' : 'border border-gray-600 bg-gray-300'
      }`}
    >
      <Checkmark variant="white" height={12} width={12} />
    </div>
  );
};

const ForgotPassword = () => {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [valid, setValid] = useState(false);

  const { register, formState, handleSubmit, watch } = useForm<Form>({
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
    mode: 'all',
    resolver: zodResolver(formSchema),
  });

  const form = watch();
  const { errors } = formState;

  useEffect(() => {
    setValid(formSchema.safeParse(form).success);
  }, [form]);
  // const finished = false;

  const router = useRouter();
  const token = router.query.token as string;
  const email = router.query.email as string;

  const handleReset = async () => {
    if (!token) return toast.error('Invalid token');
    if (!email) return toast.error('Invalid email');

    if (!form.password || !form.confirmPassword)
      return toast.error('Please enter password and confirm password');

    if (!valid) return toast.error('Please enter valid password');

    if (form.password !== form.confirmPassword)
      return toast.error('Passwords do not match');

    setLoading(true);

    const response = await resetPassword({
      email,
      password: form.password,
      token,
    });

    if (response.success) {
      toast.success(() => (
        <FormattedMessage
          id="Password reset successfully. Redirecting to login page."
          defaultMessage="Password reset successfully. Redirecting to login page."
        />
      ));

      setTimeout(() => {
        router.push('/login');
      }, 2000);
    } else {
      toast.error(response?.message ?? 'Failed to send reset password email');
    }
    setLoading(false);

    return null;
  };

  useEffect(() => {
    setTimeout(() => {
      if (!token) return toast.error('Looks like the the token is missing.');
      if (!email) return toast.error('Looks like the the email is missing.');
      return null;
    }, 4000);
  }, []);

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="relative flex max-w-4xl flex-col items-center justify-center bg-white px-8 py-10">
        {/* <button className="absolute right-3 top-3 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 p-0 ">
          x
        </button> */}
        <div className="w-96 text-center">
          <h3 className="w-full text-2xl font-medium">
            <FormattedMessage
              id="Reset Password"
              defaultMessage="Reset Password"
            />
          </h3>
          <p className="mt-4 text-base font-normal text-gray-700">
            <FormattedMessage
              id="Enter your email to reset your password"
              defaultMessage="Enter your email to reset your password"
            />
          </p>
        </div>
        <form
          className="mt-8 flex w-full flex-col"
          onSubmit={handleSubmit(handleReset)}
        >
          <div className="ml-auto max-w-max">
            <button
              type="button"
              className="p-0 hover:underline"
              onClick={() => setShowPassword(!showPassword)}
            >
              <FormattedMessage
                id={showPassword ? 'Hide' : 'Show'}
                defaultMessage={showPassword ? 'Hide' : 'Show'}
              />
            </button>
          </div>
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="New password"
            {...register('password', { required: true })}
            // value={password}
            // onChange={(e: any) => setPassword(e.target.value)}
            autoComplete="password"
            className="w-full border-x-0 border-b border-t-0 border-b-zinc-400 bg-inherit p-3 text-xl font-light outline-none"
          />
          {errors.password && (
            <small className="text-red-500">
              {errors.password?.message as string}
            </small>
          )}

          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Confirm password"
            {...register('confirmPassword', {
              required: true,
              validate: (p: string) => {
                alert(form.password);
                if (p !== form.password) return 'Passwords do not match';
                return '';
              },
            })}
            autoComplete="password"
            className="w-full border-x-0 border-b border-t-0 border-b-zinc-400 bg-inherit p-3 text-xl font-light outline-none"
          />
          {errors.confirmPassword && (
            <small className="text-red-500">
              {errors.confirmPassword?.message as string}
            </small>
          )}

          <div
            // ref={passwordRef}
            className=""
            data-te-animation-init
            data-te-animation-start="onClick"
            data-te-animation-reset="true"
            data-te-animation="[slide-right_1s_ease-in-out]"
            mt-4
          >
            <FormattedMessage
              id="Hey 👋️ your password must contain:"
              defaultMessage="Hey 👋️ your password must contain:"
            />
            <div className="mb-0 mt-3 flex items-center">
              <ActiveCheckIcon active={form.password.length >= 8} />
              <p className="ml-2 text-xs font-medium text-gray-900 dark:text-gray-600">
                <FormattedMessage
                  id="at least 8 characters in length"
                  defaultMessage="at least 8 characters in length"
                />
              </p>
            </div>
            <div className="mb-0 flex items-center">
              <ActiveCheckIcon active={!!form.password.match(/[a-z]/)} />
              <p className="ml-2 text-xs font-medium text-gray-900 dark:text-gray-600">
                <FormattedMessage
                  id="lower case letters (ie. a-z)"
                  defaultMessage="lower case letters (ie. a-z)"
                />
              </p>
            </div>
            <div className="mb-0 flex items-center">
              <ActiveCheckIcon active={!!form.password.match(/[A-Z]/)} />
              <p className="ml-2 text-xs font-medium text-gray-900 dark:text-gray-600">
                {' '}
                <FormattedMessage
                  id="upper case letters (ie. A-Z)"
                  defaultMessage="upper case letters (ie. A-Z)"
                />
              </p>
            </div>
            <div className="mb-0 flex items-center">
              <ActiveCheckIcon active={!!form.password.match(/[0-9]/)} />
              <p className="ml-2 text-xs font-medium text-gray-900 dark:text-gray-600">
                {' '}
                <FormattedMessage
                  id="numbers (ie. 0-9)"
                  defaultMessage="numbers (ie. 0-9)"
                />
              </p>
            </div>
          </div>

          <div className="flex w-full gap-5">
            <button
              type="submit"
              className="mt-6 h-14 w-full rounded-lg bg-violet-700 text-center text-xl font-medium text-white transition duration-500 hover:scale-105 hover:drop-shadow-xl disabled:cursor-not-allowed"
              disabled={loading || !valid}
            >
              {loading ? (
                <LoadingSpinner />
              ) : (
                <FormattedMessage
                  id="Reset Password"
                  defaultMessage="Reset Password"
                />
              )}
            </button>{' '}
          </div>
        </form>

        <Link href="/login" className="mt-5 underline">
          Back to Login
        </Link>
      </div>

      <Toaster />
    </div>
  );
};

export default ForgotPassword;
