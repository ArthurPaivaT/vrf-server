# Solana VRF Server

This repository contains the source code to a pseudorandom number generator. It works as a random oracle for Solana
and works together with [Vrf-Program](https://github.com/ArthurPaivaT/vrf-program). Whenever a new number is requested
from the vrf_program contract in the blockchain, this server generates a pseudorandom number and sends it back to the blockchain,
to be used in on-chain operations.

## Setting up your environment

In order to run the pseudorandom number generator server, you will need to [install node and npm](https://docs.npmjs.com/ownloading-and-installing-node-js-and-npm).

You will also need to create a `.env` file in the root of your directory containing the private key of the vrf-program admin wallet,
an url to a network provider and the address of the vrf-program.

```
PK=<admin-private-key>
PROGRAM=<program-address
RPC_URL=<rpc-url>
```

## Running Locally

After setting up your .env file, run:

    npm dev

Your server will be running and sending transactions to the network with the pseudorandom results.

## License

MIT
