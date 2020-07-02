import React,{useEffect,useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {getPosts} from '../../../redux/actions/post';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';


const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
  media: {
    height: 140,
  },
  padding: {
    paddingTop:30
  }
});

const Posts = () => {
    const classes = useStyles();
    const {post} = useSelector(state => state);
    const dispatch = useDispatch();

    const [loadPost,setLoadPost] = useState(true);

    useEffect(() =>{
        if(post.posts.length <= 0 && loadPost){
            dispatch(getPosts());
            setLoadPost(false);
        }
    },[post,dispatch,loadPost])


    return (
        <Grid container className={classes.padding} spacing={3}>
            <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
            >
                <Grid item xs={6}>
                    holiiii
                </Grid>
            </Grid>
            {post.posts.length > 0 ?
                post.posts.map(p => (
                    <Grid item xs={4} key={p._id}>
                        <Card className={classes.root}>
                            <CardActionArea>
                                <CardMedia
                                className={classes.media}
                                image={p.image}
                                title="Contemplative Reptile"
                                />
                                <CardContent>
                                <Typography gutterBottom variant="h5" component="h2">
                                    {p.title}
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    {p.content}
                                </Typography>
                                </CardContent>
                            </CardActionArea>
                            <CardActions>
                                <Button size="small" color="primary">
                                    Delete
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))
            :
                <p>No hay posts</p>
            }
        </Grid>
    );
}

export default Posts;