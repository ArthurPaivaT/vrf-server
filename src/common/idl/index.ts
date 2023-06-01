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
          type: "u32",
        },
        {
          name: "max",
          type: "u32",
        },
      ],
    },
    {
      name: "reveal",
      accounts: [
        {
          name: "randomValue",
          isMut: true,
          isSigner: false,
        },
        {
          name: "revealer",
          isMut: true,
          isSigner: true,
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
          type: "u32",
        },
      ],
    },
    {
      name: "recommit",
      accounts: [
        {
          name: "randomValue",
          isMut: true,
          isSigner: false,
        },
        {
          name: "user",
          isMut: true,
          isSigner: true,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [],
    },
  ],
  accounts: [
    {
      name: "RandomValue",
      type: {
        kind: "struct",
        fields: [
          {
            name: "min",
            type: "u32",
          },
          {
            name: "max",
            type: "u32",
          },
          {
            name: "result",
            type: "u32",
          },
          {
            name: "processed",
            type: "bool",
          },
          {
            name: "commits",
            type: "u32",
          },
        ],
      },
    },
  ],
  errors: [
    {
      code: 6000,
      name: "NotRevealedYet",
      msg: "Random Value not revealed yet",
    },
  ],
  metadata: {
    address: "8xZUNqKPrgs6sQ3YE1dvT5rcmUvBWkGFyCB6UaJinBeG",
  },
};
