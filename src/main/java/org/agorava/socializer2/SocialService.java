package org.agorava.socializer2;

import java.util.List;

import javax.inject.Inject;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;

import org.agorava.AgoravaContext;
import org.agorava.api.atinject.Current;
import org.agorava.api.oauth.OAuthSession;
import org.agorava.api.service.OAuthLifeCycleService;
import org.agorava.spi.UserProfile;

/**
 * @author Antoine Sabot-Durand
 */
@Path("")
@Produces("application/json")
public class SocialService {

    @Inject
    @Current
    OAuthSession currentSession;

    @Inject
    OAuthLifeCycleService lifeCycleService;

    @GET
    @Path("/users/current")
    public UserProfile getCurrentProfile() {
    	System.out.println(currentSession);
        return currentSession.getUserProfile();
    }
    
    @GET
    @Path("/sessions")
    public List<OAuthSession> getSessions() {
    	return lifeCycleService.getAllActiveSessions();
    }
    
    @GET
    @Path("/sessions/current")
    public OAuthSession getCurrentSession() {
    	return lifeCycleService.getCurrentSession();
    }
    
    @GET
    @Path("/providers")
    public List<String> getListOfServices() {
    	return AgoravaContext.getListOfServices();
    }

    @GET
    @Path("/providers/{service}/startDance")
    public String startDanceFor(@PathParam("service")String service) {
        return lifeCycleService.startDanceFor(service);
    }


}
