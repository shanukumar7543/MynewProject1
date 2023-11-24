/* eslint-disable import/no-extraneous-dependencies */
import { Avatar, Box, ClickAwayListener, Modal, Popper } from '@mui/material';
import { styled } from '@mui/material/styles';
import type { TooltipProps } from '@mui/material/Tooltip';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import Link from 'next/link';
import React, { useEffect, useMemo, useState } from 'react';
import { toast } from 'react-hot-toast';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { TbReload } from 'react-icons/tb';

import { deleteInteraction } from '@/apihelpers/api';

import InteractionsDetails from './InteractionsDetails';

dayjs.extend(relativeTime);

interface InteractionsListProps {
  interactions: any[];
  invalidate: () => void;
  // fetchStatus: 'error' | 'success' | 'revalidating';
  isRefetching: boolean;
}

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

// a list of random background colors for avatar
const avatarBackgroundColors = [
  '#F5F5DC',
  '#FFE4C4',
  '#FFEBCD',
  '#F5DEB3',
  '#FFF8DC',
  '#FAEBD7',
  '#FFEFD5',
  '#FFE4B5',
  '#FDF5E6',
  '#FFFACD',
  '#FAF0E6',
  '#FFF0F5',
  '#FFEBCD',
  '#F0E68C',
  '#FFF5EE',
  '#F5F5F5',
  '#FFDEAD',
  '#FFDAB9',
  '#FFF0F5',
  '#FA8072',
];

const getRandomColor = () => {
  const randomIndex = Math.floor(Math.random() * avatarBackgroundColors.length);
  return avatarBackgroundColors[randomIndex];
};

const DeleteModal = ({
  interaction,
  isOpen,
  onClose,
}: {
  interaction: any;
  isOpen: boolean;
  onClose: (...args: any[]) => any;
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async () => {
    setIsLoading(true);
    const res = await deleteInteraction(interaction._id);

    if (res?.success) onClose(true);
    else {
      toast.error('Something went wrong, Failed to delete interaction');
    }
    setIsLoading(false);
  };

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          width: 400,
          bgcolor: 'background.paper',
          // border: '2px solid #000',
          boxShadow: 50,
          borderRadius: 2,
          p: 4,
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      >
        <h2 id="modal-modal-title" className="text-2xl font-semibold">
          Delete for all eternity?
        </h2>

        <p id="modal-modal-description">
          Are you sure you want to delete this interaction?
        </p>
        <div className="mt-4 flex gap-2">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 rounded-md bg-gray-200 py-2 hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleDelete}
            className="flex-1 rounded-md bg-red-500 py-2 text-white hover:bg-red-600 disabled:opacity-70"
            disabled={isLoading}
          >
            {isLoading ? 'Deleting...' : 'Delete'}
          </button>
        </div>
      </Box>
    </Modal>
  );
};

