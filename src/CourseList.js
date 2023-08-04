import React, { useState, useEffect } from "react";
import { styled } from '@mui/system';
import TablePagination, {
  tablePaginationClasses as classes,
} from '@mui/base/TablePagination';
import axios from "axios";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";


export default function CourseList() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleChangePage =(event,newPage) =>{
    setPage(newPage);

  }
  
  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const [courses, setCourses] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/courses").then((response) => {
      setCourses(response.data);
    });
  }, []);
  
  const hanldeEnquiry = course => {
    console.log(course.id);
    return (
      <div>
      <Link to="https://www.google.com" target="https://www.google.com" rel="noopener">
        Go to Example Website
      </Link>
    </div>
    );
    //<Link to={`/enquire/`+course.id}/>

  }
  return (
    <Root sx={{ maxWidth: '100%', width: 800 ,align :"center" ,marginLeft: 'auto' ,marginRight: 'auto',marginTop:'auto',marginBottom:'auto'}}>
      <table  style={{border: '1px solid black', marginLeft: 'auto' ,marginRight: 'auto'}} aria-label="custom pagination table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Category</th>
            <th>Price</th>
            <th>Enquiry Page</th>
          </tr>
        </thead>
        <tbody>
          {(rowsPerPage > 0
            ? courses.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : rows
          ).map((row) => (
            <tr key={row.id}>
              <td>{row.title}</td>
              <td style={{ width: 160 }} align="right">
                {row.description}
              </td>
              <td style={{ width: 160 }} align="right">
                {row.category}
              </td>
              <td style={{ width: 160 }} align="right">
                {row.price}
              </td>
              <td style={{ width: 160 }} align="right">
               <Button align ="margin-left :auto;margin-right:auto" variant="outlined" onClick={() => hanldeEnquiry(row)}>Enquiry</Button>
              </td>
            </tr>
          ))}
          {emptyRows > 0 && (
            <tr style={{ height: 41 * emptyRows }}>
              <td colSpan={3} />
            </tr>
          )}
        </tbody>
        <tfoot>
          <tr>
            <CustomTablePagination
              rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
              colSpan={3}
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              slotProps={{
                select: {
                  'aria-label': 'rows per page',
                },
                actions: {
                  showFirstButton: true,
                  showLastButton: true,
                },
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </tr>
        </tfoot>
      </table>
    </Root>
  );
}

const createData = (name, calories, fat) => {
  return { name, calories, fat };
}

const rows = [
  createData('Cupcake', 305, 3.7),
  createData('Donut', 452, 25.0),
  createData('Eclair', 262, 16.0),
  createData('Frozen yoghurt', 159, 6.0),
  createData('Gingerbread', 356, 16.0),
  createData('Honeycomb', 408, 3.2),
  createData('Ice cream sandwich', 237, 9.0),
  createData('Jelly Bean', 375, 0.0),
  createData('KitKat', 518, 26.0),
  createData('Lollipop', 392, 0.2),
  createData('Marshmallow', 318, 0),
  createData('Nougat', 360, 19.0),
  createData('Oreo', 437, 18.0),
].sort((a, b) => (a.calories < b.calories ? -1 : 1));

const grey = {
  200: '#d0d7de',
  800: '#32383f',
  900: '#24292f',
};

const Root = styled('div')(
  ({ theme }) => `
  table {
    font-family: IBM Plex Sans, sans-serif;
    font-size: 0.875rem;
    border-collapse: collapse;
    width: 100%;
  }

  td,
  th {
    border: 1px solid ${theme.palette.mode === 'dark' ? grey[800] : grey[200]};
    text-align: left;
    padding: 8px;
  }

  th {
    background-color: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
  }
  `,
);

const CustomTablePagination = styled(TablePagination)`
  & .${classes.toolbar} {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;

    @media (min-width: 768px) {
      flex-direction: row;
      align-items: center;
    }
  }

  & .${classes.selectLabel} {
    margin: 0;
  }

  & .${classes.displayedRows} {
    margin: 0;

    @media (min-width: 768px) {
      margin-left: auto;
    }
  }

  & .${classes.spacer} {
    display: none;
  }

  & .${classes.actions} {
    display: flex;
    gap: 0.25rem;
  }
`;
