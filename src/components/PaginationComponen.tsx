import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

interface Props {
  count: number;
  route: string;
}

export default function PaginationComponent({ count, route }: Props) {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const navigation = useNavigate();
  const location = useLocation();
  const getPage = useCallback(() => {
    return Number(location.search.replace("?page=", "")) || 1;
  }, [location.search]);

  useEffect(() => {
    setCurrentPage(getPage());
  }, [location, getPage]);

  const handleChandge = (event: React.ChangeEvent<unknown>, value: number) => {
    navigation(`${route}/?page=${value}`);
  };

  return (
    <Stack spacing={2}>
      <Pagination count={count} onChange={handleChandge} page={currentPage} />
    </Stack>
  );
}
