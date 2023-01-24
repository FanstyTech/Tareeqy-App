import {
  Box,
  Checkbox,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
} from "@mui/material";
import React from "react";
import { visuallyHidden } from "@mui/utils";

interface EnhancedTableProps {
  numSelected: number;
  onRequestSort: any;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: any;
  orderBy: string;
  rowCount: number;
  headCells: any;
  hasCheckBox: boolean;
}

const EnhancedTableHead: React.FC<EnhancedTableProps> = (props) => {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
    headCells,
    hasCheckBox,
  } = props;
  const createSortHandler =
    (property: string) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow>
        {hasCheckBox && (
          <TableCell padding="checkbox">
            <Checkbox
              color="primary"
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={rowCount > 0 && numSelected === rowCount}
              onChange={onSelectAllClick}
              inputProps={{
                "aria-label": "select all desserts",
              }}
            />
          </TableCell>
        )}

        {headCells?.map((headCell, index) => (
          <TableCell
            key={headCell.id}
            // align={headCell.numeric ? "right" : "left"}
            align={"left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

export default EnhancedTableHead;
