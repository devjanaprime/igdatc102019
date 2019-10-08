// requires
const express = require( 'express' );
const app = express();
const bodyParser = require( 'body-parser' );
// uses
app.use( express.static( 'server/public' ) );
app.use( bodyParser.urlencoded( { extended: true } ) );
app.use( bodyParser.json() );
// globals
const port = process.env.PORT || 5000;
let attributes = [];
let accepting = true;

// spin up server
app.listen( port, ()=>{
    console.log( 'server up on:', port );
}) //end server up

app.get( '/attributes', ( req, res )=>{
    console.log( 'in /attribtues GET' );
    let sortedAttributes = [];
    let existingAttributes = [];
    let attributesCount = [];
    for( attribute of attributes ){
        let existingIndex = existingAttributes.indexOf( attribute );
        if( existingIndex < 0 ){
            existingAttributes.push( attribute );
            attributesCount.push( 1 );
        }
        else{
            attributesCount[ existingIndex ]++;
        }
    }
    for( index in existingAttributes ){
        sortedAttributes.push( { name: existingAttributes[ index ], count: attributesCount[ index ] } );
    }
    sortedAttributes.sort( (a, b) => (a.count > b.count) );
    res.send( sortedAttributes );
}) // end get

app.post( '/attributes', ( req, res ) =>{
    if( accepting ){
        console.log( 'in /attributes POST:', req.body );
        for( attribute of req.body.attributes ){
            attributes.push( attribute );
        } //end for
        res.sendStatus( 201 );
    }
    else{
        res.sendStatus( 200 );
    }
    
}) // end post

app.get( '/toggle', ( req, res )=>{
    accepting = !accepting;
    res.send( accepting );
}) // end dev