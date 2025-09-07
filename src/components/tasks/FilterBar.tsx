import React, { useState } from "react";
import {
  TodayRounded,
  DateRangeRounded,
  CalendarViewWeekRounded,
  FilterListRounded,
} from "@mui/icons-material";
import {
  Button,
  css,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Typography,
  TextField,
  Box,
  Chip,
} from "@mui/material";
import styled from "@emotion/styled";
import { getFontColor, isDark } from "../../utils";
import { DateFilter, useFilterContext } from "../../contexts/FilterContex";

const filterOptions: {
  value: DateFilter;
  label: string;
  icon: React.ReactNode;
}[] = [
  {
    value: "all",
    label: "All Tasks",
    icon: <FilterListRounded fontSize="small" />,
  },
  {
    value: "today",
    label: "Today",
    icon: <TodayRounded fontSize="small" />,
  },
  {
    value: "thisWeek",
    label: "This Week",
    icon: <CalendarViewWeekRounded fontSize="small" />,
  },
  {
    value: "custom",
    label: "Custom Range",
    icon: <DateRangeRounded fontSize="small" />,
  },
];

export const FilterBar = () => {
  const { dateFilter, setDateFilter, dateRange, setCustomDateRange, clearDateFilter } =
    useFilterContext();

  const [filterAnchorEl, setFilterAnchorEl] = useState<null | HTMLElement>(null);
  const [customStartDate, setCustomStartDate] = useState<string>("");
  const [customEndDate, setCustomEndDate] = useState<string>("");
  const [showCustomInputs, setShowCustomInputs] = useState(false);

  const filterOpen = Boolean(filterAnchorEl);

  const handleFilterClick = (event: React.MouseEvent<HTMLElement>) => {
    setFilterAnchorEl(event.currentTarget);
  };

  const handleFilterClose = (option?: DateFilter) => {
    setFilterAnchorEl(null);
    if (option) {
      setDateFilter(option);
      if (option === "custom") {
        setShowCustomInputs(true);
      } else {
        setShowCustomInputs(false);
        setCustomStartDate("");
        setCustomEndDate("");
      }
    }
  };

  const handleCustomDateSubmit = () => {
    if (customStartDate && customEndDate) {
      const startDate = new Date(customStartDate);
      const endDate = new Date(customEndDate);
      setCustomDateRange(startDate, endDate);
      setShowCustomInputs(false);
    }
  };

  const handleClearCustomRange = () => {
    setCustomStartDate("");
    setCustomEndDate("");
    clearDateFilter();
    setShowCustomInputs(false);
  };

  const currentFilterOption = filterOptions.find((option) => option.value === dateFilter);

  const getFilterDisplayText = () => {
    if (dateFilter === "custom" && dateRange.from && dateRange.to) {
      const start = dateRange.from.toLocaleDateString();
      const end = dateRange.to.toLocaleDateString();
      return `${start} - ${end}`;
    }
    return currentFilterOption?.label || "All Tasks";
  };

  return (
    <FilterContainer>
      <FilterButton
        onClick={handleFilterClick}
        aria-controls={filterOpen ? "filter-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={filterOpen ? "true" : undefined}
        isMenuOpen={filterOpen}
      >
        {currentFilterOption?.icon}
        <ButtonContent>
          <FilterLabel>Filter by</FilterLabel>
          <FilterValue>{getFilterDisplayText()}</FilterValue>
        </ButtonContent>
      </FilterButton>

      {/* Custom Date Range Inputs */}
      {showCustomInputs && (
        <CustomDateContainer>
          <DateInputGroup>
            <TextField
              type="date"
              label="Start Date"
              value={customStartDate}
              onChange={(e) => setCustomStartDate(e.target.value)}
              size="small"
              InputLabelProps={{ shrink: true }}
              sx={{
                "& .MuiInputBase-root": {
                  borderRadius: "12px",
                },
              }}
            />
            <TextField
              type="date"
              label="End Date"
              value={customEndDate}
              onChange={(e) => setCustomEndDate(e.target.value)}
              size="small"
              InputLabelProps={{ shrink: true }}
              sx={{
                "& .MuiInputBase-root": {
                  borderRadius: "12px",
                },
              }}
            />
          </DateInputGroup>
          <DateActionButtons>
            <Button
              variant="contained"
              size="small"
              onClick={handleCustomDateSubmit}
              disabled={!customStartDate || !customEndDate}
              sx={{ borderRadius: "12px", fontSize: "0.75rem" }}
            >
              Apply
            </Button>
            <Button
              variant="outlined"
              size="small"
              onClick={handleClearCustomRange}
              sx={{ borderRadius: "12px", fontSize: "0.75rem" }}
            >
              Clear
            </Button>
          </DateActionButtons>
        </CustomDateContainer>
      )}

      {/* Active Filter Indicator */}
      {dateFilter !== "all" && (
        <ActiveFilterChip>
          <Chip
            label={getFilterDisplayText()}
            onDelete={handleClearCustomRange}
            deleteIcon={currentFilterOption?.icon as React.ReactElement}
            variant="outlined"
            size="small"
            sx={{
              borderRadius: "12px",
              "& .MuiChip-deleteIcon": {
                fontSize: "16px",
              },
            }}
          />
        </ActiveFilterChip>
      )}

      <Menu
        id="filter-menu"
        anchorEl={filterAnchorEl}
        open={filterOpen}
        onClose={() => handleFilterClose()}
        slotProps={{
          list: {
            "aria-labelledby": "filter-button",
          },
        }}
        transformOrigin={{ horizontal: "left", vertical: "top" }}
        anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
        sx={{
          "& .MuiPaper-root": {
            borderRadius: "18px",
            minWidth: "200px",
            boxShadow: "none",
            padding: "2px",
          },
        }}
      >
        {filterOptions.map(({ value, label, icon }) => (
          <StyledMenuItem
            key={value}
            onClick={() => handleFilterClose(value)}
            selected={dateFilter === value}
          >
            <ListItemIcon>{icon}</ListItemIcon>
            <ListItemText>{label}</ListItemText>
          </StyledMenuItem>
        ))}
      </Menu>
    </FilterContainer>
  );
};

const FilterContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const StyledMenuItem = styled(MenuItem)`
  margin: 0 6px;
  padding: 12px;
  border-radius: 12px;
  box-shadow: none;
  gap: 2px;
`;

const FilterButton = styled(Button)<{ isMenuOpen: boolean }>`
  gap: 8px;
  text-transform: none;
  border-radius: 16px;
  height: 60px;
  padding: 16px 20px;
  background: ${({ theme }) => (isDark(theme.secondary) ? "#090b2258" : "#ffffff3e")};
  color: ${({ theme }) => getFontColor(theme.secondary)};
  border: 1px solid ${({ theme }) => (isDark(theme.secondary) ? "#44479cb7" : theme.primary)} !important;
  transition: all 0.2s ease;
  justify-content: flex-start;
  min-width: 160px;

  ${({ isMenuOpen, theme }) =>
    isMenuOpen &&
    css`
      background: ${isDark(theme.secondary) ? "#090b228e" : "#ffffff8e"};
      box-shadow: ${isDark(theme.secondary)
        ? "0 0 0 4px #1a1e4a7f"
        : `0 0 0 4px ${theme.primary}64`};
    `}

  @media (max-width: 768px) {
    min-width: 140px;
    height: 50px;
    padding: 12px 16px;
  }

  @media print {
    display: none;
  }
`;

const ButtonContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  flex: 1;
`;

const FilterLabel = styled(Typography)`
  font-size: 0.7rem;
  opacity: 0.7;
  line-height: 1;
`;

const FilterValue = styled(Typography)`
  font-size: 0.8rem;
  font-weight: 500;
  line-height: 1.1;
  white-space: nowrap;
  text-overflow: ellipsis;
  max-width: 150px;
  overflow: hidden;
`;

const CustomDateContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 16px;
  background: ${({ theme }) => (isDark(theme.secondary) ? "#090b2240" : "#ffffff60")};
  border-radius: 16px;
  border: 1px solid ${({ theme }) => (isDark(theme.secondary) ? "#44479c40" : "#00000020")};
`;

const DateInputGroup = styled.div`
  display: flex;
  gap: 12px;

  @media (max-width: 480px) {
    flex-direction: column;
  }
`;

const DateActionButtons = styled.div`
  display: flex;
  gap: 8px;
  justify-content: flex-end;
`;

const ActiveFilterChip = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;
