function Web() {
};

Web.prototype = {
    contentType :      "application/json",
    markerUrl :     "/marker",
    markersUrl :    "/markers"
};


Web.prototype.post = function (url, data, callback) {
    $.ajax({
        url: url,
        contentType : web.contentType,
        type: 'POST',
        data: data,
        success: callback
    });
};

Web.prototype.put = function (url, data, callback) {
    $.ajax({
        url: url,
        contentType : web.contentType,
        type: 'PUT',
        data: data,
        success: callback
    });
};

Web.prototype.get = function (url, callback) {
    $.ajax({
        url: url,
        contentType : web.contentType,
        type: 'GET',
        success: callback
    });
};

Web.prototype.delete = function (url, data, callback) {
    $.ajax({
        url: url,
        contentType : web.contentType,
        type: 'DELETE',
        data: data,
        success: callback
    });
};


var web = new Web();