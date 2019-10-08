let attributes = [];
let minAttributes = 5;
let cancelAttribute = ( index ) =>{
    console.log( 'in cancelAttribute:', index );
    attributes.splice( index, 1 );
    updateAttributes();
}

let addAttribute = () =>{
    console.log( 'in submitAttribute' );
    let stringIn = document.getElementById( 'attributeIn' ).value.toUpperCase();
    console.log( 'trying to add:', stringIn );
    
    if( stringIn === ''){
        alert( 'no empties' );
    }
    else if( attributes.indexOf( stringIn ) >= 0 ){
        alert( 'no doubles, yo' );
        document.getElementById( 'attributeIn' ).value = '';
    }
    else{
        stringIn = stringIn.replace( /\s+/g, '-' );
        attributes.push( stringIn );
        document.getElementById( 'attributeIn' ).value = '';
        updateAttributes();
    }
} // end submitAttribute

let submitAttributes = () =>{
    console.log( 'in submitAttributes' );
    if( attributes.length < minAttributes ){
        alert( 'need more, yo! Minimum of ' + minAttributes );
    }
    else{
        console.log( 'sending:', attributes );
        axios.post('/attributes', { attributes } )
          .then(function (response) {
            console.log(response);
            if( response.status === 200 ){
                alert( 'thanks!');
            }
            else{
                alert( 'looks like polling is closed...');
            }
            attributes = [];
            updateAttributes();
          })
          .catch(function (error) {
            console.log(error);
          });
    }
}

let updateAttributes = () =>{
    console.log( 'in updateAttributes' );
    let el = document.getElementById( 'submissionsOut' );
    let appendString = '';
    for( index in attributes ){
        appendString += `<li onClick="cancelAttribute( ${index} )">${attributes[index]}</li>`;
    } //end for
    el.innerHTML = appendString;
} // end updateAttributes