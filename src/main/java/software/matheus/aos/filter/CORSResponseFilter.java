package software.matheus.aos.filter;
import java.io.IOException;

import javax.annotation.Priority;
import javax.ws.rs.Priorities;
import javax.ws.rs.container.ContainerRequestContext;
import javax.ws.rs.container.ContainerResponseContext;
import javax.ws.rs.container.ContainerResponseFilter;
import javax.ws.rs.container.PreMatching;
import javax.ws.rs.ext.Provider;

@Provider
@PreMatching
@Priority(Priorities.HEADER_DECORATOR)
public class CORSResponseFilter implements ContainerResponseFilter {
  // TODO organize this better, more securely.
  @Override
  public void filter(ContainerRequestContext requestContext,
      ContainerResponseContext responseContext) throws IOException {
    responseContext.getHeaders().add("Access-Control-Allow-Origin", "*");
    responseContext.getHeaders().add("Access-Control-Allow-Methods",
        "POST, GET, PUT, DELETE, OPTIONS");
    responseContext.getHeaders().add("X-Powered-By", "matheus.software");
  }
}