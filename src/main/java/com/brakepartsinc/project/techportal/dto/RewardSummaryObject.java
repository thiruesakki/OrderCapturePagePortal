package com.brakepartsinc.project.techportal.dto;

import java.util.ArrayList;
import java.util.List;

public class RewardSummaryObject {

	private String totalPoints;

	private String pendingPoints;

	private String currentPoints;

	private List<RewardTransactionObject> rewardTransactions = new ArrayList<RewardTransactionObject>();

	public String getTotalPoints() {
		return totalPoints;
	}

	public void setTotalPoints(String totalPoints) {
		this.totalPoints = totalPoints;
	}

	public String getPendingPoints() {
		return pendingPoints;
	}

	public void setPendingPoints(String pendingPoints) {
		this.pendingPoints = pendingPoints;
	}

	public String getCurrentPoints() {
		return currentPoints;
	}

	public void setCurrentPoints(String currentPoints) {
		this.currentPoints = currentPoints;
	}

	public List<RewardTransactionObject> getRewardSummaryList() {
		return rewardTransactions;
	}

	public void setRewardSummaryList(
			List<RewardTransactionObject> rewardSummaryList) {
		this.rewardTransactions = rewardSummaryList;
	}

	@Override
	public String toString() {
		return "RewardSummaryObject [totalPoints=" + totalPoints
				+ ", pendingPoints=" + pendingPoints + ", currentPoints="
				+ currentPoints + ", rewardSummaryList=" + rewardTransactions
				+ "]";
	}

}
