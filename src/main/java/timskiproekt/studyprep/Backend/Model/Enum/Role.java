package timskiproekt.studyprep.Backend.Model.Enum;

import org.springframework.security.core.GrantedAuthority;

public enum Role implements GrantedAuthority {
    ADMIN,NORMAL;

    @Override
    public String getAuthority() {
        return name();
    }
}
