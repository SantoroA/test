import React from 'react';
import ButtonFilled from '../../components/customUi/ButtonFilled';
//MATERIAL UI
import { makeStyles } from '@material-ui/core/styles';
import Rating from '@material-ui/lab/Rating';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import { Card, CardMedia, CardContent, CardActions, Typography, Box } from '@material-ui/core';

const useStyles = makeStyles({
    card: {
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: '#F6F8FB',
        width: '43.5rem',
        margin: 'auto',
        justifyContent: 'space-between'
    },
    media: {
        width: '25%',
        height: 0,
        paddingTop: '30%', 
    },
    reserve: {
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#E8E8E8',
    },
    contentInfo: {
        display: 'flex',
        flexDirection: 'column'
    },
    buttonContent: {
        alignSelf: 'flex-end'
    }, 
    dateSearch: {
        padding: '10px',
        width: '43.5rem',
        margin: 'auto'
    }

});




const DoctorCard = () => {
    const classes = useStyles();
	return (
		<div className= {classes.mainContent}>
            <Box className={classes.dateSearch}>
                <Typography variant="h5" color="textSecondary" component="p">Mon, 30 September</Typography>
            </Box>
            <Card className={classes.card}>
                <CardMedia
                    className={classes.media}
                    image="https://thumbs.dreamstime.com/z/medical-docto-7736401.jpg"
                    title="Doctor"/>
                <CardContent className={classes.content}>
                    <Box component="fieldset" mb={3} borderColor="transparent">
                        <Rating
                            name="customized-empty"
                            defaultValue={2}
                            precision={0.5}
                            emptyIcon={<StarBorderIcon fontSize="inherit" />}/>
                        <Typography component="legend">(Reviews)</Typography>
                    </Box>
                    <Box className={classes.contentInfo}>
                        <Typography variant="h5" color="textSecondary" component="p">Dr. Michael Goldman</Typography>
                        <Typography variant="body2" color="textSecondary" component="p">Specialist in Internal medicine and cardiology</Typography>
                        <Typography variant="body2" color="textSecondary" component="p">7:00 - 7:30</Typography>
                        <ButtonFilled className={classes.buttonContent}>More</ButtonFilled>
                    </Box>
                </CardContent>
                <CardActions className={classes.reserve}>
                    <Typography variant="body2" color="textSecondary" component="p">From</Typography>
                    <Typography variant="body2" color="textSecondary" component="p">$ 110</Typography>
                    <ButtonFilled type="submit" onSubmit={() => {console.log('send')}} >Reserve</ButtonFilled>
                </CardActions>
            </Card>
	    </div>
	);
};

export default DoctorCard;




