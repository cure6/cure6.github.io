setTimeout(function(){
    $('.wrap').fadeOut();
},2000)

setInterval(function(){
    var checkMusic = $('.music-name').html();
    if(checkMusic == ""){
        $('#hr1').css('display', 'none')
    } else{
        $('#hr1').fadeIn();
    }
}, 1000);

$(document).ready(function () {
    $('.cure-icons').hover(function(){
        var link = $(this).attr('link');
        $(this).css('color', 'black');
        $(this).css('background-color', 'rgb(192, 25, 61)');
        $(this).click(function(){
            window.open(`${link}`,"_blank");
        })
    }, function(){
        $(this).css('color', 'white');
        $(this).css('background-color', 'transparent');
    })

    function circleCleare(){
        $('.circle').removeClass('active-circle');
    }

    function checkCleare(){
        $('.check-all').fadeOut();
        $('.css-progress').css('width', '0%');
        $('.html-progress').css('width', '0%');
        $('.js-progress').css('width', '0%');
    }

    $('.circle').click(function(){
        var pageId = $(this).attr('pageid');
        circleCleare();
        $(this).addClass('active-circle');
        var check = $(`.check-${pageId}`).css('display');
        if(check=="none"){
            console.log(true);
            checkCleare();
            setTimeout(function(){
                $(`.check-${pageId}`).fadeIn();
                $(`.check-${pageId}`).css('display', 'flex')
            },500);
            if(pageId=='4'){
                setTimeout(function(){
                    var html = 100;
                    var css = 93;
                    var js = 73;
                    $('.html-progress').css('width', `${html}%`);
                    $('.css-progress').css('width', `${css}%`);
                    $('.js-progress').css('width', `${js}%`);
                    var birinci = 0;var ikinci = 0; var ucuncu = 0;
                    setInterval(function(){
                        if(js !== ucuncu){
                            ucuncu = ucuncu+1;
                            $('.js-text').html(`${ucuncu}%`);
                        }
                    },15)
                    setInterval(function(){
                        if(html !== birinci){
                            birinci= birinci+1;
                            $('.html-text').html(`${birinci}%`);
                        }
                    },15)
                    setInterval(function(){
                        if(css !== ikinci){
                            ikinci = ikinci+1;
                            $('.css-text').html(`${ikinci}%`);
                        }
                    },15)
                },800)
            }
        }else{
            console.log(check)
        }
    })

    $('.team-card').hover(function(){
        var that = $(this);
        that.css('height', '43%');
        setTimeout(function(){
            that.children('.team-visible').fadeIn();
            that.children('.team-visible').css('display', 'flex')
        },150)
    }, function(){
        var that = $(this);
        that.children('.team-visible').fadeOut();
        setTimeout(function(){
            that.css('height', '27%');
            that.children('.team-visible').fadeOut();
        },300)
    })
});


