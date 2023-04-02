package pl.agh.virtualoffice.backend.chats.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.agh.virtualoffice.backend.chats.model.Chat;
import pl.agh.virtualoffice.backend.chats.model.Message;
import pl.agh.virtualoffice.backend.chats.model.Privacy;
import pl.agh.virtualoffice.backend.chats.repository.ChatRepository;
import pl.agh.virtualoffice.backend.chats.repository.MessageRepository;
import pl.agh.virtualoffice.backend.users.model.User;
import pl.agh.virtualoffice.backend.users.service.UserService;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ChatServiceImpl implements ChatService {


    private final ChatRepository chatRepository;
    private final MessageRepository messageRepository;
    private final UserService userService;


    @Autowired
    public ChatServiceImpl(ChatRepository chatRepository, MessageRepository messageRepository,
                           UserService userService) {
        this.chatRepository = chatRepository;
        this.messageRepository = messageRepository;
        this.userService = userService;
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
    public Optional<Chat> addMessageToChat(int id, int senderId, String message) {
        User sender = userService.getUserById(senderId).orElseThrow(() -> new IllegalStateException("No such user"));
        Chat chat = chatRepository.findById(id).orElseThrow(() -> new IllegalStateException("No such chat"));

        Message newMessage = new Message(sender, message, chat);
        Message savedMessage = messageRepository.save(newMessage);
        chat.addMessage(savedMessage);
        return Optional.of(chatRepository.save(chat));
    }

    @Override
    public Optional<Chat> addTagToChat(int id, String tag) {
        Optional<Chat> chatOptional = chatRepository.findById(id);
        return chatOptional.map(chat -> {
            chat.setTag(tag);
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

    public String getChatMessages(int chatId){
        return chatRepository.findById(chatId).orElseThrow(() -> new IllegalStateException("No such chat"))
                        .getMessages()
                        .stream()
                        .map(message -> "user" +
                                message.getSenderUser().getId() + ": " + message.getText())
                .collect(Collectors.joining(" "));
    }
}
