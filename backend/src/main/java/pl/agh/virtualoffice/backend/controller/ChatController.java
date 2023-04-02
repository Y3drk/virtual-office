package pl.agh.virtualoffice.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import pl.agh.virtualoffice.backend.chats.model.Chat;
import pl.agh.virtualoffice.backend.chats.model.Message;
import pl.agh.virtualoffice.backend.chats.model.Privacy;
import pl.agh.virtualoffice.backend.chats.service.ChatService;

import java.util.List;

@RestController
@RequestMapping("/chats")
public class ChatController {
    private final ChatService chatService;

    @Autowired
    public ChatController(ChatService chatService) {
        this.chatService = chatService;
    }

    @GetMapping("{chatId}")
    @ResponseBody
    public Chat getChat(@PathVariable int chatId) {
        return chatService.getChatById(chatId).
                orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Chat not found"));
    }

    @GetMapping
    @ResponseBody
    public List<Chat> getChats(@RequestParam(required = false) Privacy privacy) {
        if (privacy == null) {
            return chatService.getChats();
        }
        return chatService.getChatsByPrivacy(privacy);
    }

    @PostMapping
    @ResponseBody
    public Chat createNewChat(@RequestBody Chat chat) {
        return chatService.addChat(chat);
    }

    @PutMapping("{chatId}")
    @ResponseBody
    public Chat addMessageToChat(@PathVariable int chatId,
                             @RequestBody String string) {
        return chatService.addMessageToChat(chatId,5, string).
                orElseThrow(() -> new ResponseStatusException(
                HttpStatus.NOT_FOUND, "Chat not found"));
    }
}
