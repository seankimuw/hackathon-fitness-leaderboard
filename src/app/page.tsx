'use client'

import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useAccount, useConnect, useDisconnect, useReadContract, useWriteContract } from 'wagmi'


const abi =[
  {
    "compiler": {
        "version": "0.8.26+commit.8a97fa7a"
    },
    "language": "Solidity",
    "output": {
        "abi": [
            {
                "inputs": [],
                "name": "register",
                "outputs": [],
                "stateMutability": "payable",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "retrieve",
                "outputs": [
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "retrieveUser",
                "outputs": [
                    {
                        "internalType": "address",
                        "name": "",
                        "type": "address"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "uint256",
                        "name": "num",
                        "type": "uint256"
                    }
                ],
                "name": "store",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            }
        ],
        "devdoc": {
            "custom:dev-run-script": "./scripts/deploy_with_ethers.ts",
            "details": "Store & retrieve value in a variable",
            "kind": "dev",
            "methods": {
                "retrieve()": {
                    "details": "Return value ",
                    "returns": {
                        "_0": "value of 'number'"
                    }
                },
                "store(uint256)": {
                    "details": "Store value in variable",
                    "params": {
                        "num": "value to store"
                    }
                }
            },
            "title": "Storage",
            "version": 1
        },
        "userdoc": {
            "kind": "user",
            "methods": {},
            "version": 1
        }
    },
    "settings": {
        "compilationTarget": {
            "contracts/1_Storage.sol": "Storage"
        },
        "evmVersion": "cancun",
        "libraries": {},
        "metadata": {
            "bytecodeHash": "ipfs"
        },
        "optimizer": {
            "enabled": false,
            "runs": 200
        },
        "remappings": []
    },
    "sources": {
        "contracts/1_Storage.sol": {
            "keccak256": "0xc518c2b1fc78b1551f6dbc945ca68e1b91611fb687bffa1ba24e5720ac896e97",
            "license": "None",
            "urls": [
                "bzz-raw://8a83a6d2f2dc99acc1d6a9ab360ac28f6e4ef5cbc8f737e549b1db9853d6af1d",
                "dweb:/ipfs/QmZEfh3AZ2mgNgdx73HW1Fhg3reowBnKFhMfGDkKe5dhSe"
            ]
        }
    },
    "version": 1
}
];
const CONTRACT_ID="0x8078Fb8bDF7177CeC68E52fF86cd1c5B40494316";

function App() {
  const account = useAccount()
  const { connectors, connect, status, error } = useConnect()
  const { disconnect } = useDisconnect()
  const result = useReadContract({
    abi,
    address: CONTRACT_ID,
    functionName: 'register',
  });
  const { writeContract } = useWriteContract()
  console.log("result: ", result);

  return (
    <>
      <div>
        <h2>Account</h2>

        <div>
          status: {account.status}
          <br />
          addresses: {JSON.stringify(account.addresses)}
          <br />
          chainId: {account.chainId}
        </div>

        {account.status === 'connected' && (
          <button type="button" onClick={() => disconnect()}>
            Disconnect
          </button>
        )}
      </div>

      <ConnectButton />
      <div>
        <h2>Connect</h2>
        {connectors.map((connector) => (
          <button
            key={connector.uid}
            onClick={() => connect({ connector })}
            type="button"
          >
            {connector.name}
          </button>
        ))}
        <div>{status}</div>
        <div>{error?.message}</div>
      </div>

      <button 
        onClick={() => 
          writeContract({ 
            abi,
            address: CONTRACT_ID,
            functionName: 'register',
            args: [],
        })
      }
    >
      Register
    </button>
    <button 
        onClick={() => 
          writeContract({ 
            abi,
            address: CONTRACT_ID,
            functionName: 'retrieve',
            args: [],
        })
      }
    >
      Retrieve
    </button>
    </>
  )
}

export default App
