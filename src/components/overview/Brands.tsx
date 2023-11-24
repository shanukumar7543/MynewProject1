import { Box, Modal } from '@mui/material';
import React, { useMemo } from 'react';
import { toast, Toaster } from 'react-hot-toast';
import { FaPencilAlt, FaPlus, FaRegTrashAlt } from 'react-icons/fa';

import { createBrand, deleteBrand, updateBrand } from '@/apihelpers/api';
import { BRAND } from '@/apihelpers/url_helpers';
import { useFetch } from '@/utils/fetch';

import DeleteModal from '../DeleteModal';
import LoadingDot from '../LoadingDot';

const modalStyle = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  // border: '2px solid #000',
  boxShadow: 30,
  borderRadius: 2,
  p: 4,
};

const BrandModal = ({
  brand,
  isOpen,
  handleClose,
  handleUpdate,
}: {
  brand: any;
  isOpen: boolean;
  handleClose: (...args: any[]) => any;
  handleUpdate: (...args: any[]) => any;
}) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const brandData = useMemo(() => brand, [brand]);

  const handleSubmit = async (
    e: React.SyntheticEvent<HTMLFormElement, SubmitEvent>
  ) => {
    e.preventDefault();
    setIsLoading(true);
    /* eslint-disable no-promise-executor-return */
    // await new Promise((resolve) => setTimeout(resolve, 2000));
    const target = e.target as typeof e.target & {
      name: { value: string };
      image: { value: string };
      url: { value: string };
    };

    const name = target.name?.value;
    const image = target.image?.value;
    const url = target.url?.value;

    handleUpdate(
      {
        _id: brandData?._id,
        name,
        image,
        url,
      },
      () => setIsLoading(false)
    );
  };

  return (
    <Modal
      open={isOpen}
      onClose={() => handleClose()}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      // sx={modalStyle}
    >
      <Box sx={modalStyle}>
        <div className="">
          <h2 className="text-2xl font-semibold">
            {brandData?.name ?? 'Create new brand'}
          </h2>

          <form className="my-3" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Brand Name"
              className="mb-2 w-full rounded border-2 border-transparent bg-gray-300 px-3 py-1.5 placeholder:text-gray-600 focus:border-purple-500"
              name="name"
              defaultValue={brandData?.name ?? ''}
            />
            <input
              type="text"
              placeholder="Brand Image"
              className="mb-2 w-full rounded border-2 border-transparent bg-gray-300 px-3 py-1.5 placeholder:text-gray-600 focus:border-purple-500"
              name="image"
              defaultValue={brandData?.image ?? ''}
            />
            <input
              type="text"
              placeholder="Brand Url"
              className="mb-2 w-full rounded border-2 border-transparent bg-gray-300 px-3 py-1.5 placeholder:text-gray-600 focus:border-purple-500"
              name="url"
              defaultValue={brandData?.url ?? ''}
            />

            <div className="ml-auto mt-3 flex max-w-max gap-2">
              <button
                type="button"
                className="rounded bg-red-500 px-4 py-1.5 font-semibold text-white"
                onClick={handleClose}
                disabled={isLoading}
              >
                Cancel
              </button>
              <button
                className="rounded bg-purple-600 px-4 py-1.5 font-semibold text-white disabled:cursor-not-allowed disabled:opacity-70"
                disabled={isLoading}
                type="submit"
              >
                {isLoading ? 'Loading...' : 'Submit'}
              </button>
            </div>
          </form>
        </div>
      </Box>
    </Modal>
  );
};

type BrandProps = {
  brands: any;
  organizationId: string;
  // onUpdate: (data: any) => any;
};

