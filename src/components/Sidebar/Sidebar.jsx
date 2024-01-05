/** @format */

import React from "react";
import "./Sidebar.scss";
import { IoIosSettings, IoIosCreate, IoMdHome } from "react-icons/io";
import { useNavigate } from "react-router-dom";

function Sidebar() {
    const navigate = useNavigate();
    return (
        <>
            <div className="sideBar">
                <div data-toggle="tooltip"
                    data-placement="right"
                    title="Dashboard" onClick={()=>navigate('/')}>
                <IoMdHome size={'2em'}/>

                 </div>

                <div
                    data-toggle="tooltip"
                    data-placement="right"
                    title="Add New Task"
                    onClick={() => navigate("/add")}
                >
                    <IoIosCreate size={"2em"} />
                </div>

                <div
                    data-toggle="tooltip"
                    data-placement="right"
                    title="Settings"
                >
                    <IoIosSettings size={"2em"} />
                </div>
            </div>
        </>
    );
}

export default Sidebar;
