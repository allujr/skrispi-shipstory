import React, { createContext, useContext, useState } from 'react';
import { ethers } from 'ethers';
import { toast } from 'react-toastify';
import {
    index_contract_abi,
    index_contract_address
} from '../utils/index';
const WalletContext = createContext({});
const { ethereum } = window;
export const WalletProvider = ({ children }) => {
    const [currentAccount, setCurrentAccount] = useState('');
    if (ethereum) {
        ethereum.on("accountsChanged", (accounts) => {
            setCurrentAccount(accounts[0]);
        });
        ethereum.on("chainChanged", () => {
            window.location.reload();
        });
    }
    const getProvider = () => {
        const provider = new ethers.providers.Web3Provider(ethereum);
        return provider;
    }
    const getContract = () => {
        const provider = getProvider();
        const signer = provider.getSigner();
        const contract = new ethers.Contract(index_contract_address, index_contract_abi, signer);
        return contract;
    }
    const checkIfWalletConnected = async () => {
        try {
            if (!ethereum) {
                return toast.error("Please Install MetaMask")
            }
            // if (checkChainId()) return;
            const accounts = await ethereum.request({ method: 'eth_accounts' });
            // console.log(ethereum.networkVersion);
            if (!checkChainId()) {
                if (accounts.length) {
                    setCurrentAccount(accounts[0]);
                } else {
                    console.log('No Account Found!')
                }
            }
        } catch (error) {
            toast.error('no ethereum object.');
        }
    }
    const connectWallet = async () => {
        try {
            if (!ethereum) {
                return toast.error("Please Install MetaMask")
            }
            if (checkChainId()) return;
            const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
            setCurrentAccount(accounts[0]);
        } catch (error) {
            toast.error('no ethereum object.');
        }

    }
    const checkChainId = () => {
        if (ethereum.networkVersion != "5") {
            toast.error('Unsupported Chain Id Error!');
            return true;
        } else {
            return false;
        }
    }
    const getProducts = async () => {
        try {
            const contract = getContract();
            const result = await contract.getProducts();
            return result;
        } catch (error) {
            toast.error('no ethereum object.');
        }
    }
    const AddProduct = async ({ product_name, product_type, product_code, product_production_date, product_exp_date }) => {
        try {
            const contract = getContract();
            const result = await contract.AddProduct(
                product_name,
                product_type,
                product_code,
                product_production_date,
                product_exp_date
            );
            await result.wait();
            return true;
        } catch (error) {
            throw new Error(error);
        }

    }
    const getShipments = async () => {
        try {
            const contract = getContract();
            const result = await contract.getShipments();
            return result;
        } catch (error) {
            toast.error('no ethereum object.');
        }
    }
    const AddShipment = async ({ shipment_name, shipment_country, shipment_address, sending_date, receiving_date }) => {
        try {
            const contract = getContract();
            const result = await contract.AddShipment(
                shipment_name,
                shipment_country,
                shipment_address,
                sending_date,
                receiving_date
            );
            await result.wait();
            return true;
        } catch (error) {
            throw new Error(error);
        }
    }
    const getProductShipingHistory = async (p_code) => {
        try {
            const contract = getContract();
            const result = await contract.getProductShipmentHistory(p_code);
            return result;
        } catch (error) {
            toast.error('no ethereum object.');
        }
    }
    const addProductToTraceShipment = async ({ product_code, shipment_id }) => {
        try {
            const contract = getContract();
            const result = await contract.ProductForShipment(shipment_id,product_code);
            await result.wait();
            return true;
        } catch (error) {
            toast.error(error);
        }
    }
    return (
        <WalletContext.Provider value={{
            connectWallet,
            checkIfWalletConnected,
            currentAccount,
            getProducts,
            AddProduct,
            AddShipment,
            getShipments,
            getProductShipingHistory,
            addProductToTraceShipment
        }}>
            {children}
        </WalletContext.Provider>
    )
}

export const WALLETCONTEXT = () => useContext(WalletContext);