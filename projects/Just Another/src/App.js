import React from 'react';
import './style.css';
import Character from './character.js';
import ReactDOM from 'react-dom';

class CharacterName extends React.Component {

    ViewCharacter(){

        function readTextFile(file, callback) {
            var rawFile = new XMLHttpRequest();
            rawFile.overrideMimeType("application/json");
            rawFile.open("GET", file, true);
            rawFile.onreadystatechange = function() {
                if (rawFile.readyState === 4 && rawFile.status == "200") {
                    callback(rawFile.responseText);
                }
            }
            rawFile.send();
        }

        let data = null;
        let win = this.window;

        let newWin = window.open('./character.html', 'example', 'width=600,height=400');



        readTextFile("./characterInfo.json", function(text){
            data = JSON.parse(text);

            let charName = "Wolf";

            let char = data.characters.filter( function(item) {return item.name == charName}  )//data[charName].description;

            /*let i = 0;
            for (; i < data.characters.length; i++){
                if (data.characters[0].name == charName){
                    break;
                }
            }

            console.log(i);*/

            let index = data.characters.indexOf(char[0]);

            if (char != null) {
                let charDescr = char[0].description;
                let charImg = char[0].img;

                CreateNewWindow(charName, charDescr, charImg);

                newWin.onbeforeunload = function() {
                    let _name = newWin.document.getElementById('name');
                    let _description = newWin.document.getElementById('description');
                    let _photo = newWin.document.getElementById('photo');

                    //let ind = data.indexOf(char[0]);

                    char[0].name = "Chert";//_name.innerText;
                    char[0].description = _description.innerText;
                    char[0].img = _photo.innerText;

                    data.characters[index] = char[0];

                    var _json = JSON.stringify(data);

                    var fs = require('fs');
                    fs.writeFile("C:\test.txt", _json, function(err) {});
                    //return [_name, _description, _photo];
                }
            }

            //let charDescr = (data) => data.filter(item == charName);
            //console.log(charDescr);
            let charImg = null;


            console.log(data);
        });

        function CreateNewWindow(charName, charDescr, charImg) {

            newWin.onload = function () {
                let _name = newWin.document.getElementById('name');
                let _description = newWin.document.getElementById('description');
                let _photo = newWin.document.getElementById('photo');

                _name.innerText = charName;
                _description.innerText = charDescr;
                _photo.innerText = charImg;
                //char.innerText = "charName";
            }

        }

    }

    render() {
        return (
            <div className="parent">
                <div className="child" onClick={() => this.ViewCharacter()}>
                    Hello, just another react
                </div>
            </div>
        );
    }
}

export default CharacterName;