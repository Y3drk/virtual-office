package pl.agh.virtualoffice.backend.chats.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.agh.virtualoffice.backend.chats.model.Chat;
import pl.agh.virtualoffice.backend.chats.model.Message;
import pl.agh.virtualoffice.backend.chats.model.Privacy;
import pl.agh.virtualoffice.backend.chats.repository.ChatRepository;
import pl.agh.virtualoffice.backend.chats.repository.MessageRepository;
import pl.agh.virtualoffice.backend.users.model.User;

import java.util.List;

@Service
public class ChatServiceImpl implements ChatService {


    private final ChatRepository chatRepository;
    private final MessageRepository messageRepository;

    @Autowired
    public ChatServiceImpl(ChatRepository chatRepository, MessageRepository messageRepository) {
        this.chatRepository = chatRepository;
        this.messageRepository = messageRepository;
    }


    @Override
    public List<Chat> getChatsByUser(User user) {
        List<Message> messages = messageRepository.getAllBySenderUser(user);
        return chatRepository.getAllByMessagesContaining(messages);
    }

    @Override
    public List<Chat> getChatsByTag(String tag) {
        return chatRepository.getAllByTagsContaining(tag);
    }

    @Override
    public Chat getChatById(int ID) {
        return chatRepository.getAllById(ID);
    }

    @Override
    public List<Chat> getPublicChats() {
        return chatRepository.getAllByPrivacy(Privacy.PUBLIC);
    }

    @Override
    public List<Chat> getChats() {
        return chatRepository.findAll();
    }
}
