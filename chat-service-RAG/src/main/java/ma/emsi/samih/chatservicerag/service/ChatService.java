package ma.emsi.samih.chatservicerag.service;

import org.springframework.ai.chat.client.ChatClient;
import org.springframework.ai.chat.prompt.Prompt;
import org.springframework.ai.chat.prompt.PromptTemplate;
import org.springframework.ai.document.Document;
import org.springframework.ai.reader.pdf.PagePdfDocumentReader;
import org.springframework.ai.transformer.splitter.TokenTextSplitter;
import org.springframework.ai.vectorstore.SearchRequest;
import org.springframework.ai.vectorstore.VectorStore;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.ai.google.genai.GoogleGenAiChatModel;
import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class ChatService {

    private final ChatClient chatClient;
    private final VectorStore vectorStore;

    public ChatService(GoogleGenAiChatModel googleGenAiChatModel, VectorStore vectorStore) {
        this.chatClient = ChatClient.builder(googleGenAiChatModel).build();
        this.vectorStore = vectorStore;
    }

    public String ragChat(String question) {
        // 1. Retrieve similar documents from vector store
        List<Document> similarDocs = vectorStore.similaritySearch(
                SearchRequest.builder().query(question).topK(4).build()
        );

        // 2. Extract and combine document content as context
        String context = similarDocs.stream()
                .map(Document::getText)
                .collect(Collectors.joining(System.lineSeparator()));

        // 3. Create prompt template with context
        String promptTemplate = """
                You are a helpful assistant.
                Answer the following question based only on the provided context.
                If the answer is not in the context, say "I don't have information about that".
                
                Context:
                {context}
                
                Question:
                {question}
                """;

        PromptTemplate template = new PromptTemplate(promptTemplate);
        Prompt prompt = template.create(Map.of("context", context, "question", question));

        // 4. Generate response using ChatClient
        return chatClient.prompt(prompt).call().content();
    }

    public void textifyAndStore(MultipartFile file) throws IOException {
        if (file.isEmpty()) {
            throw new IOException("Failed to store empty file.");
        }

        // 1. Convert MultipartFile to Resource
        Resource pdfResource = new ByteArrayResource(file.getBytes());

        // 2. Read PDF and extract documents
        PagePdfDocumentReader pdfReader = new PagePdfDocumentReader(pdfResource);
        List<Document> documents = pdfReader.read();

        // 3. Split documents into smaller chunks for better embedding quality
        TokenTextSplitter splitter = new TokenTextSplitter();
        List<Document> chunks = splitter.apply(documents);

        // 4. Store documents in VectorStore (automatically converts to embeddings)
        vectorStore.add(chunks);
    }
}
