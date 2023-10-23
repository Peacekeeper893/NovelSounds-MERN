import React, { useState, useEffect, Fragment } from "react";
import BookDisplay from "./BookDisplay";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import ShortcutDisplay from "./ShortcutDisplay";
import SearchModal from "./SearchModal";
import { IoSearch } from "react-icons/io5";

const API_BASE = "https://audioapi-euhq.vercel.app";

const Home = ({ loggedIn }) => {
    const [books, setBooks] = useState([]);
    const [hpbooks, setHpbooks] = useState([]);
    const [asoifbooks, setAsoifbooks] = useState([]);
    const [hgbooks, setHgbooks] = useState([]);
    const [isLoading, setIsLoading] = useState(true); // Initialize loading state to true
    const [searchmodal, setSearchmodal] = useState(false);
    const [query, setQuery] = useState("");

    useEffect(() => {
        GetBooks();
        GetHpbooks();
        GetHgbooks();
        GetAsoifbooks();
    }, []);

    const GetBooks = () => {
        fetch(API_BASE + "/books")
            .then((res) => res.json())
            .then((data) => {
                setBooks(data);
                setIsLoading(false);
            })
            .catch((err) => console.error(err));
    };

    const GetHpbooks = () => {
        fetch(API_BASE + "/books/harrypotter")
            .then((res) => res.json())
            .then((data) => {
                setHpbooks(data);
                setIsLoading(false);
            })
            .catch((err) => console.error(err));
    };
    const GetHgbooks = () => {
        fetch(API_BASE + "/books/hunger-games")
            .then((res) => res.json())
            .then((data) => {
                setHgbooks(data);
                setIsLoading(false);
            })
            .catch((err) => console.error(err));
    };
    const GetAsoifbooks = () => {
        fetch(API_BASE + "/books/asoif")
            .then((res) => res.json())
            .then((data) => {
                setAsoifbooks(data);
                setIsLoading(false);
            })
            .catch((err) => console.error(err));
    };

    const handleSearch = () => {
        setSearchmodal(true);
    };

    const handleBlur = () => {
        setTimeout(() => setSearchmodal(false), 250);
    };

    return (
        <Fragment>
            <Navbar loggedIn={loggedIn} />
            {/* Search bar for mobile displays */}

            <div className=" md:hidden text-black  dark:text-d-primary-400 bg-zinc-50 dark:bg-d-bg-100 pt-5 pb-3 px-5">
                <div className="flex w-full">
                    <input
                        type="search"
                        name="searchq"
                        id="searchq"
                        placeholder={`Search an Audiobook... `}
                        className="p-2 border-gray-300 border-[4px] w-full dark:bg-d-bg-200 rounded-xl border-r-0 rounded-r-none"
                        onFocus={handleSearch}
                        onBlur={handleBlur}
                        value={query}
                        onChange={(e) => {
                            setQuery(() => e.target.value);
                        }}
                    />
                    <div className="p-2 pt-3 border-gray-300 border-[4px] border-l-0 dark:bg-d-bg-200 rounded-xl rounded-l-none -ml-0.5"><IoSearch /></div>
                </div>
                {searchmodal && <SearchModal query={query} />}
            </div>

            <div className="min-h-screen bg-zinc-50 dark:bg-d-bg-100 dark:text-white flex w-screen max-w-full md:p-8 p-2">
                <div className=" md:flex-[75]  ">
                    <div
                        className=" text-4xl font-semibold pointer-events-none p-4 dark:text-d-bg-600"
                        id="hp"
                    >
                        Harry Potter Books
                    </div>

                    <div className="flex flex-wrap gap-8 p-4">
                        {isLoading === true ? (
                            <p> Loading.. Please Wait</p>
                        ) : (
                            <Fragment>
                                {hpbooks.map((book) => (
                                    <Link to={`book/${book["name"]}`}>
                                        <BookDisplay
                                            name={book["name"]}
                                            author={book["author"]}
                                            bookimg={book["bookimg"]}
                                        />
                                    </Link>
                                ))}
                            </Fragment>
                        )}
                    </div>
                </div>
                <div className="md:flex flex-col flex-[25] hidden">
                    <div className="  text-black my-5 dark:text-d-primary-400">
                        <input
                            type="search"
                            name="searchq"
                            id="searchq"
                            placeholder="Search"
                            className="p-2 border-gray-300 border-[4px] w-full dark:bg-d-bg-200"
                            onFocus={handleSearch}
                            onBlur={handleBlur}
                            value={query}
                            onChange={(e) => {
                                setQuery(() => e.target.value);
                            }}
                        />
                        {searchmodal && <SearchModal query={query} />}
                    </div>

                    <div className="font-semibold text-xl">Recent Posts</div>
                    <hr className="border-gray-500 " />
                    <div className=" mt-6 max-h-fit flex-col grid gap-6">
                        {books.map((book) => (
                            <Link to={`book/${book["name"]}`}>
                                <ShortcutDisplay book={book} />
                            </Link>
                        ))}
                    </div>
                </div>
            </div>

            <div className=" bg-zinc-50 dark:bg-d-bg-100 dark:text-white  w-screen max-w-full md:p-8 p-2">
                <div
                    className=" text-4xl font-semibold pointer-events-none p-4 dark:text-d-bg-600"
                    id="asoif"
                >
                    A song of Ice and Fire Books
                </div>

                <div className="flex flex-wrap md:gap-16 gap-8 p-4">
                    {isLoading === true ? (
                        <p> Loading.. Please Wait</p>
                    ) : (
                        <Fragment>
                            {asoifbooks.map((book) => (
                                <Link to={`book/${book["name"]}`}>
                                    <BookDisplay
                                        name={book["name"]}
                                        author={book["author"]}
                                        bookimg={book["bookimg"]}
                                    />
                                </Link>
                            ))}
                        </Fragment>
                    )}
                </div>
            </div>

            <div className=" bg-zinc-50 dark:bg-d-bg-100 dark:text-white  w-screen max-w-full md:p-8 p-2">
                <div
                    className=" text-4xl font-semibold pointer-events-none p-4 dark:text-d-bg-600"
                    id="hunger-games"
                >
                    Hunger Games Books
                </div>

                <div className="flex flex-wrap md:gap-16 p-4 gap-8">
                    {isLoading === true ? (
                        <p> Loading.. Please Wait</p>
                    ) : (
                        <Fragment>
                            {hgbooks.map((book) => (
                                <Link to={`book/${book["name"]}`}>
                                    <BookDisplay
                                        name={book["name"]}
                                        author={book["author"]}
                                        bookimg={book["bookimg"]}
                                    />
                                </Link>
                            ))}
                        </Fragment>
                    )}
                </div>
            </div>

            <Footer />
        </Fragment>
    );
};

export default Home;
