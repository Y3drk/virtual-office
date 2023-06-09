package pl.agh.virtualoffice.backend.users.model;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String name;

    @Enumerated(EnumType.STRING)
    private State state;

    @Enumerated(EnumType.STRING)
    private Status status;

    public User() {
    }

    public User(String name, State state, Status userStatus) {
        this.name = name;
        this.state = state;
        this.status = userStatus;
    }

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status userStatus) {
        this.status = userStatus;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public State getState() {
        return state;
    }

    public void setState(State state) {
        this.state = state;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getId() {
        return id;
    }
}
