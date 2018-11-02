$(function () {
    $("#submitAnswers").click(function () {
        const answers = $("form").serializeJSON()
        let timer = $('#timer').html()
        // convert timer from string to seconds only integer
        parsedTimer = hmsToSecondsOnly(timer)
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
                $time: parsedTimer,
                $userId: userId,
                $date: date
            },
            dataType: 'json',
            success: (result) => {
                answerSuccess(result, problemId, timer, answers);
            }
        });
    })

//    let answers = {
//     "responseGroup0":
//         {"categoryName":"Pre ordering",
//         "answers":["Answer 1","Answer 2"]},
//     "responseGroup1":
//         {"categoryName":"Post ordering","answers":["Answer 1","Answer 2","Answer 3"]},
//     "responseGroup2":
//         {"categoryName":"Returning","answers":["BLAH","Answer Blah"]}
//     }

    function buildRepsonseTemplate (answers) {
        const answersJSON = JSON.parse(answers)
        for (const {categoryName, answers: answersList} of Object.values(answersJSON)) {
            $('#answer-collection-1').append($(`<h1>${categoryName}</h1>`));
            for (const answer of answersList) {
                $('#answer-collection-1').append($(`<h5>${answer}</h5>`));
            }
        }
    }
    const userResponseTemplate = $(`
    <table class="table">
        <thead class="user-answer-heading">
            <tr>
                <th>Your response (Time taken: ${timer})</th>
            </tr>
        </thead>
        <tr>
            <td class="user-answer">
                <div class="row prob-text">
                    <div class="col-sm-10 col-sm-offset-1" id="problem-navigator">
                        <div class="response-template">
                           <div class="row" id="answer-collection-1">
                       
                          </div>
                        </div>
                    </div>
                    <div class="row">
                    </div>
                </div>
            </td>
        </tr>
        <tr>
    </table>`)

    function answerSuccess(result, problemId, timer, answers ) {
        if (result.response === 'success') {
            console.log('we got there!');
            buildRepsonseTemplate(answers)
            // $('#answer-collection-1').append($(`<h1>${problemId}</h1>`));                           
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