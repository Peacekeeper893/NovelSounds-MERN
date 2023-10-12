import Book from "./components/Book";
import Home from "./components/Home";

import { Routes, Route, Link } from "react-router-dom";

function App() {
    return (
        <div className="App">
            <Routes>
                <Route exact path="/"  element={<Home />} />
                <Route path="/book/:book_name" element={<Book />} />
            </Routes>


        </div>
    );
}

export default App;
