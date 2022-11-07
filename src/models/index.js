// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

const VoteType = {
  "YASS": "YASS",
  "NOPE": "NOPE"
};

const { Feast, User, Vote, Place } = initSchema(schema);

export {
  Feast,
  User,
  Vote,
  Place,
  VoteType
};