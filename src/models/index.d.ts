import { ModelInit, MutableModel } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled, AsyncCollection, AsyncItem } from "@aws-amplify/datastore";

type MatchMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type UserMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type UserMatchMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type EagerMatch = {
  readonly id: string;
  readonly users?: (UserMatch | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyMatch = {
  readonly id: string;
  readonly users: AsyncCollection<UserMatch>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Match = LazyLoading extends LazyLoadingDisabled ? EagerMatch : LazyMatch

export declare const Match: (new (init: ModelInit<Match, MatchMetaData>) => Match) & {
  copyOf(source: Match, mutator: (draft: MutableModel<Match, MatchMetaData>) => MutableModel<Match, MatchMetaData> | void): Match;
}

type EagerUser = {
  readonly id: string;
  readonly name: string;
  readonly image?: string | null;
  readonly bio?: string | null;
  readonly sub: string;
  readonly matches?: (UserMatch | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyUser = {
  readonly id: string;
  readonly name: string;
  readonly image?: string | null;
  readonly bio?: string | null;
  readonly sub: string;
  readonly matches: AsyncCollection<UserMatch>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type User = LazyLoading extends LazyLoadingDisabled ? EagerUser : LazyUser

export declare const User: (new (init: ModelInit<User, UserMetaData>) => User) & {
  copyOf(source: User, mutator: (draft: MutableModel<User, UserMetaData>) => MutableModel<User, UserMetaData> | void): User;
}

type EagerUserMatch = {
  readonly id: string;
  readonly match: Match;
  readonly user: User;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyUserMatch = {
  readonly id: string;
  readonly match: AsyncItem<Match>;
  readonly user: AsyncItem<User>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type UserMatch = LazyLoading extends LazyLoadingDisabled ? EagerUserMatch : LazyUserMatch

export declare const UserMatch: (new (init: ModelInit<UserMatch, UserMatchMetaData>) => UserMatch) & {
  copyOf(source: UserMatch, mutator: (draft: MutableModel<UserMatch, UserMatchMetaData>) => MutableModel<UserMatch, UserMatchMetaData> | void): UserMatch;
}