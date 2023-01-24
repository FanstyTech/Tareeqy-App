import * as React from "react";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";

import { Icon } from "@iconify/react";
import EnhancedTableHead from "./enhancedTableHead";
import { Button, Fab, Grow, Stack, TextField, Zoom } from "@mui/material";
import theme from "../../../theme";

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = "asc" | "desc";

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string }
) => number {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort<T>(
  array: readonly T[],
  comparator: (a: T, b: T) => number
) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

interface EnhancedTableToolbarProps {
  numSelected: number;
  openFilterContainer: any;
  setOpenFilterContainer: any;
}

function EnhancedTableToolbar(props: EnhancedTableToolbarProps) {
  const { numSelected, openFilterContainer, setOpenFilterContainer } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: "1 1 100%" }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          {/* Nutrition */}
        </Typography>
      )}
      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton>
            {" "}
            <Icon icon="ic:round-delete" width={22} height={22} />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton
            onClick={() => setOpenFilterContainer(!openFilterContainer)}
          >
            {" "}
            <Icon
              icon="material-symbols:filter-list-rounded"
              width={22}
              height={22}
            />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
}

interface EnhancedTableProps {
  headCells: any;
  rows: any;
  tableTitle: string;
  hasCheckBox: boolean;
  hasFilter: boolean;
  hasPagination: boolean;
  hasTableHeader?: boolean;
  rowsPerPageProps?: number;
}

const EnhancedTable: React.FC<EnhancedTableProps> = (props) => {
  const [openFilterContainer, setOpenFilterContainer] = React.useState(false);

  const {
    headCells,
    rows,
    tableTitle,
    hasCheckBox,
    hasFilter,
    hasPagination,
    rowsPerPageProps = 5,
    hasTableHeader = true,
  } = props;

  const [order, setOrder] = React.useState<Order>("asc");
  const [orderBy, setOrderBy] = React.useState<string>("calories");
  const [selected, setSelected] = React.useState<readonly string[]>([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(rowsPerPageProps);

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: string
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.id.toString());
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event: React.MouseEvent<unknown>, name: string) => {
    const selectedIndex = selected.indexOf(name);
    console.log("selectedIndex", selectedIndex);

    let newSelected: readonly string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (name: string) => selected.indexOf(name) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%" }} elevation={0} className="border-radius">
        {hasFilter && (
          <EnhancedTableToolbar
            numSelected={selected.length}
            openFilterContainer={openFilterContainer}
            setOpenFilterContainer={setOpenFilterContainer}
          />
        )}

        {openFilterContainer && (
          <Stack sx={{}}>
            <Grow in={openFilterContainer}>
              <Box
                component="form"
                sx={{
                  "& .MuiTextField-root": { m: 1, width: "25ch" },
                }}
                noValidate
                autoComplete="off"
              >
                <div>
                  {headCells?.map((headCell, key) => {
                    return (
                      <TextField
                        label={headCell.id}
                        id="outlined-size-small"
                        size="small"
                      />
                    );
                  })}
                </div>
              </Box>
            </Grow>

            <Grow
              in={openFilterContainer}
              style={{ transformOrigin: "0 0 0" }}
              {...(openFilterContainer ? { timeout: 1000 } : {})}
            >
              <Button
                sx={{
                  pl: { sm: 2 },
                  pr: { xs: 1, sm: 1 },
                  width: 120,
                  ml: "auto",
                  mr: 2,
                }}
                variant="contained"
                startIcon={<Icon icon="material-symbols:search-rounded" />}
              >
                Search
              </Button>
            </Grow>
          </Stack>
        )}

        <TableContainer className="p-3">
          <h5 className="px-3">{tableTitle}</h5>
          <Table
            // sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={dense ? "small" : "medium"}
          >
            {hasTableHeader && (
              <EnhancedTableHead
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleRequestSort}
                rowCount={rows.length}
                headCells={headCells}
                hasCheckBox={hasCheckBox}
              />
            )}

            <TableBody>
              {/* if you don't need to support IE11, you can replace the `stableSort` call with:
              rows.sort(getComparator(order, orderBy)).slice() */}

              {rows?.length > 0 ? (
                stableSort(rows, getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    const isItemSelected = isSelected(row?.id.toString());
                    const labelId = `enhanced-table-checkbox-${index}`;

                    return (
                      <TableRow
                        onClick={(event) =>
                          handleClick(event, row?.id.toString())
                        }
                        role="checkbox"
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={row.id}
                        selected={isItemSelected}
                        classes={
                          {
                            // selected: `bg-${row?.Color?.toString()}`,
                          }
                        }
                      >
                        {hasCheckBox && (
                          <TableCell padding="checkbox">
                            <div
                              className={
                                !isItemSelected ? `bl-${row?.Color}` : ""
                              }
                            >
                              <Checkbox
                                // color="primary"
                                checked={isItemSelected}
                                inputProps={{
                                  "aria-labelledby": labelId,
                                }}
                              />
                            </div>
                          </TableCell>
                        )}

                        {headCells
                          ?.filter((item) => item.isShowInHead)
                          .map((headCell, key) => {
                            return (
                              <TableCell align="left">
                                {row[headCell.id.toString()]}
                              </TableCell>
                            );
                          })}
                      </TableRow>
                    );
                  })
              ) : (
                <TableRow hover>
                  <TableCell colSpan={headCells?.length + 1} align="center">
                    No data found
                  </TableCell>
                </TableRow>
              )}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        {rows?.length > 0 && hasPagination && (
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            className="enhanced-table"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        )}
      </Paper>
    </Box>
  );
};
export default EnhancedTable;
