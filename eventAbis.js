// Event ABI for Swap event
const swapEventAbi = [
  {
    type: "address",
    name: "sender",
    indexed: true,
  },
  {
    type: "address",
    name: "recipient",
    indexed: true,
  },
  {
    type: "int256",
    name: "amount0",
  },
  {
    type: "int256",
    name: "amount1",
  },
  {
    type: "uint160",
    name: "sqrtPriceX96",
  },
  {
    type: "uint128",
    name: "liquidity",
  },
  {
    type: "int24",
    name: "tick",
  },
];

// Event ABI for Burn event
const burnEventAbi = [
  {
    type: "address",
    name: "owner",
    indexed: true,
  },
  {
    type: "int24",
    name: "tickLower",
    indexed: true,
  },
  {
    type: "int24",
    name: "tickUpper",
    indexed: true,
  },
  {
    type: "uint128",
    name: "amount",
    indexed: false,
  },
  {
    type: "uint256",
    name: "amount0",
    indexed: false,
  },
  {
    type: "uint256",
    name: "amount1",
    indexed: false,
  },
];

// Event ABI for Mint event
const mintEventAbi = [
  {
    type: "address",
    name: "sender",
    indexed: false,
  },
  {
    type: "address",
    name: "owner",
    indexed: true,
  },
  {
    type: "int24",
    name: "tickLower",
    indexed: true,
  },
  {
    type: "int24",
    name: "tickUpper",
    indexed: true,
  },
  {
    type: "uint128",
    name: "amount",
    indexed: false,
  },
  {
    type: "uint256",
    name: "amount0",
    indexed: false,
  },
  {
    type: "uint256",
    name: "amount1",
    indexed: false,
  },
];

module.exports = {
  swapEventAbi,
  burnEventAbi,
  mintEventAbi,
};
