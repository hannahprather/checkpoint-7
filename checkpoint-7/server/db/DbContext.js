import mongoose from 'mongoose'
import { AccountSchema, ProfileSchema } from '../models/Account'
import { EventsSchema } from "../models/Event";
import { ValueSchema } from '../models/Value'
import { TicketsSchema } from "../models/Ticket";
import { CommentsSchema } from "../models/Comment";



class DbContext {
  Values = mongoose.model('Value', ValueSchema);
  Account = mongoose.model('Account', AccountSchema);
  Profiles = mongoose.model('Profile', ProfileSchema, 'accounts');

  Events = mongoose.model('Event', EventsSchema);

  Tickets = mongoose.model('Ticket', TicketsSchema);

  Comments = mongoose.model('Comment', CommentsSchema);
}

export const dbContext = new DbContext()
