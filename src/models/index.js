// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Restaurant, Vote, Feast, User, VoteRestaurant } = initSchema(schema);

export {
  Restaurant,
  Vote,
  Feast,
  User,
  VoteRestaurant
};