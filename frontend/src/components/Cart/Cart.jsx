import { Container, Typography, Grid, Button} from '@material-ui/core';
import React from 'react';
import CartItem from './CartItem/CartItem';
import { Link } from 'react-router-dom';

import useStyles from './styles'

const Cart = ({cart, handleUpdateCartQty, handleRemoveFromCart, handleEmptyCart}) => {

    const classes = useStyles();

    const EmptyCart = () => (
        <div>
        <Typography variant="subtitle1"> Sie haben noch keine Aufträge in Ihrem Warenkorb! 
            <Link to="/" className={classes.link}> Fügen Sie einen Auftrag im Warenkorb.</Link>
        </Typography>
        </div>
    )

    const FilledCart = () => (
        <>
            <Grid container spacing={3}>
                {cart.line_items.map((item) => (
                    <Grid item xs={12} sm={4} key={item.id}>
                        <CartItem item={item} onUpdateCartQty={handleUpdateCartQty} onRemoveFromCart={handleRemoveFromCart}/>
                    </Grid>
                ))}
            </Grid>
            <div className={classes.cardDetails}>
                <Typography variant="h4">Gesamtpreis: {cart.subtotal.formatted_with_symbol}</Typography>
                    <div>                                                           
                        <Button className={classes.emptyButton} size="large" type="button" variant="contained" color="secondary" onClick={handleEmptyCart}>Warenkorb leeren</Button>
                        <Button component={Link} to="/checkout" className={classes.checkoutButton} size="large" type="button" variant="contained" color="primary" >Kasse</Button>
                    </div>
            </div>
        </>
    );

    if(!cart.line_items) return 'Lädt noch...';

    return (
        <Container>
            <div className={classes.toolbar}/>
            <Typography className={classes.title} variant="h3" gutterBottom>Warenkorb</Typography>
            {!cart.line_items.length ? <EmptyCart/> : <FilledCart/>}
        </Container>
    );
}

export default Cart
