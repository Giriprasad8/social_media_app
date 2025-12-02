import { qdrant } from "../vector/qdrant";
import { generateEmbedding } from "../utils/embedding";

export async function vectorSearch(query: string, filterType?: string) {
  const queryVector = await generateEmbedding(query);

  const mustFilter: any = [];

  if (filterType) {
    mustFilter.push({
      key: "type",
      match: { value: filterType }
    });
  }

  const result = await qdrant.search("posts", {
    vector: queryVector,
    limit: 20,
    filter: mustFilter.length ? { must: mustFilter } : undefined
  });

  return result;
}
