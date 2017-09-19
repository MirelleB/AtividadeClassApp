  function pegaCSV(evt) {
    evt.stopPropagation();
    evt.preventDefault();
	var files = evt.dataTransfer.files;
	  var file_lei = evt.dataTransfer.files[0];
	var output = [];
    for (var i = 0, f; f = files[i]; i++) {
      output.push('<li><strong>', escape(f.name), '</strong> (', f.type || 'n/a', ') - ',
                  f.size, ' bytes, last modified: ',
                  f.lastModifiedDate.toLocaleDateString(), '</li>');
    }
    ///document.getElementById('list').innerHTML = '<ul>' + output.join('') + '</ul>';
	leitorDeCSV.readAsText(file_lei);
	//criarTabela(file_lei);
   
   
  }
	function criarTabela(file_lei){
	document.getElementById('CSVsaida').innerHTML ='lendo o csv...';
	  var table = document.getElementById ("myTable");
	  var headerLine = "";
  var myReader = new FileReader (); 
    myReader.onload = function(e) 
	{
		var content = myReader.result;
		var lines = content.split("\r");
		for (var count = 0; count < lines.length; count++) 
		{
			var row = document.createElement("tr");
			var rowContent = lines[count].split(",");
			for (var i = 0; i < rowContent.length; i++)
			{
				if (count == 0) 
				{
					var cellElement = document.createElement("th");
				} else 
				{
					var cellElement = document.createElement("td");
				}
				var cellContent = document.createTextNode(rowContent[i]);
				cellElement.appendChild(cellContent);
				row.appendChild(cellElement);
			} //end rowContent for loop
				table.appendChild(row);
		} //end main for loop
    } //end onload function 
    myReader.readAsText(file_lei);
  } //end if(theFile) 
  function classTags(){
		this.tags=new Array();;
  }
  
  function classeAlunos(){
		this.nome;
		this.eid;
		this.classe=new Array();
		this.emailResp1=new Array();
		this.phoneResp1=new Array();
		this.phoneResp2=new Array();
		this.emailResp2=new Array();
		this.emailAluno;
		this.phoneAluno;
		this.invisible=new Array();
		this.seeAll=new Array();
		
  }
  
  	function verificaEmail(email){
			if((email.length==0)|| (email=="")||(email.indexOf('@')==-1)||(email.indexOf('.')==-1)||(email.indexOf(':')>-1)||(email.indexOf('{')>-1)||(email.indexOf(')')>-1)||(email.indexOf('}')>-1)){
			return true;
			}
			else
			return false;


			}
			function verificaTelefone(telefone){
			
			
					telefone=telefone.replace(/[^\d]+/g,'');//Remove tudo o que não é dígito
								if(telefone.length>=10){
									//vartrim=vartrim.replace(/^(d{2})(d)/g,"($1) $2"); //Coloca parênteses em volta dos dois primeiros dígitos
									//vartrim=vartrim.replace(/(d)(d{4})$/,"$1-$2");
									telefone="55"+telefone;
									return telefone;
									}
									else{
									telefone='-----';
									return telefone;
									}
	

			}
  function handleDragOver(evt) {
    evt.stopPropagation();
    evt.preventDefault();
    evt.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
  }
  function leCSV(evt) {
	//document.getElementById('CSVsaida').innerHTML ='lendo o csv...';
  var fileArr = evt.target.result.split('\n');
  var strDiv = '<table>';
  var vartrim;
  var arrayAlunos=new Array();
  var arrayNomes=new Array();
  var arrayTags=new Array();
  var cont=0;
  var acu,cont=0;
  var flag=0;
  var novaTag;
  var tagAux;
 //document.getElementById('list').innerHTML ='lendo o csv...';
  for (var i=0; i<fileArr.length; i++) {
       //strDiv += '<tr>';
       var fileLine = fileArr[i].split(',');
	  
           for (var j=0; j<fileLine.length; j++) {
		   // strDiv += '<td>'+fileLine[j].trim()+'</td>';
		  
			vartrim=fileLine[j].trim();
				 if(i==0)
				 {
							
						if(vartrim.charAt(0)=='P' || vartrim.charAt(0)=='M'){//maiscula
						
							//alert("É MAISUCULA"+vartrim.charAt(0));
						arrayTags[cont-1]+=vartrim;
						cont--;
					
						}else{
					
					arrayTags[cont]=vartrim;
				
					}
					//document.getElementById('CSVsaida').innerHTML =novaTag.tags[j];
					cont++;	
				}
				else if((arrayAlunos.length==0 || arrayNomes.indexOf(vartrim)== -1) && j==0){
				
						novoAluno=new classeAlunos();
						novoAluno.nome=vartrim;
						arrayNomes[cont]=vartrim;
						acu+=vartrim;
						arrayAlunos.push(novoAluno);
						//document.getElementById('CSVsaida').innerHTML =acu;
						cont++;
						flag=1;
				
				}
			
				if(flag==1){//liberado! Pode cadastrar
				
						if(j==1)
						{
							novoAluno.eid=vartrim;
						}
						if(j==2 || j==3)
						{
							
							
							novoAluno.classe.push(vartrim);
						}
						if(j==4){//e-mail tratameno especial
						
						
							if((vartrim.indexOf("S")!=-1)){
														
							novoAluno.classe.push(vartrim);
							
							vartrim=fileLine[j+1].trim();
							flag=2;
							//alert(j);
							//break;
							}
							if(verificaEmail(vartrim)==true)
							{
							
								    
									//alert("Nao válido"+vartrim);
								}else{
									
									novoAluno.emailResp1.push(vartrim);
								
								//document.getElementById('CSVsaida').innerHTML =vartrim;
								}
								
					    	}
						if(flag==2){
								//alert(j);
								fileLine[j+1]=fileLine[2].trim();
							
							
							flag=1;
							break;
								
						}
							
						if(j==5){
						
								
									
									vartrim=verificaTelefone(vartrim);
									novoAluno.phoneResp1.push(vartrim);
										
								
						}
						if(j==6){//Telefone responsavel 2
							
							//if(vartrim.length>=11){
							vartrim=verificaTelefone(vartrim);
							novoAluno.phoneResp2.push(vartrim);
								
							//}
						}
						if(j==7){//e-mail resposanvel 2
							if(verificaEmail(vartrim)==true){
								
							}
							else{
									
									novoAluno.emailResp2.push(vartrim);
						
						
						}
					}
					
					if(j==8){//e-mail aluno
							if(verificaEmail(vartrim)==true){
								novoAluno.emailAluno='----';
								
							}else{
									
									novoAluno.emailAluno=vartrim;
								}
					
					}
					
					if(j==9){//telefone Aluno
						//if(vartrim.length>=11){
									vartrim=verificaTelefone(vartrim);
									novoAluno.phoneAluno=vartrim;
						
						//}
					
					
					}
					
					if(j==10|| j==11){
					
						
							if(vartrim=='1'){//invisible true
								novoAluno.invisible.push("true");
										
							}else if(vartrim=='0'){
								novoAluno.invisible.push("false");
							}
							if(vartrim=='yes'){
								novoAluno.seeAll.push("true");
							}
							else if(vartrim=='no'){
							novoAluno.seeAll.push("false");
							}
							
							
					
					}
					
				}
					
						//document.getElementById('CSVsaida').innerHTML ="E-mail válido";
			//alert("E-mail valido");
						
							
							
						
				
			
				//else
				 //if(arrayNomes.indexOf(strDiv)> -1){
				
					//	document.getElementById('CSVsaida').innerHTML ="encontrei";
				//}
               
      }
	
	  
      //strDiv += '</tr>';
  }

     // strDiv += '</table>';
      var CSVsaida = document.getElementById('CSVsaida');
	  alert("Verifique a saida na aba --Saida--");
	  document.getElementById('CSVsaida').innerHTML ='Processamento concluido!!  xD';
     // CSVsaida.innerHTML = tager[1];
  var aluno;
   var tabela = document.createElement("table");
  var thead = document.createElement("thead");
  var tbody=document.createElement("tbody");
  var thd=function(i){return (i==0)?"th":"td";};
  
	
			
	  //for(var i=0;i<arrayAlunos.length;i++){//passo mostrar numa tabela
				//strDiv += '<td>';
		//		aluno=arrayAlunos[i];
	  for(var a=0;a<arrayAlunos.length;a++){
					
					strDiv+='<tr>';
		//		var tr = document.createElement("tr");
			for(var c=0;c<arrayTags.length;c++){
			aluno=arrayAlunos[a];
					//	var t = document.createElement(thd(c));
						//var texto=document.createTextNode(arrayTags[c]);
						 //t.appendChild(texto);
						//tr.appendChild(t);
					//aluno=arrayAlunos[a];
				strDiv += '<td>'+arrayTags[c]+'</td>';
			
				
				if(c==0){
				strDiv+='<td>'+aluno.nome+'</td>';
				
				}
				if(c==1){
				strDiv+='<td>'+aluno.eid+'</td>';
				
				
			
				}
				if(c==2){
					if(aluno.classe.length>0){
							
							strDiv+='<td>'+aluno.classe+'</td>';
					
					}
				//strDiv+='<tr>'+aluno.nome+'</tr>';
				}
				if(c==3){
						strDiv+='<td>'
				//strDiv+='<tr>'+aluno.nome+'</tr>';
				}
				if(c==4){
						if(aluno.emailResp1.length>0){
							
							strDiv+='<td>'+aluno.emailResp1+'</td>';
						}
				//strDiv+='<tr>'+aluno.nome+'</tr>';
				}
				if(c==5){
						if(aluno.phoneResp1.length>0){
							
							strDiv+='<td>'+aluno.phoneResp1+'</td>';
						}else
						strDiv+='<td>'+aluno.phoneResp1+'</td>';
						
				//strDiv+='<tr>'+aluno.nome+'</tr>';
				}
				if(c==6){
					if(aluno.phoneResp2.length>0){
							
							strDiv+='<td>'+aluno.phoneResp2+'</td>';
						}else
						strDiv+='<td>'+aluno.phoneResp2+'</td>';
				//strDiv+='<tr>'+aluno.nome+'</tr>';
				strDiv+='<td>'
				}
				if(c==7){
					if(aluno.emailResp2.length>0){
							
							strDiv+='<td>'+aluno.emailResp2+'</td>';
						}else
						strDiv+='<td>'+aluno.emailResp2+'</td>';
				
				
				//strDiv+='<tr>'+aluno.nome+'</tr>';
				}
				if(c==8){
				
						//	alert("aluno email resp");
							strDiv+='<td>'+aluno.emailAluno+'</td>';
						
						
				//strDiv+='<tr>'+aluno.nome+'</tr>';
				}
				if(c==9){
				strDiv+='<td>'+aluno.phoneAluno+'</td>';
				
				//strDiv+='<tr>'+aluno.nome+'</tr>';
				}
				if(c==10){
				strDiv+='<td>'+aluno.invisible+'</td>';
				
				//strDiv+='<tr>'+aluno.nome+'</tr>';
				}
				if(c==11){
				strDiv+='<td>'+aluno.seeAll+'</td>';
				}
			//trDiv += '<tr>'+novaTag.tags[a]+'</tr>';
			
			//alert("TAG "+arrayTags[a]);
				strDiv += '</tr>';
			//	 (i==0)?thead.appendChild(tr):tbody.appendChild(tr);
			}
		
			}
	//		 tabela.appendChild(thead);
		//	tabela.appendChild(tbody);
	
			
			//alert("Nome Aluno"+aluno.nome+"Id"+aluno.eid+ "email responsavel"+aluno.emailResp1);
			
	  
	  //}	  
	  
	  strDiv += '</table>';
	 var CSVsaida = document.getElementById('tabelaEle');
	 // document.getElementById('CSVsaida').innerHTML =novaTag.tags[2];
CSVsaida.innerHTML = strDiv;
//document.getElementById("saidaCSV").appendChild()
}

		

  // Setup the dnd listeners.
   
  var dropZone = document.getElementById('CSVsaida');
  dropZone.addEventListener('dragover', handleDragOver, false);
    var leitorDeCSV = new FileReader()
window.onload = function init() {
    leitorDeCSV.onload = leCSV;

  dropZone.addEventListener('drop', pegaCSV, false);
  
 
}