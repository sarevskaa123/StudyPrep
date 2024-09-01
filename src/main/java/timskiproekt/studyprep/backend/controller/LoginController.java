package timskiproekt.studyprep.backend.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import timskiproekt.studyprep.backend.config.filters.JWTAuthenticationFilter;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@RestController
@CrossOrigin(origins = "http://localhost:3000",allowedHeaders = "*")
@RequestMapping("/api/login")
public class LoginController {

    private final JWTAuthenticationFilter filter;

    public LoginController(JWTAuthenticationFilter filter) {
        this.filter = filter;
    }


    @PostMapping
    public Object doLogin(HttpServletRequest request,
                          HttpServletResponse response) throws JsonProcessingException {
        Authentication auth = this.filter.attemptAuthentication(request, response);
       // return this.filter.generateJwt(response, auth);
        return auth.getPrincipal();
    }

}