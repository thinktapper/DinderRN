import { ModelInit, MutableModel } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled, AsyncCollection } from "@aws-amplify/datastore";

export enum VoteType {
  YASS = "YASS",
  NOPE = "NOPE"
}

type FeastMetaData = {
  readOnlyFields: 'updatedAt';
}

type PlaceMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type VoteMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type UserMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type EagerFeast = {
  readonly id: string;
  readonly createdAt?: string | null;
  readonly endsAt?: string | null;
  readonly name: string;
  readonly lat: number;
  readonly long: number;
  readonly radius: number;
  readonly userID: string;
  readonly places?: (Place | null)[] | null;
  readonly updatedAt?: string | null;
}

type LazyFeast = {
  readonly id: string;
  readonly createdAt?: string | null;
  readonly endsAt?: string | null;
  readonly name: string;
  readonly lat: number;
  readonly long: number;
  readonly radius: number;
  readonly userID: string;
  readonly places: AsyncCollection<Place>;
  readonly updatedAt?: string | null;
}

export declare type Feast = LazyLoading extends LazyLoadingDisabled ? EagerFeast : LazyFeast

export declare const Feast: (new (init: ModelInit<Feast, FeastMetaData>) => Feast) & {
  copyOf(source: Feast, mutator: (draft: MutableModel<Feast, FeastMetaData>) => MutableModel<Feast, FeastMetaData> | void): Feast;
}

type EagerPlace = {
  readonly id: string;
  readonly placeID: string;
  readonly name: string;
  readonly price?: string | null;
  readonly rating?: string | null;
  readonly ratingsTotal?: string | null;
  readonly stars?: string | null;
  readonly photos?: (string | null)[] | null;
  readonly description?: string | null;
  readonly feastID: string;
  readonly votes?: (Vote | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyPlace = {
  readonly id: string;
  readonly placeID: string;
  readonly name: string;
  readonly price?: string | null;
  readonly rating?: string | null;
  readonly ratingsTotal?: string | null;
  readonly stars?: string | null;
  readonly photos?: (string | null)[] | null;
  readonly description?: string | null;
  readonly feastID: string;
  readonly votes: AsyncCollection<Vote>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Place = LazyLoading extends LazyLoadingDisabled ? EagerPlace : LazyPlace

export declare const Place: (new (init: ModelInit<Place, PlaceMetaData>) => Place) & {
  copyOf(source: Place, mutator: (draft: MutableModel<Place, PlaceMetaData>) => MutableModel<Place, PlaceMetaData> | void): Place;
}

type EagerVote = {
  readonly id: string;
  readonly voteType: VoteType | keyof typeof VoteType;
  readonly userID: string;
  readonly placeID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyVote = {
  readonly id: string;
  readonly voteType: VoteType | keyof typeof VoteType;
  readonly userID: string;
  readonly placeID: string;
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
  readonly votes?: (Vote | null)[] | null;
  readonly feasts?: (Feast | null)[] | null;
  readonly lat?: number | null;
  readonly long?: number | null;
  readonly radius?: number | null;
  readonly restaurants?: (string | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyUser = {
  readonly id: string;
  readonly name: string;
  readonly image?: string | null;
  readonly bio?: string | null;
  readonly sub: string;
  readonly votes: AsyncCollection<Vote>;
  readonly feasts: AsyncCollection<Feast>;
  readonly lat?: number | null;
  readonly long?: number | null;
  readonly radius?: number | null;
  readonly restaurants?: (string | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type User = LazyLoading extends LazyLoadingDisabled ? EagerUser : LazyUser

export declare const User: (new (init: ModelInit<User, UserMetaData>) => User) & {
  copyOf(source: User, mutator: (draft: MutableModel<User, UserMetaData>) => MutableModel<User, UserMetaData> | void): User;
}