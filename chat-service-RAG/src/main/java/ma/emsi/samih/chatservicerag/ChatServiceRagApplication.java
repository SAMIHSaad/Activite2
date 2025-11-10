package ma.emsi.samih.chatservicerag;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.ai.embedding.EmbeddingModel;
import org.springframework.ai.google.genai.text.GoogleGenAiTextEmbeddingModel;
import org.springframework.ai.google.genai.GoogleGenAiEmbeddingConnectionDetails;
import org.springframework.ai.vectorstore.SimpleVectorStore;
import org.springframework.ai.vectorstore.VectorStore;
import org.springframework.ai.google.genai.GoogleGenAiChatModel;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.ai.google.genai.GoogleGenAiChatOptions; // Added import
import org.springframework.ai.google.genai.text.GoogleGenAiTextEmbeddingOptions; // Added import
import com.google.genai.Client;

@SpringBootApplication
@Configuration
public class ChatServiceRagApplication {

    public static void main(String[] args) {
        SpringApplication.run(ChatServiceRagApplication.class, args);
    }

    @Bean
    public GoogleGenAiChatModel googleGenAiChatModel(Client genAiClient) { // Autowire Client
        // Corrected: call builder() without arguments, then use genAiClient()
        return GoogleGenAiChatModel.builder().genAiClient(genAiClient).build();
    }

    @Bean
    public EmbeddingModel embeddingModel(@Value("${spring.ai.google.genai.api-key}") String apiKey) {
        GoogleGenAiEmbeddingConnectionDetails connectionDetails = GoogleGenAiEmbeddingConnectionDetails.builder()
                .apiKey(apiKey)
                .build();
        GoogleGenAiTextEmbeddingOptions embeddingOptions = GoogleGenAiTextEmbeddingOptions.builder()
                .model(GoogleGenAiTextEmbeddingOptions.DEFAULT_MODEL_NAME)
                .taskType(GoogleGenAiTextEmbeddingOptions.TaskType.RETRIEVAL_DOCUMENT)
                .build();
        return new GoogleGenAiTextEmbeddingModel(connectionDetails, embeddingOptions);
    }

    @Bean
    public VectorStore vectorStore(EmbeddingModel embeddingModel) {
        return SimpleVectorStore.builder(embeddingModel).build();
    }
}
