import { createSearchParamsCache, parseAsString } from "nuqs/server";

export const searchParamsParsers = {
  ref: parseAsString,
  token: parseAsString,
  error: parseAsString,
};

export const searchParamsCache = createSearchParamsCache(searchParamsParsers);
