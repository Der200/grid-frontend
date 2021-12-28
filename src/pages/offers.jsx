import Offer from "../components/offer/offer";
import { Box } from '@mui/material';
import { useSelector } from 'react-redux';
import { offers } from '../services/redux/offers-slice/offers-slice';


const Offers = () => {
  const offersData = useSelector(offers)
  
  return (
    <>
      <h2 align="center">Список офферов</h2>
      <Box 
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {offersData.map((offer, index) => (
          <Offer 
            offer={offer}
            key={index}
          />
        ))}
      </Box>
    </>
  )
}

export default Offers;