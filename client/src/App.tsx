import { Routes } from 'react-router-dom';

import Container from './components/widgets/Container';
import { routes } from './routes';

function App() {
  return (
    <Routes>
      {routes.map((r: any) => (
        <r.parentComponent
          path={r.path}
          {...r}
          element={
            <Container>
              {' '}
              <r.component />
            </Container>
          }
        />
      ))}
    </Routes>
  );
}

export default App;
