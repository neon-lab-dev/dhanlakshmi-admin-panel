import React, { useEffect, useState } from "react";
import SearchBar from "../../components/Searchbar/index";
import downloadIcon from "../../assets/icons/download.svg";
import addDoctorSvg from "../../assets/icons/doctor-add.svg";
import deleteIcon from "../../assets/icons/delete.svg";
import { Link } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteDoctor, getAllDoctors } from "../../api/product";
import Swal from "sweetalert2";
import jsonToXlsx from "../../utils/jsonAsXlsx";
import AppLoading from "../../components/loaders/AppLoading";
import SomeErrorOccurred from "../Error/SomeErrorOccurred";
import NoDataFound from "../../components/NoDataFound";
import { MAX_ROWS_PER_PAGE } from "../../assets/data/constants";
import TableEntriesPrevNextButtons from "../../components/TableEntriesPrevNextButtons";
import { searchObjects } from "../../utils/search";
import UpdateBlogModal from "./UpdateDoctor";

const Products = () => {
  const queryClient = useQueryClient();
  const [startingIndex, setStartingIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [doctorId, setDoctorId] = useState(null);
  const [activeBlogToUpdate, setActiveBlogToUpdate] = useState({});
  const {
    data,
    isSuccess,
    isLoading } = useQuery({
      queryFn: getAllDoctors,
      queryKey: ["doctors"],
    });
    
  // mutation for delete product
  const { mutate, isPending } = useMutation({
    mutationFn: deleteDoctor,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["doctors"],
      });
      Swal.fire({
        title: "Deleted!",
        text: "Your Product has been deleted.",
        icon: "success",
      });
    },
    onError: (err) => {
      Swal.fire({
        title: "Error",
        text: err,
        icon: "error",
      });
    },
    onSettled: () => {
      setDoctorId(null);
    },
  });

  const deleteProductModal = (doctorId) => {
    setDoctorId(doctorId);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        mutate(doctorId);
      }
    });
  };

  useEffect(() => {
    if (data) {
      const filteredData = searchObjects(data, searchQuery, [
        "_id",
        "name",
        "price",
        "category",
        "experience",
        "available_packs",
        "price"

      ]);
      setFilteredData(filteredData);
    }
  }, [data, searchQuery]);

  return (
    <div className="bg-lightgray h-full w-full p-6 pb-11">
      <div className="flex justify-between">
        <h1 className=" text-[32px] font-bold   text-black leading-[38.4px] ">
          All Products 
        </h1>
        <Link
          to="/add-users"
          type="button"
          className="bg-[#39A803] text-[14px] rounded-md text-white w-[192px] h-[50px] flex justify-center items-center gap-3"
        >
        
          Add Product
        </Link>
      </div>

      <div className="bg-white overflow-x-auto mt-3 rounded-[16px] p-4 px-5">
        {/* search bar and download btn */}
        <div className=" justify-between flex items-center ">
          <SearchBar
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={"Search products"}
          />

          <div className="flex items-center gap-3">
            {/* downloadIcon */}
            <button
              onClick={() =>
                document.getElementById("create_new_blog").showModal()}
              className=" bg-lightgray  rounded-[6px]"
            >
              <img src={downloadIcon} alt="" />
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          {isLoading ? (
            <AppLoading />
          ) : isSuccess && data ? (
            <table className="table">
              {/* head */}
              <thead>
                <tr>
                  <th className="text-[14px] font-bold text-black">ID</th>
                  <th className="text-[14px] font-bold text-black">Name</th>
                  <th className="text-[14px] font-bold text-black text-center">
                    Image
                  </th>
                  <th className="text-[14px] font-bold text-black ">
                    Category
                  </th>
                  <th className="text-[14px] font-bold text-black">
                    Description
                  </th>
                  <th className="text-[14px] font-bold text-black">
                    Available Packs
                  </th>
                  <th className="text-[14px] font-bold text-black text-center">
                    Price
                  </th>
                  <th className="text-[14px] font-bold text-black text-center">
                    Action
                  </th>
                </tr>
              </thead>
              {filteredData?.length > 0 ? (
                <tbody>
                  {filteredData
                    ?.slice(startingIndex, startingIndex + MAX_ROWS_PER_PAGE)
                    ?.map((item) => (
                      <tr>
                        <td className="text-[14px] font-semibold text-black">
                          {item._id}
                        </td>
                        <td className="text-[14px] font-semibold text-black break-words max-w-[200px]">
                          {item.name}
                        </td>
                        <td className="text-[14px] font-semibold text-black text-center">
                          <div className="flex justify-center items-center">
                            <img
                              className="object-contain object-center h-[93px] rounded-lg min-w-[78px] w-[78px]"
                              src={item.avatar.url}
                              alt=""
                            />
                          </div>
                        </td>
                        <td className="text-[14px]  font-semibold text-black">
                          {item.category}
                        </td>
                        <td className="text-[14px] font-semibold text-black">
                          {item.description}
                        </td>
                        <td className="text-[14px] font-semibold text-black">
                          {item.available_packs}
                        </td>
                        <td className="text-[14px] font-semibold text-black">
                        ₹{item.price}
                        </td>
                        <td className="text-[14px] text-center font-semibold text-black">
                          <div className="flex items-center justify-center gap-3">
                            <button
                              onClick={() => {
                                setActiveBlogToUpdate(item);
                                document
                                  .getElementById("update_blog")
                                  ?.showModal();
                              }}
                              className=" font-semibold p-2 rounded-lg border-violet-900 text-[#7131ae] border"
                            >
                              Update
                            </button>
                            <UpdateBlogModal data={activeBlogToUpdate}/>
                            <div className="h-[38px] w-[38px]   ">
                              {isPending && doctorId === item._id ? (
                                <div className="loading loading-spinner"></div>
                              ) : (
                                <button
                                  onClick={() => {
                                    deleteProductModal(item._id);
                                  }}
                                >
                                  <img src={deleteIcon} alt="" />
                                </button>
                              )}
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              ) : (
                <NoDataFound />
              )}
            </table>
          ) : (
            <SomeErrorOccurred />
          )}
        </div>
        <hr />
        {filteredData && filteredData.length > 0 && (
          <TableEntriesPrevNextButtons
            filteredDataLength={filteredData.length}
            setStartingIndex={setStartingIndex}
            startingIndex={startingIndex}
          />
        )}
      </div>
    </div>
  );
};

export default Products;
