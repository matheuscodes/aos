package software.matheus.aos.service;

import java.util.LinkedList;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import software.matheus.aos.dao.TaskDAO;
import software.matheus.aos.model.Task;

@Service
public class TaskService {

  @Autowired
  private TaskDAO taskDao;

  public Task findTask(UUID id) {
    return taskDao.findTask(id);
  }

  public List<Task> allTasks() {
    List<Task> results = taskDao.allTasks();
    if (results == null) {
      results = new LinkedList<Task>();
    }
    return results;
  }

  public void removeTask(Task task) {
    taskDao.delete(task);
  }

  public void addTask(Task task) {
    taskDao.save(task);
  }

  public boolean updateTask(Task selected, Task task) {
    //if (selected.getId() != task.getId()) {
      return false;
    //}
    //taskDao.update(task);
    //return true;
  }

}