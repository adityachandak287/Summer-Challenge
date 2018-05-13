var sel,submit,result;
var players = {'Aditya':[],'Neel':[],'Anikait':[]};
var database,results;

function setup() {

    sel = createSelect('Player');
    can = createCanvas(windowWidth, windowHeight);
    background(51);

    sel.option("Aditya");
    sel.option("Neel");
    sel.option("Anikait");

    sel.position(width / 4 - sel.width, 50);
    //sel.style('align','left');
    result = createInput('');

    result.style('width', '80');
    //result.style('position','relative');
    result.position(width / 2 - result.width, 50);
    submit = createButton("Submit");

    submit.position(3 * width / 4 - submit.width, 50);
    //submit.style('align','center');

    var config = {
        apiKey: "AIzaSyAjkmN_ZSEozQcv9EXZY1XQfQXl4gPrKV8",
        authDomain: "summer-challenge-d3105.firebaseapp.com",
        databaseURL: "https://summer-challenge-d3105.firebaseio.com",
        projectId: "summer-challenge-d3105",
        storageBucket: "summer-challenge-d3105.appspot.com",
        messagingSenderId: "1049231617921"
    };
    firebase.initializeApp(config);

    database = firebase.database();

    results = database.ref("Scores");

    submit.mousePressed(submitData);

    results.on('value',gotData,errData);

}

function errData(err)
{
    console.log(err);
}

function gotData(data)
{
    redraw();

    records = Object.keys(data.val());

    for(player in players)
    {
        players[player] = [];
    }

    for(var i=0;i<records.length;i++) {
        key = records[i];
        name = data.val()[key].name;
        value = data.val()[key].result;
        if(!value)
            value = 0;
        players[name].push(value);
    }
    createCol(width/4,"Aditya");
    createCol(width/2,"Anikait");
    createCol(3*width/4,"Neel");



    console.log(players);
}

function submitData()
{
    var data = {
        name: sel.value() ,
        result: result.value()
    };

    results.push(data);

}

function createCol(x,name)
{
    textAlign(CENTER,CENTER);
    var y = 200;
    var res = 0;

    for(record in players[name])
    {
        res += parseInt(players[name][record]);
    }

    textSize(64);
    if(res>0)
        fill(0,255,0);
    else if(res<0)
        fill(255,0,0);
    else
        fill(255);
    text(name+"\n"+res,x,y);
}

function draw() {
    noLoop();

    background(51);

}
