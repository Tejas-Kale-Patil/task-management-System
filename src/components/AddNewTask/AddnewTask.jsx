import moment from 'moment';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {v4 as uuid} from "uuid";
import { addItem } from '../../redux/slice';
import { Modal } from 'react-bootstrap';

function AddnewTask() {
    const [formData, setFormData] = useState({
        id:'',
        taskName: '',
        message: '',
        createdDate:moment().format('l'),
        status:'ongoing',
        progress:0,
        deadline: '',
      });
      const [show, setShow] = useState(false);

      const handleClose = () => setShow(false);
    

      let selector = useSelector(state=>state.table.items)
      let dispatch = useDispatch();
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value,
        });
      };
      
    
      const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(addItem([{...formData,id:uuid().toString()}, ...selector]))
        setShow(true)
        setFormData({
            id:'',
            taskName: '',
            message: '',
            createdDate:moment().format("MM DD YY"),
            status:'ongoing',
            deadline: '',
          })
        

      };
    
      return (
        <div className="container mt-4">
            
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Task Created Successfully</Modal.Title>
        </Modal.Header>
        <Modal.Body>Check your created task on dashboard !!</Modal.Body>
      </Modal>
          <h2>Task Form</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Task Name:</label>
              <input
                type="text"
                className="form-control"
                name="taskName"
                value={formData.taskName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Message:</label>
              <textarea
                className="form-control"
                name="message"
                value={formData.message}
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
                value={formData.deadline}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Status:</label>
              <input
                className="form-control"
                name="status"
                value={formData.status}

                disabled
              />
            </div>
            <div className="mb-3">
              <label className="form-label">CreatedOn:</label>
              <input
                type="text"
                className="form-control"
                name="createdDate"
                value={moment().format('l')}
                disabled
              />
            </div>
            
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      );
    };


export default AddnewTask