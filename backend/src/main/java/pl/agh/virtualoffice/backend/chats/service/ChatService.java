package pl.agh.virtualoffice.backend.chats.service;

import pl.agh.virtualoffice.backend.chats.model.Chat;
import pl.agh.virtualoffice.backend.chats.model.Message;
import pl.agh.virtualoffice.backend.chats.model.Privacy;
import pl.agh.virtualoffice.backend.users.model.User;

import java.util.List;
import java.util.Optional;

public interface ChatService {

    Optional<Chat> getChatById(int ID);

    List<Chat> getChatsByPrivacy(Privacy privacy);

    List<Chat> getChats();

    Chat addChat(Chat chat);

    Optional<Chat> addMessageToChat(int id, int senderId, String message);
    Optional<Chat> addTagToChat(int id, String tag);

    Optional<Chat> updateChatPrivacy(int id, Privacy privacy);

    String getChatMessages(int id);

}
