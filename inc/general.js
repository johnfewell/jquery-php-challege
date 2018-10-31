$(document).ready(function () {

    // The template for the new answer input
    const newAnswer = $(`<div class="answer-template">
                            <input type="text" name="answer" value="Enter your insight/step/answer here...">
                        </div>`)

    // Find the initial .answer-holder div that's rendered when the page first loads
    const answerHolder = $('.answer-holder');

    // Add the event handler for the for Add answer button after the initial page load
    $(".answer-add").click((event) => {
        event.preventDefault();
        //Clone the answer template and append it to the .answer-holder container
        newAnswer.clone().appendTo(answerHolder);
    });

    // Create a clone of the whole reponse template
    const responseTemplate = $(".response-template").clone();

    // Add an event handler for the new category add
    $("#category-add").click(function () {
        //Create a fresh clone of the reponse template
        const responseClone = responseTemplate.clone();
        // Append the clone to the DOM
        responseClone.appendTo("#problem-navigator");
        // Within the new clone of the reponse template, find the .answer-holder class
        const answerHolder = responseClone.find('.answer-holder');
        // Find the answer add button within the new clone
        const answerCloneButton = responseClone.find(".answer-add");
        // add the event handler for the add answer button on the fresh copy of the reponse template
        answerCloneButton.click((event) => {
            event.preventDefault();
            event.stopPropagation();
            // Append the answer template to the container
            newAnswer.clone().appendTo(answerHolder);
        });
    });


});