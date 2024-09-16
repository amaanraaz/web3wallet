import { Keypair } from '@solana/web3.js';
import { mnemonicToSeedSync } from 'bip39'
import { derivePath } from 'ed25519-hd-key';
import React, { useState } from 'react'
import nacl from 'tweetnacl';
import {getBalance} from '../utils/getBalance';

export const SolanaWallet = ({mnemonic}) => {
    const [currentIndex,setCurrentIndex] = useState(0);
    const [publicKeys,setPublicKeys] = useState([]);
    const [balance,setBalance] = useState(-1);
    
    // generating sol wallet
    const handleGenerateSolanaWallet = async()=>{
        const seed = mnemonicToSeedSync(mnemonic);
        const path = `m/44'/501'/${currentIndex}'/0'`;
        const derivedSeed = derivePath(path,seed.toString('hex')).key;
        const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
        const keyPair = Keypair.fromSecretKey(secret);
        setCurrentIndex(currentIndex+1);
        setPublicKeys([...publicKeys,keyPair.publicKey]);
    }

    const handleButtonClick = async(key)=>{
        const res = await getBalance(currentIndex,"sol",key);
        setBalance(res.result.value);
    }


  return (
    <div>
        <h1 className='font-extrabold'>Solana Wallet</h1>
        <button onClick={handleGenerateSolanaWallet}>Generate new wallet +</button>
        <div>
            {
                publicKeys.map((p,index)=>(<div key={index}>
                    <p>SOL - {p.toBase58()}</p>
                    <h1 className='text-red-700' onClick={()=>handleButtonClick(p.toBase58())} >get Balance</h1>
                    {
                        balance>=0?<h1>{balance}</h1>:''
                    }
                </div>))
            }
        </div>
    </div>
  )
}
