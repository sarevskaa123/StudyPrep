package timskiproekt.studyprep.backend.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import timskiproekt.studyprep.backend.model.entities.User;
import timskiproekt.studyprep.backend.service.EmailReminderService;
import timskiproekt.studyprep.backend.service.EmailService;
import timskiproekt.studyprep.backend.service.UserService;

import java.util.List;

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