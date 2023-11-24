import InstagramIcon from '@mui/icons-material/Instagram';
import PeopleIcon from '@mui/icons-material/People';
import YouTubeIcon from '@mui/icons-material/YouTube';
import React from 'react';

// import LocaleSelector from '../components/LanguageSelector';
import LocaleSelector from '@/components/LanguageSelectors';

const Footer = () => (
  <div className="min-h-fit rounded-t-3xl bg-black pb-20 text-white">
    <div className="flex w-full flex-wrap rounded-3xl pl-10 pt-32">
      <div className="mb-10 w-full pl-5 md:w-1/2 lg:w-1/4 ">
        <h1 className="text-xl font-normal ">FEATURES</h1>
        <ul className="space-y-3 pt-8">
          <li>Live calls</li>
          <li>Video chatbots</li>
          <li>Video Forms</li>
          <li>
            Asynchronous video <br />
            interviews
          </li>
          <li>Direct messaging</li>
          <li>NPS</li>
          <li>widget Embed</li>
        </ul>
      </div>

      <div className="mb-10 w-full pl-5 md:w-1/2 lg:w-1/4">
        <h1 className="text-xl font-normal">USE CASES</h1>
        <ul className="space-y-3 pt-8">
          <li>Candidate sourcing</li>
          <li>Candidate screening</li>
          <li>Candidate selecting</li>
          <li>Onboarding</li>
          <li>Lead generation</li>
          <li>Lead conversion</li>
          <li>Lead nurture</li>
          <li>Testimonial collection</li>
          <li>Maintain customer loyalty</li>
          <li>Education</li>
          <li>Research & Feedback</li>
          <li>Support</li>
        </ul>
      </div>

      <div className="mb-10 w-full pl-5 md:w-1/2 lg:w-1/4">
        <h1 className="text-xl font-normal">SUPPORT</h1>
        <ul className="space-y-3 pt-8">
          <li>Help Center</li>
          {/* <li>What's New</li> */}
          <li>Videoask Us 👋</li>
          <li>Developer APIs</li>
          <li>System status</li>
          <li>Become an affiliate 💸</li>
          <li>Careers</li>
          <li>Terms & conditions</li>
          <li>All rights © Typeform</li>
          <li>YouTube</li>
          <li>Instagram</li>
          <li>Community</li>
        </ul>
      </div>

      <div className="mb-10 w-full pl-5 md:w-1/2 lg:w-1/4">
        <img
          src="data:image/png;base64,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"
          alt=""
        />
      </div>
    </div>

    <div className="flex flex-wrap pl-10 pt-28">
      <div className="w-full md:w-1/2 lg:w-1/4">
        <h1>Videoask</h1>
      </div>

      <div className="w-full md:w-1/2 lg:w-1/4">
        <ul>
          <li>All rights © Typeform</li>
        </ul>
      </div>

      <div className="w-full md:w-1/2 lg:w-1/4">
        <ul className="flex space-x-5">
          <li>
            <InstagramIcon /> Instagram
          </li>
          <li>
            <YouTubeIcon /> YouTube
          </li>
          <li>
            <PeopleIcon /> Community
          </li>
        </ul>
      </div>

      <div className="w-full pr-5 md:w-1/2 lg:w-1/4 ">
        <ul className="bottom-0 float-right">
          <li>With love, from Barcelona</li>
        </ul>
        <LocaleSelector />
      </div>
    </div>
  </div>
);

export default Footer;
