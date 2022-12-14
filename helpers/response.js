class _response {
    sendResponse = (res, data) => {
        try{
            if(data.code){
                res.status(data.code);
                delete data.code;
                res.send(data)
                return true
            }
            res.status(data && data.status ? 200 : 404)
            res.send(data)
            return true
        }catch(e){
        console.error('sendresponse response helper error', e)

        res.status(500).send({
            status: false,
            error: e
        })
        return false
        }
    }
    errorHandler = (err, req, res, next) => {
        if (err.name === 'UnautorizedError') {
            // Error jwt
            return res.status(401).send({
                status: false,
                error: 'Invalid Token'
            })
        }

        // Default error handling
        return res.status(500).send({
            status: false,
            error: err.message
        })
    }
}

module.exports = new _response()