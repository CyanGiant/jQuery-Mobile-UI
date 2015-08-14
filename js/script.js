$(document).one('pageinit', function() {
    //Display Runs
    showRuns();

    // Add Handler
    $('#submitAdd').on('tap', addRun);

    // Edit Handler
    $('#submitEdit').on('tap', editRun);

    // Delete Handler
    $('#stats').on('tap', '#deleteLink', deleteRun);

    // Set Current Handler
    $('#stats').on('tap', '#editLink', setCurrent);

    // Clear Handler
    $('#clearRuns').on('tap', clearRuns);

    /*
     * Show All Runs on homepage
     */
    function showRuns() {
        //Get runs object
        var runs = getRunsObject();

        //Check if empty
        if (runs != '' && runs != null) {
            for (var i = 0; i < runs.length; i++) {
                $('#stats').append('<li class="ui-body-inherit ui-li-static"><strong>Date:</strong>' + runs[i]["date"] +
                    ' <br><strong>Distance: </strong>' + runs[i]["miles"] + ' Miles<div class="controls">' +
                    '<a href="#edit" id="editLink" data-miles="' + runs[i]["miles"] + '"data-date="' + runs[i]["date"] + '">Edit</a> | <a href="#" id="deleteLink" data-miles="' + runs[i]["miles"] + '"data-date="' + runs[i]["date"] + '" onclick="return" confirm(\'Are You Sure?\')>Delete</a></li>');
            }
            $('#home').bind('pageinint', function() {
                $('#stats').listview('refresh');
            });
        } else {
            $('#stats').html('<p>You have no logged trips!</p>');
        }
    }

    /*
     *Add A run
     */
    function addRun() {
        //Get Form Values
        var miles = $('#addMiles').val();
        var date  = $('#addDate').val();

        // Create 'run' object
        var run   = {
            date: date,
            miles: parseFloat(miles)
        };

        var runs  = getRunsObject();

        // Add runs to run Array
        runs.push(run);

        alert('Run is Being Added');

        // Set stringify objects to localStorage
        localStorage.setItem('runs', JSON.stringify(runs));

        // Redirect
        window.location.href = "index.html";

        return false;
    }

    /*
     *Edit A run
     */
    function editRun() {
        //Get current data
        currentMiles = localStorage.getItem('currentMiles');
        currentDate  = localStorage.getItem('currentDate');

        var runs     = getRunsObject();

        // Loop Through Runs
        for (var i = 0; i < runs.length; i++) {
            if (runs[i].miles == currentMiles && runs[i].date == currentDate) {
                runs.splice(i, 1);
            }
            localStorage.setItem('runs', JSON.stringify(runs));
        }

        //Get Form Values
        var miles = $('#editMiles').val();
        var date  = $('#editDate').val();

        // Create 'run' object
        var update_run = {
            date: date,
            miles: parseFloat(miles)
        };

        // Add runs to run Array
        runs.push(update_run);

        alert('Run Updated');

        // Set stringify objects to localStorage
        localStorage.setItem('runs', JSON.stringify(runs));

        // Redirect
        window.location.href = "index.html";
        return false;
    }

    /*
     *Clear Runs
     */
    function clearRuns() {
        localStorage.removeItem('runs');
        $('#stats').html('<p>You have no logged trips!</p>');
    }

    /*
     *Delete run
     */
    function deleteRun() {
        //Set localStorage items
        localStorage.setItem('currentMiles', $(this).data('miles'));
        localStorage.setItem('currentDate', $(this).data('date'));

        //Get current data
        currentMiles = localStorage.getItem('currentMiles');
        currentDate  = localStorage.getItem('currentDate');

        var runs = getRunsObject();

        // Loop Through Runs
        for (var i = 0; i < runs.length; i++) {
            if (runs[i].miles == currentMiles && runs[i].date == currentDate) {
                runs.splice(i, 1);
            }
            localStorage.setItem('runs', JSON.stringify(runs));
        }

        alert('Run is Being Deleted');


        // Redirect
        window.location.href = "index.html";

        return false;
    }

    /*
     * Get the runs object
     */
    function getRunsObject() {
        //Set Runs Array
        var runs = new Array();
        //Get current runs from localStorage
        var currentRuns = localStorage.getItem('runs');

        //Check localStorage
        if (currentRuns !== null) {
            //Set to runs
            var runs = JSON.parse(currentRuns);
        }

        //Return Runs object
        return runs.sort(function(a, b) {
            return new Date(b.date) - new Date(a.date)
        });

    }
    
    /*
     * Set the current clicked miles and date
     */
    function setCurrent() {
        //Set localStorage items
        localStorage.setItem('currentMiles', $(this).data('miles'));
        localStorage.setItem('currentDate', $(this).data('date'));

        // Insert form fields
        $('#editMiles').val(localStorage.getItem('currentMiles'));
        $('#editDate').val(localStorage.getItem('currentDate'));
    }
});
