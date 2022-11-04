import { ModelInit, MutableModel } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled, AsyncCollection } from "@aws-amplify/datastore";

export enum VoteType {
  POSITIVE = "POSITIVE",
  NEGATIVE = "NEGATIVE"
}

type RestaurantMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type FeastMetaData = {
  readOnlyFields: 'updatedAt';
}

type VoteMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type UserMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type EagerRestaurant = {
  readonly id: string;
  readonly name?: string | null;
  readonly description?: string | null;
  readonly image?: string | null;
  readonly price?: string | null;
  readonly ranking?: string | null;
  readonly rating?: string | null;
  readonly phone?: string | null;
  readonly website?: string | null;
  readonly address?: string | null;
  readonly feastID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyRestaurant = {
  readonly id: string;
  readonly name?: string | null;
  readonly description?: string | null;
  readonly image?: string | null;
  readonly price?: string | null;
  readonly ranking?: string | null;
  readonly rating?: string | null;
  readonly phone?: string | null;
  readonly website?: string | null;
  readonly address?: string | null;
  readonly feastID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Restaurant = LazyLoading extends LazyLoadingDisabled ? EagerRestaurant : LazyRestaurant

export declare const Restaurant: (new (init: ModelInit<Restaurant, RestaurantMetaData>) => Restaurant) & {
  copyOf(source: Restaurant, mutator: (draft: MutableModel<Restaurant, RestaurantMetaData>) => MutableModel<Restaurant, RestaurantMetaData> | void): Restaurant;
}

type EagerFeast = {
  readonly id: string;
  readonly createdAt?: string | null;
  readonly endsAt?: string | null;
  readonly name?: string | null;
  readonly lat?: number | null;
  readonly long?: number | null;
  readonly distance?: number | null;
  readonly restaurants?: (Restaurant | null)[] | null;
  readonly userID: string;
  readonly updatedAt?: string | null;
}

type LazyFeast = {
  readonly id: string;
  readonly createdAt?: string | null;
  readonly endsAt?: string | null;
  readonly name?: string | null;
  readonly lat?: number | null;
  readonly long?: number | null;
  readonly distance?: number | null;
  readonly restaurants: AsyncCollection<Restaurant>;
  readonly userID: string;
  readonly updatedAt?: string | null;
}

export declare type Feast = LazyLoading extends LazyLoadingDisabled ? EagerFeast : LazyFeast

export declare const Feast: (new (init: ModelInit<Feast, FeastMetaData>) => Feast) & {
  copyOf(source: Feast, mutator: (draft: MutableModel<Feast, FeastMetaData>) => MutableModel<Feast, FeastMetaData> | void): Feast;
}

type EagerVote = {
  readonly id: string;
  readonly voteType: VoteType | keyof typeof VoteType;
  readonly placeID: string;
  readonly userID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyVote = {
  readonly id: string;
  readonly voteType: VoteType | keyof typeof VoteType;
  readonly placeID: string;
  readonly userID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Vote = LazyLoading extends LazyLoadingDisabled ? EagerVote : LazyVote

export declare const Vote: (new (init: ModelInit<Vote, VoteMetaData>) => Vote) & {
  copyOf(source: Vote, mutator: (draft: MutableModel<Vote, VoteMetaData>) => MutableModel<Vote, VoteMetaData> | void): Vote;
}

type EagerUser = {
  readonly id: string;
  readonly name: string;
  readonly image?: string | null;
  readonly bio?: string | null;
  readonly sub: string;
  readonly feasts?: (Feast | null)[] | null;
  readonly lat?: number | null;
  readonly long?: number | null;
  readonly radius?: number | null;
  readonly places?: (string | null)[] | null;
  readonly votes?: (Vote | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyUser = {
  readonly id: string;
  readonly name: string;
  readonly image?: string | null;
  readonly bio?: string | null;
  readonly sub: string;
  readonly feasts: AsyncCollection<Feast>;
  readonly lat?: number | null;
  readonly long?: number | null;
  readonly radius?: number | null;
  readonly places?: (string | null)[] | null;
  readonly votes: AsyncCollection<Vote>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type User = LazyLoading extends LazyLoadingDisabled ? EagerUser : LazyUser

export declare const User: (new (init: ModelInit<User, UserMetaData>) => User) & {
  copyOf(source: User, mutator: (draft: MutableModel<User, UserMetaData>) => MutableModel<User, UserMetaData> | void): User;
}