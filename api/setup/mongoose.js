import mongoose from 'mongoose'
import configuration from '@feathersjs/configuration'

mongoose.Promise = global.Promise
mongoose.connect(configuration()().mongodb)
