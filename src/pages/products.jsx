import React, { useEffect, useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import { WALLETCONTEXT } from '../context/walletContext';
import { toast } from 'react-toastify';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
const Products = () => {
    const [products, setProducts] = useState([]);
    const { getProducts, currentAccount } = WALLETCONTEXT();
    const navigate = useNavigate();

    useEffect(() => {
        if (currentAccount) {
            get();
        }
    }, [currentAccount]);
    const get = async () => {
        try {
            const result = await getProducts();
            setProducts(result);
        } catch (error) {
            toast.error(error)
        }
    }

    const navigateToHistory = (p_code) => {
        navigate(`/product/shiping/history/${p_code}`);
    }

    return (
        <div>
            {
                currentAccount && <div  className='mb-3'>
                    <Button onClick={()=>navigate('/addProduct')}>Add Product</Button>
                </div>
            }
            <Table style={{backgroundColor:'gray'}} striped bordered hover>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Type</th>
                        <th>Code</th>
                        <th>Prod_date</th>
                        <th>Exp_date</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        products.map((item, index) => (
                            <tr key={index} onClick={() => navigateToHistory(item.product_code)}>
                                <td>{index + 1}</td>
                                <td>{item.product_name}</td>
                                <td>{item.product_type}</td>
                                <td>{item.product_code}</td>
                                <td>{moment(Number(String(item.product_production_date))).format("YYYY-MM-DD")}</td>
                                <td>{moment(Number(String(item.product_production_date))).format("YYYY-MM-DD")}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </Table>
           
        </div>
    )
}

export default Products;