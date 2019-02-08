import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import StarIcon from '@material-ui/icons/StarBorder';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import background from './background.jpg';
import './HomePage.css';
import AppBar from '../Navigation/AppBar';



const styles = theme => ({
  "@global": {
    body: { 
      backgroundColor: 'rgba(255, 255, 255, 0.5)',
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center center",
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
        height: "100%",
        backgroundImage:`url(${background})`,
        filter:'grayscale(10%)',
        
        // opacity: 0.1,
 },
		
'linear-gradient':('to bottom, transparent 0%, black 100%')
   
  },
  
  toolbarTitle: {
    flex: 1,
  },
  card: {
    marginTop:100,
    maxWidth: 900,
   
  },
  media: {
    height: 220,
    paddingTop: '56.25%', // 16:9 
    
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(900 + theme.spacing.unit * 3 * 2)]: {
      width: 900,
      marginLeft: 'auto',
      fontWeight:'bolder',
      marginRight: 'auto',
    },
  },
  heroContent: {    
    maxWidth: 600,
    margin: '0 auto',
    padding: `${theme.spacing.unit * 8}px 0 ${theme.spacing.unit * 6}px`,
  },
  Gridradius:{
    borderRadius:'50%',
    width:"50px",
    height:"200px",
    border:'1px solid black',
    marginTop:10,
   
  },
  cardHeader: {
    //backgroundColor: theme.palette.grey[200],
  },
  cardPricing: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'baseline',
    marginBottom: theme.spacing.unit * 2,
  },
  cardActions: {
    [theme.breakpoints.up('sm')]: {
      paddingBottom: theme.spacing.unit * 2,
    },
  },
  footer: {
    marginTop: theme.spacing.unit * 8,
    borderTop: `1px solid ${theme.palette.divider}`,
    padding: `${theme.spacing.unit * 6}px 0`,
   
   
  },
});

const tiers = [
  {
    title: 'Gift',
    price: '0',
    description: ['10 users included', '2 GB of storage', 'Help center access', 'Email support'],
    buttonText: 'Sign up for free',
    buttonVariant: 'outlined',
  },
  {
    title: 'Discount',
    subheader: 'Most popular',
    price: '15',
    description: [
      '20 users included',
      '10 GB of storage',
      'Help center access',
      'Priority email support',
    ],
    buttonText: 'Sign Up',
    buttonVariant: 'contained',
  },
  {
    title: 'Value',
    price: '30',
    description: [
      '50 users included',
      '30 GB of storage',
      'Help center access',
      'Phone & email support',
    ],
    buttonText: 'Contact us',
    buttonVariant: 'outlined',
  },
];
const footers = [
 
  {
    title: 'SERVICES',
    description: ['Phcn Bill', 'Airtime', 'Jamb ', 'Wassce'],
  },
  {
    title: 'SUBSCRIPTION',
    description: ['Yearly', 'Monthly', 'Quarterly'],
  },
  {
    title: 'BENEFITS',
    description: ['A year bonus', 'History', 'Free Voucher', 'Free Discount'],
  },
];

function HomePage(props) {
  const { classes } = props;

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar/>
      <main className={classes.layout}>
     
        <Grid container>
          <Grid item xs={12} className="Homegrid"> 
          </Grid>
        </Grid>
        <div className={classes.heroContent}>
          <Typography component="h1" variant="h3" align="center" color="black" gutterBottom  style={{fontWeight:"bold"}}>
            Vourcherz
          </Typography>
          <Typography variant="h5" align="center" color="black" component="p" style={{fontWeight:"bold"}}>
            Quickly build an effective affordable vourcher for your potential customers with this .
            It&apos;s more about meeting your needs at your convenience
          </Typography>
        </div>
        {/* End hero unit */}
        <Grid container spacing={40} alignItems="flex-end">
          {tiers.map(tier => (
            // Enterprise card is full width at sm breakpoint
            <Grid item key={tier.title} xs={12} sm={tier.title === 'Enterprise' ? 12 : 6} md={4}>
              <Card>
                <CardHeader
                  title={tier.title}
                  subheader={tier.subheader}
                  titleTypographyProps={{ align: 'center' }}
                  subheaderTypographyProps={{ align: 'center' }}
                  action={tier.title === 'Pro' ? <StarIcon /> : null}
                  className={classes.cardHeader}
                />
                <CardContent>
                  <div className={classes.cardPricing}>
                    <Typography component="h2" variant="h3" color="textPrimary">
                      ${tier.price}
                    </Typography>
                    <Typography variant="h6" color="textSecondary">
                      /mo
                    </Typography>
                  </div>
                  {tier.description.map(line => (
                    <Typography variant="subtitle1" align="center" key={line}>
                      {line}
                    </Typography>
                  ))}
                </CardContent>
                <CardActions className={classes.cardActions}>
                  <Button fullWidth variant={tier.buttonVariant} color="primary">
                    {tier.buttonText}
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
        
      </main>
      <footer className={classNames(classes.footer, classes.layout)} >
        <Grid container spacing={32} justify="space-evenly">
          {footers.map(footer => (
            <Grid item xs key={footer.title}>
              <Typography variant="h6" color="textPrimary" gutterBottom  style={{fontWeight:"bold"}}>
                {footer.title}
              </Typography>
              {footer.description.map(item => (
                <Typography key={item} variant="subtitle1" color="textPrimary"  style={{fontWeight:"bold"}}>
                  {item}
                </Typography>
              ))}
            </Grid>
          ))}
        </Grid>
      </footer>
      {/* End footer */}
    </React.Fragment>
  );
}

HomePage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(HomePage);