const Blockfrost = require("@blockfrost/blockfrost-js");
// import { BlockFrostAPI } from '@blockfrost/blockfrost-js'; // using import syntax

const API = new Blockfrost.BlockFrostAPI({
    projectId: "preprodVj1nH4PXSxgTInfCMPxjchzFvSWky6np", // see: https://blockfrost.io
});

async function runExample() {
    try {
        const latestBlock = await API.blocksLatest();
        const networkInfo = await API.network();
        const latestEpoch = await API.epochsLatest();
        const health = await API.health();
        const address = await API.addresses(
            "addr_test1qptkhyt0dcverk37dfr8vnn6lg8ccuvp6dt535ahzl99kdz422l6jknk097n8ry7c40r7cuashjrysugj34twmydk4as4kz0s4"
        );
        const pools = await API.pools({ page: 1, count: 10, order: "asc" });

        console.log("pools", pools);
        console.log("address", address);
        console.log("networkInfo", networkInfo);
        console.log("latestEpoch", latestEpoch);
        console.log("latestBlock", latestBlock);
        console.log("health", health);
    } catch (err) {
        console.log("error", err);
    }
}

