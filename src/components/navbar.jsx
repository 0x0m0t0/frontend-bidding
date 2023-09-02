import beehiveLogo from "./../assets/img/bidhive-logo.png";
import { Avatar } from "./avatar";
const navigation = [
  { name: "Home", href: "/", current: true },
  { name: "Login", href: "/login", current: false },
  { name: "New Item", href: "/newitem", current: false },
  { name: "Archive", href: "/archive", current: false },
  { name: "Profile", href: "/profile", current: false },
  { name: "Lobbies", href: "/alllobby", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Nav() {
  return (
    <>
      <div className="flex items-start justify-between mr-1 pb-2 pt-2 pr-6 pl-6">
        <img className="h-20 w-25 p-3 pr-40 -mt-5" src={beehiveLogo} />

        {navigation.map((item) => (
          <a
            key={item.name}
            href={item.href}
            className={classNames(
              item.current
                ? "bg-midnightblue text-mustard"
                : "text-gray-300  text-midnightblue hover:bg-mustard hover:midnightblue",
              "rounded-md px-3 py-2 text-sm font-medium mb-8 mr-1"
            )}
            aria-current={item.current ? "page" : undefined}
          >
            {item.name}
          </a>
        ))}
        <Avatar />
      </div>
    </>
  );
}
