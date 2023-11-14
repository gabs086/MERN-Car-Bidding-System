import { useEffect } from 'react';

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';

import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import validationSchema from './yupValidator';
import { useBoolean } from '@/hooks/useBoolean';
import useYupValidationResolver from '@/hooks/useYupValidationResolver ';
import { useAppSelector, useAppDispatch } from '@/hooks/reduxhooks';
import { clearRegister } from '@/redux/auth/authenticationSlice';
import { loginUser } from '@/redux/auth/authenticationCreators';

type Inputs = {
   username: string;
   password: string;
};

export default function Home() {
   const navigate = useNavigate();
   const dispatch = useAppDispatch();
   const registerSuccess = useBoolean(false);
   const loginError = useBoolean(false);

   const resolver = useYupValidationResolver(validationSchema);
   const {
      control,
      handleSubmit,
      formState: { errors, isValid },
   } = useForm({
      defaultValues: {
         username: '',
         password: '',
      },
      resolver,
      mode: 'onChange',
   });
   const auth: any = useAppSelector((state) => state.auth);
   console.log('auth:', auth);

   const onSubmit: SubmitHandler<Inputs> = (data) => {
      console.log('data:', data);
      dispatch(loginUser(data));
   };

   useEffect(() => {
      if (auth.register.data?.success) {
         registerSuccess.setTrue();
      }
   }, [auth.register?.data]);

   useEffect(() => {
      if (auth.login.isAuthenticated) {
         navigate('/dashboard');
      }
   }, [auth.login.isAuthenticated]);

   useEffect(() => {
      if (auth.login.error) {
         loginError.setTrue();
      }
   }, [auth.login.errorData]);

   return (
      <Container component='main' maxWidth='xs'>
         <Collapse in={loginError.value}>
            <Alert
               action={
                  <IconButton
                     aria-label='close'
                     color='inherit'
                     size='small'
                     onClick={() => {
                        loginError.setFalse();
                     }}
                  >
                     <CloseIcon fontSize='inherit' />
                  </IconButton>
               }
               variant='filled'
               severity='error'
               sx={{ mb: 2 }}
            >
               {auth.login.errorData?.message}
            </Alert>
         </Collapse>

         <Collapse in={registerSuccess.value}>
            <Alert
               action={
                  <IconButton
                     aria-label='close'
                     color='inherit'
                     size='small'
                     onClick={() => {
                        registerSuccess.setFalse();
                     }}
                  >
                     <CloseIcon fontSize='inherit' />
                  </IconButton>
               }
               variant='filled'
               severity='success'
               sx={{ mb: 2 }}
            >
               Successfully Registered. You may login with your account.
            </Alert>
         </Collapse>

         <Box
            sx={{
               marginTop: 8,
               display: 'flex',
               flexDirection: 'column',
               alignItems: 'center',
            }}
         >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
               <LockOutlinedIcon />
            </Avatar>
            <Typography component='h1' variant='h5'>
               Sign in
            </Typography>
            <Box
               component='form'
               onSubmit={handleSubmit(onSubmit)}
               noValidate
               sx={{ mt: 1 }}
            >
               <Controller
                  control={control}
                  render={({ field: { onChange, onBlur, value } }) => (
                     <TextField
                        onChange={onChange}
                        onBlur={onBlur}
                        margin='normal'
                        required
                        fullWidth
                        id='username'
                        label='Username'
                        name='username'
                        autoComplete='username'
                        autoFocus
                        value={value}
                        error={Boolean(errors?.username)}
                        helperText={errors?.username?.message as string}
                     />
                  )}
                  name='username'
               />

               <Controller
                  control={control}
                  render={({ field: { onChange, onBlur, value } }) => (
                     <TextField
                        onChange={onChange}
                        onBlur={onBlur}
                        margin='normal'
                        required
                        fullWidth
                        name='password'
                        label='Password'
                        type='password'
                        id='password'
                        value={value}
                        error={Boolean(errors?.password)}
                        helperText={errors?.password?.message as string}
                     />
                  )}
                  name='password'
               />
               <Button
                  type='submit'
                  fullWidth
                  variant='contained'
                  sx={{ mt: 3, mb: 2 }}
                  disabled={!isValid}
               >
                  Sign In
               </Button>
               <Grid container>
                  <Grid item>
                     <Link
                        onClick={() => {
                           dispatch(clearRegister());
                           navigate('/register');
                        }}
                        style={{ cursor: 'pointer' }}
                        variant='body2'
                     >
                        {"Don't have an account? Sign Up"}
                     </Link>
                  </Grid>
               </Grid>
            </Box>
         </Box>
      </Container>
   );
}
