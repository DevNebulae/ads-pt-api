import gql from "graphql-tag"
import RSBuddy from "./rsbuddy"

const Item = gql`
  # A representation of a RuneScape in-game item. Added to
  # the general information and knowledge of an item are
  # the transactions retrieved from the OSBuddy / RSBuddy
  # client.
  type Item {
    id: Int!
    name: String
    store: Int
    rsbuddy: [RSBuddy]
  }
`

export default () => [Item, RSBuddy]
