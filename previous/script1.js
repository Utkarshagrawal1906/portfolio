var tabl=document.getElementsByClassName("tab-links");
var tabc=document.getElementsByClassName("content");

function opentab(name){
    for(i of tabl){
        i.classList.remove("active")
    }
    for(i of tabc){
        i.classList.remove("active")
    }
    event.currentTarget.classList.add("active")
    document.getElementById(name).classList.add("active")
}

function openmenu(){
    var sdm=document.getElementById("navMenu");
    sdm.style.right="0";
}

function closemenu(){
    var sdm=document.getElementById("navMenu");
    sdm.style.right="-200px";
}
var b=true;
function more(){
    if(b){
    document.getElementById("hd").style.display="grid";
    document.getElementById("more").innerHTML="See Less";
    b=false;}
    else{
    document.getElementById("hd").style.display="none";
    document.getElementById("more").innerHTML="See More";
    b=true;
    }

}