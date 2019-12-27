package software.matheus.aos.model;

import java.time.LocalDateTime;
import java.util.UUID;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.MappedSuperclass;

import org.hibernate.annotations.GenericGenerator;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@MappedSuperclass
@JsonInclude(Include.NON_NULL)
public class BaseEntity {
	  @Id
	  @GeneratedValue(generator = "UUID")
	  @GenericGenerator(name = "UUID", strategy = "org.hibernate.id.UUIDGenerator")
	  @Column(name = "id", updatable = false, nullable = false)
	  private UUID id;
	  
	  private String title;
	  private String description;
	  private LocalDateTime createdAt;
	  private LocalDateTime updatedAt;
}
