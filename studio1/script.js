( function () {
    'use script'
    console.log('running js');
    const form = document.getElementsByTagName('form');
    const results = document.getElementById('results');

    form.addEventListener('submit', function(event){
        event.preventDefault();
        const name = document.getElementById('name').value;
        const mbti = document.getElementById('mbti').value;
        const hobby = document.getElementById('hobby').value;
        const adj = document.getElementById('adj').value;
        const freq = document.getElementById('freq').value;
        const str = document.getElementById('str').value;

        let myText;
})