import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { toast, Toaster } from 'react-hot-toast';

import { resendEmail } from '@/apihelpers/api';

const Verification: React.FC = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    setEmail(router.query.email as string);
  }, [router.query]);

  const handleUseDifferentEmail = () => {
    router.push('/signup'); // Redirect to the signup page
  };

  const handleResendEmail = async () => {
    try {
      const response = await resendEmail({ email }); // Call the resendEmail function with email data
      if (response) {
        toast.success('Verification email has been resent!');
      }
    } catch (err) {
      console.error('Error:', err);
      setError('An error occurred while resending the email.');
    }
  };
  return (
    <div className="h-full max-h-screen min-h-screen w-full bg-slate-100 ">
      <div className="z-20 pl-10 pt-6 text-base">VidyChat</div>
      <div className="flex h-full w-full items-center justify-center ">
        <div className="flex w-1/3 flex-col items-center justify-center">
          <div className="w-96 text-center">
            <p className="w-full text-xl font-medium">
              Please, verify your email.
            </p>
            <p className="mt-4 text-base font-normal text-gray-700">
              We have sent an email to &nbsp;
              <span className="w-full font-bold text-black">{email}</span>.
              Check your inbox to activate your account.
            </p>
          </div>
          <img
            alt="Check your Email"
            className="mt-6 w-full max-w-lg rounded-lg"
            src="https://app.videoask.com/static/admin/images/dog_mail.gif"
          />

          <div className="mt-6 w-96 text-center">
            <p className="mt-6 w-full text-sm font-medium">
              Did you not receive an email?
            </p>
            <p className="w-full text-sm font-medium">
              Have you checked your spam folder?
            </p>
            <div className="flex flex-col items-center justify-center">
              <button
                type="button"
                onClick={handleResendEmail}
                className="mt-6 h-8 w-1/3 rounded-lg bg-gray-300 text-center text-sm font-medium transition duration-500 hover:scale-105 hover:drop-shadow-xl"
              >
                Resend Email
              </button>
              <button
                type="submit"
                onClick={handleUseDifferentEmail}
                className="mt-4 h-8 rounded-lg bg-white px-3 text-center text-sm font-medium transition duration-500 hover:scale-105 hover:drop-shadow-xl"
              >
                <p className="underline">Use a different email address</p>
              </button>
              {/* Display the error message */}
              {error && <p className="mt-4 text-red-500">{error}</p>}
            </div>
          </div>
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default Verification;

export async function getServerSideProps(context: any) {
  const token = (await context.req.cookies.accessToken) as string;

  if (token) {
    return {
      redirect: {
        destination: '/home',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}
