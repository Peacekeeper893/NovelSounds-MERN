import React, { Fragment } from "react";
import { db } from "../../firebase";
import { addDoc, collection } from "firebase/firestore";
import { useEffect, useState } from "react";
import { ThemeProvider } from '@mui/material/styles';
import {  getDocs , where , query } from "firebase/firestore";
import { deleteDoc, doc } from "firebase/firestore";



const Hero = ({ book, user }) => {
    
    const [third, setThird] = useState(false)
    const handleAddShelf = async () => {


        addDoc(collection(db, "users", user.uid, "shelf"), {
            name: book[0]["name"]
        }).then(() => {
            console.log("Document successfully written!");
            setThird(true);
        }
        ).catch((error) => {
            console.error("Error writing document: ", error);
        });

    };

const handleRemoveShelf = async () => {
    const q = query(
        collection(db, "users", user.uid, "shelf"),
        where("name", "==", book[0]["name"])
    );

    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
        const docRef = doc(db, "users", user.uid, "shelf", querySnapshot.docs[0].id);
        await deleteDoc(docRef);
        console.log("Document successfully deleted!");
        setThird(false);
    } else {
        console.log("No such document!");
    }
};

    useEffect(() => {
        if (book && user && user.uid) {
            const checkBookInShelf = async () => {
                const q = query(
                    collection(db, "users", user.uid, "shelf"),
                    where("name", "==", book[0]["name"])
                );

                const querySnapshot = await getDocs(q);
                if (!querySnapshot.empty) {
                    console.log("Document data:", querySnapshot.docs[0].data());
                    setThird(true);
                } else {
                    console.log("No such document!");
                    setThird(false);
                }
            };

            setTimeout(() => {
                checkBookInShelf();
            }, 0);
        }
    }, [book, user]);
    
    return (
        <Fragment>
            <div className="md:p-8 flex justify-start md:gap-9 dark:bg-d-bg-200 dark:text-white gap-4 p-4">
                <div className="md:h-[320px] md:w-[250px] md:min-w-[250px]  h-[190px] w-[190px]">
                    <img
                        src={book[0]["bookimg"]}
                        alt=""
                        className="w-full h-full object-fill"
                    />
                </div>

                <div>
                    <h1 className="md:text-4xl text-xl mb-2">{book[0]["name"]}</h1>
                    <p className="md:text-xl text-lg">{book[0]["author"]}</p>


                    <p className="mt-16 italic font-extralight max-w-[100%] max-h-[4.9em] overflow-hidden md:block hidden">{book[0]["about"]}</p>
                    
                    {/* // Create a button to add to shelf */}

                    {!third &&
                        <div className="flex justify-start mt-8">
                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded border-black border-1" onClick={handleAddShelf}>
                                Add to Shelf
                            </button>
                        </div>
                    }

                    {third && <div className="flex justify-start mt-8">
                        <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded border-red-900 border-2" onClick={handleRemoveShelf}>
                            Remove from Shelf
                        </button>
                    </div>
                    }
                </div>
            </div>
        </Fragment>
    );
};

export default Hero;
