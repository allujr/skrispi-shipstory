import React, { useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { WALLETCONTEXT } from '../context/walletContext';
import { truncateAddress } from '../utils';

const Connection = () => {
    const { connectWallet, checkIfWalletConnected, currentAccount } = WALLETCONTEXT();
    useEffect(() => {
        checkIfWalletConnected();
    }, []);
    return <>
        <div className='mb-3 text-end'>
            {
                currentAccount ? truncateAddress(currentAccount) : <Button onClick={connectWallet}>Connect</Button>
            }
        </div>
    </>
};

export default Connection;