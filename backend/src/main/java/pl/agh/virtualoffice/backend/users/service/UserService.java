package pl.agh.virtualoffice.backend.users.service;

import pl.agh.virtualoffice.backend.users.model.State;
import pl.agh.virtualoffice.backend.users.model.User;

import java.util.List;

public interface UserService {

    List<User> getUsersByState(State state);
}
