import { gql } from "@apollo/client/core/index.js";

export default function () {
    const query = gql`
        query layoutQuery {
            menu(locale: "bg") {
                data {
                    attributes {
                        seoTitle
                        seoDescription
                        seoKeywords
                        facebookLink
                        instagramLink
                        linkedinLink
                        addressName
                        addressLink
                        emailName
                        emailLink
                        phoneName
                        phoneLink
                    }
                }
            }
            cookiesPolicy(locale: "bg") {
                data {
                    attributes {
                        bannerHeading
                        bannerDescription
                        acceptLabel
                        rejectLabel
                        settingsLabel
                        closeLabel
                        editLabel
                        necessaryLabel
                        necessaryDescription
                        trackingLabel
                        trackingDescription
                        analyticsLabel
                        analyticsDescription
                        marketingLabel
                        marketingDescription
                    }
                }
            }
        } 
    `

    return query
}