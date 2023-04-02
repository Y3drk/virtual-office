package pl.agh.virtualoffice.backend.chats.service;

import org.springframework.stereotype.Service;
import pl.agh.virtualoffice.backend.chats.model.Chat;
import pl.agh.virtualoffice.backend.chats.model.Message;
import pl.agh.virtualoffice.backend.chats.repository.MessageRepository;
import pl.agh.virtualoffice.backend.users.model.User;

import java.util.List;

@Service
public class MessageServiceImpl implements MessageService{
    private final MessageRepository messageRepository;

    public MessageServiceImpl(MessageRepository messageRepository) {
        this.messageRepository = messageRepository;
    }

    @Override
    public List<Chat> getMessageByUser(User user) {
        return null;
    }

    @Override
    public List<Message> getMessages() {
        return (List<Message>) messageRepository.findAll();
    }
}
