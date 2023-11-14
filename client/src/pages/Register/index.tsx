import { useEffect, forwardRef } from 'react';

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import CircularProgress from '@mui/material/CircularProgress';

import { useAppSelector, useAppDispatch } from '@/hooks/reduxhooks';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useBoolean } from '@/hooks/useBoolean';

import validationSchema from './yupValidator';
import useYupValidationResolver from '@/hooks/useYupValidationResolver ';
import { registerUser } from '@/redux/auth/authenticationCreators';
import { clearRegister } from '@/redux/auth/authenticationSlice';

import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
   props,
   ref
) {
   return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />;
});

type Inputs = {
   fullName: string;
   email: string;
   phoneNumber: number;
   username: string;
   password: string;
};

export default function Register() {
   const navigate = useNavigate();
   const dispatch = useAppDispatch();
   const resolver = useYupValidationResolver(validationSchema);
   const { value, setTrue, setFalse } = useBoolean(false);
   const {
      control,
      handleSubmit,
      formState: { errors, isValid },
   } = useForm({
      defaultValues: {
         fullName: '',
         email: '',
         phoneNumber: null,
         username: '',
         password: '',
      },
      resolver,
      mode: 'onChange',
   });
   const auth: any = useAppSelector((state) => state.auth);

   const onSubmit: SubmitHandler<Inputs> = (data) => {
      console.log('data:', data);
      dispatch(registerUser(data));
   };

   useEffect(() => {
      if (auth.register.data?.success) {
         navigate('/');
      }
   }, [auth.register?.data]);

   useEffect(() => {
      if (auth.register.errorData?.error) {
         setTrue();
      }
   }, [auth.register?.errorData]);

   useEffect(() => {
      dispatch(clearRegister());
   }, []);

   return (
      <Container component='main' maxWidth='xs'>
         <Snackbar
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            open={value}
            autoHideDuration={6000}
            onClose={setFalse}
         >
            <Alert onClose={setFalse} severity='error' sx={{ width: '100%' }}>
               {auth.register.errorData?.message}
            </Alert>
         </Snackbar>

         <Box
            sx={{
               marginTop: 8,
               display: 'flex',
               flexDirection: 'column',
               alignItems: 'center',
            }}
         >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
               <AppRegistrationIcon />
            </Avatar>
            <Typography component='h1' variant='h5'>
               Sign up
            </Typography>
            <Box
               component='form'
               noValidate
               onSubmit={handleSubmit(onSubmit)}
               sx={{ mt: 3 }}
            >
               <Grid container spacing={2}>
                  <Grid item xs={12}>
                     <Controller
                        control={control}
                        render={({ field: { onChange, onBlur, value } }) => (
                           <TextField
                              onChange={onChange}
                              onBlur={onBlur}
                              value={value}
                              autoComplete='fullName'
                              name='fullName'
                              required
                              fullWidth
                              id='fullName'
                              label='Full Name'
                              autoFocus
                              error={Boolean(errors?.fullName)}
                              helperText={errors?.fullName?.message as string}
                           />
                        )}
                        name='fullName'
                     />
                  </Grid>

                  <Grid item xs={12}>
                     <Controller
                        control={control}
                        render={({ field: { onChange, onBlur, value } }) => (
                           <TextField
                              onChange={onChange}
                              onBlur={onBlur}
                              value={value}
                              autoComplete='email'
                              name='email'
                              required
                              fullWidth
                              id='email'
                              label='Email'
                              error={Boolean(errors?.email)}
                              helperText={errors?.email?.message as string}
                           />
                        )}
                        name='email'
                     />
                  </Grid>

                  <Grid item xs={12}>
                     <Controller
                        control={control}
                        render={({ field: { onChange, onBlur, value } }) => (
                           <TextField
                              onChange={onChange}
                              onBlur={onBlur}
                              value={value}
                              autoComplete='phoneNumber'
                              name='phoneNumber'
                              required
                              fullWidth
                              id='phoneNumber'
                              label='Phone Number'
                              type='number'
                              error={Boolean(errors?.phoneNumber)}
                              helperText={
                                 errors?.phoneNumber?.message as string
                              }
                           />
                        )}
                        name='phoneNumber'
                     />
                  </Grid>

                  <Grid item xs={12}>
                     <Controller
                        control={control}
                        render={({ field: { onChange, onBlur, value } }) => (
                           <TextField
                              onChange={onChange}
                              onBlur={onBlur}
                              value={value}
                              required
                              fullWidth
                              id='username'
                              label='Username'
                              name='username'
                              autoComplete='username'
                              error={Boolean(errors?.username)}
                              helperText={errors?.username?.message as string}
                           />
                        )}
                        name='username'
                     />
                  </Grid>
                  <Grid item xs={12}>
                     <Controller
                        control={control}
                        render={({ field: { onChange, onBlur, value } }) => (
                           <TextField
                              onChange={onChange}
                              onBlur={onBlur}
                              value={value}
                              required
                              fullWidth
                              name='password'
                              label='Password'
                              type='password'
                              id='password'
                              autoComplete='new-password'
                              error={Boolean(errors?.password)}
                              helperText={errors?.password?.message as string}
                           />
                        )}
                        name='password'
                     />
                  </Grid>
               </Grid>
               <Button
                  type='submit'
                  fullWidth
                  variant='contained'
                  sx={{ mt: 3, mb: 2 }}
                  disabled={!isValid || auth.register.loading}
               >
                  {auth.register.loading && <CircularProgress />}
                  {auth.register.loading ? 'Loading...' : 'Sign Up'}
               </Button>
               <Grid container justifyContent='flex-end'>
                  <Grid item>
                     <Link
                        onClick={() => navigate('/')}
                        style={{ cursor: 'pointer' }}
                        variant='body2'
                     >
                        Already have an account? Sign in
                     </Link>
                  </Grid>
               </Grid>
            </Box>
         </Box>
      </Container>
   );
}
