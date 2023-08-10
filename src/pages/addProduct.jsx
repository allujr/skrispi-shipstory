import React, { useState } from 'react';
import { Button, FormGroup, Form, FormControl, Row, Col } from 'react-bootstrap';
import { WALLETCONTEXT } from '../context/walletContext';
import { toast } from 'react-toastify';
import moment from 'moment';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import QRCode from 'qrcode';
const AddProductPage = () => {
    const { AddProduct } = WALLETCONTEXT();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [qrcode, setqrCode] = useState("");
    const handleFormSubmit = async (body) => {
        try {
            setqrCode("");
            setLoading(true);
            const objBody = {
                ...body,
                product_production_date: moment(body.product_production_date).valueOf(),
                product_exp_date: moment(body.product_exp_date).valueOf()
            };
            await AddProduct(objBody);
            toast.success("Successfully Added!");
            setLoading(false);
            generateQRCode();
        } catch (error) {
            toast.error(error.message);
            setLoading(false);
        }
    }
    const generateQRCode = () => {
      
        QRCode.toDataURL(
            values.product_code,
            {
                width: 300,
                margin: 2,
                color: {
                    dark: "#000",
                    light: "#fff"
                }
            },
            (err, qrcode) => {
                if (err) console.error(err);
                setqrCode(qrcode);
            }
        );
    }
    const {
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
        resetForm
    } = useFormik({
        onSubmit: handleFormSubmit,
        initialValues: {
            product_name: "",
            product_type: "",
            product_code: "",
            product_production_date: "",
            product_exp_date: ""
        },
        validationSchema: formSchema
    });
    return <div style={{marginTop:'100px',paddingTop:'-500px'}}>
        <div className='mb-3 d-flex justify-content-between'>
            <h4>Add Product</h4>
            <Button onClick={() => navigate('/products')}>Back</Button>
        </div>
        <div>
            <Form onSubmit={handleSubmit}>
                <Row xs={1} sm={2} lg={3}>
                    <Col>
                        <p style={{fontSize:'20px',}} >Product Name :</p>
                        <FormGroup className='mb-3'>
                            <FormControl
                                type="text"
                                name="product_name"
                                id="product_name"
                                placeholder="Name"
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            <small className="text-danger">{touched.product_name && errors.product_name}</small>
                        </FormGroup>
                    </Col>
                    <Col>
                    <p style={{fontSize:'20px',}} >Product Type :</p>
                        <FormGroup className='mb-3'>
                            <FormControl
                                type="text"
                                name="product_type"
                                id="product_type"
                                placeholder="Type"
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            <small className="text-danger">{touched.product_type && errors.product_type}</small>
                        </FormGroup>
                    </Col>
                    <Col>
                    <p style={{fontSize:'20px',}} >Product Code :</p>
                        <FormGroup className='mb-3'>
                            <FormControl
                                type="text"
                                name="product_code"
                                id="product_code"
                                placeholder="Code"
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            <small className="text-danger">{touched.product_code && errors.product_code}</small>
                        </FormGroup>
                    </Col>
                    <Col>
                    <p style={{fontSize:'20px',}} >Product Production Date :</p>
                        <FormGroup className='mb-3'>
                            <FormControl
                                type="date"
                                name="product_production_date"
                                id="product_production_date"
                                placeholder="Production date"
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            <small className="text-danger">{touched.product_production_date && errors.product_production_date}</small>
                        </FormGroup>
                    </Col>
                    <Col>
                    <p style={{fontSize:'20px',}} >Product Expired Date :</p>
                        <FormGroup className='mb-3'>
                            <FormControl
                                type="date"
                                name="product_exp_date"
                                id="product_exp_date"
                                placeholder="Expiry date"
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            <small className="text-danger">{touched.product_exp_date && errors.product_exp_date}</small>
                        </FormGroup>
                    </Col>

                </Row>
                <FormGroup className='text-end'>
                    <Button variant="primary" type='submit' disabled={loading}>
                        {loading ? "Loading" : "Save"}
                    </Button>
                </FormGroup>
                {
                    qrcode && <div className='text-center'>
                        <div><img src={qrcode} /></div>
                        <Button href={qrcode} download={`${values.product_code}.png`} >DownLoad</Button>
                    </div>
                }
            </Form>
        </div>
    </div>
}
const formSchema = yup.object().shape({
    product_name: yup.string().required("Name is required"),
    product_type: yup.string().required("Type is required"),
    product_code: yup.string().required("Code is required"),
    product_production_date: yup.string().required("Production date is required"),
    product_exp_date: yup.string().required("Expiry date is required")
})
export default AddProductPage;