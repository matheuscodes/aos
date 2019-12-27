package software.matheus.aos.model;

import java.util.List;

import static javax.persistence.CascadeType.ALL;
import static javax.persistence.FetchType.EAGER;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import org.hibernate.annotations.Type;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "purposes")
@Getter
@Setter
@ToString
@JsonInclude(Include.NON_NULL)
public class Purpose extends BaseEntity {
	
	  @Enumerated(EnumType.STRING)
	  @Column(columnDefinition = "archetype")
	  @Type( type = "pgsql_enum" )
	  private PurposeArchetype archetype;
	  
	  @OneToMany(fetch = EAGER, cascade = {ALL}, orphanRemoval = true)
	  @JoinColumn(name = "purpose_id", referencedColumnName = "id", nullable = false)
	  private List<Milestone> milestones;
	  
	  public PurposeArchetype.Orientation getOrientation() {
		  return archetype.getOrientation();
	  }

}
