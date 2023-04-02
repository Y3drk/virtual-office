package pl.agh.virtualoffice.backend.chats.model;

import jakarta.persistence.*;
import pl.agh.virtualoffice.backend.users.model.User;

import java.time.Instant;
import java.time.LocalDateTime;
import java.util.Date;

@Entity(name = "message")
public class Message {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    public Message() {}

    public Message(User senderUser, String text, Chat chat) {
        this.senderUser = senderUser;
        this.text = text;
        this.data = Date.from(Instant.now());
        this.chat = chat;
    }

    @ManyToOne
    private User senderUser;

    private String text;

    @Temporal(TemporalType.TIME)
    private Date data;

    @ManyToOne
//    @JoinColumn(name="chat_id")
    private Chat chat;

    public Date getData() {
        return data;
    }

    public void setData(Date data) {
        this.data = data;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public User getSenderUser() {
        return senderUser;
    }

    public void setSenderUser(User senderUser) {
        this.senderUser = senderUser;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getId() {
        return id;
    }
}
