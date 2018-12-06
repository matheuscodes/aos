package software.matheus.aos.api;

import java.util.UUID;

import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import software.matheus.aos.model.Task;
import software.matheus.aos.service.TaskService;

@Service
@Path(TaskResource.PATH)
public class TaskResource {
  public static final String PATH = "/tasks";

  @Autowired
  private TaskService taskService;

  @GET
  @Produces(MediaType.APPLICATION_JSON)
  public Response list() {
    return Response.ok(taskService.allTasks()).build();
  }

  @POST
  @Consumes(MediaType.APPLICATION_JSON)
  @Produces(MediaType.APPLICATION_JSON)
  public Response add(Task task) {
    taskService.addTask(task);
    return Response.status(Response.Status.CREATED).build();
  }

  @Path("/{id}")
  @PUT
  @Consumes(MediaType.APPLICATION_JSON)
  @Produces(MediaType.APPLICATION_JSON)
  public Response update(@PathParam("id") UUID id, Task task) {
    Task selected = taskService.findTask(id);
    if (selected == null) {
      return Response.status(Response.Status.NOT_FOUND).build();
    }
    if (taskService.updateTask(selected, task)) {
      return Response.ok(selected).build();
    } else {
      return Response.status(Response.Status.BAD_REQUEST).build();
    }
  }

  @Path("/{id}")
  @DELETE
  @Produces(MediaType.APPLICATION_JSON)
  public Response delete(@PathParam("id") UUID id) {
    Task selected = taskService.findTask(id);
    if (selected == null) {
      return Response.status(Response.Status.NOT_FOUND).build();
    }
    taskService.removeTask(selected);
    return Response.status(Response.Status.NO_CONTENT).build();
  }
}