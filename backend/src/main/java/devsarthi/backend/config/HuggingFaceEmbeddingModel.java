
package devsarthi.backend.config;

import com.fasterxml.jackson.databind.JsonNode;
import org.springframework.ai.document.Document;
import org.springframework.ai.embedding.Embedding;
import org.springframework.ai.embedding.EmbeddingModel;
import org.springframework.ai.embedding.EmbeddingRequest;
import org.springframework.ai.embedding.EmbeddingResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestClient;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Component
public class HuggingFaceEmbeddingModel implements EmbeddingModel {

    private static final int DIMENSIONS = 1024;
    private static final String ENDPOINT =
            "https://api.jina.ai/v1/embeddings";
    private static final String MODEL =
            "jina-embeddings-v5-text-small";

    private final RestClient restClient;

    public HuggingFaceEmbeddingModel(
            RestClient.Builder builder,
            @Value("${JINA_API_KEY}") String token) {

        this.restClient = builder
                .baseUrl(ENDPOINT)
                .defaultHeader("Authorization", "Bearer " + token)
                .build();
        System.out.println(
                "Embedding provider endpoint configured: " + ENDPOINT);
    }

    @Override
    public EmbeddingResponse call(EmbeddingRequest request) {
        List<String> texts = request.getInstructions();

        if (texts == null || texts.isEmpty()) {
            return new EmbeddingResponse(List.of());
        }

        Map<String, Object> payload = Map.of(
                "model", MODEL,
                "input", texts,
                "dimensions", DIMENSIONS,
                "normalized", true,
                "truncate", true
        );

        JsonNode response = restClient.post()
                .contentType(MediaType.APPLICATION_JSON)
                .body(payload)
                .retrieve()
                .body(JsonNode.class);

        if (response == null || !response.path("data").isArray()) {
            throw new IllegalStateException(
                    "Jina AI returned an invalid embedding response.");
        }

        JsonNode data = response.path("data");

        if (data.size() != texts.size()) {
            throw new IllegalStateException(
                    "Jina AI returned " + data.size()
                            + " embeddings for " + texts.size() + " inputs.");
        }

        List<Embedding> embeddings = new ArrayList<>(data.size());

        for (int i = 0; i < data.size(); i++) {
            JsonNode vectorNode = data.get(i).path("embedding");

            if (!vectorNode.isArray()
                    || vectorNode.size() != DIMENSIONS) {
                throw new IllegalStateException(
                        "Jina AI returned an unexpected embedding size.");
            }

            float[] vector = new float[DIMENSIONS];

            for (int j = 0; j < DIMENSIONS; j++) {
                JsonNode value = vectorNode.get(j);

                if (value == null || !value.isNumber()) {
                    throw new IllegalStateException(
                            "Jina AI returned an invalid embedding value.");
                }

                vector[j] = (float) value.asDouble();
            }

            embeddings.add(new Embedding(vector, i));
        }

        return new EmbeddingResponse(embeddings);
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

    @Override
    public int dimensions() {
        return DIMENSIONS;
    }
}
