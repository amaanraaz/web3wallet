let url;
let data;

export async function getBalance(id,chain,walletId){
    if(chain==='eth'){
        console.log('eth');
        url = 'https://eth-mainnet.g.alchemy.com/v2/' + import.meta.env.VITE_ALCHEMY_API_KEY;
        data = {
            "jsonrpc": "2.0",
            "id": id,
            "method": "eth_getBalance",
            "params": ['0xaeaa570b50ad00377ff8add27c50a7667c8f1811', "latest"]
            // "params": [walletId, "latest"]
        }
        
    }
    else{
        url = 'https://solana-mainnet.g.alchemy.com/v2/' + import.meta.env.VITE_ALCHEMY_API_KEY;
        data = {
            "jsonrpc": "2.0",
            "id": id,
            "method": "getBalance",
            "params": [walletId]
            // "params": ['Eg4F6LW8DD3SvFLLigYJBFvRnXSBiLZYYJ3KEePDL95Q']
        }
    }
    try {
        console.log(url,data);
        const response = await fetch(url,{
            method: 'POST',
            headers:{
                'Content-Type': 'application/json',
            },
            body:JSON.stringify(data)
        });
        if(response.ok){
            const responseData = await response.json();
            return responseData;
        }
        else{
            console.error("Failed fetch with status:", response.status);
            return null; 
        }
    } catch (error) {
        console.error('Error making API call:', error);
        return null;
    }
}