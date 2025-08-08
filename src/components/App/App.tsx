
import { useState,useMemo} from "react";
import styles from "./App.module.scss";
import { SearchInput } from "../SearchInput/SearchInput";
import { Filter } from "../Filter/Filter";
import { Pagination } from "../Pagination/Pagination";
import { useEmployeeFilter } from "../../hooks/useEmployeeFilter";
import { Table } from "../Table/Table";
import { mockEmployees } from "../../data/mockEmployees";
import { type Employee } from "../../types/employee";

const ITEMS_PER_PAGE = 5;

function App() {
  const [employees] = useState<Employee[]>(mockEmployees); 
  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredEmployees = useEmployeeFilter(employees, search, department);

  const totalPages = Math.ceil(filteredEmployees.length / ITEMS_PER_PAGE);
  const paginatedEmployees = filteredEmployees.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );
const departments = useMemo(() => 
  Array.from(new Set(employees.map((e) => e.department))),
  [employees]
);

  
  return (
    <div className={styles["app-container"]}>
      <h1 className={styles["app-title"]}> Список сотрудников</h1>
      
<div className= {styles["search-filter-wrapper"]}>
      <SearchInput value={search} onChange={setSearch} />
      <Filter
        departments={departments}
        selected={department}
        onChange={(value) => {
          setDepartment(value);
          setCurrentPage(1);
        }}
      />
</div>
      <Table data={paginatedEmployees} /> 

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}

export default App;
