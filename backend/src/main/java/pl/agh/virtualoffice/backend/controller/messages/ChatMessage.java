package pl.agh.virtualoffice.backend.controller.messages;

import java.time.DateTimeException;
import java.time.format.DateTimeFormatter;
import java.util.Date;

public class ChatMessage {
    private int senderId;
    private int chatId;

    private String message;
    private ChatMessageType chatMessageType;
    private DateTimeFormatter dateTime;


    public void setSenderId(int senderId) {
        this.senderId = senderId;
    }

    public void setChatId(int chatId) {
        this.chatId = chatId;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public void setChatMessageType(ChatMessageType chatMessageType) {
        this.chatMessageType = chatMessageType;
    }

    public void setDateTime(DateTimeFormatter dateTime) {
        this.dateTime = dateTime;
    }

    public int getSenderId() {
        return senderId;
    }

    public int getChatId() {
        return chatId;
    }

    public String getMessage() {
        return message;
    }

    public ChatMessageType getChatMessageType() {
        return chatMessageType;
    }

    public DateTimeFormatter getDateTime() {
        return dateTime;
    }
}
