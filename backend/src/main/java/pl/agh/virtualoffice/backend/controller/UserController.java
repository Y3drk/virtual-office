package pl.agh.virtualoffice.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;
import pl.agh.virtualoffice.backend.users.model.State;
import pl.agh.virtualoffice.backend.users.model.User;
import pl.agh.virtualoffice.backend.users.positions.UserPositionProvider;
import pl.agh.virtualoffice.backend.users.model.UserStatus;
import pl.agh.virtualoffice.backend.users.service.UserService;
import pl.agh.virtualoffice.backend.util.Position;

import java.util.List;
import java.util.Map;

import static pl.agh.virtualoffice.backend.users.model.State.NOT_LOGGED;
import static pl.agh.virtualoffice.backend.users.model.UserStatus.AFK;

@RestController
@RequestMapping("/users")
public class UserController {

    public static final String NOT_LOGGED_STRING = "NOT_LOGGED";
    private final UserService userService;
    private final UserPositionProvider userPositionProvider;

    @Autowired
    public UserController(UserService userService, UserPositionProvider userPositionProvider) {
        this.userService = userService;
        this.userPositionProvider = userPositionProvider;
    }

    @GetMapping
    @ResponseBody
    public List<User> getUsersByState(@RequestParam(defaultValue = NOT_LOGGED_STRING) State state) {
        return userService.getUsersByState(state);
    }

    @PostMapping
    @ResponseBody
    public List<User> addNewUsers(@RequestBody List<User> users) {
        users.forEach(user -> {
            user.setState(NOT_LOGGED);
            user.setUserStatus(AFK);
        });
        return userService.clearAndAddNewUsers(users);
    }

    @PutMapping("/{userId}")
    @ResponseBody
    public User changeUserState(@PathVariable int userId, @RequestParam State state) {
        return userService.updateUserState(userId, state).orElseThrow(() -> new ResponseStatusException(
                HttpStatus.NOT_FOUND, "User not found"));
    }

    @GetMapping("positions")
    @ResponseBody
    public Map<Integer, Position> getAllUserPositions() {
        return userPositionProvider.getAllUsersPositions();
    }

    @PutMapping("/status/{userId}")
    @ResponseBody
    public User changeUserStatus(@PathVariable int userId, @RequestParam UserStatus userStatus) {
        return userService.updateUserStatus(userId, userStatus).orElseThrow(() -> new ResponseStatusException(
                HttpStatus.NOT_FOUND, "User not found"));
    }
}
