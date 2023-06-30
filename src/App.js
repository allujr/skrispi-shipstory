import HeaderComponent from './components/header';

import NavbarComponent from './components/navbar';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Products from './pages/products';
import TraceProduct from './pages/traceProducts';
import Shipments from './pages/shipments';
import Connection from './components/connection';
import ProductShipingHistory from './pages/productShipingHIstory';
import AddProduct from './pages/addProduct';
import FooterComponent from './components/footer';

function App() {
  return (


    <div style={{display:'flex', marginRight:'0px', padding:'0', backgroundColor:'gray'}} className="App">
      <Router>
        
        <HeaderComponent/>
        <NavbarComponent />
        <Container className='py-2'>
          <Connection />
          <Routes>
            <Route path="/products" element={<Products />} />
            <Route path="/addProduct" element={<AddProduct />} />
            <Route path="/shipments" element={<Shipments />} />
            <Route path="/traceProduct" element={<TraceProduct />} />
            <Route path="/product/shiping/history/:p_code" element={<ProductShipingHistory />} />
            <Route path="*" element={<Navigate to="/products" replace />} />
          </Routes>
        </Container>
        <FooterComponent/>
      </Router>
    </div>

  );
}



export default App;

