import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, FormGroup, Form, FormControl, Toast } from 'react-bootstrap';
import { WALLETCONTEXT } from '../context/walletContext';
import { toast } from 'react-toastify';
import moment from 'moment';
import { useFormik } from 'formik';
import * as yup from 'yup';
const Shipments = () => {
    const [shipments, setShipments] = useState([]);
    const [loading, setLoading] = useState(false);
    const { getShipments, currentAccount, AddShipment } = WALLETCONTEXT();
    const [show, setShow] = useState(false);

    const handleClose = () => {
        setShow(false);
        resetForm();
    };
    const handleShow = () => setShow(true);
    useEffect(() => {
        if (currentAccount) {
            get();
        }
    }, [currentAccount]);
    const get = async () => {
        try {
            const result = await getShipments();
            setShipments(result);
        } catch (error) {
            toast.error(error)
        }
    }
    const handleFormSubmit = async (body) => {
        try {
            setLoading(true);
            const objBody = {
                ...body,
                sending_date: moment(body.sending_date).valueOf(),
                receiving_date: moment(body.receiving_date).valueOf()
            };
            const result = await AddShipment(objBody);
            toast.success("Successfully Added!");
            handleClose();
            resetForm();
            get();
            setLoading(false);
        } catch (error) {
            toast.error(error.message);
            setLoading(false);
        }
    }
    const {
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
        resetForm
    } = useFormik({
        onSubmit: handleFormSubmit,
        initialValues: {
            shipment_name: "",
            shipment_country: "",
            shipment_address: "",
            sending_date: "",
            receiving_date: ""
        },
        validationSchema: formSchema
    });
    return (
        <div style={{marginTop:'100px'}}>
            {
                currentAccount && <div className='mb-3'>
                    <Button onClick={handleShow}>Add Shipment</Button>
                </div>
            }
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Code</th>
                        <th>Country</th>
                        <th>Address</th>
                        <th>Sending_date</th>
                        <th>Receiving_date</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        shipments.map((item, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{item.shipment_name}</td>
                                <td>{item.shipment_country}</td>
                                <td>{item.shipment_address}</td>
                                <td>{moment(Number(String(item.sending_date))).format("YYYY-MM-DD")}</td>
                                <td>{moment(Number(String(item.receiving_date))).format("YYYY-MM-DD")}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </Table>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Shipment</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <p style={{fontSize:'15px',fontWeight:'bold'}} >Shipment Code :</p>
                    <Form onSubmit={handleSubmit}>
                        <FormGroup className='mb-3'>
                            <FormControl
                                type="text"
                                name="shipment_name"
                                id="shipment_name"
                                placeholder="code"
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            <small className="text-danger">{touched.shipment_name && errors.shipment_name}</small>
                        </FormGroup>

                        <p style={{fontSize:'15px',fontWeight:'bold'}} >Receiver Name :</p>
                        <FormGroup className='mb-3'>
                            <FormControl
                                type="text"
                                name="shipment_country"
                                id="shipment_country"
                                placeholder="name"
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            <small className="text-danger">{touched.shipment_country && errors.shipment_country}</small>
                        </FormGroup>
                        <p style={{fontSize:'15px',fontWeight:'bold'}} >Address :</p>
                        <FormGroup className='mb-3'>
                            <FormControl
                                type="text"
                                name="shipment_address"
                                id="shipment_address"
                                placeholder="Address"
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            <small className="text-danger">{touched.shipment_address && errors.shipment_address}</small>
                        </FormGroup>
                        <p style={{fontSize:'15px',fontWeight:'bold'}} >Sending Date :</p>
                        <FormGroup className='mb-3'>
                            <FormControl
                                type="date"
                                name="sending_date"
                                id="sending_date"
                                placeholder="Sending date"
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            <small className="text-danger">{touched.sending_date && errors.sending_date}</small>
                        </FormGroup>
                        <p style={{fontSize:'15px',fontWeight:'bold'}} >Receiving Date :</p>
                        <FormGroup className='mb-3'>
                            <FormControl
                                type="date"
                                name="receiving_date"
                                id="receiving_date"
                                placeholder="Receiving date"
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            <small className="text-danger">{touched.receiving_date && errors.receiving_date}</small>
                        </FormGroup>
                        <FormGroup >
                            <Button variant="secondary" onClick={handleClose}>
                                Close
                            </Button>
                            {' '}
                            <Button variant="primary" type='submit' disabled={loading}>
                                {loading ? "Loading" : "Save"}
                            </Button>
                        </FormGroup>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    )
}
const formSchema = yup.object().shape({
    shipment_name: yup.string().required("Shipment Code is required"),
    shipment_country: yup.string().required("Recipient's Name is required"),
    shipment_address: yup.string().required("Address is required"),
    sending_date: yup.string().required("Sending date is required"),
    receiving_date: yup.string().required("Receiving date is required")
})
export default Shipments;