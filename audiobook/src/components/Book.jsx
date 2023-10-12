import React, { Fragment, useEffect, useState } from "react";
import ChapterPlayer from "./ChapterPlayer";
import Hero from "./BookComponents/Hero";
import Navigation from "./BookComponents/Navigation";
import { useParams } from "react-router-dom";
import Modal from "./Modal";
import Navbar from "./Navbar";

const API_BASE = "https://audioapi-euhq.vercel.app";

const Book = () => {
    const { book_name } = useParams();

    // book_name = book_name.replaceAll('%20', ' ');
    const [chapter_number, setChapter_number] = useState("0");
    const [book, setbook] = useState([]);
    const [isLoading, setIsLoading] = useState(true); // Initialize loading state to true
    const [openModal, setOpenModal] = useState(false);

    const openModalHandler = () => {
        setOpenModal((prev) => !prev);
    };

    const closeModalHandler = () => {
        setOpenModal(false);
    };
    const GetBook = () => {
        fetch(API_BASE + "/book/" + book_name)
            .then((res) => res.json())
            .then((data) => {
                setbook(data);
                setIsLoading(false);
            })
            .catch((err) => console.error(err));
    };

    useEffect(() => {
        GetBook();
    }, []);


    const sendData = (data) => {
        setChapter_number((prev) => data);
    };

    return (
        <div>
            {isLoading ? (
                <p>Loading...</p>
            ) : openModal ? (
                <Modal
                    closeModalHandler={closeModalHandler}
                    openModalHandler={openModalHandler}
                    book={book}
                />
            ) : (
                <Fragment>
                    <Navbar />
                    <Hero book={book} />
                    <Navigation
                        sendData={sendData}
                        book={book}
                        chapter_number={chapter_number}
                    />
                </Fragment>
            )}

            {chapter_number !== "0" && (
                <div
                    className={`${!openModal && "sticky bottom-0"} ${
                        openModal &&
                        "absolute bottom-0 w-full text-white font-bold text-2xl"
                    }`}
                >
                    <ChapterPlayer
                        title={
                            chapter_number +
                            ". " +
                            book[0]["chapters"][parseInt(chapter_number) - 1][
                                "chapter_title"
                            ]
                        }
                        url={`https://drive.google.com/uc?id=${
                            book[0]["chapters"][parseInt(chapter_number) - 1][
                                "url"
                            ]
                        }`}
                        openModalHandler={openModalHandler}
                        openModal={openModal}
                        book={book}
                        chapter_number={chapter_number}
                        sendData={sendData}
                    />
                </div>
            )}
        </div>
    );
};

export default Book;