$(window).load(function() {

    let ws = new WebSocket('wss://api.lanyard.rest/socket');
    let Interval;
    ws.onopen = () => {
        ws.send(
          JSON.stringify({
            op: 2,
            d: {
              subscribe_to_id: "754969692585852939",
            },
          })
        );
      
        Interval = setInterval(() => {
          ws.send(
            JSON.stringify({
              op: 3,
            })
          );
        }, 3000);
    };
    ws.onmessage = (msg) => {
     msg = JSON.parse(msg.data);
     if (!['INIT_STATE', 'PRESENCE_UPDATE'].includes(msg.t)) return;
       let user = msg.d;
        // bağımsız olarak çalışıyor
        document.getElementsByClassName("adisspp")[0].src = `https://cdn.discordapp.com/avatars/754969692585852939/${user.discord_user.avatar}?size=4096` 
        document.getElementsByClassName("adisspp2")[0].src = `https://cdn.discordapp.com/avatars/754969692585852939/${user.discord_user.avatar}?size=4096` 
       if (user.discord_status == "online") {
            document.getElementsByClassName("status")[0].src = "https://emoji.gg/assets/emoji/8312-online.png"
        } else if (user.discord_status == "idle") {
            document.getElementsByClassName("status")[0].src = "https://emoji.gg/assets/emoji/9231-idle.png"
        } else if (user.discord_status == "dnd") {
            document.getElementsByClassName("status")[0].src = "https://emoji.gg/assets/emoji/6290_DND_Status.png"
        } else if (user.discord_status == "offline") {
            document.getElementsByClassName("status")[0].src = "https://emoji.gg/assets/emoji/3830_offline.png"
        }

        // custom status cekmesi icin
        async function customstatus() {
            const presence = (await fetch("https://api.lanyard.rest/v1/users/754969692585852939").then(_res => _res.json()).catch(() => null))?.data;
            if (!presence) return;
            const customStatus = presence.activities.find(_activity => _activity.name === "Custom Status");
            if (customStatus) document.getElementsByClassName("statuss")[0].innerHTML = `${customStatus.emoji?.id ? `<img id="custom-status-emoji" src="https://cdn.discordapp.com/emojis/${customStatus.emoji.id}.${customStatus.emoji.animated ? "gif" : "png"}?v=1">` : ""} ${customStatus.state}`;
        }

        customstatus();
        setInterval(customstatus, 5000);

        if (user.listening_to_spotify) {
            $(".artist-name").text(user.spotify.artist + ' tarafından')
            $(".music-name").text(user.spotify.song)
            $(".album-name").text(user.spotify.album + ' albümünde')
            $(".main-status-image").attr("src", `${user.spotify.album_art_url}`);
            $('.etkinlik').fadeIn('fast');

            // timebar icin
            let spotifyElapsedDurationUpdateInterval;
            function formatSongDuration(milliseconds) {
                let hours = 0,
                    minutes = 0,
                    seconds = 0;
        
                while (milliseconds >= 3600000) milliseconds -= 3600000, hours++;
                while (milliseconds >= 60000) milliseconds -= 60000, minutes++;
                while (milliseconds >= 1000) milliseconds -= 1000, seconds++;
        
                return `${hours ? `${hours}:` : ""}${hours ? minutes.toString().padStart(2, "0") : minutes}:${seconds.toString().padStart(2, "0")}`;
            }
        
            async function refreshPresence() {
                // Fetch my presence using Lanyard (Saw that EGGSY used this for his site. Thank you EGGSY!)
                const presence = (await fetch("https://api.lanyard.rest/v1/users/754969692585852939").then(_res => _res.json()).catch(() => null))?.data;
                if (!presence) return;
        
        
                const customStatus = presence.activities.find(_activity => _activity.name === "Custom Status");
                if (customStatus) document.getElementsByClassName("statuss")[0].innerHTML = `${customStatus.emoji?.id ? `<img id="custom-status-emoji" src="https://cdn.discordapp.com/emojis/${customStatus.emoji.id}.${customStatus.emoji.animated ? "gif" : "png"}?v=1">` : ""} ${customStatus.state}`;
        
                // Find Spotify presence
                const spotifyPresence = presence.activities.find(_activity => _activity.name === "Spotify");
                // Spotify Presence
        
                const totalDuration = spotifyPresence.timestamps.end - spotifyPresence.timestamps.start;
                // Function to get elapsed duration
                const getElapsedDuration = () => {
                    const elapsedDuration = Date.now() - spotifyPresence.timestamps.start - 1000;
                    return elapsedDuration > totalDuration ? totalDuration : elapsedDuration;
                };
                // Function to update elapsed duration
                const updateElapsedDuration = () => {
                    document.getElementById("spotify-bar").style.width = `${getElapsedDuration() / totalDuration * 100}%`;
                    document.getElementById("sarki-saniye").innerText = formatSongDuration(getElapsedDuration());
                };
                // Update elapsed duration
                updateElapsedDuration();
                // Clear the old elapsed duration update interval
                clearInterval(spotifyElapsedDurationUpdateInterval);
                // Set the new elapsed duration update interval
                spotifyElapsedDurationUpdateInterval = setInterval(updateElapsedDuration, 1);
                // Set total duration text
                document.getElementById("sarki-total-saniye").innerText = formatSongDuration(totalDuration);
                // Display the element
            }
        
            refreshPresence();
            setInterval(refreshPresence, 500);
        } else {
            $('.etkinlik').removeClass('main-body-buttons-active') 
            $('.info').addClass('main-body-buttons-active') 
            document.getElementById('about-you').style.display = "block";
            $('.etkinlik').fadeOut('fast');
        }
    };
    $('.now-listen').click(function(){
        var name = $('.music-name').html();
        name = name.replace(' ', '%20')
        console.log(name);
        window.open(`https://open.spotify.com/search/${name}`,"_blank");
    })
});  


function changestate(efewipedmal) {
    if (efewipedmal) {
        $('.etkinlik').removeClass('main-body-buttons-active') 
        $('.info').addClass('main-body-buttons-active') 
        document.getElementById('main-etkinlik').style.display = "none";
        document.getElementById('about-you').style.display = "block";
    } else {
        $('.info').removeClass('main-body-buttons-active') 
        $('.etkinlik').addClass('main-body-buttons-active')
        document.getElementById('about-you').style.display = "none"; 
        document.getElementById('main-etkinlik').style.display = "inline";
    }
}


(function () {
    const second = 1000,
          minute = second * 60,
          hour = minute * 60,
          day = hour * 24;
  
    //I'm adding this section so I don't have to keep updating this pen every year :-)
    //remove this if you don't need it
    let today = new Date(),
        dd = String(today.getDate()).padStart(2, "0"),
        mm = String(today.getMonth() + 1).padStart(2, "0"),
        yyyy = today.getFullYear(),
        nextYear = yyyy + 1,
        dayMonth = "09/19/",
        birthday = dayMonth + yyyy;
    
    today = mm + "/" + dd + "/" + yyyy;
    if (today > birthday) {
      birthday = dayMonth + nextYear;
    }
    //end
    
    const countDown = new Date(birthday).getTime(),
        x = setInterval(function() {    
  
          const now = new Date().getTime(),
                distance = countDown - now;
  
          document.getElementById("days").innerText = Math.floor(distance / (day)),
            document.getElementById("hours").innerText = Math.floor((distance % (day)) / (hour)),
            document.getElementById("minutes").innerText = Math.floor((distance % (hour)) / (minute)),
            document.getElementById("seconds").innerText = Math.floor((distance % (minute)) / second);
  
          //do something later when date is reached
          if (distance < 0) {
            document.getElementById("headline").innerText = "It's my birthday!";
            document.getElementById("countdown").style.display = "none";
            document.getElementById("content").style.display = "block";
            clearInterval(x);
          }
          //seconds
        }, 0)
    }());