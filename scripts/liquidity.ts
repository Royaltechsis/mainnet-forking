const { ethers } = require("hardhat");

const UNISWAP_V3_ROUTER = "0xE592427A0AEce92De3Edee1F18E0157C05861564"; // Uniswap V3 Router
const WETH = "0xC02aaa39b223FE8D0A0e5C4F27eaD9083C756Cc2"; // WETH contract on Ethereum
const DAI = "0x6B175474E89094C44Da98b954EedeAC495271d0F"; // DAI contract on Ethereum

async function main() {
    const [deployer] = await ethers.getSigners();
    console.log(`Using account: ${deployer.anpx hardhat run scripts/addLiquidity.js --network hardhat
    // Get contract instances
    const router = await ethers.getContractAt("ISwapRouter", UNISWAP_V3_ROUTER, deployer);
    const weth = await ethers.getContractAt("IERC20", WETH, deployer);
    const dai = await ethers.getContractAt("IERC20", DAI, deployer);

    // Impersonate a whale account (for testing purposes)
    const whale = "0x0000000000000000000000000000000000000000"; // Replace with real DAI/WETH whale
    await network.provider.request({ method: "hardhat_impersonateAccount", params: [whale] });

    const whaleSigner = await ethers.getSigner(whale);

    // Transfer tokens to our account
    const amountWETH = ethers.utils.parseEther("1");
    await weth.connect(whaleSigner).transfer(deployer.address, amountWETH);

    const amountDAI = ethers.utils.parseUnits("1000", 18);
    await dai.connect(whaleSigner).transfer(deployer.address, amountDAI);

    console.log("Tokens transferred!");

    // Approve Uniswap Router
    await weth.connect(deployer).approve(UNISWAP_V3_ROUTER, amountWETH);
    await dai.connect(deployer).approve(UNISWAP_V3_ROUTER, amountDAI);

    console.log("Tokens approved!");

    // Define pool parameters
    const poolFee = 3000; // 0.3% Fee Tier
    const minPrice = ethers.utils.parseUnits("990", 18); // Min price for WETH/DAI
    const maxPrice = ethers.utils.parseUnits("1010", 18); // Max price for WETH/DAI

    // Add liquidity
    const tx = await router.addLiquidity(
        WETH,
        DAI,
        poolFee,
        amountWETH,
        amountDAI,
        minPrice,
        maxPrice,
        deployer.address,
        Math.floor(Date.now() / 1000) + 60 * 10 // 10 min deadline
    );

    await tx.wait();
    console.log("Liquidity added successfully!");
}

main().catch((error) => {
    console.error(error);
    process.exit(1);
});
