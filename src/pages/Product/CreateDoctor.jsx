import React, { useRef, useState } from "react";
import backIcon from "../../assets/icons/back.svg";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import {  createProduct } from "../../api/product";
import Swal from "sweetalert2";

const CreateProduct = () => {
  // mutation for add product

  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      Swal.fire({
        title: "Product Add Success",
        text: `${name} added to your store `,
        icon: "success",
      });
      setSelectedImages(null);
      navigate("/products");
      reset();
    },
    onError: (err) => {
      Swal.fire({
        title: "Error",
        text: err,
        icon: "error",
      });
      // reset();
    },
  });

  // react hook form 👇
  const {
    watch,
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const {
    description,
    name,
    category,
    price,
    available_packs
  } = watch();
  const [selectedImages, setSelectedImages] = useState(null);

  const navigate = useNavigate();

  // input ref
  const inputRef = useRef(null);

  const handleBackNavigate = () => {
    navigate("/products");
  };

  const handleChooseImage = () => {
    inputRef.current.click();
  };

  // form submit
  const handleFormSubmit = (data) => {
    if (!selectedImages) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please select Product image!",
      });
      return null;
    } else {
      const fd = new FormData();
      fd.append("file", selectedImages);
      for (const item of Object.keys(data)) {
        if (data[item]) {
          fd.append(item, data[item]);
        }
      }
      mutate(fd);
    }
  };

  // handle image change

  const handleImageChange = (event) => {
    const { files } = event.target;
    if (files[0]) {
      setSelectedImages(files[0]);
    }
  };

  const diseaseHandleOptions = [
    "Bio Stimulae", 
    "Pesticides", 
    "Cattle Feed"
  ];

  return (
    <div>
      <div className="bg-lightgray h-full w-full p-6 py-8">
        <div className="bg-white overflow-x-auto rounded-[16px] p-4  ps-10 ">
          <div className="flex items-center  justify-between">
            <button onClick={handleBackNavigate} className="">
              <img src={backIcon} alt="" />
            </button>
            <h1 className="text-[32px] text-black font-bold flex-1 me-6 text-center">
              Add Product
            </h1>
          </div>

          {/* form and side image */}

          <div className="flex  gap-3 my-5 mt-10 flex-wrap md:flex-nowrap  w-full">
            <div className="w-full">
              {/* form */}
              <form
                onSubmit={handleSubmit(handleFormSubmit)}
                className="max-w-[513px] md:min-w-[460px] min-w-[300px]"
              >
                {/* Product Name  */}
                <div className="">
                  <input
                    {...register("name", {
                      required: {
                        value: true,
                        message: "This field is required",
                      },
                      minLength: {
                        value: 2,
                        message: "Minimum length is 2 character ",
                      },
                    })}
                    className={` h-[45px] w-full rounded-xl border-darkstone outline-none border ps-3 text-[16px] text-gray2 ${
                      errors.Name && "border-red"
                    }`}
                    type="text"
                    placeholder="Enter Product Name"
                  />

                  {errors.Name && (
                    <span className="text-red ms-2">
                      {errors.Name.message}
                    </span>
                  )}
                </div>
                {/* desc */}
                <div className="my-5">
                  <textarea
                    {...register("description", {
                      required: {
                        value: true,
                        message: "This field is required",
                      },
                      minLength: {
                        value: 2,
                        message: "Minimum length is 2 character ",
                      },
                    })}
                    className={`w-full resize-none pt-3 h-[112px] rounded-xl border-darkstone outline-none border ${
                      errors.description && "border-red"
                    } ps-3 text-[16px] text-gray2 `}
                    type="text"
                    placeholder="Enter Product Description"
                  />
                  {errors.education && (
                    <span className="text-red ms-2">
                      {errors.description.message}
                    </span>
                  )}
                </div>

                {/* featiures */}

                {/* diseaseHandle */}
                <div className="my-5 w-full ">
                  <div
                    className={`w-full  px-3 rounded-xl border-darkstone  border ${
                      errors.sub_category && " border-red"
                    }`}
                  >
                    <select
                      {...register("category",{
                        required: {
                          value: true,
                          message: "This field is required",
                        },
                      })}
                      className={` text-[16px] outline-none text-gray2 h-[45px] w-full`}
                    >
                      <option value="" selected disabled>
                        Cateogory
                      </option>
                      {diseaseHandleOptions.map((item) => (
                        <option key={item} value={item}>
                          {item}
                        </option>
                      ))}
                    </select>
                  </div>
                  {errors.sub_category && (
                    <AppFormErrorLine message={errors.sub_category.message} />
                  )}
                </div>

                {/* specialization1 */}
                <div className="">
                  <input
                    {...register("price", {
                      required: {
                        value: true,
                        message: "This field is required",
                      },
                    })}
                    className={` h-[45px] w-full rounded-xl border-darkstone outline-none border ps-3 text-[16px] text-gray2 ${
                      errors.Name && "border-red"
                    }`}
                    type="text"
                    placeholder="Enter Product Price"
                  />

                  {errors.Name && (
                    <span className="text-red ms-2">
                      {errors.Name.message}
                    </span>
                  )}
                </div>
                <div className="my-5">
                  <input
                    {...register("available_packs", {
                      required: {
                        value: true,
                        message: "This field is required",
                      },
                    })}
                    className={` h-[45px] w-full rounded-xl border-darkstone outline-none border ps-3 text-[16px] text-gray2 ${
                      errors.Name && "border-red"
                    }`}
                    type="text"
                    placeholder="Enter Product Available Packs"
                  />

                  {errors.Name && (
                    <span className="text-red ms-2">
                      {errors.Name.message}
                    </span>
                  )}
                </div>

                {/* buttons */}
                <div className="my-5">
                  <button
                    type="submit"
                    className="h-[54px] rounded-xl text-white bg-[#39A803] w-full"
                  >
                    {isPending ? (
                      <>
                        <div className="loading loading-spinner loading-md"></div>
                      </>
                    ) : (
                      "Create"
                    )}
                  </button>
                </div>
                <div className="my-5">
                  <button
                    type="button"
                    onClick={(e) => window.verificationModal.showModal()}
                    className="h-[54px] rounded-xl btn btn-neutral btn-outline w-full"
                  >
                    Verify
                  </button>
                </div>
              </form>
            </div>

            {/* choose image */}
            <div className="border-dashed border-l-2  ps-5 pe-3 flex flex-col  items-center  border-l-stone1">
              {/* product image */}
              <div className="h-[420px] md:min-w-[400px] min-w-[300px] rounded-xl mt-7 p-4  text-center flex flex-col justify-center items-center max-w-[453px] border border-stone2">
                {selectedImages ? (
                  <img
                    src={URL.createObjectURL(selectedImages)}
                    className="h-full w-full object-contain object-center "
                    alt=""
                  />
                ) : (
                  <>
                    <input
                      type="file"
                      onChange={handleImageChange}
                      ref={inputRef}
                      className="hidden"
                      doctorName=""
                      id=""
                    />
                    <button
                      onClick={handleChooseImage}
                      type="button"
                      className=" bg-gradient-to-t from-blackwhite text-white h-[55px] rounded-xl w-[253px] to-whiteblack"
                    >
                      Choose image
                    </button>
                  </>
                )}
              </div>
              {selectedImages && (
                <div className="text-center mt">
                  <button
                    onClick={(e) => setSelectedImages(null)}
                    type="button"
                    className="mt-2 text-md text-red"
                  >
                    Remove Image
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* verification modal */}

      <dialog id="verificationModal" className="modal ">
        <form method="dialog" className="modal-box  max-h-[777px] w-[656px]">
          <h3 className="font-bold text-lg text-[24px] text-center pb-4 border-b gap-16 border-dashed border-b-black  ">
            Verification Details
          </h3>
          <div className="mt-5 font-semibold px-2">
            <div className="my-[15px] flex items-center gap-2 flex-wrap lg:text-[16px] max-xl:text-[18px]">
              name:
              {name ? (
                <span className="text-base font-semibold">{name}</span>
              ) : (
                <span className="text-red text-base">
                  Please enter product Name!
                </span>
              )}
            </div>

            <div className="my-[15px] flex items-center gap-2 flex-wrap lg:text-[16px] max-xl:text-[18px]">
            Description:
              {description ? (
                <span className="text-base font-semibold">{description}</span>
              ) : (
                <span className="text-red text-base">
                  Please enter description!
                </span>
              )}
            </div>

            <div className="my-[15px] flex items-center gap-2 flex-wrap lg:text-[16px] max-xl:text-[18px]">
            Category:
              {category ? (
                <span className="text-base font-semibold">{category}</span>
              ) : (
                <span className="text-red text-base">
                  Please enter category!
                </span>
              )}
            </div>

            <div className="my-[15px] flex items-center gap-2 flex-wrap lg:text-[16px] max-xl:text-[18px]">
              Price:
              {price ? (
                <span className="text-base font-semibold">{price}</span>
              ) : (
                <span className="text-red text-base">
                  Please enter Price!
                </span>
              )}
            </div>

            <div className="my-[15px] flex items-center gap-2 flex-wrap lg:text-[16px] max-xl:text-[18px]">
            Available Packs:
              {available_packs ? (
                <span className="text-base font-semibold">{available_packs}</span>
              ) : (
                <span className="text-red text-base">
                  Please enter available_packs!
                </span>
              )}
            </div>


            <div className="text-center">
              <button
                type="submit"
                className="mt-3 bg-gray3 w-[285px] h-[54px] rounded-xl"
              >
                Close
              </button>
            </div>
          </div>
        </form>
      </dialog>
    </div>
  );
};

export default CreateProduct;
