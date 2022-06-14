import React, { useState } from "react";
import "./modal-list-nft.css";
import {utils} from "near-api-js"
import getConfig from '../../../config'
import {notification} from "antd";

const nearConfig = getConfig(process.env.NODE_ENV || 'development')

const ModalListNft = ({ setShowListModal, token_id }) => {

    const [selling_price, setSellingPrice] = useState("");
    const [using_price, setUsingPrice] = useState("");

    async function submitList(token_id, selling_price, using_price) {
        try {
            if (selling_price && using_price && token_id) {
                let sale_conditions = { 
                    sale_condition: utils.format.parseNearAmount(selling_price.toString()),
                    use_condition: utils.format.parseNearAmount(using_price.toString()),
                }

                // Check storage balance
                let storageAccount = await window.contractMarket.storage_balance_of({
                    account_id: window.accountId
                });

                console.log("sale conditions: ", JSON.stringify(sale_conditions))
                console.log("storage: ", storageAccount)

                // Submit sale
                if (storageAccount > 0) {
                    console.log("Data: ", storageAccount, utils.format.parseNearAmount("0.1"), nearConfig.marketContractName);
                    await window.contractNFT.nft_approve({
                        token_id: token_id,
                        account_id: nearConfig.marketContractName,
                        msg: JSON.stringify(sale_conditions)
                    },
                    30000000000000, 
                    utils.format.parseNearAmount("0.05"));
                } else {
                    notification["warning"]({
                        message: 'Not Enough Storage Balance',
                        description:
                          'Please deposit storage balance to list your NFT!',
                      });
                }
            }
        } catch (e) {
            console.log("Transfer error: ", e);
        }
    }

    function handleListNft() {
        submitList(token_id, selling_price, using_price)
        setShowListModal(false)
    }

    return (
        <div className="modal__wrapper" >
            <div className="single__modal" style={{height: "auto"}}>
                <span className="close__modal">
                    <i class="ri-close-line" onClick={() => setShowListModal(false)}></i>
                </span>
                <h6 className="text-center text-light">List NFT on Marketplace</h6>
                <p className="text-center text-light">
                    Enter selling price
                </p>

                <div className="input__item mb-4">
                    <input onChange={(e) => setSellingPrice(e.target.value)} type="number" placeholder="selling price (NEAR)" />
                </div>

                <p className="text-center text-light">
                    Enter using price
                </p>

                <div className="input__item mb-4">
                    <input onChange={(e) => setUsingPrice(e.target.value)} type="number" placeholder="using price (NEAR)" />
                </div>

                <button className="place__bid-btn" onClick={handleListNft}>List</button>
            </div>
        </div>
    );
};

export default ModalListNft;
