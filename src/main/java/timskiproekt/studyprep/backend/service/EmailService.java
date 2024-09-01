package timskiproekt.studyprep.backend.service;


public interface EmailService   {
    void sendReminderEmail(String to, String subject, String body);
    }

