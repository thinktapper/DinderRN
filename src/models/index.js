// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Match, User, UserMatch } = initSchema(schema);

export {
  Match,
  User,
  UserMatch
};