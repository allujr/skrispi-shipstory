import indexAbi from './abis/index.json';

import moment from 'moment';

export const truncateAddress = (address) => {
    if (!address) return "No Account";
    const match = address.match(
        /^(0x[a-zA-Z0-9]{2})[a-zA-Z0-9]+([a-zA-Z0-9]{2})$/
    );
    if (!match) return address;
    return `${match[1]}…${match[2]}`;
};



export const index_contract_abi = indexAbi;
export const index_contract_address = "0xD7D411254Ace1a64DD94b7a4B0d1b0168EBA36DC";

//0x2cCF33b6Ff24620AbCbd103986F54D9243dA41bc
//0xD7D411254Ace1a64DD94b7a4B0d1b0168EBA36DC


// export const chainIds = [80001];
export const chainIds = [137, 10];


