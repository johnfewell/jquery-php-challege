$(document).ready(function () {
    const responseTemplate = $(".response-template").clone();

    $(".answer-add").click((event) => {
        const responseClone = responseTemplate.clone();
        const answerHolder = responseClone.find('.answer-holder');
        const answerTemplate = responseClone.find(".answer-template");
        event.preventDefault();
        event.stopPropagation();

        answerTemplate.clone().appendTo(answerHolder);
    });

    $("#category-add").click(function () {
        const responseClone = responseTemplate.clone();
        responseClone.appendTo("#problem-navigator");
        const answerHolder = responseClone.find('.answer-holder');
        const answerTemplate = responseClone.find(".answer-template");
        const answerCloneButton = responseClone.find(".answer-add");

        answerCloneButton.click((event) => {
            event.preventDefault();
            event.stopPropagation();
            answerTemplate.clone().appendTo(answerHolder);
        });
    });


});