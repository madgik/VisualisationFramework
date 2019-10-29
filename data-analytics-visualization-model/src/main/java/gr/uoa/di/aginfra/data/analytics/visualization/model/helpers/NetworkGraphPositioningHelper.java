package gr.uoa.di.aginfra.data.analytics.visualization.model.helpers;

import java.awt.*;
import java.awt.geom.Point2D;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

public class NetworkGraphPositioningHelper {

	// Canvas size
	int maxX = 1100;
	int minX = 300;
	int maxY = 900;
	int minY = 200;

	private static NetworkGraphPositioningHelper instance = null;

	private Map<String, Point2D> positions;
	private Set<Point2D> points;

	private NetworkGraphPositioningHelper() {
		positions = new HashMap<>();
		points = new HashSet<>();
	}


	public static final NetworkGraphPositioningHelper getInstance() {
		if(instance == null) {
			return new NetworkGraphPositioningHelper();
		}
		return instance;
	}

	public Map<String, Point2D> getPositions() {
		return positions;
	}

	public void setPositions(Map<String, Point2D> positions) {
		this.positions = positions;
	}

	public Set<Point2D> getPoints() {
		return points;
	}

	public void setPoints(Set<Point2D> points) {
		this.points = points;
	}

	public Point2D addPositions(String id) {

		if(NetworkGraphPositioningHelper.getInstance().getPoints().size()>1000000) {
			NetworkGraphPositioningHelper.getInstance().getPoints().clear();
		}

		if(NetworkGraphPositioningHelper.getInstance().getPositions().size()>1000000) {
			NetworkGraphPositioningHelper.getInstance().getPositions().clear();
		}

		double x = (Math.random() * ((maxX - minX) + 1)) + minX;
		double y = (Math.random() * ((maxY - minY) + 1)) + minY;
		Point2D point2D = new Point2D.Double(x,y);

		while(! NetworkGraphPositioningHelper.getInstance().getPoints().add(point2D)){
			x = (Math.random() * ((maxX - minX) + 1)) + minX;
			y = (Math.random() * ((maxY - minY) + 1)) + minY;
			point2D = new Point2D.Double(x,y);
		}

		NetworkGraphPositioningHelper.getInstance().getPositions().put(id, point2D);


		return point2D;
		//return NetworkGraphPositioningHelper.getInstance().getPositions();
	}
}
