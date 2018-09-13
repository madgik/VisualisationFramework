package gr.uoa.di.aginfra.data.analytics.visualization.model.dtos;

import gr.uoa.di.aginfra.data.analytics.visualization.model.repositories.querying.SortOrder;

public class ConfigurationCriteriaDto {

    private Integer offset;

	private Integer count;

	private String like;

	private String sortField;

	private SortOrder sortOrder;

	public Integer getOffset() {
		return offset;
	}

	public void setOffset(Integer offset) {
		this.offset = offset;
	}

	public Integer getCount() {
		return count;
	}

	public void setCount(Integer count) {
		this.count = count;
	}

	public String getLike() {
		return like;
	}

	public void setLike(String like) {
		this.like = like;
	}

	public String getSortField() {
		return sortField;
	}

	public void setSortField(String sortField) {
		this.sortField = sortField;
	}

	public SortOrder getSortOrder() {
		return sortOrder;
	}

	public void setSortOrder(SortOrder sortOrder) {
		this.sortOrder = sortOrder;
	}
}
