const navigation = [
  { name: "Home", href: "/", current: true },
  { name: "Login", href: "/login", current: false },
  { name: "New Item", href: "/newitem", current: false },
  { name: "Archive", href: "/archive", current: false },
  { name: "Profile", href: "/profile", current: false },
  { name: "Lobby", href: "/lobby", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Nav() {
  return (
    <>
      <div className="flex justify-center">
        {navigation.map((item) => (
          <a
            key={item.name}
            href={item.href}
            className={classNames(
              item.current
                ? "bg-midnightblue text-mustard"
                : "text-gray-300  text-midnightblue hover:bg-mustard hover:midnightblue",
              "rounded-md px-3 py-2 text-sm font-medium m-2"
            )}
            aria-current={item.current ? "page" : undefined}
          >
            {item.name}
          </a>
        ))}
      </div>
    </>
  );
}
