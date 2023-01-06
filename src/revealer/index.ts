import { PublicKey, Transaction } from "@solana/web3.js";
import { connection, keypair, programId } from "config";
import bs58 from "bs58";
import { getPDAInfo, getRevealInstruction } from "common/vrf_program";
import MT19937 from "mersenne-twister";

import crypto from "crypto";

async function fetchNotRevealed() {
  while (1) {
    await new Promise((r) => setTimeout(r, 5000)); //Routine every 5 seconds
    console.log("\nRefetching");

    let filter = {
      memcmp: {
        offset: 20,
        bytes: bs58.encode([0]),
      },
    };

    try {
      let unprocessedPDAs = await connection.getProgramAccounts(programId, {
        filters: [filter],
      });

      for (const pda of unprocessedPDAs) {
        await new Promise((r) => setTimeout(r, 1000)); // Wait 1 second between each PDA to be updated

        let state = (await getPDAInfo(pda.pubkey)) as any;
        console.log(state);

        const result = generate(keypair.secretKey, pda.pubkey.toBytes());
        const signature = await reveal(
          pda.pubkey,
          BigInt(Math.floor(result * (state.max + 1 - state.min) + state.min))
        );
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

function generate(data1: Uint8Array, data2: Uint8Array) {
  const seeds = new Uint8Array([...data1, ...data2]);

  let randomFloat = crypto
    .createHash("sha256")
    .update(Buffer.from(seeds))
    .digest();

  const seed = randomFloat.readUInt32BE(0);

  const rng = new MT19937(seed);

  return rng.random();
}

export { fetchNotRevealed };
