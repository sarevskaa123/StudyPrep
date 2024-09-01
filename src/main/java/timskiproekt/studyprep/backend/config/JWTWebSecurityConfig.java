package timskiproekt.studyprep.backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.password.PasswordEncoder;
import timskiproekt.studyprep.backend.config.filters.JWTAuthenticationFilter;
import timskiproekt.studyprep.backend.config.filters.JWTAuthorizationFilter;
import timskiproekt.studyprep.backend.service.UserService;

@Profile("jwt")
@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(securedEnabled = true, prePostEnabled = true)
public class JWTWebSecurityConfig extends WebSecurityConfigurerAdapter {

    private final PasswordEncoder passwordEncoder;
    private final UserService userService;

    public JWTWebSecurityConfig(PasswordEncoder passwordEncoder, UserService userService) {
        this.passwordEncoder = passwordEncoder;
        this.userService = userService;
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.cors().and().csrf().disable()
                .authorizeRequests()
                .antMatchers("/", "/home", "/quizzes", "/register", "/login", "/api/**")
                .permitAll()
                .anyRequest().authenticated()
                .and()
                .addFilter(new JWTAuthenticationFilter(authenticationManager(), userService, passwordEncoder))
                .addFilter(new JWTAuthorizationFilter(authenticationManager()))
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);
    }

    @Bean
    public JWTAuthorizationFilter authorizationFilter() throws Exception {
        return new JWTAuthorizationFilter(authenticationManager());
    }

    @Bean
    public JWTAuthenticationFilter authenticationFilter() throws Exception {
        return new JWTAuthenticationFilter(authenticationManager(), userService, passwordEncoder);
    }
}
