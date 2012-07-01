now.ready(function(){
    var t = $('#header').html();
    $('#layout').html(_.template(t, now.config));
});