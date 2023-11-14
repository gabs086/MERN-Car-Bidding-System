import { Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import Container from '@/components/widgets/Container';
import ProtectedRoute from '@/components/widgets/ProtectedComponent';
import { routes } from './routes';

import store from './redux/store';
function App() {
   return (
      <Provider store={store}>
         <Routes>
            {routes.map((r: any) => (
               <Route
                  path={r.path}
                  {...r}
                  element={
                     <Container>
                        {r.protected ? (
                           <ProtectedRoute>
                              <r.component />
                           </ProtectedRoute>
                        ) : (
                           <r.component />
                        )}
                     </Container>
                  }
               />
            ))}
         </Routes>
      </Provider>
   );
}

export default App;
