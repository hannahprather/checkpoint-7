import mongoose from "mongoose";
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

export const CommentsSchema = new Schema({
  eventId: { type: String, required: true },
  creatorId: { type: String, required: true },
  body: { type: String, }
},
  { timestamps: true, toJSON: { virtuals: true } }
)

CommentsSchema.virtual('creator', {
  localField: 'creatorId',
  foreignField: '_id',
  justOne: true,
  ref: 'Account',
})
