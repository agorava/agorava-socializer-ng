package org.agorava.socializer2;

import org.agorava.facebook.Facebook;
import org.agorava.facebook.FeedService;
import org.agorava.facebook.model.Post;

import javax.inject.Inject;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import java.util.List;

/**
 * @author Antoine Sabot-Durand
 */
@Path("/facebook")
@Produces("application/json")
public class FacebookController {

    @Inject
    @Facebook
    FeedService feedService;

    @GET
    @Path("/timeline")
    public List<Post> getHomeTimeline() {
        return feedService.getHomeFeed();
    }

}
