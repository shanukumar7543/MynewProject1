/* eslint-disable import/no-extraneous-dependencies */
import HelpIcon from '@mui/icons-material/Help';
import { Tooltip } from '@mui/material';
import React, { useCallback, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';

import ColorPicker from '@/components/ColorPicker';
import Select from '@/components/Select';
import type { Setting as SettingsType } from '@/types/organization';
import { deepEqual } from '@/utils';
import { fonts } from '@/utils/fonts';
import { useDebounce } from '@/utils/hooks';

type DefaultSettingsProps = {
  organizationId: string;
  settings: SettingsType;
  onUpdate: ({ settings }: { settings: SettingsType }) => any;
};

const defaultSettings: SettingsType = {
  branding: {
    name: 'VidyChat',
    image: 'https://www.logo.com',
    url: 'https://www.vidyachat.com',
  },
  colors: {
    primary: '#FFC542',
    secondary: '#FF5656',
    background: '#ffffff',
  },
  language: 'English',
  buttonBorderRadius: 4,
  font: {
    family: 'Roboto',
    url: 'https://fonts.googleapis.com/css?family=Roboto',
  },
};

type State = {
  primaryColor: string;
  secondaryColor: string;
  bgColor: string;
  defaultBranding: string;
  language: string;
  borderRadius: number;
  font: string;
};

const Settings = ({
  organizationId,
  settings = defaultSettings,
  onUpdate,
}: DefaultSettingsProps) => {
  const [state, dispatch] = React.useReducer(
    (state: State, action: Partial<State>) => ({ ...state, ...action }),
    {
      primaryColor: settings?.colors?.primary ?? '#22C55E',
      secondaryColor: settings?.colors?.secondary ?? '#22C55E',
      bgColor: settings?.colors?.background ?? '#ffffff',
      defaultBranding: settings?.branding?.name ?? 'VidyChat',
      language: settings?.language ?? 'English',
      borderRadius: settings?.buttonBorderRadius ?? 4,
      font: settings?.font?.family ?? 'Roboto',
    }
  );
  const {
    primaryColor,
    secondaryColor,
    bgColor,
    defaultBranding,
    language,
    borderRadius,
    font,
  } = state;

  // const classes = useStyles();
  // const controller = new AbortController();

  const debouncedValue = useDebounce<State>(state, 4000);

  const handleUpdate = useCallback(() => {
    const formatted = {
      branding: {
        name: debouncedValue.defaultBranding,
        image: 'https://www.logo.com',
        url: 'https://www.vidyachat.com',
      },
      colors: {
        primary: debouncedValue.primaryColor,
        secondary: debouncedValue.secondaryColor,
        background: debouncedValue.bgColor,
      },
      font: {
        family: debouncedValue.font,
        url: fonts.get(debouncedValue.font)?.url as string,
        // url: fonts.get(font)?.url,
      },
      buttonBorderRadius: debouncedValue.borderRadius,
      language: debouncedValue.language,
    };

    const isSame = deepEqual(settings, formatted);

    // if data is not changed return
    if (!isSame) onUpdate && onUpdate({ settings: formatted });
  }, [settings, onUpdate, debouncedValue]);

  useEffect(() => {
    handleUpdate();
  }, [debouncedValue, handleUpdate]);

  /* eslint-disable no-console */
  console.log(organizationId);

  return (
    <div className="m-2 mt-4 h-auto rounded-2xl bg-white text-left text-black no-underline shadow-2xl lg:w-[610px]">
      <div className="w-full p-8">
        <h2 className="pb-3 text-xl">
          <b>Default settings for all new videoasks</b>
        </h2>
        <p className="pb-3 text-sm text-gray-600">
          Set the default settings for all videoasks created in this
          organization.
        </p>

        <div className="flex h-16 items-center justify-between rounded-xl bg-white p-2">
          <p className="text-sm font-semibold">Branding</p>
          <Select
            options={[
              { value: 'VidyChat', label: 'VidyChat' },
              { value: 'VidyChat 1', label: 'VidyChat 1' },
              { value: 'VidyChat 2', label: 'VidyChat 2' },
            ]}
            defaultValue={defaultBranding}
            onChange={(value) => dispatch({ defaultBranding: value })}
          />
        </div>

        <div className="flex h-16 items-center justify-between rounded-xl bg-white p-2">
          <p className="text-sm font-semibold">Language</p>
          {/* <Select
            size="small"
            defaultValue={language}
            onChange={(e) => dispatch({ language: e.target.value })}
            className={classes.root}
          >
            <MenuItem value="English">English</MenuItem>
            <MenuItem value="Hindi 1">Hindi 1</MenuItem>
            <MenuItem value="Urdu 2">Urdu 2</MenuItem>
          </Select> */}
          <Select
            options={[
              { value: 'English', label: 'English' },
              { value: 'Hindi', label: 'Hindi' },
              { value: 'Urdu', label: 'Urdu' },
            ]}
            defaultValue={language}
            onChange={(value) => dispatch({ language: value })}
          />
        </div>

        <div className="flex h-16 items-center justify-between rounded-xl bg-white p-2">
          <p className="text-sm font-semibold">Colors</p>
          <div className="flex gap-2">
            <ColorPicker
              initial={primaryColor}
              onChange={(color) => dispatch({ primaryColor: color })}
              id="bg-color-picker"
              title={
                <>
                  <p className="font-semibold">Primary color:</p>
                  <p className="text-xs">
                    Control all first level interactive elements. <br />
                    (e.g. Answer buttons)
                  </p>
                </>
              }
            />
            <ColorPicker
              initial={secondaryColor}
              onChange={(color) => dispatch({ secondaryColor: color })}
              id="bg-color-picker"
              title={
                <>
                  <p className="font-semibold">Secondary color:</p>
                  <p className="text-xs">
                    Control all second level interactive elements. <br />
                    (e.g. Confirmation buttons)
                  </p>
                </>
              }
            />
            <ColorPicker
              initial={bgColor}
              onChange={(color) => dispatch({ bgColor: color })}
              id="bg-color-picker"
              title={
                <>
                  <p className="font-semibold">Background color:</p>
                  <p className="text-xs">
                    Control the background color of your VidyChat.
                  </p>
                </>
              }
            />
          </div>
        </div>

        <div className="flex h-16 items-center justify-between rounded-xl bg-white p-2">
          <p className="text-sm font-semibold">
            <span className="mr-1">Button border radius</span>
            <Tooltip title="Button border radius">
              <HelpIcon fontSize="small" />
            </Tooltip>
          </p>
          <input
            type="text"
            value={borderRadius}
            onChange={(e) => dispatch({ borderRadius: Number(e.target.value) })}
            className="w-14 rounded-md border border-transparent bg-gray-200 p-2 text-center text-black outline-none transition duration-150 ease-in-out focus:border-2 focus:border-purple-600 focus:bg-white sm:text-sm sm:leading-5"
          />
        </div>

        <div className="flex h-16 items-center justify-between rounded-xl bg-white p-2">
          <p className="text-sm font-semibold">Font</p>
          {/* <Select
            size="small"
            defaultValue={font}
            onChange={(e) => dispatch({ font: e.target.value })}
            className={classes.root}
          >
            {Array.from(fonts.keys()).map((font: string) => (
              <MenuItem key={font} value={font}>
                {font}
              </MenuItem>
            ))}
          </Select> */}
          <Select
            options={Array.from(fonts.keys()).map((font: string) => ({
              value: font,
              label: font,
            }))}
            defaultValue={font}
            onChange={(value) => dispatch({ font: value })}
          />
        </div>
      </div>
      <Toaster position="bottom-center" />
    </div>
  );
};

export default Settings;
