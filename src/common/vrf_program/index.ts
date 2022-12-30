import * as anchor from "@project-serum/anchor";
import { Connection, Keypair, PublicKey, SystemProgram } from "@solana/web3.js";

import { AnchorProvider, BN, Idl, Program } from "@project-serum/anchor";
import { NodeWallet } from "@metaplex/js";

import { idl } from "../idl/index";

const connection = new Connection(
  process.env.RPC_URL || "https://api.devnet.solana.com",
  "confirmed"
);

const programId = new PublicKey("D6PrgNa8BAfgZdRMKVDUmYB7EJUGwcckQ4yYyEun21WJ");

const program = new Program(
  idl as Idl,
  programId,
  new AnchorProvider(connection, new NodeWallet(Keypair.generate()), {
    commitment: "confirmed",
  })
);

export async function getCommitInstruction(min: number, max: number) {
  const pda = Keypair.generate();

  const instruction = await program.methods
    .commit(new BN(min), new BN(max))
    .accounts({
      random_value: pda.publicKey,
      system_program: SystemProgram.programId,
    })
    .signers([pda])
    .instruction();

  return instruction;
}

export async function getRevealInstruction(pda: PublicKey, result: number) {
  const instruction = await program.methods
    .reveal(new BN(result))
    .accounts({
      random_value: pda,
      system_program: SystemProgram.programId,
    })
    .instruction();

  return instruction;
}
