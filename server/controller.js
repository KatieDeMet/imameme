const imgArr = []

module.exports = {
    getImg: (req, res) => {
        res.stauts(200).send(imgArr)
    },
    addImg: (req, res) => {
        let { id, url } = req.body
        let imgObj = {
            id: id,
            url: url
        }
        imgArr.push(imgObj)
        res.status(200).send(imgObj.url)
    }
}