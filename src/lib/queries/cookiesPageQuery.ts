import { gql } from "@apollo/client/core/index.js";


export default function () {
    const query = gql`
        query cookie {
            cookie {
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