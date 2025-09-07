import React from "react";
import styled from "@emotion/styled";
import { Typography } from "@mui/material";
import { getFontColor } from "../../utils";

export type PriorityLevel = "Critical" | "High" | "Medium" | "Low";

export interface Priority {
  level: PriorityLevel;
  color: string;
  label: string;
}

export const priorityConfig: Record<PriorityLevel, Priority> = {
  Critical: {
    level: "Critical",
    color: "#ff3131",
    label: "Critical",
  },
  High: {
    level: "High",
    color: "#ff9318",
    label: "High",
  },
  Medium: {
    level: "Medium",
    color: "#b624ff",
    label: "Medium",
  },
  Low: {
    level: "Low",
    color: "#22c55e",
    label: "Low",
  },
};

interface PriorityBadgeProps {
  priority: PriorityLevel;
  size?: "small" | "medium" | "large";
  showLabel?: boolean;
  badgeVariant?: "filled" | "outlined" | "minimal";
}

const PriorityBadge: React.FC<PriorityBadgeProps> = ({
  priority,
  size = "medium",
  showLabel = true,
  badgeVariant = "filled",
}) => {
  const config = priorityConfig[priority];

  return (
    <BadgeContainer size={size} badgeVariant={badgeVariant}>
      <PriorityDot color={config.color} size={size} badgeVariant={badgeVariant} />
      {showLabel && (
        <PriorityLabel
          size={size}
          color={badgeVariant === "filled" ? config.color : undefined}
          badgeVariant={badgeVariant}
        >
          {config.label}
        </PriorityLabel>
      )}
    </BadgeContainer>
  );
};

const BadgeContainer = styled.div<{ size: string; badgeVariant: string }>`
  display: inline-flex;
  align-items: center;
  gap: ${({ size }) => {
    switch (size) {
      case "small":
        return "4px";
      case "large":
        return "8px";
      default:
        return "6px";
    }
  }};
  padding: ${({ size, badgeVariant }) => {
    if (badgeVariant === "minimal") return "2px";
    switch (size) {
      case "small":
        return "4px 8px";
      case "large":
        return "8px 12px";
      default:
        return "6px 10px";
    }
  }};
  border-radius: ${({ badgeVariant }) => (badgeVariant === "minimal" ? "4px" : "12px")};
  background: ${({ badgeVariant }) => {
    switch (badgeVariant) {
      case "outlined":
        return "transparent";
      case "minimal":
        return "transparent";
      default:
        return "rgba(255, 255, 255, 0.1)";
    }
  }};
  border: ${({ badgeVariant }) =>
    badgeVariant === "outlined" ? "1px solid rgba(255, 255, 255, 0.2)" : "none"};
  backdrop-filter: ${({ badgeVariant }) => (badgeVariant === "filled" ? "blur(8px)" : "none")};
`;

const PriorityDot = styled.div<{ color: string; size: string; badgeVariant: string }>`
  width: ${({ size }) => {
    switch (size) {
      case "small":
        return "8px";
      case "large":
        return "14px";
      default:
        return "10px";
    }
  }};
  height: ${({ size }) => {
    switch (size) {
      case "small":
        return "8px";
      case "large":
        return "14px";
      default:
        return "10px";
    }
  }};
  border-radius: 50%;
  background: ${({ color, badgeVariant }) => {
    switch (badgeVariant) {
      case "outlined":
        return "transparent";
      default:
        return color;
    }
  }};
  border: ${({ color, badgeVariant }) =>
    badgeVariant === "outlined" ? `2px solid ${color}` : "none"};
  box-shadow: ${({ badgeVariant }) =>
    badgeVariant === "filled" ? "0 2px 8px rgba(0, 0, 0, 0.15)" : "none"};
  flex-shrink: 0;
`;

const PriorityLabel = styled(Typography)<{ size: string; color?: string; badgeVariant: string }>`
  font-size: ${({ size }) => {
    switch (size) {
      case "small":
        return "0.7rem";
      case "large":
        return "0.9rem";
      default:
        return "0.75rem";
    }
  }} !important;
  font-weight: 600 !important;
  line-height: 1 !important;
  color: ${({ color, badgeVariant }) => {
    if (badgeVariant === "filled" && color) {
      return getFontColor("#000000");
    }
    if (color) return color;
    return "inherit";
  }};
  white-space: nowrap;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

export default PriorityBadge;
