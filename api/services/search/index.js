import mongoose from 'mongoose'
import Contexture from 'contexture'

export const path = '/search'
export const setup = () => null

const client = Contexture({
  schemas: {
    message: {
      mongo: {
        collection: 'messages'
      }
    },
  },
  providers: {
    mongo: require('contexture-mongo')({
      getClient: () => mongoose.connection,
      types: require('contexture-mongo/types')(),
    })
  }
})

export const find = async ({ query }) => ({
  data: [await client(query)]
})
