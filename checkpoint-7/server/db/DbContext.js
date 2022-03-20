import mongoose from 'mongoose'
import { AccountSchema, ProfileSchema } from '../models/Account'
import { EventsSchema } from "../models/Event";
import { ValueSchema } from '../models/Value'

class DbContext {
  Values = mongoose.model('Value', ValueSchema);
  Account = mongoose.model('Account', AccountSchema);
  Profiles = mongoose.model('Profile', ProfileSchema, 'accounts');

  Events = mongoose.model('Event', EventsSchema);

}

export const dbContext = new DbContext()
