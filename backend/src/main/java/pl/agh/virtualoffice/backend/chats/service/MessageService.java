package pl.agh.virtualoffice.backend.chats.service;

import pl.agh.virtualoffice.backend.chats.model.Chat;
import pl.agh.virtualoffice.backend.users.model.User;

import java.util.List;

public interface MessageService {

    List<Chat> getMessageByUser(User user);

}
