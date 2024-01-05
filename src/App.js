/** @format */

import "./App.css";
import Header from "./components/Header";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainSection from "./components/MainSection/MainSection";
import AddnewTask from "./components/AddNewTask/AddnewTask";
import Sidebar from "./components/Sidebar/Sidebar";

function App() {
    return (
        <>
            <Router>
                <Header />
                <div className="d-lg-flex d-block d-md-flex">
                <Sidebar/>
                <Routes>
                    <Route path="/" element={<MainSection />}></Route>
                    <Route path="/add" element={<AddnewTask />}></Route>
                </Routes>
                </div>
            </Router>
        </>
    );
}

export default App;
