require("dotenv").config();
const axios = require("axios");
const ethers = require("ethers");
const { Web3 } = require("web3");
const { swapEventAbi, burnEventAbi, mintEventAbi } = require("./eventAbis");
var web3 = new Web3();

const API_KEY = `https://mainnet.infura.io/v3/${process.env.API_KEY}`;

const jsonRpcRequest = {
  jsonrpc: "2.0",
  method: "eth_getLogs",
  params: [
    {
      fromBlock: "0x1115678",
      toBlock: "0x1115853",
      address: [
        "0xcbcdf9626bc03e24f779434178a73a0b4bad62ed", // WBTC - ETH (uniswap v3)
        "0x88e6A0c2dDD26FEEb64F039a2c41296FcB3f5640", // USDC - ETH (uniswap v3)
      ],
      topics: [
        [
          "0xc42079f94a6350d7e6235f29174924f928cc2ac818eb64fed8004e115fbcca67", // Swap
          "0x7a53080ba414158be7ec69b987b5fb7d07dee101fe85488f0853ae16239d0bde", // Mint
          "0x0c396cd989a39f4459b5fa1aed6a9a8dcdbc45908acfd67e028cd568da98982c", // Burn
        ],
      ],
    },
  ],
  id: 1,
};

axios
  .post(API_KEY, jsonRpcRequest)
  .then((response) => {
    console.log("Response:", response.data);

    // Decode events
    response.data.result.forEach((log) => {
      const eventTopics = log.topics;
      const eventData = log.data;

      let eventAbi = null;
      if (
        eventTopics[0] ===
        "0xc42079f94a6350d7e6235f29174924f928cc2ac818eb64fed8004e115fbcca67"
      ) {
        eventAbi = swapEventAbi;
      } else if (
        eventTopics[0] ===
        "0x7a53080ba414158be7ec69b987b5fb7d07dee101fe85488f0853ae16239d0bde"
      ) {
        eventAbi = mintEventAbi;
      } else if (
        eventTopics[0] ===
        "0x0c396cd989a39f4459b5fa1aed6a9a8dcdbc45908acfd67e028cd568da98982c"
      ) {
        eventAbi = burnEventAbi;
      }

      if (eventAbi) {
        const decoded = web3.eth.abi.decodeLog(
          eventAbi,
          eventData,
          eventTopics
        );
        console.log("Decoded Event Data:", decoded);
      } else {
        console.log("Unknown event type.");
      }
    });
  })
  .catch((error) => {
    console.error("Error:", error.message);
  });
