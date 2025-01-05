import { Dialog, Popover, Transition } from "@headlessui/react";
import {
  Bars3Icon,
  ShoppingBagIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { Fragment, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { UserIcon } from "lucide-react";
import { useAppSelector } from "../../redux/hook";
import { selectCurrentUser } from "../../redux/features/auth/authSlice";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";

const navigation = {
  pages: [
    { name: "Company", href: "#" },
    { name: "Stores", href: "#" },
  ],
};

interface UserProfileProps {
  cartIconRef: React.RefObject<HTMLDivElement>;
  setSearchTerm: (term: string) => void;
}

function UserProfile({ cartIconRef, setSearchTerm }: UserProfileProps) {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");

  const handleSearchKeyPress = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter") {
      navigate(
        `/products?searchTerm=${encodeURIComponent(event.currentTarget.value)}`
      );
    }
  };

  const handleSearchClick = () => {
    navigate(`/products?searchTerm=${encodeURIComponent(searchValue)}`);
  };

  const [open, setOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const currentUser = useAppSelector(selectCurrentUser);
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <>
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-40 lg:hidden" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0">
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 z-40 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full">
              <Dialog.Panel className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl">
                <div className="flex px-4 pb-2 pt-5">
                  <button
                    type="button"
                    className="-m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
                    onClick={() => setOpen(false)}>
                    <span className="sr-only">Close menu</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                <div className="space-y-6 border-t border-gray-200 px-4 py-6">
                  {navigation.pages.map((page) => (
                    <div key={page.name} className="flow-root">
                      <a
                        href={page.href}
                        className="-m-2 block p-2 font-medium text-gray-900">
                        {page.name}
                      </a>
                    </div>
                  ))}
                </div>

                <div className="space-y-6 border-t border-gray-200 px-4 py-6">
                  {!currentUser ? (
                    <>
                      <div className="flow-root">
                        <Link
                          to="/login"
                          className="-m-2 block p-2 font-medium text-gray-900">
                          Sign in
                        </Link>
                      </div>
                      <div className="flow-root">
                        <Link
                          to="/register"
                          className="-m-2 block p-2 font-medium text-gray-900">
                          Create account
                        </Link>
                      </div>
                    </>
                  ) : null}
                  <div className="flow-root">
                    <Link
                      to="/VendorRegister"
                      className="-m-2 block p-2 font-medium text-gray-900">
                      Become a Vendor
                    </Link>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      <header className="relative overflow-hidden">
        <nav
          aria-label="Top"
          className="relative z-20 bg-white bg-opacity-90 backdrop-blur-xl backdrop-filter">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center">
              <button
                type="button"
                className="rounded-md bg-white p-2 text-gray-400 lg:hidden"
                onClick={() => setOpen(true)}>
                <span className="sr-only">Open menu</span>
                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
              </button>

              {/* Logo */}
              <div className="ml-4 flex lg:ml-0">
                <a href="#">
                  <span className="sr-only">Best Buy</span>
                  <img
                    className="h-8 w-auto"
                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                    alt=""
                  />
                </a>
              </div>

              {/* Flyout menus */}
              <Popover.Group className="hidden lg:ml-8 lg:block lg:self-stretch">
                <div className="flex h-full space-x-8">
                  {navigation.pages.map((page) => (
                    <a
                      key={page.name}
                      href={page.href}
                      className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800">
                      {page.name}
                    </a>
                  ))}
                </div>
              </Popover.Group>

              {/* Search Bar */}
              <div className="relative w-full max-w-md lg:ml-8">
                <input
                  type="text"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  placeholder="Search for products..."
                  className="w-full rounded-md border border-gray-300 py-2 pl-4 pr-10 text-sm text-gray-700 placeholder-gray-400 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                  onKeyDown={handleSearchKeyPress} // Handles Enter key press
                />
                <button
                  type="submit"
                  onClick={handleSearchClick} // Handles Click on Magnifying Glass
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700">
                  <MagnifyingGlassIcon className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>

              <div className="ml-auto flex items-center">
                <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                  {!currentUser && (
                    <>
                      <Link
                        to="/login"
                        className="text-sm font-medium text-gray-700 hover:text-gray-800">
                        Sign in
                      </Link>
                      <span
                        className="h-6 w-px bg-gray-400"
                        aria-hidden="true"
                      />
                      <Link
                        to="/register"
                        className="text-sm font-medium text-gray-700 hover:text-gray-800">
                        Create account
                      </Link>
                    </>
                  )}
                </div>

                <div className="hidden lg:ml-8 lg:flex">
                  <span className="h-6 w-px bg-gray-400" aria-hidden="true" />
                  <Link
                    to="/VendorRegister"
                    className="flex items-center text-gray-700 hover:text-gray-800">
                    <span className="ml-3 block text-sm font-medium">
                      Become a vendor
                    </span>
                  </Link>
                </div>
                {/* User Profile */}
                <div className="relative lg:ml-6">
                  <button
                    onClick={toggleDropdown}
                    className="flex items-center p-2 text-gray-400 hover:text-gray-500 focus:outline-none">
                    <span className="sr-only">User</span>
                    <UserIcon className="h-6 w-6" aria-hidden="true" />
                    {currentUser && (
                      <Link
                        to="/dashboard"
                        className="ms-2 font-semibold text-gray-10">
                        {currentUser?.name}
                      </Link>
                    )}
                  </button>
                </div>

                {/* Cart */}
                <div ref={cartIconRef} className="ml-4 flow-root lg:ml-6">
                  <a href="#" className="group -m-2 flex items-center p-2">
                    <ShoppingBagIcon
                      className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                      aria-hidden="true"
                    />
                    <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">
                      0
                    </span>
                    <span className="sr-only">items in cart, view bag</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
}

export default UserProfile;
