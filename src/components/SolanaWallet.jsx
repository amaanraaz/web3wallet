import { Keypair } from '@solana/web3.js';
import { mnemonicToSeedSync } from 'bip39'
import { derivePath } from 'ed25519-hd-key';
import React, { useState } from 'react'
import nacl from 'tweetnacl';

export const SolanaWallet = ({mnemonic}) => {
    const [currentIndex,setCurrentIndex] = useState(0);
    const [publicKeys,setPublicKeys] = useState([]);
    
    // generating sol wallet
    const handleGenerateSolanaWallet = async()=>{
        const seed = mnemonicToSeedSync(mnemonic);
        const path = `m/44'/501'/${currentIndex}'/0'`;
        const derivedSeed = derivePath(path,seed.toString('hex')).key;
        const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
        const keyPair = Keypair.fromSecretKey(secret);
        setCurrentIndex(currentIndex+1);
        setPublicKeys([...publicKeys,keyPair.publicKey]);
        console.log(keyPair);
    }


  return (
    <div>
        <h1>Solana Wallet</h1>
        <button onClick={handleGenerateSolanaWallet}>Generate new wallet +</button>
        <div>
            {
                publicKeys.map((p,index)=>(<div key={index}>{p.toBase58()}</div>))
            }
        </div>
    </div>
  )
}
