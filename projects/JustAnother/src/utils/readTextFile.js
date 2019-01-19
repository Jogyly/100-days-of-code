

function readTextFile(file, callback) {
  let rawFile = new XMLHttpRequest();
  rawFile.overrideMimeType("application/json");
  rawFile.open("GET", file, true);
  rawFile.onreadystatechange = function() {
    if (rawFile.readyState === 4 && rawFile.status === 200) {
      const response = JSON.parse(rawFile.responseText);
      callback(response);
    }
  }
  rawFile.send();
}

export default readTextFile;
