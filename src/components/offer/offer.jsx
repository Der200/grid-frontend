import React from 'react';
import { Box, Stack, Button, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, IconButton, Collapse, Typography, Paper } from '@mui/material';
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';
import styles from './offer.module.css';
import LinkGenerator from '../link-generator/link-generator';

const Offer = ({offer}) => {
  const { name, description, logo, options, is_active, logo_link, link_redirect, link} = offer;
  const [open, setOpen] = React.useState(false);

  return (
    <Box
      component={Paper}
      sx={{
        margin: "10px",
        minWidth: "450px",
        maxWidth: "450px",
        listStyle: "none",
        backgroundColor: "#F3F7FD",
        borderRadius: "5px 5px 0 0"
      }}
    >
      <Stack
        component="header"
        justifyContent="space-between"
        direction="row"
        sx={{
          padding: "10px",
        }}
      >
        <img height="60px" alt={logo} src={logo_link} style={{margin: "10px"}}/>
        <a href={link} style={{margin: "10px", height: "60px", width: "125px", position: "relative"}}><span style={{position: "absolute", top: "18px", left: 0}}>Перейти на сайт</span></a>
        { !logo_link && <h3 className={styles.offer__name}>{name}</h3>}
      </Stack>
      { !is_active &&
      <Button
        variant="contained"
        // loading
        size="large"
        color="error"
        sx={{
          width: "100%",
          borderRadius: 0
        }}
      >ЗАПРОСИТЬ ДОСТУП</Button>}
      { is_active &&
        <Box 
          disabled 
          variant="filled" 
          sx={{width: "100%", height: "34px", backgroundColor: "#B1E69C", paddingTop: "8px"}}
        >
          <span className={styles.status__deny}>ДОСТУПЕН</span>
        </Box>
      }
      <TableContainer>
      <Table aria-label="collapsible table">
        <TableHead sx={{ width: "90%"}}>
          <TableRow>
            <TableCell  sx={{border: "none"}}/>
            <TableCell   sx={{border: "none"}}><p className={styles.options__name}>Холд</p></TableCell>
            <TableCell   sx={{border: "none"}}><p className={styles.options__name}>Ставка (₽)</p></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
              <TableRow>
                <TableCell>
                  <IconButton
                    aria-label="expand row"
                    size="small"
                    onClick={() => setOpen(!open)}
                  >
                    {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                  </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">
                  {options.hold === true ? "Да" : "Нет"}
                </TableCell>
                <TableCell>{options.cost}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={3}>
                  <Collapse in={open} timeout="auto" unmountOnExit  sx={{maxHeight: "360px"}}>
                    <Box sx={{ margin: 1 }}>
                      <Typography variant="h6" component="h6">
                        Подробности предложения
                      </Typography>
                      {description}
                      {is_active && <LinkGenerator link={link_redirect}/>}
                    </Box>
                  </Collapse>
                </TableCell>
              </TableRow>
        </TableBody>
      </Table>
    </TableContainer>


    </Box>
  )
}

export default Offer;