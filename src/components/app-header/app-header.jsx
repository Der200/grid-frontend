import React from 'react';
import { Stack } from '@mui/material';
import { NavLink } from 'react-router-dom';
import styles from './app-header.module.css';
import { ManageAccounts, QueryStats, MonetizationOn } from '@mui/icons-material';

const AppHeader = () => {

  return (
    <header 
      className={styles.container}
    >
      <Stack
        component="nav"
        justifyContent="space-between"
        direction="row"
        className={styles.navigation}
      >
        <NavLink exact activeStyle={{color: "#5282FF"}} className={styles.link} to={"/"}><span className={styles.link__text}>Grid Template</span></NavLink>
        <Stack
          justifyContent="flex-end"
          alignItems="center"
          direction="row"
          spacing={3}
        >
          <NavLink activeStyle={{color: "#5282FF"}} className={styles.link} to={"/offers"}><MonetizationOn sx={{width: "34px", height: "34px"}}/><span className={styles.link__text}>Офферы</span></NavLink>
          <NavLink activeStyle={{color: "#5282FF"}} className={styles.link} to={"/stats"}><QueryStats sx={{width: "34px", height: "34px"}}/><span className={styles.link__text}>Статистика</span></NavLink>
          <NavLink activeStyle={{color: "#5282FF"}} className={styles.link} to={"/profile"}><ManageAccounts sx={{width: "34px", height: "34px"}}/><span className={styles.link__text}>Личный кабинет</span></NavLink>
        </Stack>
      </Stack>
    </header>
  )
}

export default AppHeader;