import {
  createContext,
  useMemo,
  useState,
  Dispatch,
  SetStateAction,
  ReactNode,
  useCallback,
  useContext,
} from "react";

export type DateFilter = "all" | "today" | "thisWeek" | "custom";

export interface DateRange {
  from: Date | null;
  to: Date | null;
}

interface FilterState {
  search: string;
  dateFilter: DateFilter;
  dateRange: DateRange;
}

interface FilterActions {
  setSearch: Dispatch<SetStateAction<string>>;
  setDateFilter: Dispatch<SetStateAction<DateFilter>>;
  setDateRange: Dispatch<SetStateAction<DateRange>>;
  clearAllFilters: () => void;
  clearDateFilter: () => void;
  setCustomDateRange: (from: Date | null, to: Date | null) => void;
  isFilterActive: boolean;
}

interface FilterHelpers {
  isToday: (date: Date) => boolean;
  isThisWeek: (date: Date) => boolean;
  isInDateRange: (date: Date, range: DateRange) => boolean;
  getDateRangeForToday: () => DateRange;
  getDateRangeForThisWeek: () => DateRange;
}

export type FilterContextType = FilterState & FilterActions & FilterHelpers;

const DEFAULT_FILTER_STATE: FilterState = {
  search: "",
  dateFilter: "all",
  dateRange: { from: null, to: null },
};

export const FilterContext = createContext<FilterContextType>({} as FilterContextType);

export function FilterProvider({ children }: { children: ReactNode }) {
  const [search, setSearch] = useState<string>(DEFAULT_FILTER_STATE.search);
  const [dateFilter, setDateFilter] = useState<DateFilter>(DEFAULT_FILTER_STATE.dateFilter);
  const [dateRange, setDateRange] = useState<DateRange>(DEFAULT_FILTER_STATE.dateRange);

  const isToday = useCallback((date: Date): boolean => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  }, []);

  const isThisWeek = useCallback((date: Date): boolean => {
    const today = new Date();
    const startOfWeek = new Date(today);
    const dayOfWeek = today.getDay();
    const daysToSubtract = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
    startOfWeek.setDate(today.getDate() - daysToSubtract);
    startOfWeek.setHours(0, 0, 0, 0);

    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);
    endOfWeek.setHours(23, 59, 59, 999);

    return date >= startOfWeek && date <= endOfWeek;
  }, []);

  const isInDateRange = useCallback((date: Date, range: DateRange): boolean => {
    if (!range.from || !range.to) return false;

    const targetDate = new Date(date);
    targetDate.setHours(0, 0, 0, 0);

    const fromDate = new Date(range.from);
    fromDate.setHours(0, 0, 0, 0);

    const toDate = new Date(range.to);
    toDate.setHours(23, 59, 59, 999);

    return targetDate >= fromDate && targetDate <= toDate;
  }, []);

  const getDateRangeForToday = useCallback((): DateRange => {
    const today = new Date();
    const start = new Date(today);
    start.setHours(0, 0, 0, 0);
    const end = new Date(today);
    end.setHours(23, 59, 59, 999);

    return { from: start, to: end };
  }, []);

  const getDateRangeForThisWeek = useCallback((): DateRange => {
    const today = new Date();
    const startOfWeek = new Date(today);
    const dayOfWeek = today.getDay();
    const daysToSubtract = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
    startOfWeek.setDate(today.getDate() - daysToSubtract);
    startOfWeek.setHours(0, 0, 0, 0);

    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);
    endOfWeek.setHours(23, 59, 59, 999);

    return { from: startOfWeek, to: endOfWeek };
  }, []);

  const clearAllFilters = useCallback(() => {
    setSearch(DEFAULT_FILTER_STATE.search);
    setDateFilter(DEFAULT_FILTER_STATE.dateFilter);
    setDateRange(DEFAULT_FILTER_STATE.dateRange);
  }, []);

  const clearDateFilter = useCallback(() => {
    setDateFilter("all");
    setDateRange({ from: null, to: null });
  }, []);

  const setCustomDateRange = useCallback((from: Date | null, to: Date | null) => {
    setDateRange({ from, to });
    if (from && to) {
      setDateFilter("custom");
    }
  }, []);

  const isFilterActive = useMemo(() => {
    return (
      search !== DEFAULT_FILTER_STATE.search ||
      dateFilter !== DEFAULT_FILTER_STATE.dateFilter ||
      dateRange.from !== null ||
      dateRange.to !== null
    );
  }, [search, dateFilter, dateRange]);

  const value = useMemo(
    () => ({
      search,
      dateFilter,
      dateRange,

      setSearch,
      setDateFilter,
      setDateRange,
      clearAllFilters,
      clearDateFilter,
      setCustomDateRange,

      isFilterActive,

      isToday,
      isThisWeek,
      isInDateRange,
      getDateRangeForToday,
      getDateRangeForThisWeek,
    }),
    [
      search,
      dateFilter,
      dateRange,
      isFilterActive,
      isToday,
      isThisWeek,
      isInDateRange,
      getDateRangeForToday,
      getDateRangeForThisWeek,
      clearAllFilters,
      clearDateFilter,
      setCustomDateRange,
    ],
  );

  return <FilterContext.Provider value={value}>{children}</FilterContext.Provider>;
}

export function useFilterContext() {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error("useFilterContext must be used within a FilterProvider");
  }
  return context;
}

export { FilterContext as default };
