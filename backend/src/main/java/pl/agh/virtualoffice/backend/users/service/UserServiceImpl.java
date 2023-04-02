package pl.agh.virtualoffice.backend.users.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.agh.virtualoffice.backend.users.model.State;
import pl.agh.virtualoffice.backend.users.model.User;
import pl.agh.virtualoffice.backend.users.model.UserStatus;
import pl.agh.virtualoffice.backend.users.repository.UserRepository;

import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    @Autowired
    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public List<User> getUsersByState(State state) {
        return userRepository.findAllByState(state);
    }

    @Override
    public List<User> clearAndAddNewUsers(List<User> users) {
        userRepository.deleteAll();
        return userRepository.saveAll(users);
    }

    @Override
    public Optional<User> getUserById(int id) {
        return userRepository.findById(id);
    }

    @Override
    public Optional<User> updateUserState(int id, State state) {
        Optional<User> userOptional = userRepository.findById(id);
        return userOptional.map(user -> {
            user.setState(state);
            return userRepository.save(user);
        });
    }

    @Override
    public Optional<User> updateUserStatus(int id, UserStatus status) {
        Optional<User> userOptional = userRepository.findById(id);
        return userOptional.map(user -> {
            user.setUserStatus(status);
            return userRepository.save(user);
        });
    }
}
