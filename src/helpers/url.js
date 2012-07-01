var url = module.exports = {
    match: function(url){
        return url.match(/^[a-z]+\:\/{2}.*$/gi);
    }
}