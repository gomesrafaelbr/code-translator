$(document).ready(function () {
    $('#translateButton').click(translate);
    $('#clearPrefix').click(clearPrefix);
    $('#copyButton').click(copyTranslatedText);
    $("#pnlPrefix").hide();
});

function translate() {
    try {
        let sourceText = $.trim($('#sourceText').val());
        let sourceLanguage = parseInt($('#selectSourceLanguage').val());
        let targetLanguage = parseInt($('#selectTargetLanguage').val());

        let translatedContent = '';

        if(sourceText.length == 0){
            return;
        }

        const linesArray = sourceText.split('\n');

        linesArray.forEach(function(line) {    
            const processedLine = line.split(' ');

            if(sourceLanguage == 1){
                switch (targetLanguage) {
                    case 1:
                        translatedContent += fox_to_csharp_prop(processedLine);
                        break;
                    case 2:
                        translatedContent += fox_to_csharp_datacolumn(processedLine);
                        break;
                    case 3:
                        translatedContent += fox_to_csharp_datarow(processedLine);
                        break;
                }
            }

            if(sourceLanguage == 2){
                switch (targetLanguage) {
                    case 2:
                        translatedContent += csharp_prop_to_datacolumn(processedLine);
                        break;
                        case 3:
                        translatedContent += csharp_prop_to_datarow(processedLine);
                        break;
                    case 4:
                        translatedContent += csharp_to_js_prop(processedLine);
                        break;
                    case 5:
                        translatedContent += csharp_to_js_init(processedLine);
                        break;
                } 
            }
        });

        $('#targetText').val(translatedContent);
    } catch (e) {
        console.log(e);
    }
}

function fox_to_csharp_prop(CurrentLine){
    try {
        if(CurrentLine[1] === "n"){
            return "public decimal " + CurrentLine[0] + " { get; set; }" + "\n";
        }
        else if(CurrentLine[1] === "c"){
            return "public string " + CurrentLine[0] + " { get; set; }" + "\n";
        }
        else if(CurrentLine[1] === "d"){
            return "public string " + CurrentLine[0] + " { get; set; }" + "\n";
        }
    } catch (e) {
        console.log(e);
    }
}

function fox_to_csharp_datacolumn(CurrentLine){
    try {
        let identifier = $("#prefix").val();
        identifier = "myDT.";

        if(CurrentLine[1] === "n"){
            return identifier + 'Columns.Add(new DataColumn("' + CurrentLine[0] + '", typeof(decimal)));'  + "\n";
        }
        else if(CurrentLine[1] === "c"){
            return identifier + 'Columns.Add(new DataColumn("' + CurrentLine[0] + '", typeof(string)));'  + "\n";
        }
        else if(CurrentLine[1] === "d"){
            return identifier+ 'Columns.Add(new DataColumn("' + CurrentLine[0] + '", typeof(string)));'  + "\n";
        }
    } catch (e) {
        console.log(e);
    }
}

function fox_to_csharp_datarow(CurrentLine){
    try {
        let identifier = $("#prefix").val();
        identifier = "myDataRow";
        return identifier + '["' + CurrentLine[0] + '"] = '  + identifier + CurrentLine[0] +";\n";
    } catch (e) {
        console.log(e);
    }
}

function csharp_to_js_prop(CurrentLine){
    try {
        if(CurrentLine[1] === "string"){
            return CurrentLine[2] + " : ''," + "\n";
        }
        else if(CurrentLine[1] === "decimal"){
            return CurrentLine[2] + " : 0," + "\n";
        }
        else if(CurrentLine[1] === "float"){
            return CurrentLine[2] + " : 0," + "\n";
        }
        else if(CurrentLine[1] === "int"){
            return CurrentLine[2] + " : 0," + "\n";
        }
        else if(CurrentLine[1] === "DateTime"){
            return CurrentLine[2] + " : ''," + "\n";
        }
        else if(CurrentLine[1] === "bool"){
            return CurrentLine[2] + " : false," + "\n";
        }
        else {
            return CurrentLine[2] + " : []," + "\n";
        }
    } catch (e) {
        console.log(e);
    }
}

function csharp_to_js_init(CurrentLine){
    try {
        if(CurrentLine[1] === "string"){
            return CurrentLine[2] + " = '';" + "\n";
        }
        else if(CurrentLine[1] === "decimal"){
            return CurrentLine[2] + " = 0;" + "\n";
        }
        else if(CurrentLine[1] === "float"){
            return CurrentLine[2] + " = 0;" + "\n";
        }
        else if(CurrentLine[1] === "int"){
            return CurrentLine[2] + " = 0;" + "\n";
        }
        else if(CurrentLine[1] === "DateTime"){
            return CurrentLine[2] + " = '';" + "\n";
        }
        else if(CurrentLine[1] === "bool"){
            return CurrentLine[2] + " = false;" + "\n";
        }
        else {
            return CurrentLine[2] + " = [];" + "\n";
        }
    } catch (e) {
        console.log(e);
    }
}

function csharp_prop_to_datacolumn(CurrentLine){
    try {
        let identifier = $("#prefix").val();
        identifier = "myDT.";
        return identifier + 'Columns.Add(new DataColumn("' + CurrentLine[0] + '", typeof(' + CurrentLine[1] + ')));'  + "\n";
    } catch (e) {
        console.log(e);
    }
}

function csharp_prop_to_datarow(CurrentLine){
    try {
        let identifier = $("#prefix").val();
        return 'myDataRow["' + CurrentLine[0] + '"] = '  + identifier + CurrentLine[2] +";\n";
    } catch (e) {
        console.log(e);
    }
}

function clearPrefix(){
    try {
        $('#prefix').val("");
    } catch (e) {
        console.log(e);
    }
}