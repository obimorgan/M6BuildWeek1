const errorHandlers = (err, req, res, next) => {
    console.log('err', err)
    switch(err.status) {
        case 400: 
            res.status(400).send('Bad Request')
            break;
        case 404:
            res.status(404).send('Not Found')
            break;
        default: 
            res.status(500).send('Server Error')
    }
}

export default errorHandlers