import React, { useEffect, useState } from 'react';
import { Button, Col, Form, FormControl, FormGroup, Row } from 'react-bootstrap';
import QrReader from "react-qr-scanner";
import { WALLETCONTEXT } from '../context/walletContext';
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import * as yup from 'yup';
const TraceProduct = () => {
    const [shipments, setShipments] = useState([]);
    const { addProductToTraceShipment, getShipments,currentAccount } = WALLETCONTEXT();
    const [loading, setLoading] = useState(false);
    const [streams, setStreams] = useState(null);
    useEffect(() => {
        if (!streams) {
            getVideoPersmission();
        }

    }, [streams]);
    useEffect(()=>{
        if(currentAccount){
            getShipmentsList();
        }
    },[currentAccount])
    const getShipmentsList = async () => {
        try {
            const result = await getShipments();
            setShipments(result);
        } catch (error) {
            toast.error(error)
        }
    }
    const getVideoPersmission = async () => {
        try {
            const constraints = { video: { facingMode: (false ? "user" : "environment"), width: 640, height: 480 } };
            const streams = await navigator.mediaDevices.getUserMedia(constraints);
            setStreams(streams);
        } catch (error) {
            console.log(error)
        }
    }
    const handlescan = (result) => {
        if (result) {
            setFieldValue("product_code", result.text);
        }
    }
    const handleError = (err) => {
        toast.error(err);
    }
    const handleFormSubmit = async (body) => {
        console.log(body);
        try {
            setLoading(true);
            const objBody = {
                ...body,
            };
            await addProductToTraceShipment(objBody);
            toast.success("Successfully Added To Shipment!");
            setLoading(false);
            resetForm();
        } catch (error) {
            toast.error(error.message);
            setLoading(false);
        }
    }
    const {
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
        setFieldValue,
        resetForm
    } = useFormik({
        onSubmit: handleFormSubmit,
        initialValues: {
            product_code: "",
            shipment_id: ""
        },
        validationSchema: formSchema
    });
    return (

        <>
            <div style={{ width: '300px', height: '300px', marginTop: '-110px',paddingLeft:'500px',paddingTop:'0px' }}>
                <QrReader
                    delay={100}
                    style={previewStyle}
                    onError={handleError}
                    onScan={handlescan}
                />
            </div>
            <div >
                <Form onSubmit={handleSubmit}>
                    <Row>
                        <Col>
                            <FormGroup className='mb-3'>
                                <FormControl
                                    name="product_code"
                                    id="product_code"
                                    placeholder='Product_Code'
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.product_code}
                                    readOnly
                                />
                                <small className="text-danger">{touched.product_code && errors.product_code}</small>
                            </FormGroup>
                        </Col>
                        <Col>
                            <FormGroup className='mb-3'>
                                <FormControl
                                    as={"select"}
                                    name="shipment_id"
                                    placeholder='Shipment_Name'
                                    id="shipment_id"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.shipment_id}
                                >
                                    <option defaultValue={""} >Select Shipment</option>
                                    {shipments.map((item, index) => (
                                        <option value={index} key={index}>{item.shipment_name}</option>
                                    ))}
                                </FormControl>
                                <small className="text-danger">{touched.shipment_id && errors.shipment_id}</small>
                            </FormGroup>
                        </Col>
                    </Row>
                    <FormGroup className='text-end'>
                        <Button type="submit" disabled={loading}>{loading ? "Loading..." : "Save"}</Button>
                    </FormGroup>
                </Form>
            </div>
        </>
    )
}
const previewStyle = {
    height: 300,
    width: 300,
    display: "flex",
    justifycontent: "center",
    alignitem: 'center'
};
const formSchema = yup.object().shape({
    product_code: yup.string().required("Product_Code is required"),
    shipment_id: yup.string().required("Shipment_Name is required"),
})
export default TraceProduct;