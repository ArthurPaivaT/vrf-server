import { Connection, PublicKey } from "@solana/web3.js";

const connection = new Connection(
  process.env.RPC_URL || "https://api.devnet.solana.com",
  "confirmed"
);

const program = new PublicKey(process.env.PK as string);

export { connection, program };
