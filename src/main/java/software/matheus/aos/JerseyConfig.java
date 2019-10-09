package software.matheus.aos;

import org.glassfish.jersey.server.ResourceConfig;
import org.springframework.stereotype.Component;

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