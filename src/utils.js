import { connect, Contract, keyStores, WalletConnection } from 'near-api-js'
import getConfig from './config'

const nearConfig = getConfig('development')

// Initialize contract & set global variables
export async function initContract() {
    // Initialize connection to the NEAR testnet
    const near = await connect(Object.assign({ deps: { keyStore: new keyStores.BrowserLocalStorageKeyStore() } }, nearConfig))

    // Initializing Wallet based Account. It can work with NEAR testnet wallet that
    // is hosted at https://wallet.testnet.near.org
    window.walletConnection = new WalletConnection(near)

    // Getting the Account ID. If still unauthorized, it's just empty string
    window.accountId = window.walletConnection.getAccountId()

    window.account = window.walletConnection.account();

    // Initializing our contract APIs by contract name and configuration
    window.contractMarket = await new Contract(window.walletConnection.account(), nearConfig.marketContractName, {
        // View methods are read only. They don't modify the state, but usually return some value.
        viewMethods: ["storage_balance_of", "get_sales", "get_uses", "get_created_contract_by_creator"],
        // Change methods can modify the state. But you don't receive the returned value when called.
        changeMethods: ["offer", "remove_sale", "apply_use", "storage_deposit"],
    });

    window.contractNFT = await new Contract(window.walletConnection.account(), nearConfig.nftContractName, {
        // View methods are read only. They don't modify the state, but usually return some value.
        viewMethods: ["nft_tokens_for_owner", "nft_token"],
        // Change methods can modify the state. But you don't receive the returned value when called.
        changeMethods: ["nft_mint", "nft_transfer", "nft_approve"],
    });
}

export function logout() {
    window.walletConnection.signOut()
    // reload page
    window.location.replace(window.location.origin + window.location.pathname)
}

export function login() {
    // Allow the current app to make calls to the specified contract on the
    // user's behalf.
    // This works by creating a new access key for the user's account and storing
    // the private key in localStorage.
    window.walletConnection.requestSignIn(nearConfig.marketContractName)
}

// export async function login() {
//     // window.walletConnection.requestSignIn('timthang1.testnet')
//     const config = {
//       networkId: "testnet",
//       keyStore: new keyStores.BrowserLocalStorageKeyStore(),
//       nodeUrl: "https://rpc.testnet.near.org",
//       walletUrl: "https://wallet.testnet.near.org",
//       helperUrl: "https://helper.testnet.near.org",
//       explorerUrl: "https://explorer.testnet.near.org",
//     };

//     // connect to NEAR
//     const near = await connect(config);

//     // create wallet connection
//     const wallet = new WalletConnection(near);
//     wallet.requestSignIn(
//       "example-contract.testnet", // contract requesting access
//       "Example App", // optional
//       "http://YOUR-URL.com/success", // optional
//       "http://YOUR-URL.com/failure" // optional
//     );
//   }

export function parseTokenWithDecimals(amount, decimals) {
    let amountD = amount / Math.pow(10, decimals);
    return Math.floor(amountD * 100 / 100);
}

export function parseTokenAmount(amount, decimals) {
    return amount * Math.pow(10, decimals);
}

export function conlog() {
    console.log("logggged!")
}

