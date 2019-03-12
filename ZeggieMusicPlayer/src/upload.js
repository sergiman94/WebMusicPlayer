

//---------- Add Song -------------------------------------------

var songsServer = `http://localhost/EleWeb/Ejercicios/Parcial1/ZeggieMusicPlayerServer/songs.php?ejecute=`;

function addSong(e) {
    e.preventDefault();

    let form = document.querySelector("#addSongForm");
    let inputs = form.querySelectorAll("input");
    let data = {};

    var file = document.querySelector('input[type=file]').files[0];
    var reader = new FileReader();

    if (file) {
        reader.readAsDataURL(file);
        console.log(file);
        
    } else {
        preview.src = "";
    }

    for (let i = 0; i < inputs.length; i++) {
        data[inputs[i].name] = inputs[i].value;
    }

    var params = new FormData();
    for (var key in data) {
        params.append(key, data[key]);
    }

    var config = {
        method: 'POST',
        mode: 'cors',
        body: params
    };

    //promise from server
    fetch(`${songsServer}insert`, config)
        .then(function (response) {
            return response.json();
            console.log(response);
        })
        .then(function (canciones) {
            if (canciones) {
                // alert("Funciona")
                console.log("song updated");
            } else {
                alert("No funciona");
            }
        });

    this.seeFormData();
}

function seeFormData() {
    const url = "http://localhost/EleWeb/Ejercicios/Parcial1/ZeggieMusicPlayerServer/uploads.php?ejecute=uploadsong";
    const form = document.querySelector('form');

    form.addEventListener('submit', e => {
        e.preventDefault();

        const files = document.querySelector('[type=file]').files;
        const formData = new FormData();

        for (let i = 0; i < files.length; i++) {
            let file = files[i];

            formData.append('file', file);
        }

        fetch(url, {
            method: 'POST',
            body: formData
        }).then(response => {
            console.log(response);
        });
    });
}

function previewFile() {
    var preview = document.querySelector('audio');
    var file = document.querySelector('input[type=file]').files[0];
    var reader = new FileReader();

    reader.onloadend = function () {
        preview.src = reader.result;
    }

    if (file) {
        reader.readAsDataURL(file);
    } else {
        preview.src = "";
    }
}