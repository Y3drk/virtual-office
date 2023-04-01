package pl.agh.virtualoffice.backend.users.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.agh.virtualoffice.backend.users.model.User;


public interface UserRepository extends JpaRepository<Integer, User> {

}
