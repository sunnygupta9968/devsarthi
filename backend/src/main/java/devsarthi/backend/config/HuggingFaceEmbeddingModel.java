package devsarthi.backend.config;

import com.fasterxml.jackson.databind.JsonNode;
import org.springframework.ai.embedding.Embedding;
import org.springframework.ai.embedding.EmbeddingModel;
import org.springframework.ai.embedding.EmbeddingRequest;
import org.springframework.ai.embedding.EmbeddingResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestClient;
import org.springframework.ai.document.Document;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Component
public class HuggingFaceEmbeddingModel implements EmbeddingModel {

    private static final int DIMENSIONS = 1024;

    private final RestClient restClient;
    private final String endpoint;

    public HuggingFaceEmbeddingModel(
            RestClient.Builder builder,
            @Value("${app.embedding.huggingface.token}") String token,
            @Value("${app.embedding.huggingface.endpoint}") String endpoint) {
        this.restClient = builder
                .defaultHeader("Authorization", "Bearer " + token)
                .build();
        this.endpoint = endpoint;
    }

    @Override
    public EmbeddingResponse call(EmbeddingRequest request) {
        List<String> texts = request.getInstructions();
        if (texts == null || texts.isEmpty()) {
            return new EmbeddingResponse(List.of());
        }

        Map<String, Object> payload = Map.of(
                "inputs", texts,
                "options", Map.of("wait_for_model", true),
                "parameters", Map.of("normalize_embeddings", true, "truncate", true)
        );

        JsonNode response = restClient.post()
                .uri(endpoint)
                .contentType(MediaType.APPLICATION_JSON)
                .body(payload)
                .retrieve()
                .body(JsonNode.class);

        if (response == null) {
            throw new IllegalStateException("Hugging Face returned an empty embedding response.");
        }

        List<JsonNode> vectors = extractVectors(response, texts.size());
        if (vectors.size() != texts.size()) {
            throw new IllegalStateException(
                    "Hugging Face returned " + vectors.size() + " embeddings for " + texts.size() + " inputs.");
        }

        List<Embedding> embeddings = new ArrayList<>(vectors.size());
        for (int i = 0; i < vectors.size(); i++) {
            float[] vector = toVector(vectors.get(i));
            if (vector.length != DIMENSIONS) {
                throw new IllegalStateException(
                        "Expected " + DIMENSIONS + " embedding dimensions but received " + vector.length
                                + ". Confirm the selected Hugging Face model and endpoint.");
            }
            embeddings.add(new Embedding(vector, i));
        }
        return new EmbeddingResponse(embeddings);
    }

    @Override
    public int dimensions() {
        return DIMENSIONS;
    }
    @Override
    public float[] embed(Document document) {
        EmbeddingResponse response = call(
                new EmbeddingRequest(
                        List.of(document.getText()),
                        null
                )
        );

        return response.getResults().get(0).getOutput();
    }
    private List<JsonNode> extractVectors(JsonNode root, int inputCount) {
        List<JsonNode> result = new ArrayList<>();

        // Some inference responses return one vector per input: [batch][dimensions].
        // Feature-extraction models may return token vectors: [batch][tokens][dimensions].
        if (!root.isArray()) {
            throw new IllegalStateException("Unexpected Hugging Face response: expected a JSON array.");
        }

        if (inputCount == 1 && isNumericArray(root)) {
            result.add(root);
            return result;
        }

        if (root.size() == inputCount) {
            for (JsonNode item : root) {
                if (isNumericArray(item)) {
                    result.add(item);
                } else if (item.isArray() && item.size() > 0 && isNumericArray(item.get(0))) {
                    result.add(meanPool(item));
                } else {
                    throw new IllegalStateException("Unexpected embedding shape returned by Hugging Face.");
                }
            }
            return result;
        }

        // A single input can sometimes be returned as [tokens][dimensions].
        if (inputCount == 1 && root.size() > 0 && isNumericArray(root.get(0))) {
            result.add(meanPool(root));
            return result;
        }

        throw new IllegalStateException("Unexpected number or shape of embeddings returned by Hugging Face.");
    }

    private boolean isNumericArray(JsonNode node) {
        if (node == null || !node.isArray() || node.isEmpty()) {
            return false;
        }
        for (JsonNode value : node) {
            if (!value.isNumber()) {
                return false;
            }
        }
        return true;
    }

    private JsonNode meanPool(JsonNode tokenVectors) {
        int tokenCount = tokenVectors.size();
        int dimensions = tokenVectors.get(0).size();
        double[] sums = new double[dimensions];

        for (JsonNode token : tokenVectors) {
            if (!token.isArray() || token.size() != dimensions) {
                throw new IllegalStateException("Inconsistent token embedding dimensions from Hugging Face.");
            }
            for (int d = 0; d < dimensions; d++) {
                sums[d] += token.get(d).asDouble();
            }
        }

        com.fasterxml.jackson.databind.node.ArrayNode pooled =
                com.fasterxml.jackson.databind.node.JsonNodeFactory.instance.arrayNode();
        for (double sum : sums) {
            pooled.add(sum / tokenCount);
        }
        return pooled;
    }

    private float[] toVector(JsonNode values) {
        float[] vector = new float[values.size()];
        for (int i = 0; i < values.size(); i++) {
            vector[i] = (float) values.get(i).asDouble();
        }
        return vector;
    }
}
