const RESUME_BUTTON = document.getElementById("resume_button");
const NAME = "Dyllon";
const INTRO = document.getElementById("introduction");
var downloadCount = 1;
var hasDownloadedResume = false;
var softForm = document.getElementById("software-form");
var langForm = document.getElementById("language-form");


const projects = [  
    {title: 'Alice_in_Wonderland2', 
        dscr: 'An interactive scene from Alice in Wonderland (2010) made with inkle.',
        time: new Date('10/30/40'),
        img: "files\\Alice_Poster.png"
    },
    {title: 'Alice_in_Wonderland', 
        dscr: 'An interactive scene from Alice in Wonderland (2010) made with inkle.',
        time: new Date('10/30/26'),
        img: "files\\Alice_in_Wonderland_(2010_film).png"
    }
]

// education data
var education = [
    // itnstitute, award, duration, date of completion
    {inst: 'Westwood High School', award: 'High School Diploma', 
        dur: 'Four Years', doc: 'May 2024'},
    {inst: 'Dassault Systèmes', award: 'Certificate for Mechanical Design', 
        dur: 'One Year', doc: 'May 2022'},
    {inst: 'Northern Arizona University', award: 'Bachelor of Science in Immersive Media and Games', 
        dur: 'Four Years', doc: 'Expected May 2028'},
    {inst: 'Northern Arizona University', award: 'Minor in Psychology',
        dur: 'Four Years', doc: 'Expected May 2028'}
]

main();


function createEduTable(){
    // create table parent
    var table = document.createElement('table');
    table.className = "table table-striped";
    // creat table head
    var thead = document.createElement('thead');
    var trow = document.createElement('tr');
    trow.appendChild(document.createElement('th scope="col"').textContent = "Institution");
    trow.appendChild(document.createElement('th scope="col"').textContent = "Awarded");
    trow.appendChild(document.createElement('th scope="col"').textContent = "Duration");
    trow.appendChild(document.createElement('th scope="col"').textContent = "Date of Completion");
    thead.appendChild(trow);
    table.appendChild(thead);
    document.getElementById('table').appendChild(table);
}

function createProjs(){
    var proj = document.querySelectorAll('#projects .card');
    // iterate to dynamically create projects text
    for(let i = 0; i < proj.length; i++){
        var cur_status = ""
        var cur = proj[i].querySelector('.card-body');
        cur.querySelector('.proj-title').textContent = projects[i].title;
        cur.querySelector('.proj-dscr').textContent = projects[i].dscr;
        if(daysUntilDeadline(projects[i].time) >= 0){
            cur_status = "Ongoing";
        } else{
            cur_status = "Completed";
        }
        cur.querySelector('.proj-time').textContent = 'Deadline: ' 
            + projects[i].time + '\n' + cur_status;
        $(proj[i]).find("img").prop("src", projects[i].img);
    }
}

function sortByDeadline(){
    projects.sort((a, b) => a.time - b.time);
    createProjs()
}

RESUME_BUTTON.addEventListener("click", function() {
    if(!hasDownloadedResume)
    {
        alert("Dyllon Smith's resume is downloaded successfully!");
    }
    hasDownloadedResume = true;
    updateDownloadCount();
});

function updateDownloadCount(){
    var plural = "s"
    if (downloadCount === 1){
        plural = ""
    }
    document.querySelector('#resume .downloaded').textContent = "Downloaded "
        + downloadCount + " time" + plural + ".";
    downloadCount++;
}

function showGreeting(name)
{
    INTRO.textContent = "Hello, my name is " + name +
        "! Welcome to my portfolio!";
}

function daysUntilDeadline(endDate) {
    // Create Date object for the current date
    let currentDate = new Date();

    // Create Date object for the end date
    let end = new Date(endDate);

    // Calculate time difference in milliseconds
    let timeDifference = end - currentDate;

    // Convert milliseconds to days and use Math.ceil to avoid fractional days
    let daysDifference = Math.ceil(timeDifference / (1000 * 3600 * 24));

    return daysDifference;
}

function createNavbar(){
    var navbarItems = [
        {link: "#education", displayName: "Education"},
        {link: "#skills", displayName: "Skills"},
        {link: "#projects", displayName: "Projects"},
        {link: "#resume", displayName: "Resume"},
        {link: "#contact_info", displayName: "Contact Info"}
    ];
    var $ul = $("nav").find("ul");
    for(i = 0; i < navbarItems.length; i++){
        var $li = $('<li>', {class: 'nav-item'});
        var $a = $('<a>', {class: 'nav-item'})
        .attr('href', navbarItems[i].link)
        .text(navbarItems[i].displayName);
        $($a.href).on('click', function(event){
            event.preventDefault();
            $('html, body').animate(
                {scrollTo: $(this.hash).offset().top},
                1000
            );
        });
        $li.append($a);
        $ul.append($li);
    }
}

function editSkill(skill){
    let newSkill = prompt("What would you like the skill to now be called: ", skill);
    if (newSkill !== null){
        return newSkill;
    }
    return null;
}

function skillExist(ul, skill){
    for(i = 0; i < ul.querySelectorAll("li").length; i++){
        if (ul.querySelectorAll("li")[i].textContent === skill){
            return true;
        }
    }
    return false;
}

function addSoftware(){
    var x = softForm.elements['software-name'].value;
    if (x === "") {
        alert("Skill must be filled out");
        return false;
    }
    var ul = document.getElementById('soft-ul');
    if (skillExist(ul, x+"delete")){
        alert("Skill already exist.");
        return false;
    }
    var li = document.createElement('li');
    li.className = "list-group-item";
    li.textContent = x;
    let button = document.createElement('button');
    button.textContent = "delete";
    button.addEventListener('click', function(){
        $(this).animate({height: "500px"}, function(){
            li.remove();
        })
    });
    li.appendChild(button);
    ul.appendChild(li);
    softForm.elements['software-name'].value = "";
}

softForm.addEventListener('submit', function(event){
    // Stop the page from reloading
    event.preventDefault();
});

function addLanguage(){
    var x = langForm.elements['language-name'].value;
    if (x === "") {
        alert("Skill must be filled out");
        return false;
    }
    var ul = document.getElementById('lang-ul');
    if (skillExist(ul, x)){
        alert("Skill already exist.");
        return false;
    }
    var li = document.createElement('li');
    li.className = "list-group-item";
    li.textContent = x;
    let button = document.createElement('button');
    button.textContent = "delete";
    button.addEventListener('click', function(){
        $(this).animate({height: "500px"}, function(){
            li.remove();
        })
    });
    li.appendChild(button);
    ul.appendChild(li);
    langForm.elements['language-name'].value = "";
}

langForm.addEventListener('submit', function(event){
    // Stop the page from reloading
    event.preventDefault();
});


function main(){
    document.getElementById('lang-ul').addEventListener('click', function(event){
        if(event.target != "[object HTMLButtonElement]"){
            let x = editSkill(event.target.textContent);
            if (x !== null){
                event.target.textContent = x;
            }
        }
    });  
    document.getElementById('soft-ul').addEventListener('click', function(event){
        if(event.target != "[object HTMLButtonElement]"){
            let x = editSkill(event.target.textContent);
            if (x !== null){
                event.target.textContent = x;
            }
        }
    });
    $("#software-form").on('keydown', function(event){
        if (event.key === 'Escape'){
            $("input").val("");
        }
    })
    $("#language-form").on('keydown', function(event){
        if (event.key === 'Escape'){
            $("input").val("");
        }
    })
    createNavbar();
    showGreeting(NAME);
    createProjs();
    //createEduTable();
}
