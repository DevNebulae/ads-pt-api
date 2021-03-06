import Comment from "./graphql/types/comment.gql"
import CommentInput from "./graphql/input/comment.gql"
import Item from "./graphql/types/item.gql"
import Root from "./graphql/types/root.gql"
import Update from "./graphql/types/update.gql"
import UpdateInput from "./graphql/input/update.gql"
import moment from "moment"
import { makeExecutableSchema } from "graphql-tools"
import { parseModifier } from "./resampling/utils"
import { sequelize } from "./db"
import { GraphQLError } from "graphql/error/GraphQLError"

export default makeExecutableSchema({
  typeDefs: [
    Root,
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
      rsbuddy: ({ id }, { resample, start = null, end = null }, { models }) => {
        if (
          (start && !moment(start, moment.ISO_8601).isValid()) ||
          (end && !moment(end, moment.ISO_8601).isValid())
        )
          throw new GraphQLError(
            "Start and end dates must be specified in the ISO 8601 format."
          )

        if (resample) {
          let frameSize
          const startDate =
            start === null
              ? null
              : moment(start, moment.ISO_8601).format("YYYY-MM-DD HH:mm:ss")
          const endDate =
            end === null
              ? null
              : moment(end, moment.ISO_8601).format("YYYY-MM-DD HH:mm:ss")

          try {
            frameSize = parseModifier(resample)
          } catch (e) {
            console.log(e)
            throw new GraphQLError(e)
          }

          return sequelize.query(require("./sql/rsbuddy-resample.sql"), {
            mapToModel: true,
            model: models.rsbuddy,
            replacements: {
              end: endDate,
              frameSize,
              itemId: id,
              start: startDate
            },
            type: sequelize.QueryTypes.SELECT
          })
        } else
          return models.rsbuddy.findAll({
            where: { item_id: id },
            order: [["ts", "ASC"]]
          })
      }
    }
  }
})
