import gql from "graphql-tag"

const RSBuddy = gql`
  # A representation of a Grand Exchange transaction
  # expressed in a second-based epoch, the price at which an
  # item was bought, the volume which was bought or
  # attempted to buy, the price at which an item was sold,
  # the volume which was or attempted to sell and the
  # average price at which items were exchanged and which
  # at which volume. Most values are expressed in strings,
  # because of the 32-bit limitations of the GraphQL integer
  # spec.
  type RSBuddy {
    ts: String!
    buyingPrice: String
    buyingCompleted: String
    sellingPrice: String
    sellingCompleted: String
    overallPrice: String
    overallCompleted: String
  }
`

export default RSBuddy
