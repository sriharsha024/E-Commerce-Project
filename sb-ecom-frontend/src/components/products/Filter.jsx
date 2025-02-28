import { useState, useEffect } from "react";
import { FaSearch, FaSortUp, FaSortDown, FaTimes } from "react-icons/fa";
import {
  TextField,
  Select,
  MenuItem,
  Button,
  InputAdornment,
  FormControl,
  InputLabel,
  Tooltip,
} from "@mui/material";
import { useSearchParams, useNavigate, useLocation } from "react-router-dom";

const Filter = ({categories}) => {

  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [category, setCategory] = useState(searchParams.get("category") || "all");
  const [searchTerm, setSearchTerm] = useState(searchParams.get("keyword") || "");
  const [sortOrder, setSortOrder] = useState(searchParams.get("sortOrder") || "asc");

  useEffect(() => {
    setCategory(searchParams.get("category") || "all");
    setSortOrder(searchParams.get("sortOrder") || "asc");
    setSearchTerm(searchParams.get("keyword") || "");
  }, [searchParams]);

  // Handle Search Term Change
  useEffect(() => {
    const handler = setTimeout(() => {
      if (searchTerm) {
        searchParams.set("keyword", searchTerm);
      } else {
        searchParams.delete("keyword");
      }
      setSearchParams(searchParams);
    }, 400);
    return () => clearTimeout(handler);
  }, [searchTerm, searchParams, setSearchParams]);

  // Handle Category Change
  const handleCategoryChange = (event) => {
    const selectedCategory = event.target.value;
    if (selectedCategory === "all") {
      searchParams.delete("category");
    } else {
      searchParams.set("category", selectedCategory);
    }
    setSearchParams(searchParams);
    setCategory(selectedCategory);
  };

  // Handle Sorting by Price
  const handleSortChange = () => {
    const newOrder = sortOrder === "asc" ? "desc" : "asc";
    searchParams.set("sortBy", "price"); //  Sorting is always by price
    searchParams.set("sortOrder", newOrder);
    setSearchParams(searchParams);
    setSortOrder(newOrder);
  };

  // Handle Clearing Filters
  const handleClearFilters = () => {
    setSearchParams({});
    setCategory("all");
    setSearchTerm("");
    setSortOrder("asc");
    navigate(pathname, { replace: true });
    onClearFilters();
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6 mb-6">
      {/* Search Field */}
      <div className="relative w-full md:w-1/3">
        <TextField
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          variant="outlined"
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <FaSearch />
              </InputAdornment>
            ),
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "8px",
              backgroundColor: "#f1f1f1",
              height: "40px",
            },
            "& .MuiOutlinedInput-input": {
              padding: "10px",
            },
          }}
        />
      </div>

      {/* Category, Sort, and Clear Buttons */}
      <div className="flex items-center gap-4">
        {/* Category Select */}
        <FormControl variant="outlined" size="small" sx={{ minWidth: "150px", height: "40px" }}>
          <InputLabel>Category</InputLabel>
          <Select value={category} onChange={handleCategoryChange} label="Category">
            <MenuItem value="all">All Categories</MenuItem>
            {categories.map((cat) => (
              <MenuItem key={cat.categoryId} value={cat.categoryName}>
                {cat.categoryName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Sort Button */}
        <Tooltip title={`Sort by Price (${sortOrder === "asc" ? "Ascending" : "Descending"})`}>
          <Button
            onClick={handleSortChange}
            variant="contained"
            size="small"
            startIcon={sortOrder === "asc" ? <FaSortUp /> : <FaSortDown />}
            sx={{
              backgroundColor: "#2563eb",
              height: "40px",
              minWidth: "120px",
              borderRadius: "8px",
              color: "white",
              transition: "background-color 0.3s ease",
              "&:hover": {
                backgroundColor: "#1e3a8a",
              },
            }}
          >
            Sort
          </Button>
        </Tooltip>

        {/* Clear Button */}
        <Button
          onClick={handleClearFilters}
          variant="contained"
          size="small"
          startIcon={<FaTimes />}
          sx={{
            backgroundColor: "#dc2626",
            height: "40px",
            minWidth: "120px",
            borderRadius: "8px",
            color: "white",
            transition: "background-color 0.3s ease",
            "&:hover": {
              backgroundColor: "#9b1c1c",
            },
          }}
        >
          Clear
        </Button>
      </div>
    </div>
  );
};

export default Filter;
