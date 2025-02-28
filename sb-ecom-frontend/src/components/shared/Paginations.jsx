import { Pagination } from "@mui/material";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

const Paginations = ({ numberOfPages }) => {
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(searchParams);

  const paramValue = searchParams.get("page") ? Number(searchParams.get("page")) : 1;

  const onChangeHandler = (event, value) => {
    params.set("page", value.toString());
    navigate(`${location.pathname}?${params.toString()}`); 
  };

  return (
    <Pagination
      count={numberOfPages}
      page={paramValue}
      siblingCount={0}
      boundaryCount={2}
      onChange={onChangeHandler}
    />
  );
};

export default Paginations;
