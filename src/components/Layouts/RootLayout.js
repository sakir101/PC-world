import { Layout } from "antd";
import Link from "next/link";
import { useSelector } from "react-redux";
const { Content, Footer } = Layout;

import { useSession, signOut } from "next-auth/react";
import styles from "@/styles/RootLayout.module.css";
import { useEffect, useState } from "react";

const RootLayout = ({ children }) => {
  const { categories } = useSelector((state) => state.product);
  const [showDropdown, setShowDropdown] = useState(false);
  const { data: session } = useSession();
  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const closeDropdownIfClickedOutside = (event) => {
    if (!event.target.classList.contains("dropbtn")) {
    }
  };

  useEffect(() => {
    document.addEventListener("click", closeDropdownIfClickedOutside);
    return () => {
      document.removeEventListener("click", closeDropdownIfClickedOutside);
    };
  }, []);

  const menuItems = (
    <>
      <li className={styles.dropdown}>
        <button onClick={toggleDropdown} className={styles.dropbtn}>
          Categories
        </button>
        {showDropdown && (
          <ul id="myDropdown" className={styles.dropdownContent}>
            {categories[0]?.data?.map((category) => (
              <li key={category?.id}>
                <Link href={`/categories/${category?._id}`}>
                  {" "}
                  {category?.title}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </li>
      <li>
        <Link href="/createItem">
          <button className="btn btn-primary">Create Item</button>
        </Link>
      </li>
      <li>
        <Link href="/pcBuilder">
          <button className="btn btn-primary">PC Builder</button>
        </Link>
      </li>

      <div className="dropdown dropdown-end  hidden lg:block">
        <label
          tabIndex={0}
          className="btn m-1 bg-transparent border-transparent hover:bg-transparent hover:border-transparent"
        >
          {session?.user ? (
            <div className="avatar">
              <div className="w-8 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                <img src={session?.user?.image} />
              </div>
            </div>
          ) : (
            <div className="avatar">
              <div className="w-8 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                <img
                  src={`https://www.seekpng.com/png/small/46-463314_v-th-h-user-profile-icon.png`}
                  alt={session?.user?.name}
                />
              </div>
            </div>
          )}
        </label>
        <ul
          tabIndex={0}
          className="dropdown-content z-[1] menu p-2 shadow bg-blue-500 rounded-box w-32 text-black"
        >
          <li>
            {session?.user ? (
              <li className="text-white mx-4">
                <button
                  onClick={() => signOut()}
                  className="btn bg-transparent border-none mx-0 text-white btn-xs"
                >
                  Logout
                </button>
              </li>
            ) : (
              <Link href="/login" className="text-white mx-0">
                Login
              </Link>
            )}
          </li>
        </ul>
      </div>
      <div className="hidden lg:block">
        {session?.user ? (
          <p className="text-base font-bold mt-3 text-white">
            {session?.user?.name}
          </p>
        ) : (
          <p className="text-base font-bold mt-3 text-white"></p>
        )}
      </div>
    </>
  );

  return (
    <Layout>
      <div>
        <div className="navbar bg-gradient-to-r from-blue-900 via-blue-700 to-blue-500">
          <div className="w-full lg:w-1/2 flex justify-between lg:justify-between items-center">
            <div className="flex">
              <div className="dropdown">
                <label tabIndex={2} className="btn btn-ghost lg:hidden">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-white font-bold"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h8m-8 6h16"
                    />
                  </svg>
                </label>
                <ul
                  tabIndex={2}
                  className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-blue-500 rounded-box w-52 text-xl text-black z-50"
                >
                  {menuItems}
                </ul>
              </div>
              <Link
                href="/"
                className="btn btn-ghost normal-case text-xl text-white hidden lg:block"
              >
                Tech World
              </Link>
            </div>
            <div className="flex justify-between lg:hidden">
              <div className="dropdown dropdown-end">
                <label
                  tabIndex={0}
                  className="btn m-1 bg-transparent border-transparent hover:bg-transparent hover:border-transparent"
                >
                  {session?.user ? (
                    <div className="avatar">
                      <div className="w-8 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                        <img src={session?.user?.image} />
                      </div>
                    </div>
                  ) : (
                    <div className="avatar">
                      <div className="w-8 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                        <img
                          src={`https://www.seekpng.com/png/small/46-463314_v-th-h-user-profile-icon.png`}
                          alt={session?.user?.name}
                        />
                      </div>
                    </div>
                  )}
                </label>
                <ul
                  tabIndex={0}
                  className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-32 text-black"
                >
                  <li>
                    {session?.user ? (
                      <li className="text-black mx-4">
                        <button
                          onClick={() => signOut()}
                          className="btn bg-transparent border-none mx-0 text-black btn-xs"
                        >
                          Logout
                        </button>
                      </li>
                    ) : (
                      <Link href="/login" className="text-black mx-0">
                        Login
                      </Link>
                    )}
                  </li>
                </ul>
              </div>
              <div className="hidden lg:block">
                {session?.user ? (
                  <p className="text-base font-bold mt-3 text-white">
                    {session?.user?.name}
                  </p>
                ) : (
                  <p className="text-base font-bold mt-3 text-white"></p>
                )}
              </div>
            </div>
          </div>
          <div className="navbar-end hidden lg:flex ">
            <ul className="menu menu-horizontal p-0 ">{menuItems}</ul>
          </div>
        </div>
      </div>
      <Content
        style={{
          padding: "0 0px",
          minHeight: "100vh",
          backgroundColor: "white",
        }}
      >
        {children}
      </Content>
      <Footer
        style={{
          textAlign: "center",
        }}
      >
        <p className="my-5 font-semibold">©Copyright 2023</p>
        <p>Tech World Community</p>
      </Footer>
    </Layout>
  );
};

export default RootLayout;
