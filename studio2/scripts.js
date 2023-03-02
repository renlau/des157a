(function () {
    "use strict";
    console.log("running js");

    const keshi = document.getElementById('keshi');
    const svt = document.getElementById('seventeen');
    const porter = document.getElementById('porter');
    const dabin = document.getElementById('dabin');
    var keshiaudio = document.getElementById("keshiaudio");
    var svtaudio = document.getElementById("svtaudio");
    var porteraudio = document.getElementById("porteraudio");
    var dabinaudio = document.getElementById("dabinaudio");

    keshi.addEventListener('click', function () {
        if (keshiaudio.paused) {
            keshiaudio.currentTime=0;
            keshiaudio.play();
            svtaudio.pause();
            porteraudio.pause();
            dabinaudio.pause();

       }
    });

    svt.addEventListener('click', function (){
        if (svtaudio.paused) {
            svtaudio.currentTime=0;
            svtaudio.play();
            keshiaudio.pause();
            porteraudio.pause();
            dabinaudio.pause();
        }
    })
    porter.addEventListener('click', function (){
        if (porteraudio.paused) {
            porteraudio.currentTime=0;
            porteraudio.play();
            keshiaudio.pause();
            svtaudio.pause();
            dabinaudio.pause();
        }
    })
    dabin.addEventListener('click', function (){
        if (dabinaudio.paused) {
            dabinaudio.currentTime=0;
            dabinaudio.play();
            keshiaudio.pause();
            svtaudio.pause();
            porteraudio.pause();
        }
    })
})();