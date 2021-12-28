import { Box } from "@mui/material";
import StatSettings from "../components/stat-settings/stat-settings";
import StatTable from "../components/stat-table/stat-table";

const Stats = () => {

  return (
    <Box sx={{margin: "auto"}}>
      <h2 align="center">Статистика</h2>
      <StatSettings />
      <StatTable />
    </Box>
  )
}

export default Stats;