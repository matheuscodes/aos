package software.matheus.aos.model;

import java.time.LocalDate;
import java.util.UUID;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;


import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import static lombok.AccessLevel.NONE;

@Entity
@Table(name = "milestones")
@Getter
@Setter
@ToString
@JsonInclude(Include.NON_NULL)
public class Milestone {
	
	@Id
	private Long id;
	
	@Getter(NONE)
	@Setter(NONE)
	@Column(name = "purpose_id", insertable = false, updatable = false)
	private UUID purposeId;
	private String name;
	private LocalDate date;
}
