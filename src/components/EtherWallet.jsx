import { mnemonicToSeedSync } from 'bip39'
import { Wallet } from 'ethers';
import { HDNodeWallet } from 'ethers';
import React, { useState } from 'react'
import { getBalance } from '../utils/getBalance';

const EtherWallet = ({mnemonic}) => {
    const [currentIndex,setCurrentIndex] = useState(0);
    const [publicKeys,setPublicKeys] = useState([]);
    const [balance,setBalance] = useState(-1);

    // genrating eth wallet
    const handleGenerateETHWallet = async()=>{
        const seed = mnemonicToSeedSync(mnemonic);
        const derivationPath = `m/44'/60'/${currentIndex}/0'`;
        const hdNode = HDNodeWallet.fromSeed(seed);
        const child  = hdNode.derivePath(derivationPath);
        const privateKey = child.privateKey;
        const wallet = new Wallet(privateKey);
        setCurrentIndex(currentIndex+1);
        setPublicKeys([...publicKeys,wallet.address]);
    }
    const handleButtonClick = async(key)=>{
        const res = await getBalance(currentIndex,"eth",key);
        console.log(res);
        setBalance(res.result);
    }

    
  return (
    <div>
        <h1 className='font-extrabold'>ETH wallet</h1>
        <button onClick={handleGenerateETHWallet}>Generate ETH wallet +</button>
        <div>
            {
                publicKeys.map((p,index)=>(<div key={index}>
                    <p>Eth - {p}</p>
                    <h1 className='text-red-600' onClick={()=>handleButtonClick(p)}>get Balance</h1>
                    {
                        balance>=0?<h1>{balance}</h1>:''
                    }
                </div>))
            }
        </div>

    </div>
  )
}

export default EtherWallet