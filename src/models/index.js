// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

const VoteType = {
  "POSITIVE": "POSITIVE",
  "NEGATIVE": "NEGATIVE"
};

const { Restaurant, Feast, Vote, User } = initSchema(schema);

export {
  Restaurant,
  Feast,
  Vote,
  User,
  VoteType
};