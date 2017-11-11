import Comment from "./graphql/types/comment.gql"
import CommentInput from "./graphql/input/comment.gql"
import Item from "./graphql/types/item.gql"
import Update from "./graphql/types/update.gql"
import UpdateInput from "./graphql/input/update.gql"
import { makeExecutableSchema } from "graphql-tools"

const RuneScapeQuery = `
  type RuneScapeQuery {
		comments(filter: String, options: String): [Comment]
		comment(id: String!): Comment
    items(ids: [Int!]): [Item]
		item(id: Int!): Item
    updates: [Update]
  }
`

const RuneScapeMutation = `
	type RuneScapeMutation {
		addComment(comment: CommentInput!): Comment
		addComments(comments: [CommentInput!]!): [Comment]
		addUpdate(update: UpdateInput!): Update
	}
`

const SchemaDefinition = `
	schema {
		query: RuneScapeQuery
		mutation: RuneScapeMutation
	}
`

export default makeExecutableSchema({
  typeDefs: [
    SchemaDefinition,
    RuneScapeQuery,
    RuneScapeMutation,
    // Individual types
    Comment,
    Item,
    Update,
    // Input types
    CommentInput,
    UpdateInput
  ],
  resolvers: {
    RuneScapeQuery: {
      comments: (root, { filter, options }, { models }) => {
        if (filter)
          return models.comment.find({
            content: new RegExp(filter, options || "")
          })
        else return models.comment.find({})
      },
      comment: (root, { id }, { models }) => models.comment.find({ _id: id }),
      items: (root, { ids }, { models }) => {
        if (ids) return models.item.findAll({ where: { id: ids } })
        else return models.item.findAll()
      },
      item: (root, { id }, { models }) => models.item.findById(id),
      updates: (root, args, { models }) => models.update.find({})
    },
    RuneScapeMutation: {
      addUpdate: (root, { update }, { models }) => models.update.create(update),
      addComment: (root, { comment }, { models }) =>
        models.comment.create(comment),
      addComments: (root, { comments }, { models }) =>
        models.comment.insertMany(comments)
    },
    Item: {
      rsbuddy: ({ id }, args, { models }) =>
        models.rsbuddy.findAll({ where: { item_id: id } })
    }
  }
})
