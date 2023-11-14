import NaviBar from '../Navibar';
import Box from '@mui/material/Box';
import MUIContainer from '@mui/material/Container';

import { containerWrapperStyle } from './style';

type Props = {
   children: string | JSX.Element | JSX.Element[] | React.ReactNode;
};

export default function Container({ children }: Readonly<Props>) {
   return (
      <>
         <NaviBar />
         <MUIContainer fixed>
            <Box component='div' sx={containerWrapperStyle}>
               {children}
            </Box>
         </MUIContainer>
      </>
   );
}
