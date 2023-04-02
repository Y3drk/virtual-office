package pl.agh.virtualoffice.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import pl.agh.virtualoffice.backend.chats.model.Chat;
import pl.agh.virtualoffice.backend.chats.model.Privacy;
import pl.agh.virtualoffice.backend.chats.service.ChatService;
import pl.agh.virtualoffice.backend.controller.messages.ChatMessage;
import pl.agh.virtualoffice.backend.controller.messages.ChatMessageType;
import pl.agh.virtualoffice.backend.controller.messages.UserMessage;
import pl.agh.virtualoffice.backend.users.positions.UserPositionProvider;
import pl.agh.virtualoffice.backend.util.Position;

import java.util.Map;

@Controller
public class SocketController {

    private final UserPositionProvider userPositionProvider;
    private final ChatService chatService;

    @Autowired
    public SocketController(UserPositionProvider userPositionProvider, ChatService chatService) {
        this.userPositionProvider = userPositionProvider;
        this.chatService = chatService;
    }

    @MessageMapping("/positions")
    @SendTo("/topic/positions")
    public Map<Integer, Position> updateAndSendPositions(@Payload UserMessage userMessage) {
        userPositionProvider.updateUserPosition(userMessage.getUserId(),
                new Position(userMessage.getxCoordinate(), userMessage.getyCoordinate()));
        return userPositionProvider.getAllUsersPositions();
    }

    @MessageMapping("/chats")
    @SendTo("/topic/chats")
    public ChatMessage addAndUpdateMessage(@Payload ChatMessage chatMessage){
        if (chatMessage.getChatMessageType() == ChatMessageType.INIT_CHAT) {
            chatMessage.setChatId(chatService.addChat(new Chat(Privacy.PUBLIC)).getId());
        } else if (chatMessage.getChatMessageType() == ChatMessageType.MESSAGE) {
            chatService.addMessageToChat(chatMessage.getChatId(), chatMessage.getSenderId(), chatMessage.getMessage());
        } else if (chatMessage.getChatMessageType() == ChatMessageType.CLOSE_CHAT){
            chatService.addTagToChat(chatMessage.getChatId(), "JEST");
        }
        return chatMessage;
    }


}
