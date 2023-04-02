package pl.agh.virtualoffice.backend.controler;

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
import pl.agh.virtualoffice.backend.users.model.UserStatus;
import pl.agh.virtualoffice.backend.users.service.UserService;

import java.util.List;

import static pl.agh.virtualoffice.backend.users.model.State.NOT_LOGGED;

@RestController
@RequestMapping("/users")
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    @ResponseBody
    public List<User> getUsersByState(@RequestParam State state) {
        return userService.getUsersByState(state);
    }

    @PostMapping
    @ResponseBody
    public List<User> addNewUsers(@RequestBody List<User> users) {
        users.forEach(user -> user.setState(NOT_LOGGED));
        return userService.clearAndAddNewUsers(users);
    }

    @PutMapping("/{userId}")
    @ResponseBody
    public User changeUserState(@PathVariable int userId, @RequestParam State state) {
        return userService.updateUserState(userId, state).orElseThrow(() -> new ResponseStatusException(
                HttpStatus.NOT_FOUND, "User not found"));
    }

    @PutMapping("/status/{userId}")
    @ResponseBody
    public User changeUserStatus(@PathVariable int userId, @RequestParam UserStatus userStatus) {
        return userService.updateUserStatus(userId, userStatus).orElseThrow(() -> new ResponseStatusException(
                HttpStatus.NOT_FOUND, "User not found"));
    }
}
