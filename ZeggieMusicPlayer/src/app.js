var user = {
    id: null,
    email: null,
    username: null,
    playlist: [],
    library: []
}

var playlistId = 1;
var usersServer = `http://localhost/EleWeb/Ejercicios/Parcial1/ZeggieMusicPlayerServer/users.php?ejecute=`;
var songsServer = `http://localhost/EleWeb/Ejercicios/Parcial1/ZeggieMusicPlayerServer/songs.php?ejecute=`;

//Session Handling
if (typeof (Storage) !== "undefined") {
    user.username = sessionStorage.getItem("username");
    if (user.username == null) { window.location = "login.html"; }

    //consultamos la informacion del usuario desde la bd mediante el usersServer
    var config = {
        method: 'GET',
        mode: 'cors'
    };

    fetch(`${usersServer}getMyInfo&username=${user.username}`, config)
        .then(function (response) {
            response.json()
                .then(function (u) {
                    user = u;
                    initSongs();
                    initPlaylists();
                    //initLibrariesMenu();
                })
        });

} else {
    alert('Su navegador no soporta almacenamiento local :(')
}


window.onload = () => {

    let items = document.querySelectorAll(".mainTopBar .item");
    let menu = document.querySelector(".mediaContent .menu");
    let addItem = document.querySelector("#addSong");

    //document.querySelector(".mediaContent .mainTopBar .user").innerHTML = user.username.charAt(0).toUpperCase();
    document.querySelector(".mediaContent .mainTopBar .user").innerHTML = user.username.toUpperCase();

    menu.style.background = (menu.style.background != "transparent") ? "transparent" : `-${menu.clientBackground}px`;

    addItem.onclick = function () {
        window.location = "./songupload.html";
    }

    items.forEach(item => {
        item.onclick = function () {
            let old = document.querySelector(".hover");
            if (old) { old.classList.remove("hover"); }
            if (!this.classList.contains("hover")) {
                this.classList.add("hover");
            }

            let title = document.querySelector("#musicPlayer .menu .title");
            title.innerHTML = this.dataset.title;

            if (old == this || old == null) {
                menu.style.marginTop = (menu.style.marginTop != "0px") ? "0px" : `-220px`;
            }
        }
    });

    let newMusicPlayer = new MusicPlayer("Redbone", "Childish Gambino", "assets/songs/Redbone.mp3");
    //document.body.appendChild(newMusicPlayer.DOMElement);
}

function initSongs() {
    let content = document.querySelector("#musicPlayer .content");
    for (let i = 0; i < user.library.length; i++) {
        let element = document.createElement("div");
        element.classList.add("item");
        element.innerHTML = user.library[i].title;
        element.dataset.id = user.library[i].title;
        content.insertBefore(element, content.firstChild);
    }
}

function initPlaylists() {
    let content = document.querySelector("#musicPlayer .menu");
    for (let i = 0; i < user.playlist.length; i++) {
        let element = document.createElement("div");
        element.classList.add("item");
        element.innerHTML = user.playlist[i].name;
        element.dataset.id = user.playlist[i].title;
        content.appendChild(element);
    }
    
    
    let items = document.querySelectorAll("#musicPlayer .menu .item");
    items.forEach(item => {
        item.onclick = function () {

            var config = {
                method: 'GET',
                mode: 'cors',
            };

            fetch(`${songsServer}selectplaylist`, config)
                .then(function (response) {
                    response.json()
                    .then(function (playlistObject){
                        playlistObject.forEach(element => {
                            if (item.innerHTML === element.name){
                               playlistId = element.id;
                            }
                        });
                    })
                });

            fetch(`${songsServer}playlistsongs&playlists_id=${playlistId}`, config)
                .then(function (response){
                    response.json()
                    .then(function (songsid){
                        console.log(songsid);
                    })
                })
        }
    });
}

function initLibrariesMenu() {
    let content = document.querySelector("#musicPlayer .menu");
    for (let i = 0; i < user.library.length; i++) {
        let element = document.createElement("div");
        element.classList.add("item");
        element.innerHTML = user.library[i].title;
        element.dataset.id = user.library[i].title;
        content.appendChild(element);
    }
}