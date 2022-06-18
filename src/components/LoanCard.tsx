import { FC, useState } from 'react';
import { 
  Button, 
  Typography, 
  Box, 
  Paper,
  Modal,
  TextField,
} from '@mui/material';
import { useAppDispatch } from './../store/hooks';
import { changeAvailability } from '../store/slices/slice';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

type CardType = {
  title: string,
  available: number,
  amount: string,
  ltv: string,
  id: number,
}
export const LoanCard: FC<CardType> = ({ title, available, amount, ltv, id }) => {

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [avail, setAvail] = useState<number>(available);

  const dispatch = useAppDispatch();

  const onChangehandler = (value: number) => {
    const setValue = available - value > 0 ? value : avail;
    setAvail(setValue);
  };

  const submitHandler = () => {
    dispatch(changeAvailability({id, avail}));
    handleClose();
  }
  return (
    <>
      <Paper 
        elevation={10} 
        sx={{ height: '120px', p: 2, m: 2, width: '600px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box>
          <Typography 
            flexWrap='wrap' 
            component='div' 
            variant='h5'>
            {title}
          </Typography>
          <Typography 
            variant='subtitle1' 
            color='text.secondary' 
            component='div'>
            Available: ${available}
          </Typography>
        </Box>
        <Box>
          <Button 
          variant='contained' 
          sx={{ display: 'flex', alignSelf: 'flex-end', ml: 1 }} 
          onClick={handleOpen}
        >
          INVEST
        </Button>
        </Box>
      </Paper>
      <Modal
        open={open}
        onClose={handleClose}
      >
        <Box sx={style}>
      <Typography 
        variant='h6' 
        component='h2'>
        Invest in {title}
      </Typography>
      <Typography  sx={{ mt: 2 }}>
        Amount available: ${available}
      </Typography>
      <Typography  sx={{ mt: 2 }}>
        Amount: ${amount}
      </Typography>
      <Typography  sx={{ mt: 2 }}>
        LTV: ${ltv}
      </Typography>
      <Box 
        component='form' 
        sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center'  }}
      >
        <TextField
          value={avail}
          label='Number'
          type='number'
          InputLabelProps={{
            shrink: true,
          }}
          InputProps={{ inputProps: { min: '100', max: `${available}`} } }
          sx={{ mt: 2 }}
          onChange={(e) => onChangehandler(Number(e.target.value))}
        />
        <Button 
          variant='contained' 
          sx={{ mb: -1 }}
          onClick={submitHandler}
          disabled={available <= 0}
        >
          INVEST
        </Button>
      </Box>
    </Box>
      </Modal>
    </>
  );
}
