import React from "react";
import { Link, useLocation } from "react-router-dom";

const NavbarMio = () => {
    const location = useLocation();
    return (
        <nav className="bg-[#F6F3F9] fixed w-full z-20 top-0 start-0 ">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <p
                   
                    className="flex items-center text-2xl  font-semibold whitespace-nowrap space-x-3 rtl:space-x-reverse"
                >
                    Clinica Rossi
                </p>
                <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                    <button
                        type="button"
                        className="text-white bg-purple-600 hover:bg-purple-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center"
                    >
                        Logout
                    </button>
                    <button
                        data-collapse-toggle="navbar-sticky"
                        type="button"
                        className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                        aria-controls="navbar-sticky"
                        aria-expanded="false"
                    >
                        <span className="sr-only">Open main menu</span>
                        <svg
                            className="w-5 h-5"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 17 14"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M1 1h15M1 7h15M1 13h15"
                            />
                        </svg>
                    </button>
                </div>
                <div
                    className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
                    id="navbar-sticky"
                >
                    <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border  md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0">
                        <li>
                        <Link
                            to="/admin"
                            className={`block py-2 px-3 text-gray-900 rounded hover:bg-purple-700 md:hover:bg-transparent md:p-0 ${
                                location.pathname === "/admin" ? "text-purple-700" : ""
                            }`}
                        >
                            Dottori
                        </Link>
                        </li>
                        <li>
                        <Link
                            to="/admin/patients"
                            className={`block py-2 px-3 text-gray-900 rounded hover:bg-purple-700 md:hover:bg-transparent md:p-0 ${
                                location.pathname === "/admin/patients" ? "text-purple-700" : ""
                            }`}
                        >
                            Pazienti
                        </Link>
                        </li>
                        <li>
                        <Link
                            to="/admin/reports"
                            className={`block py-2 px-3 text-gray-900 rounded hover:bg-purple-700 md:hover:bg-transparent md:p-0 ${
                                location.pathname === "/admin/reports" ? "text-purple-700" : ""
                            }`}
                        >
                            Report
                        </Link>
                        </li>
                        <li>
                        <Link
                            to="/admin/exams"
                            className={`block py-2 px-3 text-gray-900 rounded hover:bg-purple-700 md:hover:bg-transparent md:p-0 ${
                                location.pathname === "/admin/exams" ? "text-purple-700" : ""
                            }`}
                        >
                            Visite
                        </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default NavbarMio;