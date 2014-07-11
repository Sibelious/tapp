// Initialize
Parse.initialize("gRgG6rXH59W6J19MrqWtiAWAdEGqjoZjEs0GsH6H", "viwxKM3bX10rDDpGpdc3U0kDCr9eJm4WDhhrlPR3");
$(document).ready(function(){


  $('.controlPanel').hide();
  $('.menu').hide(); 
  $('.UserSignUpForm').hide();     
  $('.hlForm').hide();
  $('.classForm').hide();
  $('#allClassesBox').hide();
  $('.classSetup').hide();
  $('.hasNoClass').hide();

 /*
 ===============FUNCTIONS===========================
 */

  //Function to send and query parse for the login details (signing in)
    function signIn(){
              
                 

                var username = $('#username').val();
                var password = $('#password').val();
                
                window.Usersname = username;

                $.cookie("cookie_Username", username);
                $.cookie("cookie_Psw", password);
                $.cookie("isCached", true);

               Parse.User.logIn(username, password, {
      success: function(user) {
                //Authentication
                var Auth = Parse.Object.extend("User");
                var query = new Parse.Query(Auth);
                query.equalTo("username", Usersname);
                query.find
                ({
                  success: function(results)
                  {
                    for (var i = 0; i < results.length; i++){
                      var object = results[i];
                      var auth = object.get('isUsrTeacher')
                      if (auth) {
                        $('.userType').text(Usersname);
                        goHome();
                      }
                      else
                      {
                        alert("You are not a teacher!");
                      }

                    }
                  },
                  error: function(error){
                    alert("Error: " + error.code + " " + error.message);
                  }
            
                  });
                //End Authentication
              },

      error: function(user, error) {
                    
                    alert("Error: " + error.code + " " + error.message);
                  }
      });
  };

  //Function that is part of the clearflor function to clear the screens when switching between screens
    function goHome(){
            $('.greenboard').fadeOut( 1000, homeRedir());
            var isFloorActive = false;
            window.IsFloorActive = isFloorActive
  };

  //Function that is also part of the clearFloor function to clear the screens when switching between screens
    function homeRedir(){
            $( ".controlPanel" ).fadeIn( 1000, function() {
            // Animation complete
            });
            $('.menu').show();
            $('.menu').stop().animate({
                'width':'20%'
              }, 500);
  };

  //Function to send new student user data to Parse
    function signUp (){

          var name = $('#Username').val();
          var passcode = $('#Password').val();
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

  //Crucial Function to  clear a screen so another screen can be shown
      function ClearFloor(){
        $('.UserSignUpForm').hide();     
        $('.hlForm').hide();
        $('#GroupSelect').hide();
        $('#indivForm').hide();
        $('.classForm').hide();
        $('#allClassesBox').hide();
        IsFloorActive = false;
  };

  //Function to take you back to the manage classes screen
    function finishedClassCreation(){
      $('.classSetup').fadeOut( 200 );
      $('.mainClassData').fadeIn( 200 );
      $('.teacherNameWelcome').fadeIn(200);
  };

  //Function to bring up the no classes found screen
    function noClassesFound(){
      $('.hasNoClass').fadeIn( 200 );
  };

  //Function to append the results of all classes set by user if ClassesFound is true
    function classesFound(){
      var classPut = Parse.Object.extend("Class");
      var query = new Parse.Query(classPut);
      query.equalTo("setByTeacher", Usersname);
      query.find
      ({
        success: function(results){
          for (var i = 0; i < results.length; i++) {
            var object = results[i];
            var teacherClass1 = object.get('clsNme');
            $('.Classes').append( '<button>' + teacherClass1 + '</button>');
          }
        },
        error: function(error){
          alert("Error: " + error.code + " " + error.message);
        }
      });
  };

  //Function to check if teacherHasClass and decide if classesFound or noClassesFound screens should be shown
    function getClasses(){
      var teacherClassQuery = Parse.Object.extend("User");
      var query = new Parse.Query(teacherClassQuery);
      query.equalTo("username", Usersname);
      query.find
      ({
        success: function(results) 
              {
              // Do something with the returned Parse.Object values
              for (var i = 0; i < results.length; i++) { 
              var object = results[i];
              var teacherHasClass = object.get('teacherHasClass');
              if (teacherHasClass){
                classesFound();
                
              }
              else{
                noClassesFound();
              }
              }
              },
              error: function(error) 
              {
              alert("Error: " + error.code + " " + error.message);
              }
      });
  };

  //Function to create a new class
    function putStudents(){
      var getStudents = Parse.Object.extend("User");
      var query = new Parse.Query(getStudents);
      query.equalTo("clsNme", $('.Classes.button').html() );
      query.find
      ({
        success: function(results){
          for (var i = 0; i < results.length; i++){
            var object = results[i];
            
          }
        }, error: function(){}
      });
  };

  //Function to get all users from the server
    function GetUsers(){
      var studentQuery = Parse.Object.extend("User");
      var query = new Parse.Query(studentQuery);
      query.notContainedIn("username",
                       ["Admin", "ExpandDong", "crawford.j", "Isaacs", "yearwood"])
      query.find
      ({
        success: function(results) 
              {
              // Do something with the returned Parse.Object values
              for (var i = 0; i < results.length; i++) { 
              var object = results[i];
              $('.studentPicker').append( '<div>' + '<div class="stuPickerContent">' + object.get('username') + '</div>' + '<input type="checkbox" class="student" name="studentsName" value="StudentsUser">' + '</div>')
              
              }
              },
              error: function(error) 
              {
              alert("Error: " + error.code + " " + error.message);
              }
      })
  };

  //Function to save a homework object
       
       $('#hlSubmit').click(
        function (){
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

 /*
 ===============END OF FUNCTIONS====================                                                                                                                                  
 */

 /*
 ===============BUTTON EVENTS=======================                                                                                                                                          
 */

  //Button event to trigger the sign in function
    $(".submit").click(function(event){
                event.preventDefault();
                signIn();
  }); 

  //Button event to submit form info and sign a new student user up to the database      
    $("#UserSignInSubmit").click(function(event){
      event.preventDefault();
      signUp();
  });  

  //Button event to trigger the create a new user screen
    $('#newUser').click(function newusr(){
      if (IsFloorActive) {
        ClearFloor();
        newusr();
      }
      else{
        $('.UserSignUpForm').fadeIn( 1000, function(){
        //done
      });
        IsFloorActive = true;
      }; 
  });

  //Button event to set an individual student some homework
    $('#indivSelect').click(function(){
      $('#GroupSelect').hide();
      $('#indivForm').fadeIn( 200 ); 
  });

  //Button event to bring up the set a class homework screen
    $('#classSelect').click(function(){
      $('#GroupSelect').hide();
      $('.classForm').fadeIn( 200 );
  });  

  //Button Event to put students in a class and save the class to Parse
    $('.newClassSubmit').click(function(){

      $('.student').each(function(){
          if($(this).is(':checked')){

          var PutClass = Parse.Object.extend("Class");
          var query = new Parse.Query(PutClass);
          var classToUser = $(this).prev();
          alert( classToUser.html() );
          query.equalTo("usersname", classToUser.html());
          query.first({
            success: function(object) {

              object.set("clsNme", $('.className').val() );
              object.set("setByTeacher", Usersname);
              object.save();


            },
            error: function(error) {
              alert("Error: " + error.code + " " + error.message);
            }
          });

          finishedClassCreation();
      


          }
          else{
          //Do nothing
          }
      });   
  });  

  //Button event to trigger the avaiable classes screen if teacherHasClass returns true
    $('#classChecker').click(function clsschkr(){
        if (IsFloorActive) {
          ClearFloor();
          clsschkr();
        }
        else{
          $('.tNWBox').text("Here are your classes, " + Usersname + ".");
          getClasses();
          $('#allClassesBox').fadeIn( 200 );
          IsFloorActive = true;
        }
  });

  //Button event to trigger the make a new class screen if teacherHasClass returns false
    $('.classMakeTrigger').click( function(){
      $('.mainClassData').fadeOut( 200 );
      $('.teacherNameWelcome').fadeOut( 200 );
      $('.classSetup').fadeIn( 200 );
      GetUsers(); 
  });

  //Button Event to trigger the set homework screen
    $('#hltrigger').click(function hltriggr(){
      if (IsFloorActive) {
        ClearFloor();
        hltriggr();
      }
      else{
        $('#indivForm').hide();
        $('.hlForm').fadeIn( 80 );
        $('#GroupSelect').fadeIn( 80 );
        
        IsFloorActive = true;
      }; 
  });  

  //Button Event to initialize the function to create a new class
    $('.Classes.button').click(function(){
      putStudents();
  });  

  //Button event to Delete the isCached Function 
    $('#logout').click(function(){
      $.cookie("isCached", false);
  });

 /*
 ===============END OF BUTTON EVENTS================                                                                                                                                                                 
 */
 
});
