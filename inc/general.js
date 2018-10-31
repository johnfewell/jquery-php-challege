
$(function () {
    // $.extend(FormSerializer.patterns, {
    //     validate: /^[a-z][a-z0-9_]*(?:\.[a-z0-9_]+)*(?:\[\])?$/i
    //   });

    $("#submitAnswers").click(function (){
        // console.log('click!')
        const form = $("form").serializeJSON()
        console.log(form);
        
    })

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
        responseClone.find('.answer').attr('name', 'responseGroup'+ stacticCounter +'[answers][' + answerCounter + ']');
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
            answerClone.find(':text').attr('name', 'responseGroup'+ stacticCounter +'[answers][' + answerCounter + ']');
            // Append the answer template to the container
            answerClone.clone().appendTo(answerHolder);
            event.preventDefault();
        });
    });

    let stopwatch = new Stopwatch(
        document.querySelector('#timer'))
});


class Stopwatch {
    constructor(display, results) {
        this.running = false;
        this.display = display;
        this.results = results;
        this.laps = [];
        this.reset();
        this.print(this.times);
    }
    
    reset() {
        this.times = [ 0, 0, 0 ];
    }
    
    start() {
        if (!this.time) this.time = performance.now();
        if (!this.running) {
            this.running = true;
            requestAnimationFrame(this.step.bind(this));
        }
    }
    
    lap() {
        let times = this.times;
        let li = document.createElement('li');
        li.innerText = this.format(times);
        this.results.appendChild(li);
    }
    
    stop() {
        this.running = false;
        this.time = null;
    }

    restart() {
        if (!this.time) this.time = performance.now();
        if (!this.running) {
            this.running = true;
            requestAnimationFrame(this.step.bind(this));
        }
        this.reset();
    }
    
    clear() {
        clearChildren(this.results);
    }
    
    step(timestamp) {
        if (!this.running) return;
        this.calculate(timestamp);
        this.time = timestamp;
        this.print();
        requestAnimationFrame(this.step.bind(this));
    }
    
    calculate(timestamp) {
        var diff = timestamp - this.time;
        // Hundredths of a second are 100 ms
        this.times[2] += diff / 10;
        // Seconds are 100 hundredths of a second
        if (this.times[2] >= 100) {
            this.times[1] += 1;
            this.times[2] -= 100;
        }
        // Minutes are 60 seconds
        if (this.times[1] >= 60) {
            this.times[0] += 1;
            this.times[1] -= 60;
        }
    }
    
    print() {
        this.display.innerText = this.format(this.times);
    }
    
    format(times) {
        return `\
${pad0(times[0], 2)}:\
${pad0(times[1], 2)}`;
    }
}

function pad0(value, count) {
    var result = value.toString();
    for (; result.length < count; --count)
        result = '0' + result;
    return result;
}


