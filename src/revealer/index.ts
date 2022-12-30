import { PublicKey, Transaction } from "@solana/web3.js";
import { connection, keypair, program } from "config";
import bs58 from "bs58";
import { getRevealInstruction } from "common/vrf_program";

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
      let unprocessedPDAs = await connection.getProgramAccounts(program, {
        filters: [filter],
      });

      for (const pda of unprocessedPDAs) {
        const signature = await reveal(pda.pubkey);
        console.log("signature", signature);
      }

      console.log("Unprocessed PDAs", unprocessedPDAs);
    } catch (error) {
      console.log("Error Fetching not revealed accounts", error);
    }
  }
}

async function reveal(pda: PublicKey) {
  const result = 14;

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

  console.log("PDA", pda.toString(), "result is", result);

  const signature = await connection.sendRawTransaction(txBuffer, {});

  return signature;
}

export { fetchNotRevealed };
