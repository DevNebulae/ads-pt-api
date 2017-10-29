import gql from "graphql-tag"

const CommentInput = gql`
  input CommentInput {
    timestamp: String!
    author: String!
    content: String!
  }
`

export default CommentInput
