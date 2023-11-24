// import MenuItem from '@mui/material/MenuItem';
// import Select from '@mui/material/Select';
import React from 'react';

import Select from '@/components/Select';

// import { useStyles } from '.';

type Props = {
  organization: any;
  onUpdate: (data: any) => any;
};

const ReplyToEmail = ({ organization, onUpdate }: Props) => {
  // const classes = useStyles();

  return (
    <div className="m-2 mt-4 h-auto rounded-2xl bg-white text-left text-black no-underline shadow-2xl lg:w-[610px]">
      <div className="w-full p-10">
        <h3 className="mb-2 text-2xl">Reply-to email</h3>
        <p className="mb-5 text-sm text-gray-600">
          By default, when you or members of your team reply on VideoAsk, the
          reply-to email address will use the individual team member&#39;s
          account email.
        </p>

        <div className="flex items-center justify-between">
          <h4 className="mb-2 font-semibold">
            Set a default reply-to email for all members:
          </h4>
          <div className="">
            <Select
              // size="small"
              defaultValue={organization?.settings?.replyToEmail}
              onChange={(value) =>
                onUpdate && onUpdate({ settings: { replyToEmail: value } })
              }
              options={[
                { value: 'VidyChat', label: 'VidyChat' },
                { value: 'VidyChat 1', label: 'VidyChat 1' },
                { value: 'VidyChat 2', label: 'VidyChat 2' },
              ]}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReplyToEmail;
