package pl.agh.virtualoffice.backend.chats.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.agh.virtualoffice.backend.chats.model.Message;
import pl.agh.virtualoffice.backend.users.model.User;

import java.util.List;

public interface MessageRepository extends JpaRepository<Message, Integer> {

    List<Message> getAllBySenderUser(User user);
}
