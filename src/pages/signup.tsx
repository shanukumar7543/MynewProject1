import { zodResolver } from '@hookform/resolvers/zod';
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
} from '@material-tailwind/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { FormattedMessage } from 'react-intl';
import { z } from 'zod';

import { getSignUp } from '@/apihelpers/api';
import { POST_GOOGLE_LOGIN } from '@/apihelpers/url_helpers';
import LoadingSpinner from '@/components/LoadingSpinner';
import { Checkmark } from '@/icons/checkmarkicon';
import { emailSchema, nameSchema, passwordSchema } from '@/schemas/schema';

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
const formSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
  name: nameSchema,
  consent: z
    .boolean()
    .refine((x) => !!x, 'must agree to ToS and Privacy Policy'),
  consent2: z
    .boolean()
    .refine((x) => !!x, '2nd must agree to ToS and Privacy Policy'),
});

type Form = z.infer<typeof formSchema>;

const Signup: SubmitHandler<Form> = () => {
  const [showPasswordRequirements, setShowPasswordRequirements] =
    useState(false);
  const router = useRouter();
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isGoogleLogin, setIsGoogleLogin] = useState(false);

  const { register, setValue, handleSubmit, formState, watch } = useForm<Form>({
    defaultValues: {
      password: '',
      email: '',
      name: '',
    },
    mode: 'all',
    resolver: zodResolver(formSchema),
  });

  const form = watch();
  const { errors } = formState;
  console.log(errors);
  const passwordRef = useRef(null);

  const togglePasswordRequirements = () => {
    setShowPasswordRequirements(!showPasswordRequirements);
  };

  const url = router.query;

  console.log(url.email, 'shanu');

  const [isInvited, setIsInvited] = useState(false);
  useEffect(() => {
    if (url.email !== null) {
      setIsInvited(true);
    }
  }, [url]);

  const signup = async () => {
    setLoading(true);

    // const res = await signIn("credentials", {
    //   redirect: false,
    //   email: form.email,
    //   password: form.password,
    //   name: form.name
    // })
    // console.log (res, 'response from credentials1233 signup')

    // if(res?.status === 200) {
    //   router.push({
    //     pathname: '/verification',
    //     query: { email: form.email },
    //   });
    // }

    const response = await getSignUp({
      email: url.email ? url.email : form.email,
      password: form.password,
      name: form.name,
      isInvited,
    });

    console.log(url.email, 'response');

    if (response?.status === 200) {
      router.push({
        pathname: '/verification',
        query: { email: form.email },
      });
    } else {
      // console.log(response.data.error);
      setError(response?.data?.error);
    }

    setLoading(false);
  };

  const [open, setOpen] = useState(1);

  const handleOpen = (value: any) => {
    setOpen(open === value ? 0 : value);
  };

  useEffect(() => {
    if (url.email) {
      setValue('email', url.email as string);
    }
    const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email);
    const isPasswordValid =
      form.password.length >= 8 &&
      /[a-z]/.test(form.password) &&
      /[A-Z]/.test(form.password) &&
      /\d/.test(form.password);

    if (
      form.email.length > 0 &&
      form.name.length > 0 &&
      form.password.length > 0 &&
      isEmailValid &&
      isPasswordValid
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [form.email, form.name, form.password, url.email]);

  const handleGoogleSignup = async () => {
    setIsGoogleLogin(true);
    setLoading(true);
    router.push(POST_GOOGLE_LOGIN);
  };

  return (
    <div className="overflow-hidden">
      <div className="absolute right-10 top-2 z-20 text-base">
        <FormattedMessage
          id="Don't have an account?"
          defaultMessage="Don't have an account?"
        />
        <Link className="text-white" href="/login">
          <button
            type="button"
            className="ml-1 w-16 rounded-3xl bg-black pb-1 text-center text-sm font-medium text-white transition
                duration-500 hover:scale-105"
          >
            <FormattedMessage id="login" defaultMessage="Login" />
          </button>
        </Link>
      </div>

      <div className="z-0">
        <video
          className="fixed top-0 max-h-full min-h-full min-w-full bg-fixed object-cover opacity-10"
          src="https://app.videoask.com/static/app/media/promo.mp4"
          autoPlay
          loop
          muted
        />
      </div>
      <div className="top-5 z-10 flex h-full w-full items-center justify-center pt-10 ">
        <div className=" w-96">
          <div className="flex flex-col text-black">
            <div className="justify-left flex items-start">
              <img className="mb-4 ml-4 h-1/3 w-1/3" src="/logotext.png" />
            </div>

            <h2 className="ml-6 flex text-xl">
              <FormattedMessage id="Hello." defaultMessage="Hello." />
            </h2>
            <h2 className="ml-6 block text-xl font-medium">
              {' '}
              <FormattedMessage
                id="To get started please sign up..."
                defaultMessage="To get started please sign up..."
              />{' '}
            </h2>
            <form className="z-10 mx-6" onSubmit={handleSubmit(signup)}>
              <input
                type="text"
                id="name"
                placeholder="Your name"
                {...register('name')}
                // autoComplete="off"
                autoComplete="off"
                className="w-full border-x-0 border-b border-t-0 border-b-zinc-400 bg-inherit px-2 py-3 text-xl font-light outline-none"
              />
              {errors.name?.message && (
                <small className="text-red-500">{errors.name?.message}</small>
              )}
              {url.email ? (
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={url.email}
                  autoComplete="email"
                  disabled
                  className="w-full border-x-0 border-b border-t-0 border-b-zinc-400 bg-inherit px-2 py-3 text-xl font-light outline-none"
                />
              ) : (
                <input
                  type="email"
                  placeholder="Enter your email"
                  {...register('email')}
                  autoComplete="email"
                  className="w-full border-x-0 border-b border-t-0 border-b-zinc-400 bg-inherit px-2 py-3 text-xl font-light outline-none"
                />
              )}
              <div className="my-2 text-red-600">{error}</div>

              <input
                type="password"
                id="password"
                placeholder="Your password"
                {...register('password')}
                autoComplete="password"
                className="w-full border-x-0 border-b border-t-0 border-b-zinc-400 bg-inherit px-2 py-3 text-xl font-light outline-none"
                onClick={togglePasswordRequirements}
              />
              {showPasswordRequirements && (
                <div
                  ref={passwordRef}
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
              )}

              <div className="mt-6 flex items-center justify-between">
                <span className="ml-1 pr-2 text-sm font-medium text-gray-900 dark:text-gray-700">
                  <FormattedMessage
                    id="I agree to VideoAsks's"
                    defaultMessage="I agree to VideoAsks's"
                  />{' '}
                  <span className="text-green-400">
                    <FormattedMessage
                      id="Terms of service"
                      defaultMessage="Terms of service"
                    />
                  </span>
                </span>

                <label className="relative inline-flex cursor-pointer items-center">
                  <input
                    type="checkbox"
                    value=""
                    className="peer sr-only"
                    onClick={() => setValue('consent', !form.consent)}
                    checked={form.consent}
                  />

                  <div className="peer h-6 w-11 rounded-full  bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-green-400 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none dark:border-gray-600 dark:bg-gray-500" />
                </label>
              </div>
              <div>
                {errors.consent ? (
                  <div className="text-red-600">
                    <FormattedMessage
                      id="You need to agree to our Terms of service to create your account"
                      defaultMessage="You need to agree to our Terms of service to create your account"
                    />
                  </div>
                ) : (
                  ''
                )}
              </div>
              <div className="mt-4 flex items-center justify-between">
                <span className="ml-1 pr-9 text-sm font-medium text-gray-900 dark:text-gray-700">
                  <FormattedMessage
                    id="I accept VideoAsk's use of my data for the service and everything else described in the"
                    defaultMessage="I accept VideoAsk's use of my data for the service and everything else described in the"
                  />
                  <span className="text-green-400">
                    <FormattedMessage
                      id=" Privacy Policy"
                      defaultMessage=" Privacy Policy"
                    />
                  </span>
                  <FormattedMessage id=" and " defaultMessage=" and " />
                  <span className="text-green-400">
                    {' '}
                    <FormattedMessage
                      id="Data Processing Agreement"
                      defaultMessage="Data Processing Agreement"
                    />
                  </span>
                </span>
                <label className="relative inline-flex cursor-pointer items-center">
                  <input
                    type="checkbox"
                    value=""
                    className="peer sr-only"
                    onClick={() => setValue('consent2', !form.consent2)}
                    checked={form.consent2}
                  />
                  <div className="peer h-6 w-11 rounded-full  bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-green-400 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none dark:border-gray-600 dark:bg-gray-500" />
                </label>
              </div>
              <Accordion open={open === 0}>
                <AccordionHeader onClick={() => handleOpen(1)}>
                  <div>
                    <span
                      className="group relative flex w-full items-center rounded-t-[15px] border-0 px-1 py-4 text-left text-base text-violet-700 transition [overflow-anchor:none] hover:z-[2] focus:z-[3] focus:outline-none"
                      data-te-collapse-init
                      data-te-target="#collapseOne"
                      aria-expanded="true"
                      aria-controls="collapseOne"
                    >
                      <h2
                        className="mb-0 flex items-center justify-center"
                        id="headingOne"
                      >
                        <FormattedMessage
                          id="See options"
                          defaultMessage="See options"
                        />
                      </h2>
                      <span className=" ml-1 mt-1 h-5 w-5 shrink-0 rotate-[-180deg] fill-[#336dec] transition-transform duration-200  ease-in-out group-[[data-te-collapse-collapsed]]:rotate-0 group-[[data-te-collapse-collapsed]]:fill-[#212529] motion-reduce:transition-none dark:fill-blue-300 dark:group-[[data-te-collapse-collapsed]]:fill-white">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          className="h-4 w-4"
                        >
                          <path
                            stroke-linecap="round"
                            strokeLinejoin="round"
                            d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                          />
                        </svg>
                      </span>
                    </span>
                  </div>
                </AccordionHeader>
                <AccordionBody>
                  <div
                    id="collapseOne"
                    className="!visible"
                    data-te-collapse-item
                    data-te-collapse-show
                    aria-labelledby="headingOne"
                    data-te-parent="#accordionExample"
                  >
                    <div className="px-1">
                      <div className="flex items-center justify-between text-sm font-medium text-gray-900 dark:text-gray-700">
                        <FormattedMessage
                          id="I'd like to occasionally get useful tips & inspiration via email."
                          defaultMessage="I'd like to occasionally get useful tips & inspiration via email."
                        />
                        <label className="relative inline-flex cursor-pointer items-center">
                          <input
                            type="checkbox"
                            value=""
                            className="peer sr-only"
                          />
                          <div className="peer h-6 w-11 rounded-full  bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-green-400 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none dark:border-gray-600 dark:bg-gray-500" />
                        </label>
                      </div>
                      <div className="mt-2 flex items-center justify-between text-sm font-medium text-gray-900 dark:text-gray-700">
                        <FormattedMessage
                          id="Tailor VideoAsk to my needs based on my activity."
                          defaultMessage="Tailor VideoAsk to my needs based on my activity."
                        />
                        <label className="relative inline-flex cursor-pointer items-center">
                          <input
                            type="checkbox"
                            value=""
                            className="peer sr-only"
                          />
                          <div className="peer h-6 w-11 rounded-full  bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-green-400 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none dark:border-gray-600 dark:bg-gray-500" />
                        </label>
                      </div>
                      <div className="mt-2 flex items-center justify-between text-sm font-medium text-gray-900 dark:text-gray-700">
                        <FormattedMessage
                          id="Enrich my data with select third parties for more relevant content."
                          defaultMessage="Enrich my data with select third parties for more
                        relevant content."
                        />
                        <label className="relative inline-flex cursor-pointer items-center">
                          <input
                            type="checkbox"
                            value=""
                            className="peer sr-only"
                          />
                          <div className="peer h-6 w-11 rounded-full  bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-green-400 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none dark:border-gray-600 dark:bg-gray-500" />
                        </label>
                      </div>
                    </div>
                  </div>
                </AccordionBody>
              </Accordion>
              <div>
                {errors.consent2 ? (
                  <div className="text-red-600">
                    You need to accept our Privacy Policy to create your
                    account. See options to change your preferences
                  </div>
                ) : (
                  ''
                )}
              </div>
              <div className="flex justify-center">
                <button
                  type="submit"
                  className={`hover:scale-105... mt-6 h-14 w-full rounded-lg bg-purple-400 text-center text-xl font-medium text-white transition duration-500 hover:scale-105 hover:drop-shadow-xl${
                    buttonDisabled ? '... cursor-not-allowed' : ''
                  } `}
                  disabled={loading || buttonDisabled}
                >
                  {loading && !isGoogleLogin ? (
                    <LoadingSpinner />
                  ) : (
                    <FormattedMessage id="Sign Up" defaultMessage="Sign Up" />
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
                  onClick={handleGoogleSignup}
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
                      id="Sign Up With Google"
                      defaultMessage="Sign Up With Google"
                    />
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
