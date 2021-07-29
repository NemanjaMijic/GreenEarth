$(document).ready(function() {
    
    // array slika za banner, automatski se menja ili klikom na dugmad
    var images = [];
    var flag = 0;


    // function carouselRandom(){
    //     var i = Math.floor((Math.random() * images.length));
    //     flag=i;
    //     var target = document.getElementsByTagName("main")[0];
    //     target.style.backgroundImage = "url('" + images[i].img + "')"; 
    // }


    function carousel(event) {

        //var i = Math.floor((Math.random() * images.length));
        var target = document.getElementsByTagName("main")[0];

        if(event.target.id === "right-btn"){
            flag++;
        }
        else if(event.target.id === "left-btn"){
            flag--;
        }


        if(flag === 0){
            //iskljuci levo dugme
            document.getElementById('left-btn').disabled = true;
        }
        else if(flag === images.length-1){
            //iskljuci desno dugme
            document.getElementById('right-btn').disabled = true;
        }
        else{
            //ukljuci oba dugmeta
            document.getElementById('left-btn').disabled = false;
            document.getElementById('right-btn').disabled = false;
        }

        var title = document.getElementById("head-title");
        console.log(images[flag].title);
        title.innerText = images[flag].title;
        target.style.backgroundImage = "url('" + images[flag].img + "')"; 
    }
    function switchTab(event){

        var tablinks = document.getElementsByClassName("tablinks");
        var tablines = document.getElementsByClassName("line");

        // menjanje sa active na inactive i tab i div
        for (i = 0; i < tablinks.length; i++) {

            if(tablinks[i].value === event.target.value){
                tablinks[i].className = tablinks[i].className.replace(" inactive-tab", " active-tab");
                tablines[i].className = tablines[i].className.replace(" inactive-line", " active-line");
            }else{
                tablinks[i].className = tablinks[i].className.replace(" active-tab", " inactive-tab");
                tablines[i].className = tablines[i].className.replace(" active-line", " inactive-line");
            }
        }
    }

    function switchFlag(event){

        var flag = document.getElementById("img-country");
        if(event.target.value === "uk"){
            flag.src = "./img/uk.jpg";

        }else if(event.target.value === "ser"){
            flag.src = "./img/serbia.png";
        }
    }
    function changeList(event){
        
        var listItem1 = document.getElementById('extra1');
        var listItem2 = document.getElementById('extra2');
        var listItem3 = document.getElementById('extra3');
        

        switch(event.target.value){
         
            case 'premium':
                listItem1.className = listItem1.className.replace("extra-items__locked", "extra-items__unlocked");        
                listItem2.className = listItem2.className.replace("extra-items__locked", "extra-items__unlocked");        
                listItem3.className = listItem3.className.replace("extra-items__locked", "extra-items__unlocked");
                break;
            case 'plus':
                listItem1.className = listItem1.className.replace("extra-items__locked", "extra-items__unlocked");        
                listItem2.className = listItem2.className.replace("extra-items__unlocked", "extra-items__locked");        
                listItem3.className = listItem3.className.replace("extra-items__unlocked", "extra-items__locked");   
                break;
            case 'regular':
                listItem1.className = listItem1.className.replace("extra-items__unlocked", "extra-items__locked");        
                listItem2.className = listItem2.className.replace("extra-items__unlocked", "extra-items__locked");        
                listItem3.className = listItem3.className.replace("extra-items__unlocked", "extra-items__locked");  
                break;
        }
    }

    const loadJSON = () => {

        $.ajax({
            url: './js/json/data.json',
            dataType: 'json',
            type: 'get',
            cashe: false,
            success: function(data){
                images = data.backgrounds;
                
                // kreiranje divova
                $(data.offers).each(function(index, value){

                    var div = document.createElement("div");
                    div.className = "offer";

                    //dodavanje slike
                    var image = document.createElement("img");
                    image.src = value.img;
                    image.alt = value.img;
                    div.appendChild(image);

                    //dodavanje naslova
                    var title = document.createElement("h3");
                    title.append(value.title);
                    div.append(title);

                    //dodavanje cene
                    var p = document.createElement("p");
                    p.append("from \u00A3" + value.price);
                    div.append(p);

                    //dodavanje dugmeta
                    var btn = document.createElement("button");
                    btn.className += "book-btn";
                    btn.append("Book now   >");
                    div.append(btn);

                    $('.offers-content').append(div);
                });

                // kreiranje perks
                $(data.perks).each(function(index, value){

                    //GLAVNI DIV
                    var div = document.createElement("div");
                    div.className = "perk";

                    // div za image
                    var divImage = document.createElement("div");
                    divImage.className = "perk--img";

                    var image = document.createElement("img");
                    image.src = value.img;
                    image.alt = value.img;
                    divImage.appendChild(image);

                    //dodavanje glavnom divu
                    div.append(divImage);

                    // div za opis
                    var divDesc = document.createElement("div");
                    divDesc.className = "perk--desc";

                    var title = document.createElement("h3");
                    title.append(value.title);

                    var par = document.createElement("p");
                    par.append(value.description);

                    divDesc.append(title);
                    divDesc.append(par);

                    div.append(divDesc);

                    $(".airplane-perks").append(div);

                });
                
            }
        });
    }


    var btn = document.getElementsByClassName("carouselBtn");
    for (var i = 0; i < btn.length; i++) {
        btn[i].addEventListener('click', carousel, false);
    }

     var tabBtn = document.getElementsByClassName("tablinks");
    for (var i = 0; i < tabBtn.length; i++) {
        tabBtn[i].addEventListener('click', switchTab, false);
    }
    var tabBtn = document.getElementsByClassName("tablinks");
    for (var i = 0; i < tabBtn.length; i++) {
        tabBtn[i].addEventListener('click', changeList, false);
    }

    var sel = document.getElementById("country");
    sel.addEventListener("change", switchFlag, false);

    
    loadJSON();
    //setInterval($("#right-btn").click(), 7000);
    document.getElementById('left-btn').disabled = true;

});
