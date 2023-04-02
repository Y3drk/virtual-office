package pl.agh.virtualoffice.backend.chats.model;

import jakarta.persistence.*;
import pl.agh.virtualoffice.backend.users.model.User;

import java.util.ArrayList;
import java.util.List;

@Entity(name = "chat")
public class Chat {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

    @ElementCollection
    private List<String> tags;

    private Privacy privacy;

    @OneToMany
    private List<Message> messages;
    @OneToMany
    private List<User> users;

    public Chat() {
    }

    public Chat(Privacy privacy) {
        this.tags = List.of("TAG-NO-TAG");
        this.privacy = privacy;
    }

    public Privacy getPrivacy() {
        return privacy;
    }

    public void setPrivacy(Privacy privacy) {
        this.privacy = privacy;
    }

    public List<String> getTags() {
        return tags;
    }

    public void setTags(List<String> tags) {
        this.tags = tags;
    }

    public void addTag(String tag) {
        if (this.tags.size() == 1 && this.tags.contains("TAG-NO-TAG")) {
            this.tags = List.of(tag);
        } else {
            this.tags.add(tag);
        }
    }

    public List<User> getUsers() {
        return users;
    }

    public void setUsers(List<User> users) {
        this.users = users;
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
