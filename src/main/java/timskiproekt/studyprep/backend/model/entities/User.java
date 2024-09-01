package timskiproekt.studyprep.backend.model.entities;

import lombok.Data;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import timskiproekt.studyprep.backend.model.enums.Role;

import javax.persistence.*;
import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.Collection;

@Data
@Entity
@Table(name = "users")
public class User implements UserDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int userId;

    @Column(unique = true)
    private String username;

    @Column(unique = true)
    private String email;

    private String password;

    private Timestamp registerDate;

    @Enumerated(value = EnumType.STRING)
    private Role userRole;

    private boolean isAccountNonExpired = true;
    private boolean isAccountNonLocked = true;
    private boolean isCredentialsNonExpired = true;
    private boolean isEnabled = true;

    public User(String username, String email, String password) {
        this.username = username;
        this.email = email;
        this.password = password;
        this.registerDate = Timestamp.valueOf(LocalDateTime.now());
        this.userRole = Role.NORMAL;
    }

    public User() {
        // Default constructor
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        // You should return the authorities based on userRole
        return null; // Update this to return the correct authorities
    }

    @Override
    public boolean isAccountNonExpired() {
        return isAccountNonExpired;
    }

    @Override
    public boolean isAccountNonLocked() {
        return isAccountNonLocked;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return isCredentialsNonExpired;
    }

    @Override
    public boolean isEnabled() {
        return isEnabled;
    }
}
