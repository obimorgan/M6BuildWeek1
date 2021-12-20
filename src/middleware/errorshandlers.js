const errorHandlers = (err, req, res, next) => {
    switch(err.code) {
        default: 
            res.status(500).send('Server Error')
    }
}

export default errorHandlers