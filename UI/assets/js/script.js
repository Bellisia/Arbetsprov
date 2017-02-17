(function($){
  $("#search-form").submit(function (e) {

    // Prevent the form to reload the page on submit
    e.preventDefault();

    // remove the list items from the results and the chosen pet if a new search word is entered
    $("#search-results ul li").remove();
    $("#search-choice ul li").remove();

    // Turning the input value into lower case so it will match the pet name
    var value = $("#search-input").val().toLowerCase();

    // Using a free REST API with WoW pets
    var url = "https://eu.api.battle.net/wow/pet/?locale=en_GB&apikey=pnxbtrsya2krkjqjzz35hnd3aa4xfc33";

    // The ajax request
    $.ajax({
      url: url,
      dataType: "json",
      type: "GET",
      dataType: "json",
      success: function(petData) {

        // If success, the pets is looped through
        for(i in petData.pets) {

          // The name of the pets is turned into lower case so it's easier to match with the input value
          var result = petData.pets[i].name.toLowerCase();

          // Adding todays date to search
          var searchDate = new Date();
          var searchYear = searchDate.getFullYear();
          var searchMonth = searchDate.getMonth();
          var searchDay = searchDate.getDate();
          var searchTime = searchYear + "-" + (searchMonth<10 ? '0' : '') + searchMonth +  "-" + (searchDay<10 ? '0' : '') + searchDay + " " + searchDate.getHours() + ":" + searchDate.getMinutes();

          // If the pet names contains the value entered in the input field, append all of the matching pet name to the result div
          if (result.indexOf(value) > -1) {
            $("#search-results ul").append("<li><span class='pet'>" + petData.pets[i].name +
            "<span class='search-date'>" + searchTime +
            "</span></span><span class='search-remove'><i class='fa fa-remove'></i></span></li>");
          }
        }

        // If a name in the search result is clicked, show more info about the pet
        $("#search-results .pet").on('click', function(){

          // If another pet name is clicked, remove the previous chosen one
          $("#search-choice ul li").remove();

          // Turn the chosen pets text in the html into lower case to match the pets in the json
          var chosenPet = $(this).text().toLowerCase();

          // Loop through the pets names in the json again
          for(i in petData.pets) {

            // Turn the pets names into lower case
            var result = petData.pets[i].name.toLowerCase();

            // If the pet name chosen matches any of the pets names in the json, print it's info to the search choice div
            if(chosenPet == result) {
              $("#search-choice ul").append("<li>Name: " + petData.pets[i].name + "</li>" +
                "<li>Family: " + petData.pets[i].family + "</li>" +
                "<li>Can battle: " + petData.pets[i].canBattle + "</li>" +
                "<li>Strong against: " + petData.pets[i].strongAgainst + "</li>" +
                "<li>Weak against: " + petData.pets[i].weakAgainst + "</li>");
            }
          }
        });

        // When clicking the remove button on each search result the pet is removed from the DOM
        $("#search-results .search-remove").on('click', function(){
          $(this).parent().remove();
        });
      }
    });
  });
})(jQuery);
