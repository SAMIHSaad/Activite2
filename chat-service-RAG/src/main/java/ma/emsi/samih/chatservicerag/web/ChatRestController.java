package ma.emsi.samih.chatservicerag.web;

import ma.emsi.samih.chatservicerag.service.ChatService;
import org.springframework.ai.document.Document;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/chat")
@CrossOrigin(origins = "http://localhost:4200")
public class ChatRestController {

    private final ChatService chatService;

    public ChatRestController(ChatService chatService) {
        this.chatService = chatService;
    }

    @PostMapping(value = "/ask", produces = MediaType.TEXT_PLAIN_VALUE)
    public String ask(String question, MultipartFile file) throws IOException {
        List<Document> uploadedDocs = null;
        if (file != null && !file.isEmpty()) {
            uploadedDocs = chatService.textifyAndStore(file);
        }
        return chatService.ragChat(question, uploadedDocs);
    }

    @PostMapping(value = "/ask-text", produces = MediaType.TEXT_PLAIN_VALUE)
    public String askText(String question) {
        return chatService.ragChat(question);
    }

    @PostMapping(value = "/direct-ask", produces = MediaType.TEXT_PLAIN_VALUE)
    public String directAsk(String question) {
        return chatService.directChat(question);
    }
}

/*
For Windows Command Prompt:
curl --request POST --url http://localhost:8089/chat/ask --form "question=what is this pdf about?" --form "file=@C:/Users/saads/OneDrive/Documents/Coding/J2EE/Activite2/chat-service-RAG/src/main/resources/Cours MKT TIC.pdf"
curl -X POST http://localhost:8089/chat/direct-ask -F "question=what is Morocco Capital"
*/
