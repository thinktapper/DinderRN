// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

const VoteType = {
  "YASS": "YASS",
  "NOPE": "NOPE"
};

const { Feast, Place, Vote, User } = initSchema(schema);

export {
  Feast,
  Place,
  Vote,
  User,
  VoteType
};