import React, { useEffect, useState } from "react";
import Searchbar from "../../components/Searchbar/index.jsx";
import downloadIcon from "../../assets/icon/download.svg";
import AppLoading from "../../components/loaders/AppLoading.jsx";
import SomeErrorOccurred from "../Error/SomeErrorOccurred.jsx";
import jsonToXlsx from "../../utils/jsonAsXlsx.js";
import TableEntriesPrevNextButtons from "../../components/TableEntriesPrevNextButtons.jsx";
import { searchObjects } from "../../utils/search.js";
import { MAX_ROWS_PER_PAGE } from "../../assets/data/constants.js";
import { useQuery } from "@tanstack/react-query";
import { getConnectedUserDetails, getsellerDetails } from "../../api/user.js";
import NoDataFound from "../../components/NoDataFound.jsx";

const User = () => {
  const [startingIndex, setStartingIndex] = useState(0);
  const [filteredData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const {
    data: connectedUserData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["seller"],
    queryFn: () => getsellerDetails(),
  });
  useEffect(() => {
    if (connectedUserData) {
      const filteredData = searchObjects(connectedUserData, searchQuery, [
        "_id",
        "full_name",
        "email",
        "address",
        "store_name"
      ]);
      setFilteredData(filteredData);
    }
  }, [connectedUserData, searchQuery]);


  return (
    <div className="bg-[#F5F6FA] min-h-full w-full p-6 pb-11">
      <h1 className="font-lato text-[32px] font-bold text-black leading-[38.4px] ">
        All Seller 
      </h1>

      <div className="bg-white overflow-x-auto mt-3 rounded-[16px] p-4 px-5">
        <div className=" justify-between flex items-center ">
          {/* Searchbar */}
          <Searchbar
            placeholder="Search by ID, Name, City, Mobile No"
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setStartingIndex(0);
            }}
          />
          <div className="flex items-center gap-6">
            {/* downloadIcon */}

            <button
              disabled={isLoading || isError}
              onClick={() => jsonToXlsx(connectedUserData, "Connected users")}
              className=" bg-lightgray  rounded-[6px] disabled:opacity-50"
            >
              <img src={downloadIcon} alt="" />
            </button>
          </div>
        </div>
        {/* User table */}
        <div className="mt-4">
          <div className="overflow-x-auto">
            {isLoading ? (
              <AppLoading />
            ) : !isError && connectedUserData ? (
              <table className="table rounded-2xl w-full">
                {/* head */}

                <thead className="grid-col-5 ">
                  <tr className="h-[48px] bg-slate-100 w-full items-center">
                    <th className="font-bold font-lato text-black text-[14px] text-start px-3 ">
                      ID
                    </th>
                    <th className="font-bold font-lato text-black text-[14px] text-center px-3 ">
                      Name
                    </th>
                    <th className="font-bold font-lato text-black text-[14px]  text-center px-3">
                      Email Address
                    </th>
                    <th className="font-bold font-lato text-black text-[14px]  text-center px-3">
                      Address
                    </th>
                    <th className="w-1/6 font-bold font-lato text-black text-[14px]  text-center px-3">
                      Store name
                    </th>
                    
                  </tr>
                </thead>

                {filteredData.length > 0 ? (
                  <tbody className="grid-col-5">
                    {filteredData
                      ?.slice(startingIndex, startingIndex + MAX_ROWS_PER_PAGE)
                      .map((user) => {
                        return (
                          <tr
                            className="  h-[48px]  w-full items-center"
                            key={user._id}
                          >
                            <td className="opacity-80 font-lato font-semibold text-[14px] w-1/5 min-w-[150px] text-black  text-start px-3">
                              #{user._id}
                            </td>
                            <td className="opacity-80 font-lato font-semibold text-[14px] text-center w-1/5 min-w-[150px] text-black     px-3">
                              {user.full_name}
                            </td>
                            <td className="opacity-80  font-lato font-semibold w-1/5 min-w-[150px] text-center text-[14px] px-3">
                              {user.email}
                            </td>
                            <td className="opacity-80  font-lato font-semibold w-1/5 min-w-[150px] text-center text-[14px] px-3">
                              {user.address}
                            </td>
                            <td className="opacity-80  font-lato font-semibold w-1/5 min-w-[150px] text-center text-[14px] px-3">
                              {user.store_name}
                            </td>
                          </tr>
                        );
                      })}
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
          {filteredData?.length > 0 && (
            <TableEntriesPrevNextButtons
              filteredDataLength={filteredData?.length}
              displayDataLength={
                filteredData?.slice(
                  startingIndex,
                  startingIndex + MAX_ROWS_PER_PAGE
                ).length
              }
              setStartingIndex={setStartingIndex}
              startingIndex={startingIndex}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default User;
