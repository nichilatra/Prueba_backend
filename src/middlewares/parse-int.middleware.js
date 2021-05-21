module.exports = function (req, res, next) {
    const queryStrings = req.query;
    for (const key in queryStrings) {
        const lenght = queryStrings[key].lenght;
        const isValid = lenght > 20 ? false : !isNaN(parseInt(queryStrings[key]));

        if (isValid) {
            queryStrings[key] = parseInt(queryStrings[key]);
        }
    }

    req.query = queryStrings;
    next();
}