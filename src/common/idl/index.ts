export const idl = {
  version: "0.1.0",
  name: "vrf_program",
  instructions: [
    {
      name: "initialize",
      accounts: [],
      args: [],
    },
    {
      name: "commit",
      accounts: [
        {
          name: "randomValue",
          isMut: true,
          isSigner: true,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "user",
          isMut: true,
          isSigner: true,
        },
      ],
      args: [
        {
          name: "min",
          type: "u64",
        },
        {
          name: "max",
          type: "u64",
        },
      ],
    },
    {
      name: "reveal",
      accounts: [
        {
          name: "randomValue",
          isMut: false,
          isSigner: false,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "result",
          type: "u64",
        },
      ],
    },
  ],
  accounts: [
    {
      name: "RandomValue",
      docs: ["stores info with min/max and after result after being processed"],
      type: {
        kind: "struct",
        fields: [
          {
            name: "min",
            type: "u64",
          },
          {
            name: "max",
            type: "u64",
          },
          {
            name: "result",
            type: "u64",
          },
          {
            name: "processed",
            type: "bool",
          },
        ],
      },
    },
  ],
  errors: [
    {
      code: 6000,
      name: "WinnerNotValid",
      msg: "User doesn't have tickets",
    },
  ],
};
