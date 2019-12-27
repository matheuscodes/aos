package software.matheus.aos.model;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.Table;

import org.hibernate.annotations.Type;
import org.hibernate.annotations.TypeDef;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import software.matheus.aos.extension.PostgreSQLEnumType;

@Entity
@Table(name = "tasks")
@Getter
@Setter
@ToString
@JsonInclude(Include.NON_NULL)
@TypeDef(name = "pgsql_enum", typeClass = PostgreSQLEnumType.class)
public class Task extends BaseEntity{

  private LocalDateTime dueDate;
  private LocalDateTime resolvedAt;
  private LocalDateTime remindAt;

  @Enumerated(EnumType.STRING)
  @Column(columnDefinition = "priority_type")
  @Type( type = "pgsql_enum" )
  private TaskPriority priority;

  @Enumerated(EnumType.STRING)
  @Column(columnDefinition = "status_type")
  @Type( type = "pgsql_enum" )
  private TaskStatus status;

}
