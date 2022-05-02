

exports.main = (req, res, next) => {
    res.sendFile('index.html', {root: 'public/htmls'});
    res.sendFile('index.css', {root: 'public/htmls'});
    res.sendFile('indexvideo.mp4', {root: 'public/htmls'});
}