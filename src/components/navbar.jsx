import beehiveLogo from "./../assets/img/bidhive.png";
import { Avatar } from "./avatar";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import "./navbar.css";

const navigation = [
  { name: "Home", href: "/", current: true },
  // { name: "Login", href: "/login", current: false },
  { name: "New Item", href: "/newitem", current: false },
  { name: "Archive", href: "/archive", current: false },
  { name: "Current Auctions", href: "/alllobby", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Nav() {
  const [cookies] = useCookies(["user"], ["user_id"]);
  return (
    <>
      <div className="menu-nav flex items-start justify-between ">
        <Link to={`/`}>
          <img className="logo bidhive-main-logo" src={beehiveLogo} />
        </Link>

        {navigation.map((item) => (
          <a
            key={item.name}
            href={item.href}
            className={classNames(
              item.current
                ? "text-midnightblue p-4 hover:midnightblue hover:border border-midnightblue"
                : "text-gray-300  text-midnightblue hover:midnightblue hover:border border-midnightblue",
              "rounded-md px-3 py-2 mb-8 mr-1"
            )}
            aria-current={item.current ? "page" : undefined}
          >
            {item.name}
          </a>
        ))}

        {cookies?.user && cookies?.user_id !== null ? (
          <Avatar />
        ) : (
          <Link to={`/login`}>
            <button
              className={
                "login p-4 text-midnightblue bg-mustard hover:text-mustard hover:bg-midnightblue rounded-md px-3 py-2 text-sm font-medium mb-8 mr-1"
              }
            >
              Login
            </button>
          </Link>
        )}
      </div>
    </>
  );
}
