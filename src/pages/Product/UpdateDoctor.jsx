import React, { useEffect, useRef, useState } from "react";
import Swal from "sweetalert2";
import AppFormErrorLine from "../../components/AppFromErrorLine";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {  updateBlog } from "../../api/blog";

const UpdateBlogModal = ({ data }) => {
  const queryClient = useQueryClient();
  const inputRef = useRef();
  const [selectedImage, setSelectedImage] = useState(data?.avatar?.url);
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
    setValue,
  } = useForm();

  const {
    description,
    name,
    category,
    price,
    available_packs
  } = watch();

  const diseaseHandleOptions = [
    "Bio Stimulae", 
    "Pesticides", 
    "Cattle Feed"
  ];

  const { mutate, isPending } = useMutation({
    mutationFn: ({ id, data }) => updateBlog({ id, data }),
    onError: (error) => {
      document.getElementById("update_blog").close();
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error,
      });
      reset();
    },
    onSuccess: (data) => {
      document.getElementById("update_blog").close();
      queryClient.invalidateQueries({ queryKey: ["doctors"] });
      Swal.fire({
        icon: "success",
        title: "Product updated",
        text: data,
      });
      reset();
    },
  });

  const onSubmit = async (fData) => {
    const formData = new FormData();
    formData.append("name", fData.name);
    formData.append("description", fData.description);
    formData.append("category", fData.category);
    formData.append("price", fData.price);
    formData.append("available_packs", fData.available_packs);

    if (selectedImage) {
      const blob = await fetch(selectedImage).then((r) => r.blob());
      formData.append("file", blob);
    }

    mutate({ id: data?._id, data: formData });
  };

  useEffect(() => {
    if (data) {
      setSelectedImage(data?.avatar?.url);
      setValue("name", data?.name);
      setValue("description", data?.description);
      setValue("category", data?.category);
      setValue("price", data?.price);
      setValue("available_packs", data?.available_packs);
    }
  }, [data]);

  const openVerificationModal = () => {
    const verificationModal = document.getElementById("verificationModalforupdate");
    if (verificationModal) {
      verificationModal.showModal();
    } else {
      console.error("Verification modal not found");
    }
  };
  return (
    <>
      {/*Blog Modal Start */}
      <dialog id="update_blog" className="modal">
        <div className="modal-box lg:w-[863px] lg:h-[810px] sm:h-[1/6] w-5/6 max-w-5xl h-1/2 max-h-5xl">
          <form method="dialog">
            <button
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              onClick={() => reset()}
            >
              ✕
            </button>
          </form>
          <div className="flex h-full w-full">
            <div className="w-2/5 flex justify-center items-center place-content-center">
              {selectedImage && (
                <img
                  src={selectedImage}
                  alt="Chosen"
                  className="mt-2 h-[200px] "
                />
              )}
            </div>
            <div className="border-l-2 border-dashed" />
            <div className="w-3/5">
              <div className=" flex flex-col place-content-center place-items-center">
                <form
                  className=" flex flex-col place-content-center place-items-center"
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <p className="w-[324px] text-start text-black text-2xl font-semibold font-lato tracking-tight">
                    Update Product
                  </p>
                  <input
                    ref={inputRef}
                    className="relative hidden mt-[32px] w-full h-[40px] bg-white rounded-xl border border-zinc-300 justify-start items-center opacity-40 text-sm font-light font-lato leading-[16.80px]"
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      const reader = new FileReader();
                      reader.onloadend = () => {
                        setSelectedImage(reader.result);
                      };
                      if (file) {
                        // Validate file type
                        if (!["image/jpeg", "image/png"].includes(file.type)) {
                          alert("Unsupported file format (JPEG/PNG only)");
                          return;
                        }
                        // Validate file size (1MB)
                        if (file.size > 1048576) {
                          alert("File size should be less than 1MB");
                          return;
                        }
                        reader.readAsDataURL(file);
                      }
                    }}
                  />

                  <button
                    type="button"
                    onClick={() => inputRef.current.click()}
                    className="w-full bg-[#39A803] rounded-lg flex items-center justify-center p-3 mt-4 text-white"
                  >
                    Upload Image
                  </button>
                  {!selectedImage && (
                    <AppFormErrorLine
                      message="Please select an image"
                      className="self-start"
                    />
                  )}

                  <input
                    className="mt-[10px] w-[324px] h-11 pl-3 bg-white rounded-xl border border-zinc-300 justify-start items-center inline-flex placeholder:text-black  text-sm font-light font-lato leading-[16.80px]"
                    type="text"
                    placeholder="Enter Blog Title"
                    {...register("name", {
                      required: {
                        value: true,
                        message: "Please enter Product name",
                      },
                    })}
                  />
                  {errors.name && (
                    <AppFormErrorLine
                      message={errors.name?.message}
                      className="self-start"
                    />
                  )}
                  <textarea
                    className="mt-[10px] w-[324px] h-[140px] pl-3 p-4 bg-white rounded-xl border border-zinc-300 placeholder:text-black  text-sm font-light font-lato leading-[16.80px]"
                    placeholder="Enter Blog Description"
                    {...register("description", {
                      required: {
                        value: true,
                        message: "Please enter Product Description",
                      },
                    })}
                  ></textarea>

                  {errors.description && (
                    <AppFormErrorLine
                      message={errors.description?.message}
                      className="self-start"
                    />
                  )}

                  <div className="my-1 w-full">
                    <div
                      className={`w-full px-2 rounded-xl border-darkstone border ${
                        errors.category && " border-red"
                      }`}
                    >
                      <select
                        {...register("category", {
                          required: "Please select a category",
                        })}
                        className={`text-[12px] outline-none text-gray2 h-[45px] w-full`}
                      >
                        <option value="" selected disabled>
                          Category
                        </option>
                        {diseaseHandleOptions.map((item) => (
                          <option key={item} value={item}>
                            {item}
                          </option>
                        ))}
                      </select>
                    </div>
                    {errors.category && (
                      <AppFormErrorLine
                        message={errors.category?.message}
                        className="self-start"
                      />
                    )}
                  </div>

                  <input
                    className="mt-[10px] w-[324px] h-11 pl-3 bg-white rounded-xl border border-zinc-300 justify-start items-center inline-flex placeholder:text-black  text-sm font-light font-lato leading-[16.80px]"
                    type="text"
                    placeholder="Enter Price"
                    {...register("price", {
                      required: {
                        value: true,
                        message: "Please enter Price",
                      },
                    })}
                  />
                  {errors.price && (
                    <AppFormErrorLine
                      message={errors.price?.message}
                      className="self-start"
                    />
                  )}
                  <input
                    className="mt-[10px] w-[324px] h-11 pl-3 bg-white rounded-xl border border-zinc-300 justify-start items-center inline-flex placeholder:text-black  text-sm font-light font-lato leading-[16.80px]"
                    type="text"
                    placeholder="Enter Available Packs"
                    {...register("available_packs", {
                      required: {
                        value: true,
                        message: "Please enter Available Packs",
                      },
                    })}
                  />
                  {errors.available_packs && (
                    <AppFormErrorLine
                      message={errors.available_packs?.message}
                      className="self-start"
                    />
                  )}
                  <button className="mt-[24px] w-[324px] h-11 pl-[111px] pr-[112.44px] py-2.5 bg-[#39A803] rounded-xl justify-center items-center inline-flex">
                    {isPending ? (
                      <span className="loading loading-spinner loading-md text-white"></span>
                    ) : (
                      <p className="w-[100.56px] h-6 text-center text-white text-lg font-bold font-lato leading-snug">
                        Update
                      </p>
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={openVerificationModal}
                    className="h-[44px] rounded-xl mt-3 btn btn-neutral btn-outline w-full"
                  >
                    Verify
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
        {/* Verification Modal */}
        <dialog id="verificationModalforupdate" className="modal">
          <form method="dialog" className="modal-box max-h-[777px] w-[656px]">
            <h3 className="font-bold text-lg text-[24px] text-center pb-4 border-b gap-16 border-dashed border-b-black">
              Verification Details
            </h3>
            <div className="mt-5 font-semibold px-2">
              <div className="my-[15px] flex items-center gap-2 flex-wrap lg:text-[16px] max-xl:text-[18px]">
                Name:
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
                    Please enter Education!
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
                    Please enter DiseaseHandle!
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
      </dialog>
      {/*create coupon Modal End */}
    </>
  );
};

export default UpdateBlogModal;
