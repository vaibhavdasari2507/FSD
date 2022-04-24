function Validateadd(e)
{
    let valid;
    let fields = document.getElementById("addproject").getElementsByClassName("minput");

    // let team = document.getElementById("teaminput");
    // let members = team.value;

    // let arr = members.split(",");
    // team.value = arr;

    for (var i=0; i<fields.length; i++){
		if (fields[i].value == ""){
            alert("Fill All fields to add project.");
			valid = false;
			e.preventDefault(); 
		}
	
		else{
			valid = true
		}

    }

	return valid;
}


// document.getElementById("dltbtn").onclick = function() {
//     var link = document.getElementById("dltproject");
//     link.setAttribute("href", "/deleteproject/:");
// }