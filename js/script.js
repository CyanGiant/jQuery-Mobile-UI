$(document).one('pageinit', function(){
  // Add Handler
  $('#submitAdd').on('tap', addRun);

  /*
   *Add A run
   */
   function addRun(){
     //Get Form Values
     var miles = $('#addMiles').val();
     var date = $('#addDate').val();

     // Create 'run' object
     var run = {
       date: date,
       miles: parseFloat(miles)
     };

     var runs = getRunsObject();

     // Add runs to run Array
     runs.push(run);

     alert('Run Added');

     // Set stringify objects to localStorage
     localStorage.setItem('runs', JSON.stringify(runs));

     // Redirect
     window.location.href="index.html";

     return false;
    }
   /*
    * Get the runs object
    */
    function getRunsObject(){
      //Set Runs Array
      var runs = new Array();
      //Get current runs from localStorage
      var currentRuns = localStorage.getItem('runs');

      //Check localStorage
      if(currentRuns !== null){
        //Set to runs
        var runs = JSON.parse(currentRuns);
      }

      //Return Runs object
      return runs.sort(function(a, b){return new Date(b.date) - new Date(a.date)});

    }

});
