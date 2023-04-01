package pl.agh.virtualoffice.backend.chats.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import pl.agh.virtualoffice.backend.users.model.User;

import java.util.Date;

@Entity(name = "message")
public class Message {
    @Id
    private Long id;

    @ManyToOne
    private User senderUser;

    private String text;

    private Date data;

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
