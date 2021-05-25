const lang=localStorage.getItem("fgpa-lang"),translations={"en-CA":{fmeUser:"Username: ",fmePass:"Password: ",fmeUserPH:"Enter Username...",fmePassPH:"Enter Password...",fmeLogin:"Login",fmeErrorConn:"Connection error: the connection to the server failed",register:"If you do not have a DDR account, contact support at ",cancel:"Cancel",upload:"Upload",delete:"Delete",publish:"Publish",uploaded:"Selected file: ",runupload:"Start Upload",update:"Update existing package",size:"bytes",configFileName:"Config File Name",chooseFile:"Choose a zip file",userEmail:"User Email: ",deletelist:"Select folders to delete ",publishlist:"Select folder to publish ",publishenv:"Select environnement to publish to",privatelist:"Private;privateInternal",internallist:"Internal;publicInternal",externallist:"External;publicExternal",messType:"Message Type: ",messSev:"Message Severity: ",messTypeAll:"All",messTypeAdmin:"Administrator",messTypeUser:"User",messSevAll:"All",messSevInfo:"Information",messSevWarn:"Warning",messSevErr:"Error",messSevSucc:"Success",messSevFatal:"Fatal",progress:"Execution in progress...",wait:"Please wait.",reportTitle:"Execution Report",fgpId:"FGP ID: ",jobId:"Job Id: ",headTime:"Timestamp",headSev:"Severity",headMess:"Messages",snippetLabel:"HTML Snippet in ZIP file",snippet1:"None",snippet2:"PreSnippet.html",snippet3:"PostSnippet.html",snippet4:"All"},"fr-CA":{fmeUser:"Nom d'usagé : ",fmePass:"Mot de passe : ",fmeUserPH:"Entrer un nom d'usagé...",fmePassPH:"Entrer un mot de passe...",fmeLogin:"Identification",fmeErrorConn:"Erreur de connexion : la connexion au serveur à échoué",register:"Si vous ne possédez pas de compte DDR, contactez le support technique à ",cancel:"Annuler",upload:"Téléverser",delete:"Supprimer",publish:"Publier",uploaded:"Fichier sélectionné : ",runupload:"Débuter le Téléversement",update:"Mettre à jour un paquet existant",size:"octets",configFileName:"Nom du fichier de configuration",chooseFile:"Sélectionnez un fichier zip",userEmail:"Courriel utilisateur : ",deletelist:"Sélectionnez les répertoires à supprimer ",publishlist:"Sélectionnez le répertoire à publier ",publishenv:"Sélectionnez l'environnement dans lequel publier",privatelist:"Privé;privateInternal",internallist:"Interne;publicInternal",externallist:"Externe;publicExternal",messType:"Type du message : ",messSev:"Sévéritée du message : ",messTypeAll:"Tous",messTypeAdmin:"Administrateur",messTypeUser:"Utilisateur",messSevAll:"Tous",messSevInfo:"Information",messSevWarn:"Attention",messSevErr:"Erreur",messSevSucc:"Succès",messSevFatal:"Fatal",progress:"Exécution en cours...",wait:"Veuillez patienter.",reportTitle:"rapport d'exécution",fgpId:"PGF id :",jobId:"Traitement Id :",headTime:"Horodatage",headSev:"Sévéritée",headMess:"Messages",snippetLabel:"Snippet HTML dans le fichier ZIP",snippet1:"Aucun",snippet2:"PreSnippet.html",snippet3:"PostSnippet.html",snippet4:"Tous"}};function bindHTML(e,t,s){void 0===s&&(s="innerText"),this.data=t,this.element=e,e[s]=t}bindHTML(document.getElementById("avFMEUser"),translations[lang].userEmail),bindHTML(document.getElementById("avFMEPass"),translations[lang].fmePass),bindHTML(document.getElementById("avTokenUser"),translations[lang].fmeUserPH,"placeholder"),bindHTML(document.getElementById("avTokenPass"),translations[lang].fmePassPH,"placeholder"),bindHTML(document.getElementById("avFMELogin"),translations[lang].fmeLogin,"value"),bindHTML(document.getElementById("avRegister"),translations[lang].register),bindHTML(document.getElementsByClassName("av-error-connect")[0],translations[lang].fmeErrorConn),bindHTML(document.getElementById("avCancelUpload"),translations[lang].cancel,"value"),bindHTML(document.getElementById("avCancelDelete"),translations[lang].cancel,"value"),bindHTML(document.getElementById("avCancelPublish"),translations[lang].cancel,"value"),bindHTML(document.getElementById("avCancelReport"),translations[lang].cancel,"value"),bindHTML(document.getElementById("avUpload"),translations[lang].upload,"value"),bindHTML(document.getElementById("avDelete"),translations[lang].delete,"value"),bindHTML(document.getElementById("avPublish"),translations[lang].publish,"value"),bindHTML(document.getElementById("avUploaded"),translations[lang].uploaded),bindHTML(document.getElementById("avRunUpload"),translations[lang].runupload,"value"),bindHTML(document.getElementById("avUpdateLabel"),translations[lang].update),bindHTML(document.getElementById("avDeletePrivate"),translations[lang].privatelist.split(";")[0]),bindHTML(document.getElementById("avDeleteInternal"),translations[lang].internallist.split(";")[0]),bindHTML(document.getElementById("avDeleteExternal"),translations[lang].externallist.split(";")[0]),bindHTML(document.getElementById("avDeleteList"),translations[lang].deletelist),bindHTML(document.getElementById("avRunDelete"),translations[lang].delete,"value"),bindHTML(document.getElementById("avPublishPrivate"),translations[lang].publishlist),bindHTML(document.getElementById("avPublishEnv"),translations[lang].publishenv),bindHTML(document.getElementById("avUpdatePublishLabel"),translations[lang].update),bindHTML(document.getElementById("avRunPublish"),translations[lang].publish,"value"),bindHTML(document.getElementById("avMessTypeLbl"),translations[lang].messType),bindHTML(document.getElementById("avMessSevLbl"),translations[lang].messSev),bindHTML(document.getElementById("avProgress"),translations[lang].progress),bindHTML(document.getElementById("avWait"),translations[lang].wait);const optsType=[translations[lang].messTypeAll,translations[lang].messTypeAdmin,translations[lang].messTypeUser],messType=document.getElementById("avMessageType"),optsSev=[translations[lang].messSevAll,translations[lang].messSevInfo,translations[lang].messSevWarn,translations[lang].messSevErr,translations[lang].messSevSucc,translations[lang].messSevFatal],messSev=document.getElementById("avMessageSev");for(let e=0;e<optsType.length;e++){let t=document.createElement("option");t.text=optsType[e],messType.add(t)}for(let e=0;e<optsSev.length;e++){let t=document.createElement("option");t.text=optsSev[e],messSev.add(t)}let server,json,repository,workspace,session,path,fileInput,files,outputStream,serverUrl,response,registry,publisher,publisherRole,publisherInfo,publisherName,publisherNameConcat,publisherDepartment,departmentID,publisherID,authorDepartmentID,authorPublisherID,publisherEmail;function getToken(){const e="guest",t=serverUrl+"/fmetoken/generate.json?user=guest&password="+e;$.ajax({url:t,type:"GET",success:function(t){FMEServer.init({server:serverUrl,token:t.serviceResponse.token}),registry=new DDRRegistry("guest",e,serverUrl),$(".av-login-section").show(),$("#avFMELogin").click((function(e){e.preventDefault(),$(".av-error-validatePublisher").hide().empty();const t=$("#avTokenUser").val(),s=$("#avTokenPass").val();FMEServer.runDataStreaming(repository,"validatePublisher.fmw","PUBLISHER_EMAIL="+t+"&PUBLISHER_PASSWORD="+s,getPublisherRole),$(".av-login-section").hide(),$(".av-progress-section").show()}))},error:function(){document.getElementsByClassName("av-error-connect")[0].classList.remove("hidden")}})}function getPublisherRole(e){if($(".av-progress-section").hide(),response=e.MessageList[0],"INTERNAL"===response.MessageType){switch(publisherInfo=response.EnMessage,publisherNameConcat=publisherInfo.split(",")[0],publisherDepartment=publisherInfo.split(",")[1],publisherID=publisherInfo.split(",")[2],departmentID=publisherInfo.split(",")[3],publisherEmail=publisherInfo.split(",")[4],publisherName=publisherInfo.split(",")[5],response.FrMessage){case"admin_publisher":publisherRole="admin_publisher";break;case"department_publisher":publisherRole="department_publisher";break;case"basic_publisher":publisherRole="basic_publisher",$("#avPublish").hide()}$(".av-function-section").show()}else $(".av-login-section").show(),"fr-CA"===lang?$(".av-error-validatePublisher").show().append("Erreur: "+response.FrMessage):"en-CA"===lang&&$(".av-error-validatePublisher").show().append("Error: "+response.EnMessage)}function returnMainMenu(e){$(".av-"+e+"-section").hide(),$(".av-function-section").show()}function selectUpload(){$(".av-function-section").hide(),$(".av-upload-section").show(),workspace="AT_Upload.fmw",FMEServer.getSession(repository,workspace,setVars)}function selectDelete(){switch($(".av-progress-section").show(),$(".av-function-section").hide(),publisherRole){case"admin_publisher":registry.getRecord("get_author_publisher_department",getDeleteList);break;case"department_publisher":registry.getRecord("get_author_publisher_department",getDeleteList,"department_id="+departmentID);break;case"basic_publisher":registry.getRecord("get_author_publisher_department",getDeleteList,"publisher_id="+publisherID)}}function selectPublish(){switch($(".av-progress-section").show(),$(".av-function-section").hide(),publisherRole){case"admin_publisher":registry.getRecord("get_author_publisher_department",getPublishList,"author_dataset_env=private");break;case"department_publisher":registry.getRecord("get_author_publisher_department",getPublishList,"department_id="+departmentID+"&author_dataset_env=private")}}function getDeleteList(e){$(".av-progress-section").hide(),$(".av-delete-section").show();const t={private:[],internal:[],external:[]};if(0!==e.matched_records)for(let s=0;s<e.get_author_publisher_department.length;s++)"private"===e.get_author_publisher_department[s].author_dataset_env?t.private.push(e.get_author_publisher_department[s].dataset_folder_name+";"+e.get_author_publisher_department[s].author_dataset_id+";"+e.get_author_publisher_department[s].dataset_folder_path+";"+e.get_author_publisher_department[s].author_dataset_env+";"+e.get_author_publisher_department[s].tbs_department_acronym_en+";"+e.get_author_publisher_department[s].publisher_name):"internal"===e.get_author_publisher_department[s].author_dataset_env?t.internal.push(e.get_author_publisher_department[s].dataset_folder_name+";"+e.get_author_publisher_department[s].author_dataset_id+";"+e.get_author_publisher_department[s].dataset_folder_path+";"+e.get_author_publisher_department[s].author_dataset_env+";"+e.get_author_publisher_department[s].tbs_department_acronym_en+";"+e.get_author_publisher_department[s].publisher_name):"external"===e.get_author_publisher_department[s].author_dataset_env&&t.external.push(e.get_author_publisher_department[s].dataset_folder_name+";"+e.get_author_publisher_department[s].author_dataset_id+";"+e.get_author_publisher_department[s].dataset_folder_path+";"+e.get_author_publisher_department[s].author_dataset_env+";"+e.get_author_publisher_department[s].tbs_department_acronym_en+";"+e.get_author_publisher_department[s].publisher_name);setInterface("av-deletelist-private",t.private,"delprivate"),setInterface("av-deletelist-internal",t.internal,"delinternal"),setInterface("av-deletelist-external",t.external,"delexternal")}function getPublishList(e){$(".av-progress-section").hide(),$(".av-publish-section").show();const t={private:[]};if(0!==e.matched_records)for(let s=0;s<e.get_author_publisher_department.length;s++)t.private.push(e.get_author_publisher_department[s].dataset_folder_name+";"+e.get_author_publisher_department[s].author_dataset_id+";"+e.get_author_publisher_department[s].publisher_id+";"+e.get_author_publisher_department[s].department_id+";"+e.get_author_publisher_department[s].tbs_department_acronym_en+";"+e.get_author_publisher_department[s].publisher_name+";"+e.get_author_publisher_department[s].author_metadata_id+";"+e.get_author_publisher_department[s].author_dataset_env+";"+e.get_author_publisher_department[s].dataset_folder_path);setInterface("av-publishlist-private",t.private,"pubprivate"),setInterface("av-publishlist-env",[translations[lang].internallist,translations[lang].externallist],"pubenv")}function setInterface(e,t,s){$("."+e).not("legend").children().not("legend").remove();const n=document.getElementsByClassName(e)[0],a=t.length;if(a>0)for(let e=0;e<a;e++){const a=document.createElement("input");a.type="checkbox",a.value=t[e],a.id=s+"-"+t[e];const r=document.createElement("label");r.setAttribute("for",a.id),a.id.includes("pubenv")?r.innerHTML=t[e].split(";")[0]:r.innerHTML=t[e].split(";")[0]+" ("+t[e].split(";")[4]+" | "+t[e].split(";")[5]+")",n.append(a),n.append(r),n.append(document.createElement("br"))}else n.style.display="none"}function deleteList(){const e=[];$(".av-deletelist-private :checkbox").each((function(){this.checked&&e.push(this.value)})),$(".av-deletelist-internal :checkbox").each((function(){this.checked&&e.push(this.value)})),$(".av-deletelist-external :checkbox").each((function(){this.checked&&e.push(this.value)})),FMEServer.runDataStreaming(repository,"AT_Delete.fmw","USER_EMAIL="+publisherEmail+"&DELETE_ARRAY="+e,showMessages),$(".av-delete-section").hide(),$(".av-progress-section").show()}function publish(){const e=[],t=[];$(".av-publishlist-private :checkbox").each((function(){this.checked&&e.push(this.value)})),$(".av-publishlist-env :checkbox").each((function(){this.checked&&t.push(this.value)}));const s=$("#avUpdatePublish")[0].checked;FMEServer.runDataStreaming(repository,"AT_Publish.fmw","PUBLISHER_EMAIL="+publisherEmail+"&PUBLISH_ARRAY="+e+"&PUBLISH_ENV="+t+"&UPDATE_FLAG="+s,showMessages),$(".av-publish-section").hide(),$(".av-progress-section").show()}function runUpdate(){$(".av-upload-section").hide(),$(".av-progress-section").show();const e=$("#avUpdate")[0].checked;$('input[name="UPLOAD_OVERWRITE"]').val(e),runWorkspace()}function setVars(e){void 0!==e.serviceResponse.files&&(session=e.serviceResponse.session,path=e.serviceResponse.files.folder[0].path);const t=document.getElementsByClassName("av-file-list")[0];null!==t.firstChild&&t.removeChild(t.firstChild);const s=document.getElementById("options");for(;s.firstChild;)s.removeChild(s.firstChild);generateOptions()}function uploadFile(){FMEServer.dataUpload(repository,workspace,fileInput,session,processFiles)}function generateOptions(){FMEServer.getWorkspaceParameters(repository,workspace,buildOptions)}function buildOptions(e){FMEServer.generateFormItems("options",e);const t=document.getElementById("options").getElementsByTagName("input"),s=document.getElementById("options").getElementsByTagName("select");t[0].parentElement.getElementsByTagName("label")[0].innerText=translations[lang].configFileName,s[0].parentElement.getElementsByTagName("label")[0].innerText=translations[lang].snippetLabel,s[0].options[0].innerHTML=translations[lang].snippet1,s[0].options[1].innerHTML=translations[lang].snippet2,s[0].options[2].innerHTML=translations[lang].snippet3,s[0].options[3].innerHTML=translations[lang].snippet4,$('input[name="SESSION_ID"]').val(session),$('input[name="PUBLISHER_INFO"]').val(publisherInfo),$(".UPLOAD_OVERWRITE").hide(),$(".PUBLISHER_INFO").hide(),$(".SESSION_ID").hide(),fileInput=t[3],createFileInput($(fileInput))}function createFileInput(e){e.attr({accept:".zip",tabindex:-1}),e.parent().find("label")[0].innerText=translations[lang].chooseFile,e.change((function(){uploadFile()}))}function processFiles(e){const t=$(".av-file-list");if(void 0!==e.serviceResponse){files=e.serviceResponse.files.archive;for(let e=0;e<files.length;e++){let s=files[e];void 0!==s.name&&t.append("<p>"+s.name+" | <em>"+s.size+" "+translations[lang].size+"</em></p>")}$("#avRunUpload").prop("disabled",!1)}}function processParams(e){let t=document.getElementById(e).getElementsByTagName("input"),s=document.getElementById(e).getElementsByTagName("select"),n=[],a="";t=Array.prototype.slice.call(t),s=Array.prototype.slice.call(s),n=t.concat(s);for(let t=0;t<n.length;t++){let s=n[t];"options"===e?s.value&&s.name!==fileInput.name&&"button"!==s.type&&(a+=s.name+"=","select"===s.type?a+=s[s.selectedIndex].value:a+=s.value,a+="&"):"select-one"!==s.type&&"text"!==s.type||(a+=s.name+"=","select"===s.type?a+=s[s.selectedIndex].value:a+=s.value,a+="&")}return a=a.substr(0,a.length-1),a}function runWorkspace(){const e={filename:fileInput.name,files,service:"fmedatastreaming",params:processParams("options")};FMEServer.runWorkspaceWithData(path,e,showMessages)}function showMessages(e){$(".av-progress-section").hide(),$(".av-report-section").show(),setMessages(e.MessageList)}function setMessages(e){}$(document).ready((function(){repository="AuthoringTool",serverUrl="http://fgp-0001030.dev.global.gc.ca",getToken()}));