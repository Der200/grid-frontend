import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import uniqid from "uniqid";

import { 
  applySettings,
  changeDates } from "../../services/redux/stats-slice/stats-slice";

import { Box, 
  Button, 
  TextField, 
  FormControl, 
  FormLabel, 
  RadioGroup, 
  FormControlLabel, 
  Radio, 
  InputLabel, 
  Select, 
  MenuItem, 
  OutlinedInput, 
  Checkbox, 
  ToggleButtonGroup,
  ToggleButton,
  ListItemText,
  Accordion,
  AccordionSummary,
  AccordionDetails } from "@mui/material";
import { DatePicker } from '@mui/lab';
import { ExpandMore } from "@mui/icons-material";

import moment from "moment";


const StatSettings = () => {
  const offersNames = [
    'Offer-1',
    'Offer-2',
    'Offer-3',
    'Offer-4',
    'Offer-5'
  ];

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  const statColumns = {
    days: ["Дата"],
    offers: ["ID", "Оффер"],
    subs: ["sub1", "sub2", "sub3", "sub4", "sub5", "sub6"],
    global: ["Сумма", "Клики", "Хосты", "Конверсии", "Одобрены", "Холд", "В работе", "Отклонены", "CR", "AR", "EPL", "EPC", "EPC хосты"]
  };

  const dispatch = useDispatch();
  const currentDate = moment();

  const initialSettingsState = {
    datePeriod: "today",
    offersTotalCheck: true,
    sortType: "days",
    selectedOffers: offersNames,
    subs: {},
    subsValue: {},
    visibleColumns: ["Дата", "Сумма"],
    stickyColumn: "none"
  };

  const [changedSettings, setChangedSettings] = useState(initialSettingsState);
  const [dates, setDates] = useState({start: currentDate, end: currentDate});
  const [accordeonExpanded, setAccordionExpanded] = useState(false);

  useEffect(() => {
    dispatch(changeDates({start: dates.start.format(), end: dates.end.format()}));
  }, [])
  
  const subsValueHanler = (event) => {
    setChangedSettings({...changedSettings, subsValue: {...changedSettings.subsValue, [event.target.name]: event.target.value}});
  }

  const sortTypeHandler = (event) => {
    if (event.target.value === "days") {
      setChangedSettings({...changedSettings, sortType: "days", visibleColumns: statColumns.days.concat(statColumns.global[0])});
    }
    if (event.target.value === "offers") {
      setChangedSettings({...changedSettings, sortType: "offers", visibleColumns: statColumns.offers.concat(statColumns.global[0])});
    }
    if (event.target.value === "subs") {
      setChangedSettings({...changedSettings, sortType: "subs", visibleColumns: statColumns.subs.concat(statColumns.global[0])});
    }
  }

  const columnVisibleHandler = (event, newFormats) => {
    setChangedSettings({...changedSettings, visibleColumns: newFormats});
  };

  const stickyColumnHandler = (event) => {
    setChangedSettings({...changedSettings, stickyColumn: event.target.value});
  };

  const changeDatePeriodHandler = (event) => {
    switch (event.target.value) {
      case "today": 
        setChangedSettings({...changedSettings, datePeriod: event.target.value});
        setDates({start: currentDate, end: currentDate});
        break;
      case "yesterday": 
        setChangedSettings({...changedSettings, datePeriod: event.target.value});
        setDates({start: currentDate.clone().subtract(1, "days"), end: currentDate.clone().subtract(1, "days")});
        break;
      case "week": 
        setChangedSettings({...changedSettings, datePeriod: event.target.value});
        setDates({start: currentDate.clone().startOf('week'), end: currentDate.clone().endOf('week')});
        break;
      case "month": 
        setChangedSettings({...changedSettings, datePeriod: event.target.value});
        setDates({start: currentDate.clone().startOf('month'), end: currentDate.clone().endOf('month')});
        break;
      case "last_month": 
        setChangedSettings({...changedSettings, datePeriod: event.target.value});
        setDates({start: currentDate.clone().startOf("month").subtract(1, "month"), end: currentDate.clone().endOf("month").subtract(1, "month")});
        break;
      default: 
        setChangedSettings({...changedSettings, datePeriod: event.target.value});
        setDates({start: currentDate, end: currentDate});
    }
  }

  const changeSelectedOffersHandler = (event) => {
    setChangedSettings({...changedSettings, selectedOffers: typeof event.target.value === 'string' ? event.target.value.split(',') : event.target.value});
  };

  const changeTotalOffersHandler = () => {
    if(changedSettings.offersTotalCheck) {
      setChangedSettings({...changedSettings, selectedOffers: [], offersTotalCheck: false});
    } else {
      setChangedSettings({...changedSettings, selectedOffers: offersNames, offersTotalCheck: true});
    }
  }

  useEffect(() => {
    if (changedSettings.selectedOffers.length === offersNames.length) {
      setChangedSettings({...changedSettings, offersTotalCheck: true});
    } else {
      setChangedSettings({...changedSettings, offersTotalCheck: false});
    }
  }, [changedSettings.selectedOffers])

  const clearSettingsHandler = () => {
    setChangedSettings(initialSettingsState);
    setDates({start: currentDate, end: currentDate});
  }

  const applySettingsHandler = () => {
    dispatch(applySettings(changedSettings));
    dispatch(changeDates({start: dates.start.format(), end: dates.end.format()}));
  }

  return (
    <Accordion id="acc" onChange={(event, expanded) => setAccordionExpanded(expanded)} expanded={accordeonExpanded}>
    <AccordionSummary
      expandIcon={<ExpandMore />}
      id="statSettingsAccordeon"
      sx={{backgroundColor: "rgba(25, 118, 210, 0.08)"}}

    >
    <h3 align="center" style={{margin: 8}}>Настройка параметров</h3>
    </AccordionSummary>
      <AccordionDetails sx={{padding: 0}}>
        <Box 
          component="section"
          sx={{
            padding: 2,
            borderRadius: "0 0 7% 7%",
            marginBottom: "35px",
            display: "flex",
            flexDirection: "column",
            width: "96%"
        }}>
          <div style={{display: "flex", width: "100%", justifyContent: "center", flexWrap: "wrap"}}>
            <Box
              sx={{marginRight: "20px", width: "450px"}}
            >
              <div style={{display: "flex", justifyContent: "space-between", flexWrap: "wrap", marginTop: "8px", marginBottom: "10px"}}>
                <FormLabel component="span" sx={{marginTop: "7px"}}>Статистика за период:</FormLabel>
                <FormControl variant="standard" sx={{ marginBottom: "15px", width: 250}}>
                  <Select
                    labelId="date-period-label"
                    id="date-period-select"
                    value={changedSettings.datePeriod}
                    onChange={changeDatePeriodHandler}
                    label="dates"
                    sx={{textAlign: "center"}}
                  >
                    <MenuItem value={"today"}>текущий день</MenuItem>
                    <MenuItem value={"yesterday"}>вчера</MenuItem>
                    <MenuItem value={"week"}>текущая неделя</MenuItem>
                    <MenuItem value={"month"}>текущий месяц</MenuItem>
                    <MenuItem value={"last_month"}>прошлый месяц</MenuItem>
                    <MenuItem value={"another"}>свой период</MenuItem>
                  </Select>
                </FormControl>
                { changedSettings.datePeriod === "another" && <div>
                  <DatePicker
                    maxDate={dates.end}
                    mask={'__.__.____'}
                    value={dates.start}
                    onChange={(newValue) => {
                      setDates({...dates, start: newValue});
                    }}
                    label="Начальная дата"
                    renderInput={(params) => <TextField sx={{width: "47%", marginRight: "10px", marginBottom: "10px"}} {...params} />}
                  />
                  <DatePicker 
                    minDate={dates.start}
                    mask={'__.__.____'}
                    value={dates.end}
                    onChange={(newValue) => {
                      setDates({...dates, end: newValue});
                    }}
                    label="Конечная дата"
                    renderInput={(params) => <TextField sx={{width: "47%", marginBottom: "25px"}} {...params} />}
                  />
                </div>}
              </div>
              <Box sx={{display: "flex", justifyContent: "space-between", marginBottom: "25px"}}>
                <FormControl sx={{width: "60%" }}>
                  <InputLabel id="offers-select">Офферы</InputLabel>
                  <Select
                    labelId="offers-select"
                    id="offers-select"
                    multiple
                    value={changedSettings.selectedOffers}
                    onChange={changeSelectedOffersHandler}
                    input={<OutlinedInput label="Офферы" />}
                    renderValue={(selected) => selected.join(', ')}
                    MenuProps={MenuProps}
                  >
                    {offersNames.map((name) => (
                      <MenuItem key={name} value={name}>
                        <Checkbox checked={changedSettings.selectedOffers.indexOf(name) > -1} />
                        <ListItemText primary={name} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControlLabel control={<Checkbox checked={changedSettings.offersTotalCheck} onChange={changeTotalOffersHandler}/>} label="Выбрать всех" />
              </Box>
              <RadioGroup
                row 
                aria-label="sort-types"
                name="sort-types-group"
                sx={{display: "flex", justifyContent: "space-between"}}
              >
                <div style={{marginTop: "8px"}}>
                  <FormLabel component="span">Сортировать по:</FormLabel>
                </div>
                <FormControlLabel 
                  onChange={sortTypeHandler} 
                  checked={changedSettings.sortType === "days"} 
                  value="days" 
                  control={<Radio />} 
                  label="дням" 
                />
                <FormControlLabel 
                  onChange={sortTypeHandler} 
                  checked={changedSettings.sortType === "offers"} 
                  value="offers" 
                  control={<Radio />} 
                  label="офферам" 
                />
                <FormControlLabel 
                  onChange={sortTypeHandler} 
                  checked={changedSettings.sortType === "subs"} 
                  value="subs" 
                  control={<Radio />} 
                  label="sub ID" 
                />
              </RadioGroup>
            </Box>

            <Box sx={{width: "450px", display: "flex", flexDirection: "column", marginRight: "25px", padding: 1, paddingRight: "25px"}}>
              <TextField 
                id="outlined-basic" 
                label="Sub1" 
                variant="outlined" 
                size="small" 
                name="sub1" value={changedSettings.subsValue.sub1 || ''} 
                onChange={subsValueHanler} 
                sx={{marginBottom: 1}}
              />
              <TextField 
                id="outlined-basic" 
                label="Sub2" 
                variant="outlined" 
                size="small" 
                name="sub2" 
                value={changedSettings.subsValue.sub2 || ''} 
                onChange={subsValueHanler} 
                sx={{marginBottom: 1}}
              />
              <TextField 
                id="outlined-basic" 
                label="Sub3" 
                variant="outlined" 
                size="small" 
                name="sub3" 
                value={changedSettings.subsValue.sub3 || ''} 
                onChange={subsValueHanler} sx={{marginBottom: 1}} 
              />
              <TextField 
                id="outlined-basic" 
                label="Sub4" 
                variant="outlined" 
                size="small" 
                name="sub4" 
                value={changedSettings.subsValue.sub4 || ''} 
                onChange={subsValueHanler} sx={{marginBottom: 1}}
              />
              <TextField 
                id="outlined-basic" 
                label="Sub5" 
                variant="outlined" 
                size="small" 
                name="sub5" 
                value={changedSettings.subsValue.sub5 || ''} 
                onChange={subsValueHanler} 
                sx={{marginBottom: 1}}
              />
              <TextField 
                id="outlined-basic" 
                label="Sub6" 
                variant="outlined" 
                size="small" 
                name="sub6" 
                value={changedSettings.subsValue.sub6 || ''} 
                onChange={subsValueHanler}
              />
            </Box>

            <Box sx={{width: "320px", marginRight: "25px",  paddingRight: "25px"}}>
              <h4 style={{marginBottom: "10px"}}>Отобразить поля таблицы:</h4>
              <ToggleButtonGroup
              component="fieldset"
              value={changedSettings.visibleColumns}
              onChange={columnVisibleHandler}
              aria-label="Видимость колонок таблицы статистики"
              sx={{display: "flex", flexWrap: "wrap", justifyContent: "space-between" }}
              >
                {changedSettings.sortType === "days" && statColumns.days.map((item) => (
                  <ToggleButton disabled value={item} aria-label={item} key={item} size="small" sx={{marginBottom: "10px", fontSize: "12px"}}>{item}</ToggleButton> 
                ))}
                {changedSettings.sortType === "offers" && statColumns.offers.map((item) => (
                  <ToggleButton disabled value={item} aria-label={item} key={item} size="small" sx={{marginBottom: "10px", fontSize: "12px"}}>{item}</ToggleButton>
                ))}
                {changedSettings.sortType === "subs" && statColumns.subs.map((item) => (
                  <ToggleButton value={item} aria-label={item} key={item} size="small" sx={{marginBottom: "10px", fontSize: "12px"}}>{item}</ToggleButton>
                ))}
                {statColumns.global.map((item) => (
                  item === "Сумма" ? 
                  <ToggleButton disabled value={item} aria-label={item} key={item} size="small" sx={{marginBottom: "10px", fontSize: "12px"}}>{item}</ToggleButton> :
                  <ToggleButton value={item} aria-label={item} key={item} size="small" sx={{marginBottom: "10px", fontSize: "12px"}}>{item}</ToggleButton>
                ))}
              </ToggleButtonGroup>
              <div style={{padding: "5px"}}>
                <FormLabel component="span" sx={{top: "5px", marginRight: "10px"}}>Закрепить столбец:</FormLabel>
                <FormControl variant="standard" sx={{ marginBottom: "15px", width: 140}}>
                  <Select
                    labelId="date-period-label"
                    id="date-period-select"
                    value={changedSettings.stickyColumn}
                    onChange={stickyColumnHandler}
                    label="dates"
                    sx={{textAlign: "center"}}
                  >
                    <MenuItem value={"none"}>не закреплять</MenuItem>
                    {changedSettings.visibleColumns.map((item) => (
                      <MenuItem value={item} key={uniqid(item)}>{item}</MenuItem>
                    ))
                    }
                  </Select>
                </FormControl>
              </div>
            </Box>
            <Box sx={{display: "flex", flexDirection: "column", width: "450px"}}>
            <p>В текущей панели вы можете выбрать различные параметры для отображения статистики. <br />Сброс параметров вернёт все настройки в исходное состояние. <br />Окно параметров автоматически скроется после применения настроек, чтобы не отвлекать вас от ознакомления с результатами.</p>
            <Button size="large" color="success" variant="contained" sx={{width: "100%", borderRadius: 0, marginTop: "25px"}} onClick={applySettingsHandler}>Применить</Button>
            <Button size="large" color="error" sx={{width: "100%", marginTop: "20px"}}  onClick={clearSettingsHandler}>Сбросить</Button>
          </Box>
          </div>

        </Box>
        <Button onClick={() => {setAccordionExpanded(false)}} sx={{width: "100%"}}>Скрыть панель настроек</Button>
      </AccordionDetails>
    </Accordion>
  )
}

export default StatSettings;