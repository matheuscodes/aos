package software.matheus.aos.model;

public enum PurposeArchetype {
	/*Ego - Leave a Mark on the World*/
	liberation, power, mastery,
	
	/*Freedom - Yearn for Paradise*/
	safety, understanding, freedom,
	
	/*Order - Provide Structure to the World*/
	service, control, innovation,
	
	/*Social - Connect to others*/
	belonging, enjoyment, intimacy;
	
	public enum Orientation {
		ego, freedom, order, social
	}
	
	public Orientation getOrientation() {
		switch(this) {
			case liberation:
			case power:
			case mastery:
				return Orientation.ego;

			case safety:
			case understanding:
			case freedom:
				return Orientation.freedom;

			case service:
			case control:
			case innovation:
				return Orientation.order;

			case belonging:
			case enjoyment:
			case intimacy:
				return Orientation.social;

			default:
				throw new Error("*Thanos voice* Impossible.");
		}
	}
}