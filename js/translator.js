$(document).ready(function () {
    $("#translateButton").click(translate);
    $("#clearPrefix").click(clearPrefix);
});

function translate() {
    try {
        let sourceText = $.trim($("#sourceText").val());
        let sourceLanguage = parseInt($("#selectSourceLanguage").val());
        let targetLanguage = parseInt($("#selectTargetLanguage").val());

        let translatedContent = '';

        if(sourceText.length == 0){
            return;
        }

        if(sourceLanguage == 3){
            translatedContent = normalizeInput(sourceText);
            $("#selectSourceLanguage").val(1);
            return;
        }
        else{
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
                        default:
                            translatedContent = "Operação não disponível. Contate o time de desenvolvimento."
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
                        case 6:
                            translatedContent += csharp_ctor_clone(processedLine);
                            break;
                        case 7:
                            translatedContent += csharp_ctor_string(processedLine);
                            break;
                        default:
                            translatedContent = "Operação não disponível. Contate o time de desenvolvimento."
                            break;
                    } 
                }
            });
        }

        $("#targetText").val(translatedContent);
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
        else if(CurrentLine[1] === "l"){
            return "public bool " + CurrentLine[0] + " { get; set; }" + "\n";
        }
    } catch (e) {
        console.log(e);
    }
}

function fox_to_csharp_datacolumn(CurrentLine){
    try {
		let s_prefix = $.trim($("#prefix").val());
        let identifier = s_prefix.length == 0 ? "myDT." : s_prefix;

        if(CurrentLine[1] === "n"){
            return identifier + 'Columns.Add(new DataColumn("' + CurrentLine[0] + '", typeof(decimal)));'  + "\n";
        }
        else if(CurrentLine[1] === "c"){
            return identifier + 'Columns.Add(new DataColumn("' + CurrentLine[0] + '", typeof(string)));'  + "\n";
        }
        else if(CurrentLine[1] === "d"){
            return identifier+ 'Columns.Add(new DataColumn("' + CurrentLine[0] + '", typeof(string)));'  + "\n";
        }
        else if(CurrentLine[1] === "l"){
            return identifier+ 'Columns.Add(new DataColumn("' + CurrentLine[0] + '", typeof(bool)));'  + "\n";
        }
    } catch (e) {
        console.log(e);
    }
}

function fox_to_csharp_datarow(CurrentLine){
    try {
        let s_prefix = $.trim($("#prefix").val());
        let identifier = s_prefix.length == 0 ? "myObj." : s_prefix;

        return 'myRow["' + CurrentLine[0] + '"] = '  + identifier + CurrentLine[0] +";\n";
    } catch (e) {
        console.log(e);
    }
}

function csharp_to_js_prop(CurrentLine){
    try {
		let identifier = $.trim($("#prefix").val());
                
		if(CurrentLine[1] === "string"){
            return identifier + CurrentLine[2] + " : ''," + "\n";
        }
        else if(CurrentLine[1] === "decimal"){
            return identifier + CurrentLine[2] + " : 0," + "\n";
        }
        else if(CurrentLine[1] === "float"){
            return identifier + CurrentLine[2] + " : 0," + "\n";
        }
        else if(CurrentLine[1] === "int"){
            return identifier + CurrentLine[2] + " : 0," + "\n";
        }
        else if(CurrentLine[1] === "DateTime"){
            return identifier + CurrentLine[2] + " : ''," + "\n";
        }
        else if(CurrentLine[1] === "bool"){
            return identifier + CurrentLine[2] + " : false," + "\n";
        }
        else {
            return identifier + CurrentLine[2] + " : []," + "\n";
        }
    } catch (e) {
        console.log(e);
    }
}

function csharp_to_js_init(CurrentLine){
    try {
		let identifier = $.trim($("#prefix").val());		
		
        if(CurrentLine[1] === "string"){
            return identifier +  CurrentLine[2] + " = '';" + "\n";
        }
        else if(CurrentLine[1] === "decimal"){
            return identifier +  CurrentLine[2] + " = 0;" + "\n";
        }
        else if(CurrentLine[1] === "float"){
            return identifier +  CurrentLine[2] + " = 0;" + "\n";
        }
        else if(CurrentLine[1] === "int"){
            return identifier +  CurrentLine[2] + " = 0;" + "\n";
        }
        else if(CurrentLine[1] === "DateTime"){
            return identifier +  CurrentLine[2] + " = '';" + "\n";
        }
        else if(CurrentLine[1] === "bool"){
            return identifier +  CurrentLine[2] + " = false;" + "\n";
        }
        else {
            return identifier +  CurrentLine[2] + " = [];" + "\n";
        }
    } catch (e) {
        console.log(e);
    }
}

function csharp_prop_to_datacolumn(CurrentLine){
    try {
        let s_prefix = $.trim($("#prefix").val());
        let identifier = s_prefix.length == 0 ? "myDT." : s_prefix;

        return identifier + 'Columns.Add(new DataColumn("' + CurrentLine[0] + '", typeof(' + CurrentLine[1] + ')));'  + "\n";
    } catch (e) {
        console.log(e);
    }
}

function csharp_prop_to_datarow(CurrentLine){
    try {
        let s_prefix = $.trim($("#prefix").val());
        let identifier = s_prefix.length == 0 ? "myObj." : s_prefix;

        return 'myRow["' + CurrentLine[2] + '"] = '  + identifier + CurrentLine[2] +";\n";
    } catch (e) {
        console.log(e);
    }
}

function csharp_ctor_clone(CurrentLine){
    try {
        let identifier = $.trim($("#prefix").val());

        return CurrentLine[2] +  ' = '  + identifier + CurrentLine[2] +";\n";
    } catch (e) {
        console.log(e);
    }
}

function csharp_ctor_string(CurrentLine){
    try {
        if(CurrentLine[1] === "string"){
            return CurrentLine[2] + ' = "";' + "\n";
        }
        else{
            return '';
        }
    } catch (e) {
        console.log(e);
    }
}

function normalizeInput(textInput){
    try {
        let normalizedText = "";

        //Match new lines
        let regex = /\n/g;

        //Replace new lines with an empty string
        normalizedText = textInput.replace(regex, '');

        //Match parentheses and their contents
        regex = /\([^)]*\)/g;

        //Replace matches with an empty string
        normalizedText = normalizedText.replace(regex, '');

        //Match semicolons
        regex = /;/g;

        //Replace semicolons with an empty string
        normalizedText = normalizedText.replace(regex, '');

        //Match multiple whitespaces
        regex = /\s+/g;

        //Replace multiple whitespaces with a single whitespace
        normalizedText = normalizedText.replace(regex, ' ');

        //Match a colon followed by a whitespace
        regex = /,\s/g;
        
        //Replace matches with just a colon
        normalizedText = normalizedText.replace(regex, ',');

        //Math commas
        regex = /,/g;

        //Replace commas with line break
        normalizedText = normalizedText.replace(regex, "\n");
        
        $("#sourceText").val(normalizedText);
    } catch (error) {
        console.log(error);
    }
}

function clearPrefix(){
    try {
        $("#prefix").val("");
    } catch (e) {
        console.log(e);
    }
}