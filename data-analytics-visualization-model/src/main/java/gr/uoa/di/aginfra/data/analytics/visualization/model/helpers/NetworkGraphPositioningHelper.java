package gr.uoa.di.aginfra.data.analytics.visualization.model.helpers;

import java.awt.*;
import java.awt.geom.Point2D;
import java.util.Map;

public class NetworkGraphPositioningHelper {

	private static NetworkGraphPositioningHelper instance = null;

	private Map<Integer, Point2D> positions;

	public static final NetworkGraphPositioningHelper getInstance() {
		if(instance == null) {
			return new NetworkGraphPositioningHelper();
		}
		return instance;
	}

	public Map<Integer, Point2D> getPositions() {
		return positions;
	}

	public void setPositions(Map<Integer, Point2D> positions) {
		this.positions = positions;
	}

	public Map<Integer, Point2D> addPositions(int id, float x, float y) {


//		instance.getPositions().put(id)

		return NetworkGraphPositioningHelper.getInstance().getPositions();
	}
}
