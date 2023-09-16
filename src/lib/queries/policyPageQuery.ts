import { gql } from "@apollo/client/core/index.js";


export default function () {
    const query = gql`
        query policy {
            policy {
                data {
                    attributes {
                        pageTitle
                        content
                    }
                }
            }
        } 
    `

    return query
}