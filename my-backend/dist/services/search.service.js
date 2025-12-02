"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.vectorSearch = vectorSearch;
const qdrant_1 = require("../vector/qdrant");
const embedding_1 = require("../utils/embedding");
async function vectorSearch(query, filterType) {
    const queryVector = await (0, embedding_1.generateEmbedding)(query);
    const mustFilter = [];
    if (filterType) {
        mustFilter.push({
            key: "type",
            match: { value: filterType }
        });
    }
    const result = await qdrant_1.qdrant.search("posts", {
        vector: queryVector,
        limit: 20,
        filter: mustFilter.length ? { must: mustFilter } : undefined
    });
    return result;
}
