import React, { useEffect, useState } from 'react';
import { WALLETCONTEXT } from '../context/walletContext';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
const ProductShipingHistory = () => {
    const { getProductShipingHistory } = WALLETCONTEXT();
    const { p_code } = useParams();
    const [sHistory, setsHistory] = useState([]);
    useEffect(() => {
        get();
    }, []);
    const get = async () => {
        try {
            const result = await getProductShipingHistory(p_code);
            console.log(result);
            setsHistory(result);
        } catch (error) {
            toast.error(error.message)
        }
    }
    const onNewScanResult = (decodedText, decodedResult) => {
        // Handle the result here.
    }
    return <>
    <div style={{marginTop:'230px', paddingTop:'-2000px'}}>
        <h5>Product Shipping History of {p_code.toUpperCase()}</h5>
        <div>
            <span>Factory</span>
            {sHistory.map((item, index) => (
                <span key={index}>
                    <span> --&gt;  </span>
                    <span >{item.next_ship_id.shipment_country.toUpperCase()}</span> <span>, </span>
                    <span >{item.next_ship_id.shipment_address.toUpperCase()}</span>    
                    {/* <span >{item.next_ship_id.shipment_name.toUpperCase()}</span> */}
                    {/* <span >{item.next_ship_id.receiving_date.toUpperCase()}</span>  */}
                </span>
            ))}
        </div>
     </div>
    </>
}
export default ProductShipingHistory;
