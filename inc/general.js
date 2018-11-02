$(function () {
    $("#submitAnswers").click(function () {
        const answers = $("form").serializeJSON()
        let timer = $('#timer').html()
        // convert timer from string to seconds only integer
        timer = hmsToSecondsOnly(timer)
        // convert JS date to MySQL datestamp
        const date = new Date().toISOString().slice(0, 19).replace('T', ' ')
        const userId = $('#user-id').html()
        const problemId = $('#problem-id').html()
        // Send the post request to the strategy page via ajax
        $.ajax({
            url: "strategy.php",
            method: 'POST', // You are sending classic $_POST vars.
            data: {
                $problemId: problemId,
                $answers: answers,
                $time: timer,
                $userId: userId,
                $date: date
            },
            dataType: 'json',
            success: (result) => {
                answerSuccess(result, problemId);
            }
        });
    })

    function answerSuccess(result, problemId) {
        if (result.response === 'success') {
            console.log('we got there!');
            $('#answer-collection-1').append($(`<h1>${problemId}</h1>`));
            // const testtemp = $(`<?php echo $problem["category"]; ?> TEST`)
            // testtemp.clone().appendTo('#answer-collection-1');                                
        } else {
            console.log('i fucked up');
        }
    }

    // The template for the new answer input
    const newAnswer = $(`<div class="answer-template">
                            <input type="text" name="responseGroup0[answers][0]" placeholder="Enter your insight/step/answer here...">
                        </div>`)

    // Find the initial .answer-holder div that's rendered when the page first loads
    const answerHolder = $('.answer-holder');

    let counter = 0;

    // Add the event handler for the for Add answer button after the initial page load
    $(".answer-add").click((event) => {
        counter++;
        let answerClone = newAnswer.clone()
        answerClone.find(':text').attr('name', 'responseGroup0[answers][' + counter + ']');
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
        const stacticCounter = categoryCounter
        let answerCounter = 0;
        //Create a fresh clone of the reponse template
        let responseClone = responseTemplate.clone();
        responseClone.find('.category').attr('name', 'responseGroup' + stacticCounter + '[categoryName]');
        responseClone.find('.answer').attr('name', 'responseGroup' + stacticCounter + '[answers][' + answerCounter + ']');
        // Append the clone to the DOM
        responseClone.appendTo("#problem-navigator");
        // Within the new clone of the reponse template, find the .answer-holder class
        const answerHolder = responseClone.find('.answer-holder');
        // Find the answer add button within the new clone
        const answerCloneButton = responseClone.find(".answer-add");
        // add the event handler for the add answer button on the fresh copy of the reponse template


        answerCloneButton.click((event) => {
            answerCounter++;
            // event.stopPropagation();
            let answerClone = newAnswer.clone()
            answerClone.find(':text').attr('name', 'responseGroup' + stacticCounter + '[answers][' + answerCounter + ']');
            // Append the answer template to the container
            answerClone.clone().appendTo(answerHolder);
            event.preventDefault();
        });
    });

    // Add the time to the timer id
    $("#timer").timer({
        format: '%M:%S'
    })

    // Convert the string to integer
    function hmsToSecondsOnly(str) {
        var p = str.split(':'),
            s = 0,
            m = 1;
        while (p.length > 0) {
            s += m * parseInt(p.pop(), 10);
            m *= 60;
        }
        return s;
    }
});