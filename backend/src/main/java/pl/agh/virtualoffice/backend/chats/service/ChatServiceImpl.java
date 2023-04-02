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
import java.util.Optional;

@Service
public class ChatServiceImpl implements ChatService {


    private final ChatRepository chatRepository;
    private final MessageRepository messageRepository;

    @Autowired
    public ChatServiceImpl(ChatRepository chatRepository, MessageRepository messageRepository) {
        this.chatRepository = chatRepository;
        this.messageRepository = messageRepository;
    }


//    @Override
//    public List<Chat> getChatsByUser(User user) {
//        List<Message> messages = messageRepository.getAllBySenderUser(user);
//        return chatRepository.getAllByMessagesContaining(messages);
//    }

    @Override
    public List<Chat> getChatsByTag(String tag) {
        return chatRepository.getAllByTagsContaining(tag);
    }

    @Override
    public Optional<Chat> getChatById(int ID) {
        return chatRepository.getAllById(ID);
    }

    @Override
    public List<Chat> getChatsByPrivacy(Privacy privacy) {
        return chatRepository.getAllByPrivacy(privacy);
    }

    @Override
    public List<Chat> getChats() {
        return chatRepository.findAll();
    }

    @Override
    public Chat addChat(Chat chat) {
        return chatRepository.save(chat);
    }

    @Override
    public Optional<Chat> addMessageToChat(int id, Message message) {
        messageRepository.save(message);
        Optional<Chat> chatOptional = chatRepository.findById(id);
        return chatOptional.map(chat -> {
            chat.addMessage(message);
            return chatRepository.save(chat);
        });
    }

    @Override
    public Optional<Chat> addTagToChat(int id, String tag) {
        Optional<Chat> chatOptional = chatRepository.findById(id);
        return chatOptional.map(chat -> {
            chat.addTag(tag);
            return chatRepository.save(chat);
        });
    }


    @Override
    public Optional<Chat> updateChatPrivacy(int id, Privacy privacy) {
        Optional<Chat> chatOptional = chatRepository.findById(id);
        return chatOptional.map(chat -> {
            chat.setPrivacy(privacy);
            return chatRepository.save(chat);
        });
    }
}
