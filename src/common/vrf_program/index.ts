import * as anchor from "@project-serum/anchor";
import { Connection, Keypair, PublicKey, SystemProgram } from "@solana/web3.js";

import { AnchorProvider, BN, Idl, Program } from "@project-serum/anchor";
import { NodeWallet } from "@metaplex/js";

import { idl } from "../idl/index";
import { connection, keypair, programId } from "config";
import { stringifyPKsAndBNs } from "utils";

// const connection = new Connection("https://api.devnet.solana.com", "confirmed");

const program = new Program(
  idl as Idl,
  programId,
  new AnchorProvider(connection, new NodeWallet(Keypair.generate()), {
    commitment: "confirmed",
  })
);

export async function getPDAInfo(pda: PublicKey) {
  let state = await program.account.randomValue.fetch(pda);
  state = stringifyPKsAndBNs(state);
  return state;
}

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

export async function getRevealInstruction(pda: PublicKey, result: BigInt) {
  const instruction = await program.methods
    .reveal(new BN(result.toString()))
    .accounts({
      randomValue: pda,
      revealer: keypair.publicKey,
      systemProgram: SystemProgram.programId,
    })
    .instruction();

  return instruction;
}
