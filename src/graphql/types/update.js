import gql from "graphql-tag"

const Update = gql`
  # An update retrieved from the official RuneScape
  # website. The updates include news about changes in the
  # game, developer blogs and poll questions about future
  # updates.
  type Update {
    id: String
    title: String
    date: String
    content: String
  }
`

export default Update
