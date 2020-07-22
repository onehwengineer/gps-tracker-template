initMap = function() {
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 12,
        center: {lat: 37.3382, lng: -121.8863}, // Initialize map view to Mountain View
        // styles: gray_mode, // Night mode,
    });
};


/*global OHE _config*/

var OHE = window.OHE || {};
OHE.map = OHE.map || {};

(function OHEScopeWrapper($) {
    
    var authToken;
    OHE.authToken.then(function setAuthToken(token) {
        if (token) {
            authToken = token;
        } else {
            window.location.href = '/signin.html'; // GO BACK TO LOGIN PAGE IF NOT AUTHENTICATED
        }
    }).catch(function handleTokenError(error) {
        alert(error);
        window.location.href = '/signin.html'; // GO BACK TO LOGIN PAGE IF NOT AUTHENTICATED
    });
    

    // Register click handler for #request button
    $(function onDocReady() {
        OHE.authToken.then(function updateAuthMessage(token) { 
            if (token) {
                displayUpdate('You are authenticated. Click to see your <a href="#authTokenModal" data-toggle="modal">auth token</a>.');
                $('.authToken').text(token);
            }
        });

        if (!_config.api.invokeUrl) {
            $('#noApiMessage').show();
        }
    });

    function displayUpdate(text) {
        $('#updates').append($('<li>' + text + '</li>'));
    }
}(jQuery));
