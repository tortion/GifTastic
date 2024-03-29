

var startUp = true;
var gifSubjects = ["Dog", "Cat", "Mouse", "Rat", "Fly", "Bat", "Primate", "Pirate", "Marmot", "Marsupial", "Mongoose"];
renderButtons();
playGif();

// main event click

$(document).on("click", ".gif-btn", playGif);

$("#add-gif").on("click", function (event) {
    event.preventDefault();
    var newGif = $("#gif-input").val().trim();
    // The GIF from the textbox is then added to our array
    gifSubjects.push(newGif);
    renderButtons();
});

$(document).on("click", ".gif", function () {
    console.log("in");
    // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
    var state = $(this).attr("data-state");
    // If the clicked image's state is still, update its src attribute to what its data-animate value is.
    // Then, set the image's data-state to animate
    // Else set src to the data-still value
    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
        console.log("top");
    } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
        console.log("bottom");
    }
});

// Calling the renderButtons function to display the intial buttons
renderButtons();

function renderButtons() {

    $("#buttons-view").empty();
    for (var i = 0; i < gifSubjects.length; i++) {
        var a = $('<button type="button" class="btn btn-primary mr-2">');

        a.addClass("gif-btn");
        a.attr("data-name", gifSubjects[i]);
        a.text(gifSubjects[i]);
        a.css("margin-bottom", "5px");
        $("#buttons-view").append(a);
    }
}

function playGif() {

    var innerIndex = 1;
    var rowNum = "";
    var gifToPlay = "";

    if (startUp) {
        startGif = 0;
        startUp = false;
    } else {
        var startGif = Math.floor(Math.random() * 120) + 1;
    }
    console.log(startGif);
    console.log(startUp);

    gifToPlay = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + gifToPlay + "&offset=" + startGif + "&api_key=Bmkx1Tcm6IVmOih9IfX83Pvw1LZZ6ywl";
    console.log(queryURL);
    $("#image-row-1").empty();
    $("#image-row-2").empty();
    $("#title-row-1").empty();
    $("#title-row-2").empty();

    for (x = 0; x < 12; x++) {
        // Perfoming an AJAX GET request to our queryURL
        $.ajax({
            url: queryURL,
            method: "GET"
        })

            // After the data from the AJAX request comes back
            .then(function (response) {

                console.log(response);

                var stillImageUrl = response.data[innerIndex].images.fixed_width_small_still.url;
                var loopingImageUrl = response.data[innerIndex].images.fixed_width_small.url;

                if (innerIndex < 7) {
                    rowNum = "1"
                } else {
                    rowNum = "2";
                }

                // Creating and storing an image tag
                let imageTag = "#image-row-" + rowNum;
                let imgDiv = $('<div>');
                imgDiv.attr("class", "col-2");
                $(imageTag).append(imgDiv);

                let gifImage = $("<img>");
                gifImage.attr("src", stillImageUrl);
                gifImage.attr("data-still", stillImageUrl);
                gifImage.attr("data-animate", loopingImageUrl);
                gifImage.attr("data-state", "still");
                gifImage.attr("alt", response.data.title);
                gifImage.attr("class", "gif");
                $(imgDiv).append(gifImage);

                let imgLabel = $('<strong>');
                imgLabel.text("Rating: " + response.data[innerIndex].rating);
                $(imgDiv).append(imgLabel);
                innerIndex++;
            });
    }
}
