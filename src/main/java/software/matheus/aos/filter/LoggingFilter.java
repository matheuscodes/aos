package software.matheus.aos.filter;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.Collections;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Set;
import java.util.concurrent.atomic.AtomicLong;
import java.util.logging.Logger;

import javax.annotation.Priority;
import javax.ws.rs.container.ContainerRequestContext;
import javax.ws.rs.container.ContainerRequestFilter;
import javax.ws.rs.container.ContainerResponseContext;
import javax.ws.rs.container.ContainerResponseFilter;
import javax.ws.rs.container.PreMatching;
import javax.ws.rs.ext.Provider;

import com.fasterxml.jackson.databind.ObjectMapper;

@Provider
@PreMatching
@Priority(0)
public class LoggingFilter implements ContainerRequestFilter, ContainerResponseFilter {
  private static final Logger LOGGER = Logger.getLogger(LoggingFilter.class.getName());

  private final AtomicLong requestId = new AtomicLong(0);

  private static final Set<String> HEADERS_TO_LOG;

  static {
    Set<String> logSet = new HashSet<String>();
    logSet.add("host");
    logSet.add("origin");
    logSet.add("user-agent");
    logSet.add("x-forwarded-for");
    HEADERS_TO_LOG = Collections.unmodifiableSet(logSet);
  }

  @Override
  public void filter(ContainerRequestContext requestContext) throws IOException {
    ObjectMapper mapper = new ObjectMapper();
    requestContext.setProperty("aaa-RequestId", requestId.getAndIncrement());
    requestContext.setProperty("aaa-RequestTimestamp", System.currentTimeMillis());
    HashMap<String, String> headers = new HashMap<String, String>();
    HashMap<String, Object> request = new HashMap<String, Object>();
    for (String header : requestContext.getHeaders().keySet()) {
      if (HEADERS_TO_LOG.contains(header.toLowerCase())) {
        headers.put(header.toLowerCase(), requestContext.getHeaders().get(header).toString());
      }
    }
    request.put("type", "request");
    request.put("headers", headers);
    request.put("id", requestContext.getProperty("aaa-RequestId").toString());
    request.put("path", requestContext.getUriInfo().getPath());
    request.put("method", requestContext.getMethod());
    request.put("date", LocalDateTime.now().toString());
    LOGGER.info(mapper.writeValueAsString(request));
  }

  @Override
  public void filter(ContainerRequestContext requestContext,
      ContainerResponseContext responseContext) throws IOException {
    ObjectMapper mapper = new ObjectMapper();
    Long requestTimestamp = (Long) requestContext.getProperty("aaa-RequestTimestamp");
    HashMap<String, String> headers = new HashMap<String, String>();
    HashMap<String, Object> response = new HashMap<String, Object>();
    for (String header : responseContext.getHeaders().keySet()) {
      headers.put(header.toLowerCase(), responseContext.getHeaders().get(header).toString());
    }
    response.put("type", "response");
    response.put("headers", headers);
    response.put("requestId", requestContext.getProperty("aaa-RequestId").toString());
    response.put("delay", (System.currentTimeMillis() - requestTimestamp));
    response.put("length", responseContext.getLength());
    response.put("status", responseContext.getStatusInfo().getStatusCode());
    LOGGER.info(mapper.writeValueAsString(response));
  }
}