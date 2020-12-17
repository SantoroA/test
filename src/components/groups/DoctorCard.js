import React from 'react';
import ButtonFilled from '../../components/customUi/ButtonFilled';
//MATERIAL UI
import { makeStyles } from '@material-ui/core/styles';
import Rating from '@material-ui/lab/Rating';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import { Card, CardMedia, CardContent, CardActions, Typography, Box } from '@material-ui/core';
import { Divider } from '@material-ui/core';
import Button from '@material-ui/core/Button';


const useStyles = makeStyles({
    card: {
        display: 'flex',
        flexDirection: 'row',
        background: 'linear-gradient(180deg, #F0F9FF 0%, #FFFFFF 100%)',
        width: '870px',
        height: '230px',
        margin: 'auto',
        marginTop: '20px',
        marginBottom: '10px',
        // justifyContent: 'space-between',
        borderRadius: '10px',
        boxShadow: 'none',
    },
    media: {
        position: 'flex',
        width: '218.68px',
        boxShadow: '10px rgba(14, 14, 14)'
        
    },
    rating: {
        display: 'flex',
        width: '230px',
        justifyContent: 'space-between'
    },
    name: {
        marginTop: -20,
        fontWeight:700,
        fontSize: '26px',
        letterSpacing: '0.5px',
        color: '#52575C'
    },

    text: {
        fontSize: 17,
        lineFeight: 16,
        letterSpacing: 0.1,
        color: '#111111'
    },
    hours: {
        paddingTop: '20px',
        paddingBottom: '20px',
        fontWeight: 'bold',
        fontSize: '18px',
        lineHeight: '20px',
        letterSpacing: '0.1px',
        color: '#52575C',
    },
    contentInfo: {
        marginLeft: 20,
        font: 'Roboto',
    },
    buttonContent: {
        alignSelf: 'flex-end'
    }, 
    dividor: {
        height: 102,
        marginTop: '5%',
        color: '#E8E8E8',

    },
    reserve: {
        display: 'flex',
        flexDirection: 'column',
        margin: 'auto',
        height: 100,
        justifyContent: 'space-between'
    },
    reserveText: {
        color: '#52575C',
        fontSize: '16px',
        fontFamily: 'Roboto',
        fontWeight:'bold',
        lineHeight: '16px',
        textAlign: 'center',
        letterSpacing: '1px'

    },
    btn: {
        color: '#09B8EF',
        fontFamily: 'Roboto',
fontWeight: 'bold',
fontSize: '14px',
lineHeight: '18px',
    }
});




const DoctorCard = (props) => {
    const classes = useStyles();
	return (
		<div className= {classes.mainContent}>
            <form onSubmit={props.getAppointment}>
            <Card className={classes.card} >
                <CardMedia
                    className={classes.media}
                    image={props.image}
                    title="Doctor"/>
                <Box borderLeft={15} borderColor='grey.300' ></Box>
                <CardContent className={classes.content}>
                    <Box component="fieldset" mb={3} borderColor="transparent" className={classes.rating} >
                        <Rating
                            name="customized-empty"
                            defaultValue={2}
                            precision={props.ratingStars}
                            emptyIcon={<StarBorderIcon fontSize="inherit" />}/>
                        <Typography >({props.reviews} Reviews)</Typography>
                    </Box>
                    <Box className={classes.contentInfo}>
                        <Typography variant="h5"  component="p" className={classes.name}>Dr. {props.fullName}</Typography>
                        <Typography variant="body2" color="textSecondary" className={classes.text} component="p">{props.description}</Typography>
                        <Typography variant="body2" color="textSecondary" className={classes.hours} component="p">{props.start} - {props.end}</Typography>
                        <Button className={classes.btn}>More</Button>
                    </Box>
                </CardContent>
                <Divider orientation='vertical' className={classes.dividor}/>
                <CardActions className={classes.reserve}>
                    <Typography variant="body2" color="textSecondary" component="p" className={classes.reserveText}>From</Typography>
                    <Typography variant="body2" color="textSecondary" component="p" className={classes.reserveText} style={{fontSize: '20px'}}>{props.currency} {props.price}</Typography>
                    <ButtonFilled type="submit" >Reserve</ButtonFilled>
                </CardActions>
            </Card>
            </form>
	    </div>
	);
};

export default DoctorCard;

// Dashboard doctor, availability




