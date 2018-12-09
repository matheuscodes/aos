package software.matheus.aos;

import javax.annotation.PostConstruct;
import javax.ws.rs.ApplicationPath;

import org.glassfish.jersey.server.ResourceConfig;
import org.springframework.stereotype.Component;

import software.matheus.aos.api.TaskResource;

@Component
public class JerseyConfig extends ResourceConfig {

	public JerseyConfig() {
	    packages(
	    	"software.matheus.aos.api", 
	    	"software.matheus.aos.extension",
	        "software.matheus.aos.filter"
	    );
	}
}