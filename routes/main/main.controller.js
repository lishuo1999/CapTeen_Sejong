

exports.main = (req, res, next) => {
    res.sendFile('index.html', {root: 'public/htmls'});
}