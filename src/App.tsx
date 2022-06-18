import AppBarComponent from './components/AppBarComponent';
import { LoanCard } from './components/LoanCard';
import { Typography } from '@mui/material';
import { useAppSelector } from './store/hooks';

function App() {
  const { loans } = useAppSelector(state => state.slice);

  const totalAmount = loans.map(item => 
    item.available).reduce((prev, curr) => prev + curr);
  return (
    <>
      <AppBarComponent />
      {loans.map(loan => (
        <LoanCard 
          key={loan.id} 
          available={loan.available}
          title={loan.title}
          amount={loan.amount}
          ltv={loan.ltv}
          id={loan.id}
        />
      ))}
      <Typography component="h1" sx={{ ml: 3 }}>
        <strong>
          Total amount available for investment: ${totalAmount}
        </strong>
      </Typography>
    </>
  );
}

export default App;
