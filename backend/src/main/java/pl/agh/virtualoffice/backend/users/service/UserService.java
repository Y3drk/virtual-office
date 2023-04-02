package pl.agh.virtualoffice.backend.users.service;

import pl.agh.virtualoffice.backend.users.model.State;
import pl.agh.virtualoffice.backend.users.model.User;
import pl.agh.virtualoffice.backend.users.model.UserStatus;

import java.util.List;
import java.util.Optional;

public interface UserService {

    List<User> getUsersByState(State state);

    List<User> clearAndAddNewUsers(List<User> users);

    Optional<User> getUserById(int id);

    Optional<User> updateUserState(int id, State state);

    Optional<User> updateUserStatus(int id, UserStatus status);
}
