import {
  GraphQLBoolean,
  GraphQLInt,
  GraphQLList,
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLSchema,
  GraphQLString
} from "graphql"
import _ from "lodash"
import Item from "./db/item"
import ItemType from "./graphql/types/item"
import Update from "./db/update"
import UpdateType from "./graphql/types/update"

const Query = new GraphQLObjectType({
  name: "RuneScape",
  description:
    "The API which keeps track of all in-game items and their financial transactions.",
  fields: {
    items: {
      type: new GraphQLList(ItemType),
      args: {
        ids: {
          type: new GraphQLList(GraphQLInt)
        },
        empty: {
          type: GraphQLBoolean
        }
      },
      resolve: (root, { ids, empty }) => {
        if (ids) return Item.find({ id: { $in: ids } }, { rsbuddy: false })
        else if (empty)
          return Item.find({ rsbuddy: { $eq: [] } }, { rsbuddy: false })
        else return Item.find({}, { rsbuddy: false })
      }
    },
    updates: {
      type: new GraphQLList(UpdateType),
      resolve: root => Update.find()
    }
  }
})

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addItem: {
      type: ItemType,
      description: "Create a new item.",
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLInt)
        },
        name: {
          type: new GraphQLNonNull(GraphQLString)
        },
        store: {
          type: new GraphQLNonNull(GraphQLInt)
        }
      },
      resolve: (root, { id, name, store }) => Item.create({ id, name, store })
    },
    addItems: {
      type: new GraphQLList(ItemType),
      description: "Create multiple new items.",
      args: {
        ids: {
          type: new GraphQLNonNull(new GraphQLList(GraphQLInt))
        },
        names: {
          type: new GraphQLNonNull(new GraphQLList(GraphQLString))
        },
        stores: {
          type: new GraphQLNonNull(new GraphQLList(GraphQLInt))
        }
      },
      resolve: (root, { ids, names, stores }) =>
        Item.create(
          _.zipWith(ids, names, stores, (id, name, store) => ({
            id,
            name,
            store
          }))
        )
    },
    addRSBuddy: {
      type: ItemType,
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLInt)
        },
        ts: {
          type: new GraphQLNonNull(GraphQLString)
        },
        buyingPrice: {
          type: GraphQLInt
        },
        buyingCompleted: {
          type: GraphQLInt
        },
        sellingPrice: {
          type: GraphQLInt
        },
        sellingCompleted: {
          type: GraphQLInt
        },
        overallPrice: {
          type: GraphQLInt
        },
        overallCompleted: {
          type: GraphQLInt
        }
      },
      resolve: (
        root,
        {
          ts,
          buyingPrice,
          buyingCompleted,
          sellingPrice,
          sellingCompleted,
          overallPrice,
          overallCompleted
        }
      ) =>
        Item.create({
          ts,
          buyingPrice,
          buyingCompleted,
          sellingPrice,
          sellingCompleted,
          overallPrice,
          overallCompleted
        })
    },
    addRSBuddyBulk: {
      type: ItemType,
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLInt)
        },
        ts: {
          type: new GraphQLNonNull(
            new GraphQLList(new GraphQLNonNull(GraphQLString))
          )
        },
        buyingPrice: {
          type: new GraphQLNonNull(new GraphQLList(GraphQLString))
        },
        buyingCompleted: {
          type: new GraphQLNonNull(new GraphQLList(GraphQLString))
        },
        sellingPrice: {
          type: new GraphQLNonNull(new GraphQLList(GraphQLString))
        },
        sellingCompleted: {
          type: new GraphQLNonNull(new GraphQLList(GraphQLString))
        },
        overallPrice: {
          type: new GraphQLNonNull(new GraphQLList(GraphQLString))
        },
        overallCompleted: {
          type: new GraphQLNonNull(new GraphQLList(GraphQLString))
        }
      },
      resolve: async (
        root,
        {
          id,
          ts,
          buyingPrice,
          buyingCompleted,
          sellingPrice,
          sellingCompleted,
          overallPrice,
          overallCompleted
        }
      ) => {
        const zipped = _.zipWith(
          ts,
          buyingPrice,
          buyingCompleted,
          sellingPrice,
          sellingCompleted,
          overallPrice,
          overallCompleted,
          (
            ts,
            buyingPrice,
            buyingCompleted,
            sellingPrice,
            sellingCompleted,
            overallPrice,
            overallCompleted
          ) => ({
            ts,
            buyingPrice,
            buyingCompleted,
            sellingPrice,
            sellingCompleted,
            overallPrice,
            overallCompleted
          })
        )
        return Item.update({ id }, { rsbuddy: zipped })
      }
    },
    addUpdate: {
      type: UpdateType,
      args: {
        title: {
          type: new GraphQLNonNull(GraphQLString)
        },
        date: {
          type: new GraphQLNonNull(GraphQLString)
        },
        content: {
          type: new GraphQLNonNull(GraphQLString)
        }
      },
      resolve: (root, { title, date, content }) =>
        Update.create({ title, date: Date.parse(date), content })
    }
  }
})

export default new GraphQLSchema({
  query: Query,
  mutation: Mutation
})
