package pl.agh.virtualoffice.backend.chats.service;

import pl.agh.virtualoffice.backend.chats.model.Chat;
import pl.agh.virtualoffice.backend.users.model.User;

import java.util.List;

public interface ChatService {

    List<Chat> getChatsByUser(User user);

    List<Chat> getChatsByTag(String tag);

    Chat getChatById(int ID);

    List<Chat> getPublicChats();

    List<Chat> getChats();


}
