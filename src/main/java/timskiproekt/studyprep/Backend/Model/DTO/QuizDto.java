package timskiproekt.studyprep.Backend.Model.DTO;

import lombok.Data;

@Data
public class QuizDto {

    private String  quizTitle;
    private String quizDescription;
    private int subject;
    private int userId;


    public QuizDto(){

    }
    public QuizDto(String quizTitle, String quizDescription, int subject) {
        this.quizTitle = quizTitle;
        this.quizDescription = quizDescription;
        this.subject = subject;
    }

    public String getQuizName(){
        return quizTitle;
    }

}
