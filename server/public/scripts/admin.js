let affected = 0;
let totalCount = 0;

let addAffected = () =>{
    affected++;
    document.getElementById( 'affectedOut' ).innerHTML = 'Affected: '+ affected;
    let percent = ((affected/totalCount) * 100 ).toFixed( 2 );
    document.getElementById( 'percentOut' ).innerHTML = percent + '%';
}

let toggleAccepting = () =>{
    console.log( "in toggleAccepting" );
    axios.get('/toggle' )
        .then(function (response) {
            console.log(response);
            document.getElementById( 'acceptingOut' ).innerHTML = response.data;
        })
        .catch(function (error) {
            console.log(error);
        });
}

let updateList = () =>{
    axios.get('/attributes' )
    .then( function (response) {
        console.log(response);
        let el = document.getElementById( 'outputUl' );
        el.innerHTML = '';
        let appendString = '';
        for( attribute of response.data ){
            appendString += `<li onClick="addAffected()">${attribute.name} (${attribute.count}) </li>`
            totalCount += attribute.count;
        } //end for
        el.innerHTML = appendString;
        document.getElementById( 'countOut' ).innerHTML = 'Total Subissions: ' + totalCount;
    })
    .catch(function (error) {
        console.log(error);
    });
}

toggleAccepting();
toggleAccepting();
updateList();