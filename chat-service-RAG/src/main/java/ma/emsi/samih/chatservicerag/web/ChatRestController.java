package ma.emsi.samih.chatservicerag.web;

import ma.emsi.samih.chatservicerag.service.ChatService;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/chat")
public class ChatRestController {

    private final ChatService chatService;

    public ChatRestController(ChatService chatService) {
        this.chatService = chatService;
    }

    @PostMapping(value = "/ask", produces = MediaType.TEXT_PLAIN_VALUE)
    public String ask(String question, MultipartFile file) throws IOException {
        if (file != null && !file.isEmpty()) {
            chatService.textifyAndStore(file);
        }
        return chatService.ragChat(question);
    }
}

/*
For Windows Command Prompt:
curl --request POST --url http://localhost:8089/chat/ask --form "question=what is this pdf about?" --form "file=@C:/Users/saads/OneDrive/Documents/Coding/J2EE/Activite2/chat-service-RAG/src/main/resources/Cours MKT TIC.pdf"
*/
