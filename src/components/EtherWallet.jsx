import { mnemonicToSeedSync } from 'bip39'
import { Wallet } from 'ethers';
import { HDNodeWallet } from 'ethers';
import React, { useState } from 'react'

const EtherWallet = ({mnemonic}) => {
    const [currentIndex,setCurrentIndex] = useState(0);
    const [publicKeys,setPublicKeys] = useState([]);

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

    
  return (
    <div>
        <h1>ETH wallet</h1>
        <button onClick={handleGenerateETHWallet}>Generate ETH wallet +</button>
        <div>
            {
                publicKeys.map((p,index)=>(<div key={index}>Eth - {p}</div>))
            }
        </div>

    </div>
  )
}

export default EtherWallet