// Initialize
Parse.initialize("gRgG6rXH59W6J19MrqWtiAWAdEGqjoZjEs0GsH6H", "viwxKM3bX10rDDpGpdc3U0kDCr9eJm4WDhhrlPR3");
$(document).ready(function(){
            
  $('.controlPanel').hide();
  $('.menu').hide(); 
  $('.UserSignUpForm').hide();     
  $('.hlForm').hide(); 

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
        var email =  $('Email').val(); //Will not use email auth methods for this app for version 1.

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
  $('#hltrigger').click(function(){
    $('.hlForm').fadeIn(1000, function(){
      //done
    });
  });



  //Function to save a homework object
       
       $('#hlSubmit').click(
        function saveit (){
       var Homework = Parse.Object.extend("Homework");
       var homework = new Homework();

       var subject = $('#subjectSelector').val();
       var studentName = $('#StudentName').val();
       var hlcontent = $('#hltext').val();
 
        homework.set("Subject", subject);
        homework.set("UserName", studentName);
        homework.set("Content", hlcontent);
 
        homework.save(null, {
          success: function(tableobject) {
            // Execute any logic that should take place after the object is saved.
            alert('New object created with objectId: ' + tableobject.id);
            var SubjectSaveId = tableobject.id 
          },
          error: function(tableobject, error) {
            // Execute any logic that should take place if the save fails.
            // error is a Parse.Error with an error code and description.
            alert('Failed to create new object, with error code: ' + error.description);
          }
        });
    });

       
    














});