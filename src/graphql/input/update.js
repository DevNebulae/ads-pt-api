import gql from "graphql-tag"

const UpdateInput = gql`
  input UpdateInput {
    title: String!
    date: String!
    content: String!
  }
`

export default UpdateInput
