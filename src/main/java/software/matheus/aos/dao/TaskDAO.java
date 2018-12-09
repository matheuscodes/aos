package software.matheus.aos.dao;

import java.util.List;
import java.util.UUID;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Root;

import org.springframework.stereotype.Repository;

import software.matheus.aos.model.Task;
import software.matheus.aos.model.Task_;

@Repository
public class TaskDAO extends AbstractDAO<Task> {

  @PersistenceContext
  private EntityManager entityManager;

  @Override
  protected EntityManager getEntityManager() {
    return entityManager;
  }

  public Task findTask(UUID id) {
    CriteriaBuilder queryBuilder = getEntityManager().getCriteriaBuilder();
    CriteriaQuery<Task> query = queryBuilder.createQuery(Task.class);
    Root<Task> root = query.from(Task.class);
    query.where(queryBuilder.equal(root.get(Task_.id), id));
    query.select(root);
    List<Task> results = getEntityManager().createQuery(query).getResultList();
    if (results.isEmpty()) {
      return null;
    } else {
      return results.get(0);
    }
  }

  public List<Task> allTasks() {
    CriteriaBuilder queryBuilder = getEntityManager().getCriteriaBuilder();
    CriteriaQuery<Task> query = queryBuilder.createQuery(Task.class);
    Root<Task> root = query.from(Task.class);
    query.select(root);
    query.orderBy(queryBuilder.asc(root.get(Task_.dueDate)));
    return getEntityManager().createQuery(query).getResultList();
  }
}
