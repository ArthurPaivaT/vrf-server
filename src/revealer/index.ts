import { PublicKey, Transaction } from "@solana/web3.js";
import { connection, keypair, programId } from "config";
import bs58 from "bs58";
import { getRevealInstruction } from "common/vrf_program";
const crypto = require("crypto");

async function fetchNotRevealed() {
  while (1) {
    await new Promise((r) => setTimeout(r, 5000)); //Routine every 5 seconds

    let filter = {
      memcmp: {
        offset: 32,
        bytes: bs58.encode([0]),
      },
    };

    try {
      let unprocessedPDAs = await connection.getProgramAccounts(programId, {
        filters: [filter],
      });

      for (const pda of unprocessedPDAs) {
        const result = generate(keypair.secretKey, pda.pubkey.toBytes());
        console.log("Result is", result.toString());
        const signature = await reveal(pda.pubkey, result % BigInt(100));
        console.log("signature", signature);
      }
    } catch (error) {
      console.log("Error Fetching not revealed accounts", error);
    }
  }
}

async function reveal(pda: PublicKey, result: BigInt) {
  console.log("Revealing", pda.toString(), "with result:", result.toString());

  const instruction = await getRevealInstruction(pda, result);

  const transaction = new Transaction().add(instruction);
  transaction.feePayer = keypair.publicKey;
  transaction.recentBlockhash = await (
    await connection.getLatestBlockhash()
  ).blockhash;

  transaction.partialSign(keypair);

  const txBuffer = transaction.serialize({
    requireAllSignatures: true,
    verifySignatures: true,
  });

  const signature = await connection.sendRawTransaction(txBuffer, {});

  return signature;
}

18446744073709551615;

function generate(data1: Uint8Array, data2: Uint8Array) {
  // Initialize the PRNG with data1 as the seed
  let state = new Uint32Array(4);
  for (let i = 0; i < 4; i++) {
    state[i] =
      data1[i * 4] |
      (data1[i * 4 + 1] << 8) |
      (data1[i * 4 + 2] << 16) |
      (data1[i * 4 + 3] << 24);
  }

  // Generate a 64-bit random number
  let r = BigInt(xoroshiro1024(state));

  // XOR the random number with data2, treated as a 64-bit integer
  let data2Int =
    BigInt(data2[0]) |
    (BigInt(data2[1]) << BigInt(8)) |
    (BigInt(data2[2]) << BigInt(16)) |
    (BigInt(data2[3]) << BigInt(24)) |
    (BigInt(data2[4]) << BigInt(32)) |
    (BigInt(data2[5]) << BigInt(40)) |
    (BigInt(data2[6]) << BigInt(48)) |
    (BigInt(data2[7]) << BigInt(56));
  return r ^ data2Int;
}

function xoroshiro1024(state: Uint32Array) {
  let s0 = state[0];
  let s1 = state[1];
  let s2 = state[2];
  let s3 = state[3];

  let result = (s0 + s3) >>> 0;
  let t = (s1 << 9) | (s3 >>> 23);
  s2 ^= s0;
  s3 ^= s1;
  s1 ^= s2;
  s0 ^= s3;
  s2 ^= t;
  s3 = (s3 << 19) | (s0 >>> 13);

  state[0] = s0;
  state[1] = s1;
  state[2] = s2;
  state[3] = s3;

  return result;
}

export { fetchNotRevealed };
