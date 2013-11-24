package org.agorava.socializer2;

import org.agorava.AgoravaContext;
import org.agorava.api.atinject.Current;
import org.agorava.api.oauth.OAuthSession;
import org.agorava.api.service.OAuthLifeCycleService;
import org.agorava.spi.UserProfile;

import javax.inject.Inject;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import java.util.List;

/**
 * @author Antoine Sabot-Durand
 */
@Path("/social")
@Produces("application/json")
public class SocialService {

    @Inject
    @Current
    OAuthSession currentSession;

    @Inject
    OAuthLifeCycleService lifeCycleService;


    @GET
    @Path("/providers")
    public List<String> getListOfServices() {
        return AgoravaContext.getListOfServices();
    }

    @GET
    @Path("/currentProfile")
    public UserProfile getCurrentProfile() {
        return currentSession.getUserProfile();
    }

    @GET
    @Path("/startDanceFor/{service}")
    public String startDanceFor(@PathParam("service")String service) {
        return lifeCycleService.startDanceFor(service);
    }


}
