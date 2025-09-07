import React from "react";
import { FormControl, InputLabel, Select, MenuItem, Box, SelectChangeEvent } from "@mui/material";
import { KeyboardArrowDownRounded } from "@mui/icons-material";
import styled from "@emotion/styled";
import { getFontColor, isDark } from "../utils";
import PriorityBadge, { PriorityLevel } from "./tasks/PriorityBadge";

interface PrioritySelectProps {
  value?: PriorityLevel | null;
  onChange: (priority: PriorityLevel | null) => void;
  label?: string;
  placeholder?: string;
  required?: boolean;
  width?: string;
  allowClear?: boolean;
}

const PrioritySelect: React.FC<PrioritySelectProps> = ({
  value,
  onChange,
  label = "Priority",
  placeholder = "Select priority level",
  required = false,
  width = "400px",
  allowClear = true,
}) => {
  const handleChange = (event: SelectChangeEvent<unknown>) => {
    const selectedValue = event.target.value as string;
    if (selectedValue === "") {
      onChange(null);
    } else {
      onChange(selectedValue as PriorityLevel);
    }
  };

  const priorityLevels: PriorityLevel[] = ["Critical", "High", "Medium", "Low"];

  const getPriorityDescription = (priority: PriorityLevel): string => {
    const descriptions = {
      Critical: "Urgent and important",
      High: "Important but not urgent",
      Medium: "Moderate importance",
      Low: "Low importance",
    };
    return descriptions[priority];
  };

  return (
    <StyledFormControl fullWidth required={required} sx={{ width }}>
      <StyledInputLabel id="priority-select-label">{label}</StyledInputLabel>
      <StyledSelect
        labelId="priority-select-label"
        value={value || ""}
        onChange={handleChange}
        label={label}
        displayEmpty
        IconComponent={KeyboardArrowDownRounded}
        renderValue={(selected) => {
          if (!selected) {
            return <PlaceholderText>{placeholder}</PlaceholderText>;
          }
          return (
            <SelectedValueContainer>
              <PriorityBadge
                priority={selected as PriorityLevel}
                size="small"
                badgeVariant="minimal"
              />
            </SelectedValueContainer>
          );
        }}
        MenuProps={{
          PaperProps: {
            sx: {
              borderRadius: "16px",
              mt: 1,
              "& .MuiMenuItem-root": {
                borderRadius: "12px",
                margin: "4px 8px",
                padding: "12px 16px",
              },
            },
          },
        }}
      >
        {allowClear && (
          <StyledMenuItem value="">
            <Box sx={{ color: "text.secondary", fontStyle: "italic" }}>No Priority</Box>
          </StyledMenuItem>
        )}
        {priorityLevels.map((priority) => (
          <StyledMenuItem key={priority} value={priority}>
            <MenuItemContent>
              <PriorityBadge priority={priority} size="medium" badgeVariant="minimal" />
              <PriorityDescription>{getPriorityDescription(priority)}</PriorityDescription>
            </MenuItemContent>
          </StyledMenuItem>
        ))}
      </StyledSelect>
    </StyledFormControl>
  );
};

const StyledFormControl = styled(FormControl)`
  .MuiInputLabel-root {
    color: ${({ theme }) => getFontColor(theme.secondary)};
    font-weight: 500;
  }

  .MuiOutlinedInput-root {
    border-radius: 16px;
    background: ${({ theme }) =>
      isDark(theme.secondary) ? "rgba(255, 255, 255, 0.05)" : "rgba(0, 0, 0, 0.02)"};

    &:hover .MuiOutlinedInput-notchedOutline {
      border-color: ${({ theme }) => theme.primary};
    }

    &.Mui-focused .MuiOutlinedInput-notchedOutline {
      border-color: ${({ theme }) => theme.primary};
      border-width: 2px;
    }
  }

  .MuiSelect-icon {
    color: ${({ theme }) => getFontColor(theme.secondary)};
  }
`;

const StyledInputLabel = styled(InputLabel)`
  color: ${({ theme }) => getFontColor(theme.secondary)};
  font-weight: 500;
`;

const StyledSelect = styled(Select)`
  color: ${({ theme }) => getFontColor(theme.secondary)};
`;

const StyledMenuItem = styled(MenuItem)`
  &:hover {
    background: ${({ theme }) =>
      isDark(theme.secondary) ? "rgba(255, 255, 255, 0.08)" : "rgba(0, 0, 0, 0.04)"};
  }

  &.Mui-selected {
    background: ${({ theme }) => `${theme.primary}20`};

    &:hover {
      background: ${({ theme }) => `${theme.primary}30`};
    }
  }
`;

const SelectedValueContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const MenuItemContent = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
`;

const PriorityDescription = styled.span`
  font-size: 0.875rem;
  opacity: 0.7;
  flex: 1;
`;

const PlaceholderText = styled.span`
  opacity: 0.6;
  font-style: italic;
`;

export default PrioritySelect;
