package software.matheus.aos.model;

import java.time.LocalDateTime;
import java.util.UUID;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.GenericGenerator;
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
@TypeDef(
	    name = "pgsql_enum",
	    typeClass = PostgreSQLEnumType.class
	)
public class Task {
  @Id
  @GeneratedValue(generator = "UUID")
  @GenericGenerator(name = "UUID", strategy = "org.hibernate.id.UUIDGenerator")
  @Column(name = "id", updatable = false, nullable = false)
  private UUID id;

  private LocalDateTime createdAt;
  private LocalDateTime updatedAt;
  private LocalDateTime dueDate;
  private LocalDateTime resolvedAt;
  private LocalDateTime remindAt;
  private String title;
  private String description;

  @Enumerated(EnumType.STRING)
  @Column(columnDefinition = "priority_type")
  @Type( type = "pgsql_enum" )
  private TaskPriority priority;

  @Enumerated(EnumType.STRING)
  @Column(columnDefinition = "status_type")
  @Type( type = "pgsql_enum" )
  private TaskStatus status;

}
