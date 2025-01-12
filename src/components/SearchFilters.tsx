import { Checkbox, Radio } from "antd";
import { GetJobsParams } from "../api/jobs/types/jobs";
import {
  employmentTypeOptions,
  datePostedOptions,
  countryOptions,
} from "../constants/searchFilters";

interface SearchFiltersProps {
  onFiltersChange: (
    updateFilters: (filters: GetJobsParams) => GetJobsParams
  ) => void;
  appliedFilters: GetJobsParams;
}

export const SearchFilters: React.FC<SearchFiltersProps> = ({
  onFiltersChange,
  appliedFilters,
}) => {
  return (
    <>
      <span className="search_results__filters__title">Date posted</span>
      <Radio.Group
        options={datePostedOptions}
        style={{ display: "flex", flexDirection: "column" }}
        value={appliedFilters?.date_posted}
        onChange={(e) =>
          onFiltersChange((filters: GetJobsParams) => ({
            ...filters,
            date_posted: e.target.value,
          }))
        }
        size="large"
      />
      <span className="search_results__filters__title">Work from home</span>
      <Checkbox
        checked={appliedFilters?.work_from_home}
        onChange={(e) =>
          onFiltersChange((filters: GetJobsParams) => ({
            ...filters,
            work_from_home: e.target.checked,
          }))
        }
      >
        Work from home
      </Checkbox>
      <span className="search_results__filters__title">Country</span>
      <Radio.Group
        options={countryOptions}
        value={appliedFilters?.country}
        style={{ display: "flex", flexDirection: "column" }}
        onChange={(e) =>
          onFiltersChange((filters: GetJobsParams) => ({
            ...filters,
            country: e.target.value,
          }))
        }
        size="large"
      />
      <span className="search_results__filters__title">Employment type</span>
      <Checkbox.Group
        options={employmentTypeOptions}
        style={{ display: "flex", flexDirection: "column" }}
        value={appliedFilters?.employment_types}
        onChange={(employmentTypes) =>
          onFiltersChange((filters: GetJobsParams) => ({
            ...filters,
            employment_types: employmentTypes,
          }))
        }
      ></Checkbox.Group>
    </>
  );
};
