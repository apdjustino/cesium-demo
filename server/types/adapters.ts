import { InMemoryTestAdapter } from "../adapters/inMemoryTestAdapter";
import { SqliteAdapter } from "../adapters/sqliteAdapter";

export type Adapter = InMemoryTestAdapter | SqliteAdapter;