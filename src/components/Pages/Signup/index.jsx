import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { createUser } from '../../../redux/actions/user';
import { validateForm } from '../../../redux/actions/formValidator';

import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import clsx from 'clsx';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';



const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    margin: {
      margin: theme.spacing(1),
    },
    withoutLabel: {
      marginTop: theme.spacing(3),
    },
    textField: {
      width: '25ch',
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const Signup = () => {
    const classes = useStyles();

    const [create,setCreate] = useState({
        name: '',
        email:'',
        password:'',
        isLogging: false
    });

    const [showPassword,setShowPassword] = useState(true);

    const dispatch = useDispatch();
    const history = useHistory();

    const { form, user } = useSelector(state => state);

    const handleChange = (prop) => (event) => {
        setCreate({ ...create, [prop]: event.target.value });
    }

    useEffect(() => {
        if(form.isValid && create.isLogging){
            dispatch(createUser(create));
        }
        setCreate({...create,isLogging: false});
    },[form]);

    useEffect(() => {
        if(!user.error && user.user.msg !== "")
            history.push('/');
    },[user])
 

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };
    const handleClick = () => {
        dispatch(validateForm([
            {
                name:"name",
                required:true,
                value:create.name
            },
            {
                type:'email',
                required:true,
                value:create.email
            },
            {
                name:"password",
                required:true,
                value:create.password
            }
        ]));
        setCreate({...create,isLogging: true});
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    return (
        <div className={classes.root}>
            <Grid container direction="row" justify="center" alignItems="center">
                <Paper className={classes.paper}>   
                    <Typography variant="h2" component="h1">Sign up!</Typography>
                    <Grid container direction="column" justify="center" alignItems="center">
                        <FormControl className={clsx(classes.margin, classes.withoutLabel, classes.textField)}>
                            <InputLabel htmlFor="name">Name</InputLabel>
                            <Input
                                id="name"
                                onChange={handleChange('name')}
                                error={form.fields.length  ? form.fields[0].error : false }
                            />
                            <FormHelperText id="name-error">{form.fields.length > 0 ? form.fields[0].msg:false }</FormHelperText>
                            
                        </FormControl>
                    </Grid>
                    <Grid container direction="column" justify="center" alignItems="center">
                        <FormControl className={clsx(classes.margin, classes.withoutLabel, classes.textField)}>
                            <InputLabel htmlFor="email">Email</InputLabel>
                            <Input
                                id="email"
                                onChange={handleChange('email')}
                                error={form.fields.length  ? form.fields[1].error : false }
                            />
                            <FormHelperText id="email-error">{form.fields.length > 0 ? form.fields[1].msg:false }</FormHelperText>
                            
                        </FormControl>
                    </Grid>
                    <Grid container direction="column" justify="center" alignItems="center">
                        <FormControl className={clsx(classes.margin, classes.textField)}>
                            <InputLabel htmlFor="password">Password</InputLabel>
                            <Input
                                id="password"
                                type={showPassword ? 'password' : 'text'}
                                onChange={handleChange('password')}
                                error={form.fields.length  ? form.fields[2].error : false }
                                endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                    >
                                    {showPassword ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>
                                }
                            />
                            <FormHelperText id="email-error">{form.fields.length > 0 ? form.fields[2].msg:false }</FormHelperText>
                        </FormControl>
                        <Button variant="contained" color="primary"onClick={() => handleClick(true)}>
                            Sign up
                        </Button>
                    </Grid>
                </Paper>
            </Grid>
            <Snackbar open={user.error} autoHideDuration={3000}>
                <Alert severity="error">
                {user.msg}
                </Alert>
            </Snackbar>
        </div>
    );
}

export default Signup;