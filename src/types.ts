import { z } from "zod";

const ErrorPayload = z.object({
  Response: z.literal("False"),
  Error: z.string(),
});

export const SearchItem = z.object({
  Poster: z.string(),
  Title: z.string(),
  Year: z.string(),
  imdbID: z.string(),
});
export type SearchItem = z.infer<typeof SearchItem>;

export const SearchPayload = z
  .object({
    Response: z.literal("True"),
    Search: z.array(SearchItem),
    totalResults: z.string(),
  })
  .or(ErrorPayload);
export type SearchPayload = z.infer<typeof SearchPayload>;

export const ItemDetails = z.object({
  Actors: z.string(),
  Awards: z.string(),
  Country: z.string(),
  Director: z.string(),
  Genre: z.string(),
  Plot: z.string(),
  Rated: z.string(),
  Released: z.string(),
  Runtime: z.string(),
  Title: z.string(),
  Type: z.string(),
  Writer: z.string(),
});
export type ItemDetails = z.infer<typeof ItemDetails>;

export const DetailsPayload = ItemDetails.extend({
  Response: z.literal("True"),
}).or(ErrorPayload);
export type DetailsPayload = z.infer<typeof DetailsPayload>;
