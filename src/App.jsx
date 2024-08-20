import { useState } from 'react'
import {generateMnemonic,mnemonicToSeedSync} from 'bip39'
import { SolanaWallet } from './components/SolanaWallet';
import EtherWallet from './components/EtherWallet';


function App() {
  const [mnemonic, setMnemonic] = useState("");

  const handleGenerateMnemonic = async() => {
    const phrase = await generateMnemonic();
    setMnemonic(phrase);
  }


  return (
    <>
     <h1> Welcome!!! </h1>
     <button onClick={handleGenerateMnemonic}>Generate phrase</button>
     <div>
      {mnemonic}
     </div>
     <div>
      <SolanaWallet mnemonic={mnemonic}/>
      <EtherWallet mnemonic={mnemonic}/>
     </div>
    </>
  )
}

export default App
