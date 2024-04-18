import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { logout } from "../../api/auth";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../store/slices/userSlice";
import Swal from "sweetalert2";
import logomedlife from '../../assets/images/Logo.svg'

const Sidebar = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const links = [
    {
      label: "Dashboard",
      path: "/admin/",
    },
    {
      label: "Product",
      path: "/admin/products",
    },
    {
      label: "User",
      path: "/admin/users",
    },  
    {
      label: "Seller",
      path: "/admin/seller",
    },
  ];

  // Logout mutation
  const { mutate, isPending } = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient
        .invalidateQueries({
          queryKey: ["user"],
        })
        .then(() => {
          dispatch(logoutUser());
          Swal.fire({
            icon: "success",
            title: "Logout",
            text: "You have been logged out successfully",
          });
          navigate("/admin");
        });
    },
    onError: (err) => {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error,
      });
    },
  });

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to logout?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, logout!",
    }).then((result) => {
      if (result.isConfirmed) {
        mutate();
      }
    });
  };

  return (
    <aside className="lg:min-w-[260px] max-w-[260px] md:min-w-[200px] hidden md:block bg-white h-screen">
      <Link to="/admin/" className="flex justify-center">
        <img className="my-4 w-[160px]" src={logomedlife} />
      </Link>
      <div className="flex flex-col gap-3 items-center justify-center mt-6 px-5">
        {links.map((link, index) => (
          <Link
            key={index}
            to={link.path}
            className={`w-full flex justify-center rounded-[16px] text-neutral-800 text-sm font-semibold tracking-tight  py-3.5 ${
              pathname === link.path
                ? "bg-[#39A803] text-white "
                : "hover:bg-slate-100"
            }`}
          >
            <div className="w-1/2">
              <div className="text-left">{link.label}</div>
            </div>
          </Link>
        ))}
      </div>
      <div className="bg-[#E0E0E0] h-px my-[18px]"></div>
      <div className="flex flex-col gap-3 items-center justify-center mt-6 px-5">
        <button
          onClick={handleLogout}
          className="w-full flex justify-center rounded-md text-neutral-800 text-sm font-semibold tracking-tight  py-3.5 hover:bg-slate-100"
        >
          <div className="w-1/2">
            <div className="text-left">Logout</div>
          </div>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
