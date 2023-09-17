import { gql } from "@apollo/client/core/index.js";

export default function () {
  const query = gql`
    query faqPage {
      faqPage {
        data {
          attributes {
            pageHeading
            faqSegment {
              faqSegmentHeading
              faqItem {
                faqTitle
                faqParagraph
              }
            }
          }
        }
      }
    }
  `;

  return query;
}
