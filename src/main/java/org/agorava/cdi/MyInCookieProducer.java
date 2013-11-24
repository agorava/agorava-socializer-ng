package org.agorava.cdi;

import org.agorava.AgoravaConstants;
import org.agorava.api.atinject.Current;
import org.agorava.api.oauth.OAuthSession;
import org.agorava.api.storage.UserSessionRepository;
import org.agorava.cdi.deltaspike.DifferentOrNull;
import org.apache.deltaspike.core.api.config.ConfigProperty;
import org.apache.deltaspike.core.api.exclude.Exclude;
import org.apache.deltaspike.servlet.api.Web;

import javax.enterprise.context.RequestScoped;
import javax.enterprise.inject.Produces;
import javax.enterprise.inject.spi.InjectionPoint;
import javax.inject.Inject;
import javax.inject.Named;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;

/**
 * @author Antoine Sabot-Durand
 */
@RequestScoped
@Exclude(onExpression = InApplicationProducer.RESOLVER + ",mycookie", interpretedBy = DifferentOrNull.class)
public class MyInCookieProducer extends InRequestProducer {

    @Inject
    @ConfigProperty(name = AgoravaConstants.RESOLVER_COOKIE_LIFE_PARAM, defaultValue = "-1")
    Integer cookielife;


    @Inject
    @Web
    private HttpServletResponse response;

    @Override
    protected String getRepoId() {
        String id;
        if (request.getCookies() != null)
            for (Cookie cookie : request.getCookies()) {
                if (cookie.getName().equals(AgoravaConstants.RESOLVER_REPO_COOKIE_NAME))
                    return cookie.getValue();
            }
        return null;
    }

    private void setCookie(String id) {
        Cookie cookie = new Cookie(AgoravaConstants.RESOLVER_REPO_COOKIE_NAME, id);
        cookie.setMaxAge(cookielife);
        String path = request.getContextPath().isEmpty() ? "/" : request.getContextPath();
        cookie.setPath(request.getContextPath());
        response.addCookie(cookie);
    }

    @Produces
    @Current
    @Named("currentRepo")
    @RequestScoped
    public UserSessionRepository getCurrentRepository() {
        String id = getRepoId();
        if (id == null || globalRepository.get(id) == null) {
            UserSessionRepository repo = globalRepository.createNew();
            setCookie(repo.getId());
            return globalRepository.createNew();
        } else
            return globalRepository.get(id);
    }


    @Produces
    public OAuthSession resolveSession(InjectionPoint ip, @Current UserSessionRepository repository) {
        return super.resolveSession(ip, repository);
    }

    @Produces
    @Named
    @Override
    public OAuthSession getCurrentSession(@Current UserSessionRepository repository) {
        return super.getCurrentSession(repository);
    }
}
