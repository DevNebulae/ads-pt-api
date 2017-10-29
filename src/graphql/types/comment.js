import gql from "graphql-tag"

const Comment = gql`
  type Comment {
    id: String!
    timestamp: String
    author: String
    content: String
  }
`

export default Comment
