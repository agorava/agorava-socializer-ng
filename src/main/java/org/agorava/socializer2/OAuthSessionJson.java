package org.agorava.socializer2;

import java.io.Serializable;
import java.util.Map;

import org.agorava.api.oauth.OAuthSession;

public class OAuthSessionJson {
	private final String id;
	private boolean hasOAuth;
	private boolean connected;
	private String name;
	private final Map<String, Serializable> extraData;
	
	
	public OAuthSessionJson(String id, boolean hasOAuth, boolean connected, String name, Map<String, Serializable> extraData) {
		this.id = id;
		this.hasOAuth = hasOAuth;
		this.connected = connected;
		this.name = name;
		this.extraData = extraData;
	}
	
	public OAuthSessionJson(OAuthSession session) {
		this(session.getId(), true, session.isConnected(), session.getServiceName(), session.getExtraData());
	}


	public String getId() {
		return id;
	}


	public boolean isConnected() {
		return connected;
	}


	public void setConnected(Boolean connected) {
		this.connected = connected;
	}


	public String getName() {
		return name;
	}


	public void setName(String name) {
		this.name = name;
	}
	
	public boolean isHasOAuth() {
		return hasOAuth;
	}

	public void setHasOAuth(boolean hasOAuth) {
		this.hasOAuth = hasOAuth;
	}


	public Map<String, Serializable> getExtraData() {
		return extraData;
	}
}
