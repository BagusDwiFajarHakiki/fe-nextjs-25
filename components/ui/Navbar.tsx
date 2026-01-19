"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useRef, useEffect } from "react";
import Cookies from "js-cookie";
import { setLogout, getMe } from "@/config/api/auth";
import PersonIcon from "@mui/icons-material/Person";

export default function Navbar() {
  const pathname = usePathname();
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [users, setUsers] = React.useState<any>(null);
  const [dropdownOpen, setDropdownOpen] = React.useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkAuth = async () => {
      const token = Cookies.get("token");
      if (token) {
        setIsLoggedIn(true);
        const response = await getMe();
        if (!response.error) {
          setUsers(response.data);
        }
      }
    };
    checkAuth();
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    await setLogout();
    Cookies.remove("token");
    setIsLoggedIn(false);
    setUsers(null);
    window.location.href = "/auth/login";
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const getInitials = (name: string) => {
    if (!name) return "U";
    const names = name.split(" ");
    let initials = names[0].substring(0, 1).toUpperCase();
    if (names.length > 1) {
      initials += names[names.length - 1].substring(0, 1).toUpperCase();
    }
    return initials;
  };

  const links = [
    { href: "/", label: "Home" },
    { href: "/product-category", label: "Product Category" },
    { href: "/product", label: "Product" },
    { href: "/product-variant", label: "Product Variant" },
  ];

  return (
    <nav className="rounded-md shadow-lg/30 w-full relative bg-gray-800">
      <div className="w-full px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex shrink-0 items-center">
              <img
                src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
                alt="Your Company"
                className="h-8 w-auto"
              />
            </div>
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                {links.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      aria-current={isActive ? "page" : undefined}
                      className={`rounded-md px-3 py-2 text-sm font-medium ${
                        isActive
                          ? "bg-gray-900 text-white"
                          : "text-gray-300 hover:bg-white/5 hover:text-white"
                      }`}
                    >
                      {link.label}
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-auto sm:pr-0">
            <div className="relative ml-3" ref={dropdownRef}>
              <div>
                <button
                  type="button"
                  onClick={toggleDropdown}
                  className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 items-center justify-center h-8 w-8 text-white shadow-lg hover:ring-2 hover:ring-white transition-all duration-200"
                  id="user-menu-button"
                  aria-expanded={dropdownOpen}
                  aria-haspopup="true"
                >
                  <span className="absolute -inset-1.5" />
                  <span className="sr-only">Open user menu</span>
                  {isLoggedIn && users ? (
                    <span className="font-medium text-xs">
                      {getInitials(users.name)}
                    </span>
                  ) : (
                    <PersonIcon className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>

              {dropdownOpen && (
                <div
                  className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="user-menu-button"
                  tabIndex={-1}
                >
                  {isLoggedIn ? (
                    <>
                      <div className="px-4 py-2 text-xs text-gray-500 border-b border-gray-100">
                        Signed in as <br />
                        <span className="font-bold text-gray-900 truncate block">
                          {users?.name}
                        </span>
                      </div>
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        role="menuitem"
                        tabIndex={-1}
                        id="user-menu-item-2"
                      >
                        Sign out
                      </button>
                    </>
                  ) : (
                    <>
                      <Link
                        href="/auth/login"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        role="menuitem"
                        tabIndex={-1}
                        id="user-menu-item-0"
                      >
                        Login
                      </Link>
                      <Link
                        href="/auth/register"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        role="menuitem"
                        tabIndex={-1}
                        id="user-menu-item-1"
                      >
                        Register
                      </Link>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
