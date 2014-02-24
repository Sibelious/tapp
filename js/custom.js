// Initialize
Parse.initialize("gRgG6rXH59W6J19MrqWtiAWAdEGqjoZjEs0GsH6H", "viwxKM3bX10rDDpGpdc3U0kDCr9eJm4WDhhrlPR3");
$(document).ready(function(){
            
  $('.controlPanel').hide();
  $('.menu').hide(); 
  $('.UserSignUpForm').hide();      

  $(".submit").click(function(event){
              event.preventDefault();
              
              signIn();
            });
     
          
          function signIn(){
              
              var username = $('#username').val();
              var password = $('#password').val();

             Parse.User.logIn(username, password, {
            success: function(user) {
              alert("Welcome " + username);
              goHome();
            },

            error: function(user, error) {
                  
                  alert("Error: " + error.code + " " + error.message);
                }
            });   
          };

          function goHome(){
            $('.greenboard').fadeOut( 1000, homeRedir());
          };

          function homeRedir(){
            $( ".controlPanel" ).fadeIn( 1000, function() {
            // Animation complete
            });
            $('.menu').show();
            $('.menu').stop().animate({
                'width':'500px'
              }, 500);

          };
  $("#UserSignInSubmit").click(function(event){
    event.preventDefault();
    signUp();
    });
  
    function signUp (){

        var name = $('#Username').val();
        var passcode = $('#Password').val();
        var email =  $('Email').val(); //This is not defined on purpose, may define later

        var user = new Parse.User();

        user.set("username", name);
        user.set("password", passcode);
        user.set("email", email);

        user.signUp(null, {
              success: function(user) {
                
                alert("User has been successfully signed up.");
              },
              error: function(user, error) {
                
                alert(error.message)
              }
            });
    };
  $('#newUser').click(function(){
    $('.UserSignUpForm').fadeIn( 1000, function(){
      //done
    });
  });
});