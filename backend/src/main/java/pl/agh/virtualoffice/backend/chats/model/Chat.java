package pl.agh.virtualoffice.backend.chats.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import pl.agh.virtualoffice.backend.users.model.User;

import java.util.ArrayList;
import java.util.List;

@Entity(name = "chat")
public class Chat {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

    private String tag;

    private Privacy privacy;

    @OneToMany(mappedBy = "chat")
    private List<Message> messages;

    public Chat() {
    }

    public Chat(Privacy privacy) {
        this.tag = "noTag";
        this.privacy = privacy;
        this.messages = new ArrayList<>();
    }

    public Privacy getPrivacy() {
        return privacy;
    }

    public void setPrivacy(Privacy privacy) {
        this.privacy = privacy;
    }

    public String getTag() {
        return tag;
    }

    public void setTag(String tag) {
        this.tag = tag;
    }

    public List<Message> getMessages() {
        return messages;
    }

    public void setMessages(List<Message> messages) {
        this.messages = messages;
    }

    public void addMessage(Message message) {
        this.messages.add(message);
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getId() {
        return id;
    }
}