const Brands = ({ brands: _b, organizationId }: BrandProps) => {
  // const brands = Array.from({ length: 4 }, (_, i) => ({
  //   id: i,
  //   name: `Brand ${i}`,
  // }));

  const {
    loading: isLoading,
    data: brands,
    error,
    invalidate,
  } = useFetch({
    url: `${BRAND}/getAll/${organizationId}`,
    method: 'GET',
    invokeImmediately: true,
  });

  const [isOpen, setIsOpen] = React.useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = React.useState(false);
  const [brand, setBrand] = React.useState<any>({});

  const handleDelete = async (id: string) => {
    /* eslint-disable-next-line */
    // const confirm = window.confirm('Are you sure want to delete?');
    // if (!confirm) return null;

    const res = await deleteBrand(id, organizationId);
    // if (!res.success)
    //   return toast.error(res?.data?.message || 'Something went wrong!');
    return res;
    // invalidate();
    // setIsOpen(false);
    // return toast.success('Deleted successfully!');
  };

  const handleUpdate = async (brandDetails: any, callback?: () => any) => {
    const exec = brandDetails._id ? updateBrand : createBrand;
    const res = await exec({ ...brandDetails, organizationId });

    callback && callback();
    if (!res?.success)
      return toast.error(res?.data?.message || 'Something went wrong!');

    invalidate();
    callback && callback();
    setIsOpen(false);

    return toast.success('Created successfully!');
  };

  if (isLoading)
    return (
      <div className="m-2 mt-4 flex h-auto min-h-[20rem] items-center justify-center rounded-2xl bg-white text-left text-black no-underline shadow-2xl lg:w-[610px]">
        <LoadingDot />
      </div>
    );

  if (error)
    return (
      <div className="m-2 mt-4 h-auto rounded-2xl bg-white text-left text-black no-underline shadow-2xl lg:w-[610px]">
        <div className="w-full p-8">
          <p className="text-sm font-semibold">Something went wrong!</p>
        </div>
      </div>
    );

  return (
    <div className="m-2 mt-4 h-auto rounded-2xl bg-white text-left text-black no-underline shadow-2xl lg:w-[610px]">
      <div className="w-full p-8">
        <div className="mb-4 flex items-center justify-between">
          <div className="">
            <h2 className="pb-1 text-xl">
              <b>Brands</b>
            </h2>
            <p className="pb-3 text-sm text-gray-600">
              Manage all the custom brands created in this organization.
            </p>
          </div>

          <button
            className="rounded border-0 bg-gray-800 p-2 text-gray-100 hover:bg-gray-800/70"
            onClick={() => {
              setBrand({});
              setIsOpen(true);
            }}
          >
            <FaPlus size={15} />
          </button>
        </div>

        {brands?.map((brand: any) => (
          <div
            key={brand.id}
            className="mb-4 flex items-center justify-between"
          >
            <p className="text-sm font-semibold">{brand.name}</p>
            <div className="flex gap-1">
              <button
                className="rounded border-0 bg-gray-300/60 p-2 text-gray-800 hover:bg-gray-300"
                onClick={() => {
                  setBrand(brand);
                  setIsOpen(true);
                }}
              >
                <FaPencilAlt size={15} />
              </button>
              <button
                className="rounded border-0 bg-gray-300/60 p-2 text-red-400 hover:bg-gray-300"
                onClick={() => {
                  setBrand(brand);
                  setIsDeleteModalOpen(true);
                }}
              >
                <FaRegTrashAlt size={15} />
              </button>
            </div>
          </div>
        ))}
      </div>
      <BrandModal
        brand={brand}
        isOpen={isOpen}
        handleClose={() => {
          setIsOpen(false);
        }}
        handleUpdate={handleUpdate}
      />
      {/* </div> */}
      <DeleteModal
        open={isDeleteModalOpen}
        handleClose={() => setIsDeleteModalOpen(false)}
        name={brand.name}
        id={brand._id}
        callback={() => {
          setIsDeleteModalOpen(false);
          invalidate();
        }}
        deleteMethod={handleDelete}
      />
      <Toaster position="bottom-center" />
    </div>
  );
};

export default Brands;
