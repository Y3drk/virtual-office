package pl.agh.virtualoffice.backend.chats.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import pl.agh.virtualoffice.backend.chats.model.Message;
import pl.agh.virtualoffice.backend.users.model.User;

import java.util.List;

public interface MessageRepository extends CrudRepository<Message, Integer> {

    List<Message> getAllBySenderUser(User user);
}
