
$(function () {
    // The template for the new answer input
    const newAnswer = $(`<div class="answer-template">
                            <input type="text" name="answer[0]" value="Enter your insight/step/answer here...">
                        </div>`)

    // Find the initial .answer-holder div that's rendered when the page first loads
    const answerHolder = $('.answer-holder');

    let counter = 0;
   
    // Add the event handler for the for Add answer button after the initial page load
    $(".answer-add").click((event) => {
        counter++;
        let answerClone = newAnswer.clone()
        answerClone.find(':text').attr('name', 'answer[' + counter + ']');
        event.preventDefault();
        //Clone the answer template and append it to the .answer-holder container
        answerClone.clone().appendTo(answerHolder);
    });

    // Create a clone of the whole reponse template
    const responseTemplate = $(".response-template").clone();

    var categoryCounter = 0;
    
    // Add an event handler for the new category add
    $("#category-add").click(function () {
        categoryCounter++;
        //Create a fresh clone of the reponse template
        let responseClone = responseTemplate.clone();
        responseClone.find('.category').attr('name', 'category[' + categoryCounter + ']');
        // Append the clone to the DOM
        responseClone.appendTo("#problem-navigator");
        // Within the new clone of the reponse template, find the .answer-holder class
        const answerHolder = responseClone.find('.answer-holder');
        // Find the answer add button within the new clone
        const answerCloneButton = responseClone.find(".answer-add");
        // add the event handler for the add answer button on the fresh copy of the reponse template
        
        let answerCounter = 0;
        answerCloneButton.click((event) => {
            answerCounter++;
            // event.stopPropagation();
            let answerClone = newAnswer.clone()
            answerClone.find(':text').attr('name', 'answer[' + answerCounter + ']');
            // Append the answer template to the container
            answerClone.clone().appendTo(answerHolder);
            event.preventDefault();
        });
    });
});