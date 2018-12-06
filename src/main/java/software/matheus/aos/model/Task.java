package software.matheus.aos.model;

import java.time.LocalDateTime;
import java.util.UUID;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.Id;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "tasks")
@Getter
@Setter
@ToString
@JsonInclude(Include.NON_NULL)
public class Task {
  @Id
  @org.hibernate.annotations.Type(type = "pg-uuid")
  private UUID id;
  
  private LocalDateTime createdAt;
  private LocalDateTime updatedAt;
  private LocalDateTime dueDate;
  private LocalDateTime resolvedAt;
  private String title;
  private String description;

  @Enumerated(EnumType.STRING)
  private TaskPriority priority;
  
  @Enumerated(EnumType.STRING)
  private TaskStatus status;

}