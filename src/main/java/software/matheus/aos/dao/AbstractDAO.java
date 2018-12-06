package software.matheus.aos.dao;


import java.lang.reflect.ParameterizedType;
import java.util.List;

import javax.persistence.EntityManager;

import org.springframework.transaction.annotation.Transactional;

@Transactional
public abstract class AbstractDAO<E> {

  protected E findById(Object id) {
    E entity = getEntityManager().find(getEntityClass(), id);
    return entity;
  }

  @SuppressWarnings("unchecked")
  protected List<E> findAll() {
    List<E> entity = getEntityManager()
        .createQuery("SELECT e FROM " + getEntityClass().getSimpleName() + " e ").getResultList();
    return entity;
  }

  public void save(E entity) {
    getEntityManager().persist(entity);
  }

  public E update(E entity) {
    return getEntityManager().merge(entity);
  }

  public void delete(E entity) {
    getEntityManager()
        .remove(getEntityManager().contains(entity) ? entity : getEntityManager().merge(entity));
  }

  /**
   * Returns the Class of {@link E}. This method will work ONLY at direct Subclasses of this. Any
   * other class MUST overwrite this method.
   *
   * @return the Class of {@link E}
   * @throws NullPointerException if the extending class was not a direct subclass of this one
   */
  @SuppressWarnings("unchecked")
  public Class<E> getEntityClass() {
    return (Class<E>) ((ParameterizedType) this.getClass().getGenericSuperclass())
        .getActualTypeArguments()[0];
  }

  protected abstract EntityManager getEntityManager();
}