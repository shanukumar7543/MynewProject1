/* eslint-disable import/no-extraneous-dependencies */
import { ClickAwayListener, Popper } from '@mui/material';
import { styled } from '@mui/material/styles';
import type { TooltipProps } from '@mui/material/Tooltip';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import React from 'react';
import { HexColorPicker } from 'react-colorful';

// some preset hex colors. like a palette
const presetColors = ['#ffffff', '#FFC542', '#FF5656', '#00B2FF', '#FF7C7C'];

const HtmlTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: 'rgba(0,0,0,0.9)',
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    border: '1px solid #dadde9',
  },
}));

const ColorPicker = ({
  onChange,
  initial,
  id,
  title,
}: {
  onChange: (color: string) => any;
  initial?: string;
  id: string;
  title: React.ReactNode;
}) => {
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  const [color, setColor] = React.useState(initial ?? '#22C55E');

  const handleChange = (color: string) => {
    setColor(color);
    onChange(color);
  };

  const handleInputChange = (e: any) => {
    setColor(e.target.value);
    onChange(e.target.value);
  };

  return (
    <>
      <style jsx>{`
        .custom-layout .react-colorful {
          padding: 16px;
          border-radius: 12px;
          background: #33333a;
          box-shadow: 0 6px 12px #999;
        }

        .custom-layout .react-colorful__saturation {
          margin: 15px 0;
          border-radius: 5px;
          border-bottom: none;
        }

        .custom-layout .react-colorful__hue {
          order: -1;
        }

        .custom-layout .react-colorful__hue,
        .custom-layout .react-colorful__alpha {
          height: 14px;
          border-radius: 5px;
        }

        .custom-layout .react-colorful__hue-pointer,
        .custom-layout .react-colorful__alpha-pointer {
          width: 20px;
          height: 20px;
        }
      `}</style>
      {open && (
        <ClickAwayListener onClickAway={() => setOpen(false)}>
          <Popper
            placement="bottom"
            disablePortal
            open={open}
            id={id}
            anchorEl={anchorRef.current!}
            modifiers={[
              {
                name: 'arrow',
                enabled: true,
              },
            ]}
          >
            <div className="my-4 flex flex-col items-center justify-center rounded-md bg-white p-5 shadow-2xl">
              <HexColorPicker
                color={initial ?? '#22C55E'}
                onChange={handleChange}
              />

              <div className="mt-3 grid max-w-[13rem] grid-cols-5 gap-2">
                {presetColors.map((color) => (
                  <button
                    key={color}
                    type="button"
                    className="col-span-1 h-8 w-8 cursor-pointer flex-col rounded-xl shadow-lg"
                    style={{ backgroundColor: color }}
                    onClick={() => handleChange(color)}
                  >
                    {null}
                  </button>
                ))}
              </div>

              <div className="mt-3 grid w-full max-w-[13rem] grid-cols-10 rounded border-2 border-gray-400">
                <label
                  htmlFor={`input-${id}`}
                  className="col-span-2 cursor-text rounded-l border-r-2 border-gray-400"
                  style={{ backgroundColor: color }}
                />
                <div className="col-span-8">
                  <input
                    type="text"
                    className="mx-auto max-w-full p-1 outline-none"
                    value={color}
                    onChange={handleInputChange}
                    id={`input-${id}`}
                  />
                </div>
              </div>
            </div>
          </Popper>
        </ClickAwayListener>
      )}

      <HtmlTooltip
        placement="bottom-end"
        title={<div className="p-1 text-white">{title}</div>}
        arrow
      >
        <button
          ref={anchorRef}
          aria-describedby={id}
          type="button"
          className="h-10 w-10 cursor-pointer flex-col rounded-xl shadow-lg"
          style={{ backgroundColor: initial ?? '#22C55E' }}
          onClick={() => setOpen((prev) => !prev)}
        >
          {null}
        </button>
      </HtmlTooltip>
    </>
  );
};

export default ColorPicker;
