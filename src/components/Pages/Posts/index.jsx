import React,{useEffect,useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { validateForm } from '../../../redux/actions/formValidator';

import { getPosts,createPosts,deletePosts } from '../../../redux/actions/post';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  media: {
    height: 140,
  },
  padding: {
    paddingTop:30
  },
  table: {
    minWidth: 650,
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
}));

const Posts = () => {
    const classes = useStyles();
    const {post,form} = useSelector(state => state);
    const dispatch = useDispatch();

    const [loadPost,setLoadPost] = useState(true);
    const [Post,setPost] = useState({
        title:'',
        content:'',
        image:'',
        date:'',
        isPosting: false
    });

    const [page,setPage] = useState(0);

    useEffect(() =>{
        if(post.posts.length <= 0 && loadPost){
            dispatch(getPosts({from:0}));
            setLoadPost(false);
        }
    },[post,dispatch,loadPost]);

    const handleChange = (prop) => (event) => {
        setPost({ ...Post, [prop]: event.target.value });
        if(event.target.type === "file"){
            setPost({ ...Post, [prop]: event.target.files[0] });
        }
    }

    useEffect(() => {
        if(form.isValid && Post.isPosting){
            const now = new Date();
            const data = new FormData();
            data.append('title',Post.title);
            data.append('content',Post.content);
            data.append('image',Post.image);
            data.append('date',now.toString());
            dispatch(createPosts(data));
            setLoadPost(true);
            setPage(0);
            if(!loadPost){
                dispatch(getPosts({from:(0)}));
                setLoadPost(false);
            }
        }
        setPost({...Post,isPosting: false});
    },[form]);

    const handleClick = () => {
        dispatch(validateForm([
            {
                name:'title',
                required:true,
                value:Post.title
            },
            {
                name:"content",
                required:true,
                value:Post.content
            },
            {
                type:"file",
                name:"image",
                requiredFile:true,
                value:Post.image
            },
        ]));
        setPost({...Post,isPosting: true});
    };

    const handleDeleteClick = (id) => {
        dispatch(deletePosts(id));
        setLoadPost(true);
        setPage(0);
        if(!loadPost){
            dispatch(getPosts({from:(0)}));
            setLoadPost(false);
        }
    }

    const handleChangePage = (event, newPage) => {
        setLoadPost(true)
        setPage(newPage);
        if(!loadPost){
            dispatch(getPosts({from:(newPage*10)}));
            setLoadPost(false);
        }
    };
    
    return (
        <Grid container className={classes.padding} spacing={3}>
            <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
            >
                <Grid item xs={9}>
                    <Typography variant="h4">Pulish new post</Typography>
                    <Grid container>
                        <Grid item xs={3} spacing={3}>
                            <FormControl>
                                <InputLabel htmlFor="title">Title</InputLabel>
                                <Input
                                    id="title"
                                    onChange={handleChange('title')}
                                    error={form.fields.length  ? form.fields[0].error : false }
                                />
                                <FormHelperText id="title-error">{form.fields.length > 0 ? form.fields[0].msg:false }</FormHelperText>
                                
                            </FormControl>
                        </Grid>
                        <Grid item xs={3} spacing={3}>
                            <FormControl>
                                <TextareaAutosize 
                                    id="content" rowsMin={3} 
                                    placeholder="Content"
                                    onChange={handleChange('content')}
                                    error={form.fields.length  ? form.fields[1].error : false }
                                />
                                <FormHelperText id="content-error">{form.fields.length > 0 ? form.fields[1].msg:false }</FormHelperText>
                            </FormControl>
                        </Grid>
                        <Grid item xs={3} spacing={3}>
                            <FormControl>
                                <InputLabel htmlFor="image">Image</InputLabel>
                                <Input
                                    id="image"
                                    type="file"
                                    InputLabel="Image"
                                    onChange={handleChange('image')}
                                    error={form.fields.length  ? form.fields[2].error : false }
                                />
                                <FormHelperText id="image-error">{form.fields.length > 0 ? form.fields[2].msg:false }</FormHelperText>
                                
                            </FormControl>
                        </Grid>
                        <Grid item xs={3} spacing={3}>
                            <Button variant="contained" color="primary"onClick={() => handleClick(true)}>
                                Publish
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                    <TableRow>
                        <TableCell>Image</TableCell>
                        <TableCell align="right">title</TableCell>
                        <TableCell align="right">Content</TableCell>
                        <TableCell align="right">Date</TableCell>
                        <TableCell align="right">Actions</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {post.posts.map((row) => (
                        <TableRow key={row._id}>
                        <TableCell component="th" scope="row">
                            <Avatar alt="Remy Sharp" src={row.image} className={classes.large} />
                        </TableCell>
                        <TableCell align="right">{row.title}</TableCell>
                        <TableCell align="right">{row.content}</TableCell>
                        <TableCell align="right">{row.date}</TableCell>
                        <TableCell align="right">
                            <Button variant="contained" color="primary"onClick={() => handleDeleteClick(row._id)}>
                                Delete
                            </Button>    
                        </TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                component="div"
                count={post.count}
                rowsPerPage={10}
                page={page}
                onChangePage={handleChangePage}
            />
        </Grid>
    );
}

export default Posts;