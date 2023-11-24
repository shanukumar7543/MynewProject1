import { zodResolver } from '@hookform/resolvers/zod';
import { Modal } from '@mui/material';
import Cookies from 'js-cookie';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { toast, Toaster } from 'react-hot-toast';
import { FormattedMessage } from 'react-intl';
import { z } from 'zod';

import { getLogin, initateResetPassword, resendEmail } from '@/apihelpers/api';
import { POST_GOOGLE_LOGIN } from '@/apihelpers/url_helpers';
import LoadingSpinner from '@/components/LoadingSpinner';
import { emailSchema, passwordSchema } from '@/schemas/schema';

const formSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

type Form = z.infer<typeof formSchema>;

interface IForgotPassword {
  email?: string;
  open: boolean;
  handleClose: () => void;
}

const ForgotPassword = ({ email, open, handleClose }: IForgotPassword) => {
  const [input, setInput] = useState(email ?? '');
  const [loading, setLoading] = useState(false);

  const sendResetPasswordEmail = async () => {
    setLoading(true);
    const response = await initateResetPassword(input);

    if (response.success) {
      toast.success(() => (
        <FormattedMessage
          id="Reset password email sent successfully. Check your email for reset password link."
          defaultMessage="Reset password email sent successfully. Check your email for reset password link."
        />
      ));
      handleClose();
    } else {
      toast.error(response?.message ?? 'Failed to send reset password email');
    }
    setLoading(false);
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      className="flex items-center justify-center"
    >
      <div className="relative flex flex-col items-center justify-center bg-white px-8 py-10">
        {/* <button className="absolute right-3 top-3 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 p-0 ">
          x
        </button> */}
        <div className="w-96 text-center">
          <p className="w-full text-xl font-medium">
            <FormattedMessage
              id="Forgot Password"
              defaultMessage="Forgot Password"
            />
          </p>
          <p className="mt-4 text-base font-normal text-gray-700">
            <FormattedMessage
              id="Enter your email to reset your password"
              defaultMessage="Enter your email to reset your password"
            />
          </p>
        </div>

        <input
          type="email"
          placeholder="Enter your email"
          value={input}
          onChange={(e: any) => setInput(e.target.value)}
          autoComplete="email"
          className="my-4 w-full border-x-0 border-b border-t-0 border-b-zinc-400 bg-inherit p-3 text-xl font-light outline-none"
        />

        <div className="flex w-full gap-5">
          <button
            type="submit"
            className={`mt-6 h-14 w-full rounded-lg bg-gray-400 text-center text-xl font-medium text-black transition duration-500 hover:scale-105 hover:drop-shadow-xl${
              loading ? 'cursor-not-allowed opacity-50' : ''
            }`}
            disabled={loading}
            onClick={handleClose}
          >
            <FormattedMessage id="Cancel" defaultMessage="Cancel" />
          </button>{' '}
          <button
            type="submit"
            className={`mt-6 h-14 w-full rounded-lg bg-violet-700 text-center text-xl font-medium text-white transition duration-500 hover:scale-105 hover:drop-shadow-xl${
              loading ? 'cursor-not-allowed opacity-50' : ''
            }`}
            disabled={loading}
            onClick={sendResetPasswordEmail}
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
      </div>
    </Modal>
  );
};

