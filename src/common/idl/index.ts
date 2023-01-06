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
  ],
  accounts: [
    {
      name: "RandomValue",
      docs: [
        "whitelists are used to control what gems can/can't go into the vault",
        "currently 2 types of vault lists are supported: by mint and by creator",
        "if the whitelist PDA exists, then the mint/creator is considered accepted",
        "if at least 1 whitelist PDA exists total, then all deposit attempts will start getting checked",
      ],
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
  metadata: {
    address: "8xZUNqKPrgs6sQ3YE1dvT5rcmUvBWkGFyCB6UaJinBeG",
  },
};
