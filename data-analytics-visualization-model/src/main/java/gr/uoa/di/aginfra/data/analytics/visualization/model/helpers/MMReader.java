package gr.uoa.di.aginfra.data.analytics.visualization.model.helpers;

import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.DocumentBuilder;

import gr.uoa.di.aginfra.data.analytics.visualization.model.definitions.MMNode;
import org.w3c.dom.Document;
import org.w3c.dom.NodeList;
import org.w3c.dom.Node;
import org.w3c.dom.Element;
import org.xml.sax.InputSource;

import java.io.StringReader;
import java.util.UUID;

public class MMReader {

	public MMNode parse(String xml) throws Exception {

		DocumentBuilderFactory dbFactory = DocumentBuilderFactory.newInstance();
		DocumentBuilder dBuilder = dbFactory.newDocumentBuilder();
		Document doc = dBuilder.parse(new InputSource(new StringReader(xml)));

		doc.getDocumentElement().normalize();

		Element mapElement = doc.getDocumentElement();

		Element rootXmlNode = null;
		NodeList nList = mapElement.getChildNodes();
		for (int temp = 0; temp < nList.getLength(); temp++) {
			Node childXmlNode = nList.item(temp);
			if (childXmlNode.getNodeType() != Node.ELEMENT_NODE || !childXmlNode.getNodeName().equals("node")) continue;
			rootXmlNode = (Element) childXmlNode;
		}

		MMNode rootNode = createMMNodeFromElement(rootXmlNode);

		parseChildren(rootNode, rootXmlNode);

		return rootNode;
	}

	private void parseChildren(MMNode parentNode, Element parentXmlNode) {
		NodeList nList = parentXmlNode.getChildNodes();
		for (int temp = 0; temp < nList.getLength(); temp++) {
			Node childXmlNode = nList.item(temp);
			if (childXmlNode.getNodeType() != Node.ELEMENT_NODE || !childXmlNode.getNodeName().equals("node")) continue;
			MMNode childNode = createMMNodeFromElement((Element) childXmlNode);
			parentNode.getChildren().add(childNode);
			parseChildren(childNode, (Element) childXmlNode);
		}
	}

	private MMNode createMMNodeFromElement(Element element) {
		MMNode node = new MMNode();
		String id = element.getAttribute("ID");
		node.setId((id != null && id.length() > 0) ? id : UUID.randomUUID().toString().replaceAll("-", ""));
		node.setColor(element.getAttribute("COLOR"));
		node.setTopic(element.getAttribute("TEXT"));
		node.setDirection(element.getAttribute("POSITION"));
		node.setLink(element.getAttribute("LINK"));
		return node;
	}
}
