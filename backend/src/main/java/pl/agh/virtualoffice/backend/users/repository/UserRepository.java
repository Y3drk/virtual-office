package pl.agh.virtualoffice.backend.users.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import pl.agh.virtualoffice.backend.users.model.State;
import pl.agh.virtualoffice.backend.users.model.User;

import java.util.List;

public interface UserRepository extends JpaRepository<User, Integer> {

    List<User> findAllByState(State state);
}
