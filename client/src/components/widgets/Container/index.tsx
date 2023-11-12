import NaviBar from '../Navibar';
import Box from '@mui/material/Box';
import MUIContainer from '@mui/material/Container';

type Props = {
  children: string | JSX.Element | JSX.Element[] | React.ReactNode;
};

export default function Container({ children }: Props) {
  return (
    <>
      <NaviBar />
      <MUIContainer fixed>
        <Box component='div' sx={{ width: '100%', height: '100px', border: '1px solid black', padding: '10px', margin: '10px' }}>
          {children}
        </Box>
      </MUIContainer>
    </>
  );
}
