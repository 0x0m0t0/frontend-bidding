import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
export const Logout = () => {
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies(["user"], ["user_id"]);
  // Function to clear the cookie
  const clearCookie = () => {
    // Use the removeCookie function to clear the specific cookie
    removeCookie("user");
    removeCookie("user_id");
    navigate("/");
  };

  return (
    <>
      <div className="flex justify-end pb-2">
        <button
          type="logout"
          className="flex h-10 px-3 py-2 text-sm inline-flex items-center justify-center px-4 py-2 text-sm font-medium tracking-wide bg-midnightblue text-mustard transition-colors duration-200 rounded-md hover:bg-mustard hover:text-midnightblue focus:ring-2 focus:ring-offset-2 focus:ring-neutral-900 focus:shadow-outline focus:outline-none"
          onClick={clearCookie}
        >
          Log out
        </button>
      </div>
    </>
  );
};
