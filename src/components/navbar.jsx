import beehiveLogo from "./../assets/img/bidhive.png";
import { Avatar } from "./avatar";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import './navbar.css'

const navigation = [
  { name: "Home", href: "/", current: true },
  // { name: "Login", href: "/login", current: false },
  { name: "New Item", href: "/newitem", current: false },
  { name: "Archive", href: "/archive", current: false },
  { name: "Lobbies", href: "/alllobby", current: false },
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
          <img className= "logo" src={beehiveLogo} />
        </Link>

        {navigation.map((item) => (
          <a
            key={item.name}
            href={item.href}
            className={classNames(
              item.current
                ? "bg-mustard text-midnightblue border border-midnightblue"
                : "text-gray-300  text-midnightblue hover:bg-mustard hover:midnightblue",
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
                "login p-4 bg-midnightblue text-mustard hover:bg-mustard hover:text-midnightblue rounded-md px-3 py-2 text-sm font-medium mb-8 mr-1"
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
