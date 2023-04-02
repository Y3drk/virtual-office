package pl.agh.virtualoffice.backend.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import pl.agh.virtualoffice.backend.users.model.User;
import pl.agh.virtualoffice.backend.users.repository.UserRepository;

import static pl.agh.virtualoffice.backend.users.model.State.NOT_LOGGED;
import static pl.agh.virtualoffice.backend.users.model.Status.AFK;

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

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**").allowCredentials(true).allowedOriginPatterns("*")
                        .allowedMethods("*");
            }
        };
    }
}
