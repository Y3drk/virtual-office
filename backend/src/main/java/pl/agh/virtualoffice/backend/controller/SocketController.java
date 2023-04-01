package pl.agh.virtualoffice.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.annotation.SendToUser;
import org.springframework.stereotype.Controller;
import pl.agh.virtualoffice.backend.controller.messages.UserMessage;
import pl.agh.virtualoffice.backend.users.positions.UserPositionProvider;
import pl.agh.virtualoffice.backend.util.Position;

import java.util.Map;

@Controller
public class SocketController {

    private final UserPositionProvider userPositionProvider;

    @Autowired
    public SocketController(UserPositionProvider userPositionProvider) {
        this.userPositionProvider = userPositionProvider;
    }

    @MessageMapping("/positions")
    @SendToUser("/topic/positions")
    public Map<Integer, Position> updateAndSendPositions(@Payload UserMessage userMessage) {
        userPositionProvider.updateUserPosition(userMessage.getUserId(),
                new Position(userMessage.getXCoordinate(), userMessage.getYCoordinate()));
        return userPositionProvider.getAllUsersPositions();
    }
}
