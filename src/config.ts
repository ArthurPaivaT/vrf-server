import { bs58 } from "@project-serum/anchor/dist/cjs/utils/bytes";
import { Connection, PublicKey, Keypair } from "@solana/web3.js";

const connection = new Connection(process.env.RPC_URL as string, "confirmed");

const programId = new PublicKey(process.env.PROGRAM as string);
const keypair = Keypair.fromSecretKey(
  new Uint8Array(bs58.decode(process.env.PK as string))
);

export { connection, programId, keypair };
