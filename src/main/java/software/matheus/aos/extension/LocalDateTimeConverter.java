package software.matheus.aos.extension;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.Date;

import javax.persistence.AttributeConverter;
import javax.persistence.Converter;

@Converter(autoApply = true)
public class LocalDateTimeConverter implements AttributeConverter<LocalDateTime, Date> {

	@Override
	public Date convertToDatabaseColumn(LocalDateTime localDateTime) {
		if (localDateTime == null) {
			return null;
		}
		ZonedDateTime zonedDateTime = localDateTime.atZone(ZoneId.systemDefault());
		return Date.from(zonedDateTime.toInstant());
	}

	@Override
	public LocalDateTime convertToEntityAttribute(Date value) {
		if (value == null) {
			return null;
		}
		Instant instant = value.toInstant();
		return LocalDateTime.ofInstant(instant, ZoneId.systemDefault());
	}
}