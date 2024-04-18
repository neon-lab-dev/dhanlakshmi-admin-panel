import icon1 from "../../assets/icon/Icon1.svg";
import icon3 from "../../assets/icon/Icon3.svg";
import icon9 from "../../assets/icon/Icon9.svg";

const DASHBOARD_CARDS = [
  {
    image: icon1,
    title: "Sellers",
    queryKey: "userCount",
  },
  {
    image: icon3,
    title: "users",
    queryKey: "productsCount",
  },
  {
    image:  icon9,
    title: "Products",
    queryKey: "totalOrdersAmountCancelled",
  },
];

export default DASHBOARD_CARDS;
