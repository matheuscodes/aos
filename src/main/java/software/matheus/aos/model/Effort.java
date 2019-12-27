package software.matheus.aos.model;

import java.time.LocalDateTime;
import org.joda.money.Money;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@JsonInclude(Include.NON_NULL)
public class Effort {
	private LocalDateTime start;
	private LocalDateTime end;
	private Float temporal;
	private Money financial;
	private Integer mental;
	private Integer physical;

	public Float getTemporal() {
		temporal = (end.toEpochSecond(null) - start.toEpochSecond(null)) / (float)(60 * 60);
		return temporal;
	}

	public void setStart(LocalDateTime start) {
		this.start = start;
		this.getTemporal();
	}

	public void setEnd(LocalDateTime end) {
		this.end = end;
		this.getTemporal();
	}

}
