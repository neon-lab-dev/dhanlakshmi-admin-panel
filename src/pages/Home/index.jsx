import ItemCard from "./ItemCard";
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  getAllUserCount,
  getConnectedUserCount,
  getDoctorsCount,
} from "../../api/dashboard.js";
import AppLoading from "../../components/loaders/AppLoading.jsx";
import SomeErrorOccurred from "../Error/SomeErrorOccurred.jsx";
import DASHBOARD_CARDS from "../../assets/data/dashboardCards.js";
const Home = () => {
  const [details, setDetails] = useState({});
  const {
    data: allUserData,
    isSuccess,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["Home"],
    queryFn: async () => {
      const allUserCountData = await getAllUserCount();
      const connectedUserCountData = await getConnectedUserCount();
      const doctorCountData = await getDoctorsCount();
      return {
        allUserCountData,
        connectedUserCountData,
        doctorCountData,
      };
    },
  });
  useEffect(() => {
    if(isSuccess){
    const { allUserCountData, connectedUserCountData,doctorCountData,} = allUserData;
    setDetails({
      "Sellers":allUserCountData,
      "users":connectedUserCountData,
      "Products":doctorCountData,
    }); 
  }
  }, [isSuccess])
  return (
    <div className="text-primary bg-[#F5F6FA] h-full w-full px-6 py-2">
      <div className="text-neutral-800 text-[32px] font-bold font-lato">
         Admin Dashboard
      </div>
      {isLoading ? (
        <AppLoading />
      ) : !isError && allUserData ? (
        <div className="flex flex-wrap gap-[30px] py-[33px] ">
          {DASHBOARD_CARDS.map((element) => {
            return (
              <ItemCard
                key={element.title}
                image={element.image}
                title={element.title}
                details={details}
              />
            );
          })}
        </div>
      ) : (
        <SomeErrorOccurred />
      )}
    </div>
  );
};
export default Home;
