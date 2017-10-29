import Comment from "./graphql/types/comment"
import CommentInput from "./graphql/input/comment"
import Item from "./graphql/types/item"
import Update from "./graphql/types/update"
import UpdateInput from "./graphql/input/update"
import { makeExecutableSchema } from "graphql-tools"

const RuneScapeQuery = `
  type RuneScapeQuery {
    items: [Item]
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
      items: (root, { ids }, { models }) => models.item.findAll(),
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
