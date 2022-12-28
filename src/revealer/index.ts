import { PublicKey } from "@solana/web3.js";
import { connection, program } from "config";
import bs58 from "bs58";

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
      let unprocessedPDAs = connection.getProgramAccounts(program, {
        filters: [filter],
      });

      console.log("Unprocessed PDAs", unprocessedPDAs);
    } catch (error) {
      console.log("Error Fetching not revealed accounts", error);
    }
  }
}

export { fetchNotRevealed };
