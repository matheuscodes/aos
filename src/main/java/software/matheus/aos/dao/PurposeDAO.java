package software.matheus.aos.dao;

import java.util.List;
import java.util.UUID;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Root;

import org.springframework.stereotype.Repository;

import software.matheus.aos.model.Purpose;
import software.matheus.aos.model.Purpose_;

@Repository
public class PurposeDAO extends AbstractDAO<Purpose> {

  @PersistenceContext
  private EntityManager entityManager;

  @Override
  protected EntityManager getEntityManager() {
    return entityManager;
  }

  public Purpose findPurpose(UUID id) {
    CriteriaBuilder queryBuilder = getEntityManager().getCriteriaBuilder();
    CriteriaQuery<Purpose> query = queryBuilder.createQuery(Purpose.class);
    Root<Purpose> root = query.from(Purpose.class);
    query.where(queryBuilder.equal(root.get(Purpose_.id), id));
    query.select(root);
    List<Purpose> results = getEntityManager().createQuery(query).getResultList();
    if (results.isEmpty()) {
      return null;
    } else {
      return results.get(0);
    }
  }

  public List<Purpose> allPurposes() {
    CriteriaBuilder queryBuilder = getEntityManager().getCriteriaBuilder();
    CriteriaQuery<Purpose> query = queryBuilder.createQuery(Purpose.class);
    Root<Purpose> root = query.from(Purpose.class);
    query.select(root);
    query.orderBy(queryBuilder.desc(root.get(Purpose_.createdAt)));
    return getEntityManager().createQuery(query).getResultList();
  }
  
  
}
