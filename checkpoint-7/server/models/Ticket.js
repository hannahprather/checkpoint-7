import mongoose from "mongoose";
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

export const TicketsSchema = new Schema({
  eventId: { type: String, required: true },
  accountId: { type: String, required: true }
},
  { timestamps: true, toJSON: { virtuals: true } }
)

TicketsSchema.virtual('creator', {
  localField: 'creatorId',
  foreignField: '_id',
  justOne: true,
  ref: 'Account',
})
TicketsSchema.virtual('event', {
  localField: 'eventId',
  foreignField: '_id',
  justOne: true,
  ref: 'Event',
})