import React from 'react';
import { Box, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper, TableSortLabel } from "@mui/material";
import { useSelector } from "react-redux";
import { dates as changedDates, visibleColumns as headColumns, stickyColumn, data } from "../../services/redux/stats-slice/stats-slice";
import moment from "moment";
import { visuallyHidden } from '@mui/utils';
import uniqid from 'uniqid';
import Preloader from '../preloader/preloader';

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}


const columns = [
  {id: "datas", label: "Дата", numeric: false}, 
  {id: "summ", label: "Сумма", numeric: true}, 
  {id: "clicks", label: "Клики", numeric: true},
  {id: "summs", label: "Сумма", numeric: true}, 
  {id: "clickss", label: "Клики", numeric: true}
]

function EnhancedTableHead(props) {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow sx={{position: "sticky", top: 0, backgroundColor: "#fff"}}>
        {columns.map((headCell, index) => (
          <TableCell
            sx={index === 0 ? {position: "sticky", left: 0, backgroundColor: "#fff"} : ''}
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding='normal'
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

const StatTable = () => {
  const visibleColumns = useSelector(headColumns);
  const sticky = useSelector(stickyColumn);
  const dates = useSelector(changedDates);
  const loadedData = useSelector(data);
  // const columns = [{id: "datas", name: "Дата"}, {id: "summ", name: "Сумма"}, {id: "clicks", name: "Клики"}]

  const tableMock = [
    {datas: "01.05.2001", summ: 1000, clicks: 10, summs: 1000, clickss: 10},
    {datas: "11.07.2001", summ: 12312, clicks: 10, summs: 1000, clickss: 10},
    {datas: "10.01.2001", summ: 10045745540, clicks: 10, summs: 1000, clickss: 10},
    {datas: "01.05.2001", summ: 10012310, clicks: 10, summs: 1000, clickss: 10},
    {datas: "11.07.2001", summ: 123214312, clicks: 10, summs: 1000, clickss: 10},
    {datas: "10.01.2001", summ: 10024245745540, clicks: 10, summs: 1000, clickss: 10},
    {datas: "01.05.2001", summ: 1004230, clicks: 10, summs: 1000, clickss: 10},
    {datas: "11.07.2001", summ: 12234312, clicks: 10, summs: 1000, clickss: 10},
    {datas: "10.01.2001", summ: 10045435745540, clicks: 10, summs: 1000, clickss: 10},
    {datas: "01.05.2001", summ: 1000, clicks: 10, summs: 1000, clickss: 10},
    {datas: "11.07.2001", summ: 12312, clicks: 10, summs: 1000, clickss: 10},
    {datas: "10.01.2001", summ: 10045745540, clicks: 10, summs: 1000, clickss: 10},
    {datas: "01.05.2001", summ: 10012310, clicks: 10, summs: 1000, clickss: 10},
    {datas: "11.07.2001", summ: 123214312, clicks: 10, summs: 1000, clickss: 10},
    {datas: "10.01.2001", summ: 10024245745540, clicks: 10, summs: 1000, clickss: 10},
    {datas: "01.05.2001", summ: 1004230, clicks: 10, summs: 1000, clickss: 10},
    {datas: "11.07.2001", summ: 12234312, clicks: 10, summs: 1000, clickss: 10},
    {datas: "10.01.2001", summ: 10045435745540, clicks: 10, summs: 1000, clickss: 10},
    ]

    ///
  const [order, setOrder] = React.useState('desc');
  const [orderBy, setOrderBy] = React.useState('datas');

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  // Раскомментировать когда будут загружаться реальные данные с сервера
  // if(loadedData === null) {
  //   return (
  //     // <Preloader />
  //     <h3 align="center">Для выгрузки таблицы с результатами воспользуйтесь настройкой параметров</h3>
  //   )
  // }

  return (
    <Box sx={{margin: "auto"}}>
      <h3 align="center">Данные за период: {moment(dates?.start).format("DD-MM-YYYY")} - {moment(dates?.end).format("DD-MM-YYYY")}</h3>
      <Paper sx={{ width: '97%', margin: "20px auto"}}>
        <TableContainer sx={{height: "583px"}}>
          <Table
            sx={{ minWidth: 440}}
            aria-labelledby="tableTitle"
            size={'medium'}
          >
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={tableMock.length}
            />
            <TableBody>
              {stableSort(tableMock, getComparator(order, orderBy))
                .map((row, index) => {
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    key={uniqid(row.datas)}
                  >
                    {columns.map((column, columnIndex) => {
                      const value = row[column.id];
                      return (
                        <TableCell
                          sx={sticky !== "none" && columnIndex === 0 ? {position: "sticky", left: 0, backgroundColor: "#fff"} : ''}
                          key={uniqid(column.id)}
                          component="th"
                          id={labelId}
                          scope="row"
                          padding="normal"
                          align={columnIndex !== 0 ? "right" : "left"}
                        >
                          {value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                
              )})}
                <TableRow>
                  <TableCell  sx={{border: "none"}}/>
                </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  )
}

export default StatTable;