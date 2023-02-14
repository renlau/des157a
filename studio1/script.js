(function(){
    "use strict";
    console.log("running js");

    const form = document.querySelector('#myform');
    const results = document.getElementById('results');
    const title = document.getElementById('title');
    const mbtiresults = document.getElementById('mbtiresults');

    form.addEventListener('submit', function(event){
        event.preventDefault();
        const name = document.getElementById('name').value;
        const mbti = document.getElementById('mbti').value;
        const hobby = document.getElementById('hobby').value;
        const adj = document.getElementById('adj').value;
        const freq = document.getElementById('freq').value;
        const str = document.getElementById('str').value;

        let myText;

        let myName;

        let myMBTI;

        myText = `For <span>${mbti}</span> personality type, they seek fulfillment through <span>${hobby}</span>. While they have <span>${adj}</span> goals and ambitions, they’re <span>${freq}</span> satisfied until they’ve done what’ they know to be right. People with this personality type commit to making the world a better place. They often use their <span>${str}</span> to uplift others and spread compassion. However, they may focus so intently on their ideals that they don’t take adequate care of themselves`;
        document.querySelector('#mbti').value = '';
        document.querySelector('#hobby').value = '';
        document.querySelector('#adj').value = '';
        document.querySelector('#freq').value = '';
        document.querySelector('#str').value = '';

        myName = `personality for <span>${name}</span>`
        document.querySelector('#name').value = '';

        myMBTI = `<span>${mbti}</span>`

        results.innerHTML = myText;

        title.innerHTML = myName;

        mbtiresults.innerHTML = myMBTI;

        document.getElementById('ogpage').style.display = "none";
        document.getElementById('newpage').style.display = "block";

    })

    // document.querySelector(`#submit`).addEventListener('click', function(event){
    //     event.preventDefault();
    //     document.querySelector('.hidden').style.display = "block";
    //     document.querySelector('.showing').style.display = "hidden";

    // });
})();
