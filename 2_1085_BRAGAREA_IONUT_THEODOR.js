   function aplicatie() {
            const playlist = [
                "./media/129310007-strong-female-lion-breathing-h_H264HD1080.mov",
                "./media/felipe-david-15462304 (540p).mp4",
                "./media/pexels-julien-goettelmann-19001411 (540p).mp4",
                "./media/ducks_in_a_pond.mp4"
            ];

            var video = document.querySelector("#player");

            var index = 0;
            
            video.src = playlist[index];

            var canvas = document.querySelector("#canvas1");
            var context = canvas.getContext("2d");

            let W = canvas.width = video.clientWidth * 4;
            let H = canvas.height = video.clientHeight * 4;

            // DESENARE BUTOANE DE CONTROL & NAVIGARE

            function deseneazaButoane() {
                context.font = 'bold 12px Arial'; 

                context.fillStyle = 'rgba(0, 0,0, 0.7)';
                context.fillRect(10, H - 90, 80, 40);
                context.fillStyle = 'white';
                context.fillText('Previous', 20, H - 65);
            
                context.fillStyle = 'rgba(0, 0,0, 0.7)';
                context.fillRect(100, H - 90, 100, 40);
                context.fillStyle = 'white';
                context.fillText('Play/Pause', 110, H - 65);
            
                context.fillStyle = 'rgba(0, 0,0, 0.7)';
                context.fillRect(210, H - 90, 60, 40);
                context.fillStyle = 'white';
                context.fillText('Next', 220, H - 65);
            
                context.fillStyle = 'rgba(0, 0,0, 0.7)';
                context.fillRect(280, H - 90, 100, 40);
                context.fillStyle = 'white';
                context.fillText('Mute/Unmute', 290, H - 65);
            }

            function evenimenteCursorCanvas(e) {
                const mx = e.x - canvas.getBoundingClientRect().x;
                const my = e.y - canvas.getBoundingClientRect().y;
            
                if (mx >= 10 && mx <= 90 && my >= H - 90 && my <= H - 50) {
                    index = (index - 1 + playlist.length) % playlist.length;
                    video.src = playlist[index];
                    video.play();
                } 
                else if (mx >= 100 && mx <= 200 && my >= H - 90 && my <= H - 50) {
                    if (video.paused) {
                        video.play();
                    } else {
                        video.pause();
                    }
                } 
                else if (mx >= 210 && mx <= 270 && my >= H - 90 && my <= H - 50) {
                    index = (index + 1) % playlist.length;
                    video.src = playlist[index];
                    video.play();
                } 
                else if (mx >= 280 && mx <= 380 && my >= H - 90 && my <= H - 50) {
                    if (video.muted) {
                        video.muted = false;
                    } else {
                        video.muted = true;
                    }
                }
            }

            canvas.addEventListener('click', evenimenteCursorCanvas);


            function procesareCadru() {
                context.drawImage(video, 0, 0, W, H);

                // Progress Bar
                var progressBarTheodor = video.currentTime / video.duration;
                var pbLatime = W * progressBarTheodor;
                context.fillStyle = 'rgba(255, 255, 255, 0.7)';
                context.fillRect(0, H - 30, pbLatime, 30);

                deseneazaButoane();

                requestAnimationFrame(procesareCadru);

            };
            requestAnimationFrame(procesareCadru);


            video.addEventListener("ended", function () {
                index = index + 1;
                if (index >= playlist.length) {
                    index = 0;
                }
                video.src = playlist[index];
                video.load();
                video.play();
            });
        

            // ADAUGARE CLIP (cu event-listenere potrivite)

            let i = 5;

            document.querySelector('#btnAdauga').addEventListener("click", function () {
                const fileInput = document.querySelector('#inputAdauga');
                const file = fileInput.files[0];
                if (file) {
                    const videoNou = URL.createObjectURL(file);
                    playlist.push(videoNou);

                    const clipNou = document.createElement('video');
                    clipNou.src = videoNou;

                    clipNou.addEventListener("click", function () {
                        video.src = clipNou.src;
                        video.play();
                    })

                    clipNou.addEventListener("dblclick", function () {
                        container.remove();
                        for (i = 0; i < playlist.length; i++)
                            if (clipNou.src === playlist[i]) {
                                stergere(i);
                                break;
                            }
                    });

                    const containerId = `container-clipNou${i}`;
                    const container = document.createElement('div');
                    container.id = containerId;
                    document.querySelector('#playlistClipuri').appendChild(container);
                    container.appendChild(clipNou);

                    i++;
                }
            });

            // SELECTARE CLIP

            document.querySelector('#clip1').addEventListener("click", function () {
                video.src = document.querySelector('#clip1').src;
                video.play();
            })

            document.querySelector('#clip2').addEventListener("click", function () {
                video.src = document.querySelector('#clip2').src;
                video.play();
            })

            document.querySelector('#clip3').addEventListener("click", function () {
                video.src = document.querySelector('#clip3').src;
                video.play();
            })

            document.querySelector('#clip4').addEventListener("click", function () {
                video.src = document.querySelector('#clip4').src;
                video.play();
            })


            // STERGERE

            function stergere(index) {
                playlist.splice(index, 1);
            }

            document.querySelector('#clip1').addEventListener("dblclick", function () {

                for (i = 0; i < playlist.length; i++)
                    if (document.querySelector('#clip1').getAttribute('src') === playlist[i]) {
                        stergere(i);
                        break;
                    }
                document.querySelector('#container-clip1').remove();
            })

            document.querySelector('#clip2').addEventListener("dblclick", function () {


                for (i = 0; i < playlist.length; i++)
                    if (document.querySelector('#clip2').getAttribute('src') === playlist[i]) {
                        stergere(i);
                        break;
                    }
                document.querySelector('#container-clip2').remove();
            })

            document.querySelector('#clip3').addEventListener("dblclick", function () {
                for (i = 0; i < playlist.length; i++)
                    if (document.querySelector('#clip3').getAttribute('src') === playlist[i]) {
                        stergere(i);
                        break;
                    }
                document.querySelector('#container-clip3').remove();

            })

            document.querySelector('#clip4').addEventListener("dblclick", function () {
                for (i = 0; i < playlist.length; i++)
                    if (document.querySelector('#clip4').getAttribute('src') === playlist[i]) {
                        stergere(i);
                        break;
                    }
                document.querySelector('#container-clip4').remove();

            })

        }

        document.addEventListener('DOMContentLoaded', function () {
            aplicatie();
            
        });
