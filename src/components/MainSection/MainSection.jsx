/** @format */


import React, { useState } from "react";
import "./Mainsection.scss";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../../redux/slice";
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { Modal, ProgressBar } from "react-bootstrap";
import EditIcon from '@mui/icons-material/Edit';


function MainSection() {
    let selector = useSelector((state) => state.table.items);
    let dispatch = useDispatch();
    let [projectData, setProjData] = useState([...selector]);
    const [show, setShow] = useState(false);
    const [objData, setobjData] = useState({});

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    function deleteItem(ele) {
        let updatedItems = projectData.filter((item, i) => ele !== item);
        setProjData(updatedItems);
        dispatch(addItem(updatedItems));
    }
    const handleChange = (e) => {
        const { name, value } = e.target;

        setobjData({
            ...objData,
            [name]: value,
        });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        // You can add additional actions here, such as sending data to an API
    };
    function editItem(index) {
        let editData = projectData.filter((item, i) => i === index);
        setobjData({ ...editData[0] });
        handleShow();
    }

    function updateData(data, item) {
        let updatedData = projectData.map((element, i) => {
            if (element.id === item) {
                if(data.progress >= 100){
                    return { ...data, progress:100 };
                }
                else if(data.progress <= 0){
                    return { ...data, progress:0 };
                }
                else{
                    return { ...data};

                }
            } else {
                return element;
            }
        });
        setProjData(updatedData);
        setShow(false);
    }

    function sortByProgress(){
        const sortedData = projectData.sort((a, b) =>  b.progress - a.progress)
        
        dispatch(addItem(sortedData))
        setProjData(sortedData)
    }
    function sortCompletedFirst(){
        const sortedDataByStatus = projectData.sort((a, b) => {
          
             if (a.status === 'completed') {
              return -1; 
            } else {
              return 1; 
            }
          });

          dispatch(addItem(sortedDataByStatus))
          setProjData(sortedDataByStatus)
    }
    function sortOngoingFirst(){
        const sortedDataByStatus = projectData.sort((a, b) => {
          
             if (a.status === 'ongoing') {
              return -1; 
            } else {
              return 1; 
            }
          });

          dispatch(addItem(sortedDataByStatus))
          setProjData(sortedDataByStatus)
    }
    function sortByDate(){
        const sortedDataByDate = projectData.sort((a, b) => {
            const dateA = new Date(a.createdDate);
            const dateB = new Date(b.createdDate);
          
            return dateA - dateB;
          });
          console.log(sortedDataByDate);
          dispatch(addItem(sortedDataByDate))
          setProjData(sortedDataByDate)
    }

    function loadAllTasks() {
        let list = [];

        for (let i = 0; i < projectData.length; i++) {
            let item = projectData[i];
            list.push(
                <div
                    key={i}
                    className=" col-lg-5 col-md-5 col-11 card m-3"
                    style={{ backgroundColor: "#eaf4f4" }}
                >
                    <div className="card-body p-0">
                        <div className="d-flex justify-content-between align-items-center">
                            <p className="card-title">
                                Created on : {item.createdDate}
                            </p>{" "}
                            <div
                                className="deleteBtn mt-1 alert alert-danger p-1"
                                onClick={() => deleteItem(item)}
                            >
                               
                                <Tooltip title="Delete">
                                    <IconButton>
                                    <DeleteIcon />
                                    </IconButton>
                                    </Tooltip>
                            </div>{" "}
                        </div>
                        <h6 className="card-subtitle mb-2 text-center">
                            {item.taskName}
                        </h6>
                        <p className="card-text text-center">
                          {item.message}
                        </p>
                        <div>
                            <p>Progress : {item.progress}%</p>
                            <ProgressBar now={item.progress} label={`${item.progress}%`}/>
                        </div>
                    </div>
                    <hr />
                    <div className="d-flex justify-content-between align-items-center mb-1">
                        <div
                            onClick={() => editItem(i)}
                            className="editBtn alert alert-primary p-1"
                        >
                             <Tooltip title="Edit">
                                    <IconButton>
                                    <EditIcon/>
                                    </IconButton>
                                    </Tooltip>
                            {/* <CiEdit size={"2rem"} /> */}
                        </div>
                        <div data-toggle="tooltip"
                    data-placement="right"
                    title="Status" className=" alert alert-success p-1 ">
                            {item.status}
                        </div>
                        <div data-toggle="tooltip"
                    data-placement="right"
                    title="Due date" className="alert alert-danger p-1">
                            Finish by {item.deadline}
                        </div>
                    </div>
                </div>
            );
        }

        return list;
    }
    return (
        <section className="mainSec card m-lg-3 m-0 w-100">
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton></Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="form-label">Task Name:</label>
                            <input
                                type="text"
                                className="form-control"
                                name="taskName"
                                value={objData.taskName}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Message:</label>
                            <textarea
                                className="form-control"
                                name="message"
                                value={objData.message}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Deadline:</label>
                            <input
                                type="date"
                                className="form-control"
                                name="deadline"
                                value={objData.deadline}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Status:</label>
                            <select
                                className="form-control"
                                value={objData.status}
                                onChange={handleChange}
                                name="status"
                                required
                            >
                                <option value="ongoing">Ongoing</option>
                                <option value="completed">Completed</option>
                            </select>
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Progress:</label>
                            <input
                            type="number"
                            min={0}
                            max={100}
                                className="form-control"
                                value={objData.progress}
                                onChange={handleChange}
                                name="progress"
                                
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">CreatedOn:</label>
                            <input
                                type="text"
                                className="form-control"
                                name="createdOn"
                                value={objData.createdDate}
                                disabled
                            />
                        </div>

                        <button
                            type="submit"
                            className="btn btn-primary"
                            onClick={() => updateData(objData, objData.id)}
                        >
                            Submit
                        </button>
                    </form>
                </Modal.Body>
            </Modal>
            <div className="d-flex justify-content-between m-0 bg-body-secondary align-items-center p-2">
            <p className="align-self-center p-0 m-0">Total Projects : {projectData.length}</p>
            <div className="d-flex justify-content-around">
            <p className="align-self-center fw-bolder p-0 m-0">Sort By :- </p>
            <p className="align-self-center btn btn-warning px-2 py-0 m-2 fw-medium" onClick={sortByDate}> Date </p>
            <p className="align-self-center btn btn-warning px-2 py-0 m-2 fw-medium" onClick={sortByProgress}> Progress </p>
            <p className="align-self-center btn btn-warning px-2 py-0 m-2 fw-medium" onClick={sortOngoingFirst}> Ongoing First </p>
            <p className="align-self-center btn btn-warning px-2 py-0 m-2 fw-medium" onClick={sortCompletedFirst}> Completed First </p>
            </div>
            <div>

            </div>
            </div>
            
            <div className="row justify-content-center">{loadAllTasks()}</div>
        </section>
    );
}

export default MainSection;
