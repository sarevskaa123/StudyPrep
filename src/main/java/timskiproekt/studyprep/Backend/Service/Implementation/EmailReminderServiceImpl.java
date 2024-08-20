package timskiproekt.studyprep.Backend.Service.Implementation;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import timskiproekt.studyprep.Backend.Model.entities.User;
import timskiproekt.studyprep.Backend.Service.EmailReminderService;
import timskiproekt.studyprep.Backend.Service.EmailService;
import timskiproekt.studyprep.Backend.Service.UserService;

import java.util.List;
import java.util.Optional;

@Service
public class EmailReminderServiceImpl implements EmailReminderService {

    @Autowired
    private UserService userService;

    @Autowired
    private EmailService emailService;

    @Override
    @Scheduled(cron = "0 0 9 * * SUN")
    public void sendReminderEmails() {
        List<User> users = userService.findAll();
        for (User user : users) {
            String to = user.getEmail();
            String subject = "Quiz Reminder";
            String body = "Reminder: You should study more.";
            emailService.sendReminderEmail(to, subject, body);
        }
    }
}