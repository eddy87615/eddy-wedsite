import { type SchemaTypeDefinition } from "sanity";
import { schemaTypes as customSchemas } from "./sechems";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: customSchemas,
};
