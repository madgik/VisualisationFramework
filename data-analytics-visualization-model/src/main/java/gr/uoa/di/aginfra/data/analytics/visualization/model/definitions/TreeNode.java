package gr.uoa.di.aginfra.data.analytics.visualization.model.definitions;

import java.util.List;

public class TreeNode {

    private String name;

    private List<TreeNode> children;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<TreeNode> getChildren() {
        return children;
    }

    public void setChildren(List<TreeNode> children) {
        this.children = children;
    }
}