const Login: SubmitHandler<Form> = () => {
  const { register, handleSubmit, watch } = useForm<Form>({
    mode: 'onBlur',
    resolver: zodResolver(formSchema),
  });

  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [isGoogleLogin, setIsGoogleLogin] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);

  const form = watch();
  // const errors = formState.errors;   formState(Line 22)

  const sendVerificationEmail = async () => {
    setLoading(true);
    const response = await resendEmail({ email: form.email });

    if (response.success) {
      toast.success(() => (
        <FormattedMessage
          id="Verification email sent successfully. Check your email for verification link."
          defaultMessage="Verification email sent successfully. Check your email for verification link."
        />
      ));
    } else {
      toast.error(response?.message ?? 'Failed to send verification email');
    }
    setLoading(false);
  };

  const login = async () => {
    setLoading(true);

    const response = await getLogin({
      email: form.email,
      password: form.password,
    });

    if (response.success) {
      toast.success('Sucessfully logged in. Redirecting...');
      Cookies.set('accessToken', response?.data?.accessToken, { expires: 1 });
      router.push('/all-interactions');
    } else if (response?.data?.emailVerified === false) {
      toast.error(
        () => (
          <div>
            <FormattedMessage
              id="Please verify your email. Check email for verification link."
              defaultMessage="Please verify your email. Check email for verification link."
            />
            <br />
            <button
              onClick={() => {
                toast.dismiss();
                sendVerificationEmail();
              }}
              className="p-0 text-blue-500 hover:underline"
            >
              <FormattedMessage
                id="Resend verification email"
                defaultMessage="Resend verification email"
              />
            </button>
          </div>
        ),
        { duration: 15000 }
      );
      // router.push('/verify-email');
    } else
      toast.error(
        response?.data?.message ?? response?.data?.error ?? 'Failed to login'
      );
    setLoading(false);
  };

  const handleGoogleLogin = async () => {
    setIsGoogleLogin(true);
    setLoading(true);
    router.push(POST_GOOGLE_LOGIN);
  };

  return (
    <div>
      <ForgotPassword
        email={form.email}
        open={isForgotPassword}
        handleClose={() => setIsForgotPassword(false)}
      />
      <div className="absolute right-10 top-2 z-20 text-base">
        <FormattedMessage
          id="Don't have an account?"
          defaultMessage="Don't have an account?"
        />
        <button
          type="button"
          className="ml-1 w-20 rounded-3xl bg-black pb-1 text-center text-sm font-medium text-white transition
                duration-500 hover:scale-105"
        >
          <Link className="text-white" href="/signup">
            <FormattedMessage id="Sign Up" defaultMessage="Sign Up" />
          </Link>
        </button>
      </div>
      <video
        className="max-h-screen min-h-screen min-w-full object-cover opacity-10"
        src="https://app.videoask.com/static/app/media/promo.mp4"
        autoPlay
        loop
        muted
      />
      <div className="absolute top-2 flex h-full w-full items-center justify-center pt-10">
        <div className="w-96">
          <div className="flex flex-col text-black">
            <div className="justify-left flex items-start">
              <img className="mb-4 ml-4 h-1/3 w-1/3" src="/logotext.png" />
            </div>
            <h2 className="ml-6 flex text-xl">
              <FormattedMessage id="Login" defaultMessage="Login" />
            </h2>
            <h2 className="ml-6 block text-xl font-medium">
              <FormattedMessage
                id="Please Log in..."
                defaultMessage="Please Log in..."
              />
            </h2>
            <form className="mx-6" onSubmit={handleSubmit(login)}>
              <input
                type="email"
                placeholder="Enter your email"
                {...register('email')}
                autoComplete="email"
                className="w-full border-x-0 border-b border-t-0 border-b-zinc-400 bg-inherit p-3 text-xl font-light outline-none"
              />
              <input
                type="password"
                placeholder="Your password"
                {...register('password')}
                autoComplete="password"
                className="w-full border-x-0 border-b border-t-0 border-b-zinc-400 bg-inherit p-3 text-xl font-light outline-none"
              />
              <button
                type="button"
                className="mt-3 text-sm font-medium leading-7 text-green-500 hover:underline"
                onClick={() => setIsForgotPassword(true)}
              >
                <FormattedMessage
                  id="I forgot my password"
                  defaultMessage="I forgot my password"
                />
              </button>
              <div className="flex justify-center">
                <button
                  type="submit"
                  className={`mt-6 h-14 w-full rounded-lg bg-violet-700 text-center text-xl font-medium text-white transition duration-500 hover:scale-105 hover:drop-shadow-xl${
                    loading ? 'cursor-not-allowed opacity-50' : ''
                  }`}
                  disabled={loading}
                >
                  {loading && !isGoogleLogin ? (
                    <LoadingSpinner />
                  ) : (
                    <FormattedMessage id="Log In" defaultMessage="Log In" />
                  )}
                </button>
              </div>
              <div className="flex justify-center pt-3 font-medium text-slate-600">
                <FormattedMessage id="Or" defaultMessage="Or" />
              </div>
              <div className="flex justify-center">
                <button
                  type="button"
                  className="dark:focus:ring-[#4285F4]/55 mb-2 mr-2 mt-4 inline-flex h-14  w-full items-center justify-center rounded-lg border-2 bg-black text-center text-sm font-medium text-white transition duration-500 hover:scale-105 hover:drop-shadow-xl focus:outline-none focus:ring-4 focus:ring-[#fff]/50"
                  onClick={handleGoogleLogin}
                >
                  <svg
                    className="mr-2 h-4 w-4"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 18 19"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8.842 18.083a8.8 8.8 0 0 1-8.65-8.948 8.841 8.841 0 0 1 8.8-8.652h.153a8.464 8.464 0 0 1 5.7 2.257l-2.193 2.038A5.27 5.27 0 0 0 9.09 3.4a5.882 5.882 0 0 0-.2 11.76h.124a5.091 5.091 0 0 0 5.248-4.057L14.3 11H9V8h8.34c.066.543.095 1.09.088 1.636-.086 5.053-3.463 8.449-8.4 8.449l-.186-.002Z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {loading && isGoogleLogin ? (
                    <LoadingSpinner />
                  ) : (
                    <FormattedMessage
                      id="Login with Google"
                      defaultMessage="Login with Google"
                    />
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default Login;