const InteractionsList = ({
  interactions: initialInteractions,
  invalidate,
  // fetchStatus,
  isRefetching,
}: InteractionsListProps) => {
  const interactions = useMemo(() => {
    return initialInteractions?.map((interaction) => ({
      ...interaction,
      bgcolor: getRandomColor(),
    }));
  }, [initialInteractions]);

  // const router = useRouter();
  const [selectedInteraction, setSelectedInteraction] = useState<any>(null);
  const [menuInteraction, setMenuInteraction] = useState<any>(null);
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const addIdInUrl = (interactionId: string) => {
    // dynamically set the query param for interactionId without reloading the page
    const searchParams = new URLSearchParams({ interactionId });
    const newUrl = `${window.location.pathname}?${searchParams.toString()}`;
    window.history.replaceState({ path: newUrl }, '', newUrl);
  };

  useEffect(() => {
    if (selectedInteraction) return;

    //  select the interaction from the url query param if present, else select the first interaction
    const searchParams = new URLSearchParams(window.location.search);
    const interactionId = searchParams.get('interactionId');

    setSelectedInteraction(() => {
      const i =
        interactions.find((interaction) => interaction._id === interactionId) ??
        interactions[0];
      addIdInUrl(i?._id);
      return i;
    });
  }, [interactions, selectedInteraction]);

  const handleInteractionClick = (interaction: any) => {
    setSelectedInteraction(interaction);
    addIdInUrl(interaction._id);
  };

  const openDropdown = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    interaction: any
  ) => {
    e.stopPropagation();
    setMenuInteraction(interaction);
    setAnchorEl(e.currentTarget);
    setIsMenuOpen(() => {
      if (e.currentTarget === anchorEl) return !isMenuOpen;
      return true;
    });
  };

  return (
    <div className="flex h-screen w-full justify-start bg-[#F0F0F0]">
      {isMenuOpen && (
        <ClickAwayListener onClickAway={() => setIsMenuOpen(false)}>
          <Popper open={isMenuOpen} anchorEl={anchorEl} placement="bottom-end">
            <div className="mr-1 mt-3 rounded-lg bg-white p-3 shadow-2xl">
              <div className="min-w-[10rem] space-y-0.5">
                {/* <p className="font-bold">{menuInteraction?._id}</p> */}
                <button
                  type="button"
                  className="flex w-full cursor-pointer items-center gap-2 rounded-md px-2 py-1 hover:bg-gray-200"
                >
                  <span className="text-gray-600">Mark as unread</span>
                </button>
                <hr />

                <button
                  type="button"
                  className="flex w-full cursor-pointer items-center gap-2 rounded-md px-2 py-1 hover:bg-gray-200"
                >
                  <span className="text-gray-600">Create new contact</span>
                </button>
                <button
                  type="button"
                  className="flex w-full cursor-pointer items-center gap-2 rounded-md px-2 py-1 hover:bg-gray-200"
                >
                  <span className="text-gray-600">Assign to Contact</span>
                </button>

                <hr />
                <button
                  type="button"
                  className="flex w-full cursor-pointer items-center gap-2 rounded-md px-2 py-1 hover:bg-gray-200"
                  onClick={() => {
                    setIsMenuOpen(false);
                    setIsDeleteModalOpen(true);
                  }}
                >
                  <span className="text-gray-600">Delete</span>
                </button>
              </div>
            </div>
          </Popper>
        </ClickAwayListener>
      )}
      <div className="relative w-80 py-5">
        <div className="sticky flex w-full justify-between px-5">
          <HtmlTooltip title="All interactions" arrow placement="bottom">
            <p className="text-gray-600">
              All interactions{' '}
              <span className="inline-flex h-5 w-5 cursor-pointer items-center justify-center rounded-full bg-black font-bold text-white shadow">
                ?
              </span>
            </p>
          </HtmlTooltip>
          <button
            type="button"
            onClick={invalidate}
            className={`rounded-full p-1 hover:bg-gray-400 ${
              isRefetching && 'animate-spin fill-blue-500'
            }`}
          >
            <TbReload className="h-5 w-5 text-gray-600" />
          </button>
        </div>

        <ul className="mt-4 max-h-[89vh] w-full space-y-1 overflow-y-auto px-5 pb-5">
          {interactions.map((interaction) => (
            <li
              key={interaction._id}
              className={`flex cursor-pointer items-center gap-3 rounded-xl p-2 ${
                selectedInteraction?._id === interaction._id
                  ? 'bg-white shadow-lg'
                  : ''
              }`}
              onClick={() => handleInteractionClick(interaction)}
            >
              <Avatar
                alt={interaction?.contact?.name ?? 'Anonymous'}
                src={interaction.thumbnail}
                // random bg color
                sx={{
                  width: 40,
                  height: 40,
                  backgroundColor: interaction.bgcolor,
                }}
              />
              <div className="">
                <p className="font-semibold">
                  {interaction?.contact?.name ?? 'Anonymous'}
                </p>
                <p className="text-[.8rem] text-gray-600">
                  {dayjs(interaction.createdAt).from(Date.now())} via{' '}
                  <Link
                    href={`/funnel/vidy/?vidychatid=${interaction.vidyChatId}`}
                    className="bg-gray-100 font-semibold underline underline-offset-2 hover:bg-purple-700 hover:text-white hover:decoration-transparent"
                  >
                    {interaction.vidyChatName}
                  </Link>
                </p>
              </div>
              <div className="my-auto ml-auto">
                <button
                  onClick={(e: any) => openDropdown(e, interaction)}
                  className="my-auto rounded py-1 text-lg text-gray-500 hover:bg-gray-300 hover:text-gray-800"
                >
                  <BsThreeDotsVertical />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex h-screen flex-1 items-center justify-center p-4">
        {selectedInteraction && (
          <InteractionsDetails
            interaction={selectedInteraction}
            invalidate={invalidate}
          />
        )}
      </div>
      <DeleteModal
        interaction={menuInteraction}
        isOpen={isDeleteModalOpen}
        onClose={(revalidate: boolean) => {
          setIsDeleteModalOpen(false);
          // select the first interaction after deleting the current interaction
          setSelectedInteraction(() => {
            const i = interactions[0];
            addIdInUrl(i?._id);
            return i;
          });
          if (revalidate === true) invalidate();
        }}
      />
    </div>
  );
};

export default InteractionsList;
