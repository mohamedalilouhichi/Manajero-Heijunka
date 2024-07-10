package heijunka.control;

import heijunka.entite.User;
import heijunka.repository.UserRepo;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@AllArgsConstructor
@RequestMapping("/user")
public class UserControl {
    @Autowired
    private UserRepo userRepository;

    @PostMapping("/create")
    public String createUser(@RequestBody User user) {
        userRepository.save(user);
        return "User created successfully!";
    }
}
