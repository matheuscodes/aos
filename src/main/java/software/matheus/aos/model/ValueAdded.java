package software.matheus.aos.model;

import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@JsonInclude(Include.NON_NULL)
public class ValueAdded {
	private String description;
	private LocalDate date;
	
	private Value primary;
	private Value secondary;
	private Value tertiary;
}
