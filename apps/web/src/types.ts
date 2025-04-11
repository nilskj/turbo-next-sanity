import type { PageBuilder } from "./lib/sanity/sanity.types";

export type PageBuilderBlockTypes = PageBuilder[number]["_type"];

export type Maybe<T> = T | null | undefined;
