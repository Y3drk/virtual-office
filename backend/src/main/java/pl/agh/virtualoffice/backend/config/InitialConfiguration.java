package pl.agh.virtualoffice.backend.config;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import pl.agh.virtualoffice.backend.users.model.User;
import pl.agh.virtualoffice.backend.users.repository.UserRepository;

import static pl.agh.virtualoffice.backend.users.model.State.NOT_LOGGED;
import static pl.agh.virtualoffice.backend.users.model.UserStatus.AFK;

@Configuration
public class InitialConfiguration {

    @Bean
    public CommandLineRunner CommandLineRunner(UserRepository userRepository) {
        return args -> {
            if (userRepository.count() == 0) {
                userRepository.save(new User("Swiety Mikolaj", NOT_LOGGED, AFK));
                userRepository.save(new User("Harry Potter", NOT_LOGGED, AFK));
            }
        };
    }
}
