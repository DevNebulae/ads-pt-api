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

const RSBuddyType = new GraphQLObjectType({
  name: "RSBuddy",
  description: "Financial data retrieved from the RSBuddy/OSBuddy API",
  fields: () => ({
    ts: {
      type: GraphQLString
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
  }),
  resolve: root => Item.findOne({ id: root.id }, { rsbuddy: true })
})

const ItemType = new GraphQLObjectType({
  name: "Item",
  description:
    "A representation of an in-game item and all of its in-game transactions from multiple sources.",
  fields: {
    id: {
      type: GraphQLInt
    },
    name: {
      type: GraphQLString
    },
    store: {
      type: GraphQLInt
    },
    rsbuddy: {
      type: new GraphQLList(RSBuddyType)
    }
  }
})

const Query = new GraphQLObjectType({
  name: "RuneScape",
  description:
    "The API which keeps track of all in-game items and their financial transactions.",
  fields: {
    items: {
      type: new GraphQLList(ItemType),
      args: {
        id: {
          type: GraphQLInt
        },
        ids: {
          type: new GraphQLList(GraphQLInt)
        },
        empty: {
          type: GraphQLBoolean
        }
      },
      resolve: (root, { id, ids, empty }) => {
        if (id) return Item.findOne({ id }, { rsbuddy: false })
        else if (ids) return Item.find({ id: { $in: ids } }, { rsbuddy: false })
        else if (empty)
          return Item.find({ rsbuddy: { $eq: [] } }, { rsbuddy: false })
        else return Item.find({}, { rsbuddy: false })
      }
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
          type: new GraphQLNonNull(new GraphQLList(GraphQLInt))
        },
        buyingCompleted: {
          type: new GraphQLNonNull(new GraphQLList(GraphQLInt))
        },
        sellingPrice: {
          type: new GraphQLNonNull(new GraphQLList(GraphQLInt))
        },
        sellingCompleted: {
          type: new GraphQLNonNull(new GraphQLList(GraphQLInt))
        },
        overallPrice: {
          type: new GraphQLNonNull(new GraphQLList(GraphQLInt))
        },
        overallCompleted: {
          type: new GraphQLNonNull(new GraphQLList(GraphQLInt))
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
    }
  }
})

export default new GraphQLSchema({
  query: Query,
  mutation: Mutation
})
