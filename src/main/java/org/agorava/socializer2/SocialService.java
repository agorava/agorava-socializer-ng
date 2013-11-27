package org.agorava.socializer2;

import org.agorava.AgoravaContext;
import org.agorava.api.atinject.Current;
import org.agorava.api.oauth.OAuthSession;
import org.agorava.api.service.OAuthLifeCycleService;
import org.agorava.api.storage.UserSessionRepository;
import org.agorava.cdi.RestSessionProducer;
import org.agorava.spi.UserProfile;

import javax.inject.Inject;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import java.util.ArrayList;
import java.util.List;

/**
 * @author Antoine Sabot-Durand
 */
@Path("/")
@Produces("application/json")
public class SocialService {

    @Inject
    @Current
    OAuthSession currentSession;

    @Inject
    OAuthLifeCycleService lifeCycleService;

    @Inject
    RestSessionProducer resolver;

    @Inject
    @Current
    UserSessionRepository repo;

    @GET
    @Path("/users/current")
    public UserProfile getCurrentProfile() {
        System.out.println(currentSession);
        return currentSession.getUserProfile();
    }

    @GET
    @Path("/services")
    public List<OAuthSessionJson> getServices() {
        List<OAuthSessionJson> result = new ArrayList<OAuthSessionJson>();
        for (OAuthSession session : lifeCycleService.getAllActiveSessions()) {
            result.add(new OAuthSessionJson(session));
        }

        for (String serviceName : AgoravaContext.getListOfServices()) {
            boolean isIn = false;
            for (OAuthSessionJson session : result) {
                if (session.getName().equals(serviceName)) {
                    isIn = true;
                }
            }

            if (!isIn) {
                result.add(new OAuthSessionJson(OAuthSession.NULL));
            }
        }

        return result;
    }

    @GET
    @Path("/services/current")
    public OAuthSessionJson getCurrentService() {
        return new OAuthSessionJson(lifeCycleService.getCurrentSession());
    }

    @GET
    @Path("/sessions")
    public List<OAuthSessionJson> getSessions() {
        List<OAuthSessionJson> result = new ArrayList<OAuthSessionJson>();
        for (OAuthSession session : lifeCycleService.getAllActiveSessions()) {
            result.add(new OAuthSessionJson(session));
        }
        return result;
    }

    @GET
    @Path("/sessions/current")
    public OAuthSessionJson getCurrentSession() {
        return new OAuthSessionJson(lifeCycleService.getCurrentSession());
    }

    @GET
    @Path("/providers")
    public List<String> getListOfServices() {
        return AgoravaContext.getListOfServices();
    }

    @GET
    @Path("/providers/{service}/startDance")
    public String startDanceFor(@PathParam("service") String service) {
        return lifeCycleService.startDanceFor(service);
    }


}
