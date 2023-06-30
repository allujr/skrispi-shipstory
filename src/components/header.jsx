import React from 'react';
import MyImage from '../logo jovi.png';
const HeaderComponent = () => {
    return <div style={{display:'flex',paddingLeft:'0px', justifyContent:'left',backgroundColor : 'white', color: 'white'}} >
        <header style={{paddingLeft:'50px'}}  class="py-3 my-4 header">
            
            <img style={{width: '400px',marginTop:'-50px',marginRight:'-20px',marginBottom:'-50px'}} src={require('../logo jovi.png')} alt  ="logo" />
        </header>
    </div>
}

export default HeaderComponent;