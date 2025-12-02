"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.qdrant = void 0;
const js_client_rest_1 = require("@qdrant/js-client-rest");
exports.qdrant = new js_client_rest_1.QdrantClient({
    url: "http://localhost:6333" // Qdrant running locally
});
