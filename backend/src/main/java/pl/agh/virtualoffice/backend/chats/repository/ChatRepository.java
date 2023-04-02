package pl.agh.virtualoffice.backend.chats.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.agh.virtualoffice.backend.chats.model.Chat;
import pl.agh.virtualoffice.backend.chats.model.Message;
import pl.agh.virtualoffice.backend.chats.model.Privacy;

import java.util.List;
import java.util.Optional;


public interface ChatRepository extends JpaRepository<Chat, Integer> {

    List<Chat> getAllByTagsContaining(String tags);
//    List<Chat> getAllByMessagesContaining(List<Message> messages);
    Optional<Chat> getAllById(int ID);
    List<Chat> getAllByPrivacy(Privacy privacy);

}
