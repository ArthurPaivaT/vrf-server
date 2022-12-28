import { Request, Response } from "express";
import { Connection, PublicKey, Keypair } from "@solana/web3.js";

import bs58 from "bs58";

class ResultController {
  async getResult(request: Request, response: Response) {
    const address = request.params.address;
    try {
      const privateKeyPair = Keypair.fromSecretKey(
        bs58.decode(process.env.PK as string)
      );

      // verify if there is a pda with that address

      // combine with address to get the resulting value
    } catch (e) {
      return response.status(500).send();
    }
  }
}

export default new ResultController();
