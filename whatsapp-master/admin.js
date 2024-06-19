
let getById = (id, parent) => parent ? parent.getElementById(id) : getById(id, document);
let getByClass = (className, parent) => parent ? parent.getElementsByClassName(className) : getByClass(className, document);

const DOM =  {
chatListArea: getById("chat-list-area"),
messageArea: getById("message-area"),
inputArea: getById("input-area"),
chatList: getById("chat-list"),
messages: getById("messages"),
chatListItem: getByClass("chat-list-item"),
messageAreaName: getById("name", this.messageArea),
messageAreaPic: getById("pic", this.messageArea),
messageAreaNavbar: getById("navbar", this.messageArea),
messageAreaDetails: getById("details", this.messageAreaNavbar),
messageAreaOverlay: getByClass("overlay", this.messageArea)[0],
messageInput: getById("input"),
profileSettings: getById("profile-settings"),
profilePic: getById("profile-pic"),
profilePicInput: getById("profile-pic-input"),
inputName: getById("input-name"),
username: getById("username"),
displayPic: getById("display-pic"),
};

var CountMessagesList = 0;
var CountmessageByNumberList=0;

$(document).ready(function() {  

    

 $('#profilepic').attr('src','https://scontent.fmty4-1.fna.fbcdn.net/v/t1.6435-9/183136426_1668761773315876_8704901774776560112_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeFEhjXF4REO7Zu87JC27yZ3lSaQoSQYMiqVJpChJBgyKkmB2tBZ_mMPWFkzUQJ2BU2ZTEy0pRohb1flLQ9ELbBb&_nc_ohc=9TKW-7pCcPEAb6fFgUI&_nc_ht=scontent.fmty4-1.fna&oh=00_AfDzbkRSDoe_fVQRo7BwtB_DBWwWFtqXGrmRTlhCxUAVHQ&oe=664114F4');

 setInterval(Actualizarmensajes, 3000);
 

$.ajax({
url: 'https://www.mctechnologies.online/api/WhatsAppAdmin/GetChatList',
type: 'GET',
success: function(res) {

    CountMessagesList = res.length;
    var date = new Date();
    var current_date = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+ date.getDate();
    var current_time = date.getHours()+":"+date.getMinutes()+":"+ date.getSeconds();
    var myDate = moment(moment.utc(current_date +' '+current_time)).local();
    
 
    var innerHTML = "";
    $.each(res, function(index, value) {
        
        var localtzDate = moment(moment.utc(value.fechaHora)).local();
        var convmyDate = moment(myDate, "YYYY-MM-DD HH:mm:ss").format("YYYY-MM-DD");
        var convlocaltzDate = moment(localtzDate, "YYYY-MM-DD HH:mm:ss").format("YYYY-MM-DD");
        
        if(moment(convmyDate).day() - moment(convlocaltzDate).day() == 0)
            {
                if(value.nombreContacto == '' || value.nombreContacto == 'undefined' || value.nombreContacto == null )
                {
                    innerHTML = innerHTML +
                    `<div class="chat-list-item d-flex flex-row w-100 p-2 border-bottom" onclick="openmesages(`+ value.numeroEmisor +`)">
                        <img src="images/chat1.jpg" alt="Profile Photo" class="img-fluid rounded-circle mr-2" style="height:50px;">
                        <div class="w-50">
                        <div class="name"><b>`+ `+` + value.numeroEmisor +`</b></div>
                            <div class="small last-message"><b>`+ value.mensaje +`</b></div>
                        </div>
                        <div class="flex-grow-1 text-right">
                            <div class="small time">`+ moment(localtzDate, "YYYY-MM-DD HH:mm:ss").format("hh:mm") +`</div>
                            <div class="badge badge-success badge-pill small" id="unread-count">1</div>
                        </div>
                    </div>`;
                }
                else
                {
                    innerHTML = innerHTML +
                    `<div class="chat-list-item d-flex flex-row w-100 p-2 border-bottom" onclick="openmesages(`+ value.numeroEmisor +`)">
                        <img src="images/chat1.jpg" alt="Profile Photo" class="img-fluid rounded-circle mr-2" style="height:50px;">
                        <div class="w-50">
                        <div class="name"><b>`+ value.nombreContacto +`</b></div>
                            <div class="small last-message"><b>`+ value.mensaje +`</b></div>
                        </div>
                        <div class="flex-grow-1 text-right">
                            <div class="small time">`+ moment(localtzDate, "YYYY-MM-DD HH:mm:ss").format("hh:mm") + `</div>
                            <div class="badge badge-success badge-pill small" id="unread-count">1</div>
                        </div>
                    </div>`;

                }
            }
        
        else if(moment(convmyDate).day() - moment(convlocaltzDate).day() == 1)
        {
            if(value.nombreContacto == '' || value.nombreContacto == 'undefined' || value.nombreContacto == null )
            {
                innerHTML = innerHTML +
                `<div class="chat-list-item d-flex flex-row w-100 p-2 border-bottom" onclick="openmesages(`+ value.numeroEmisor +`)">
                    <img src="images/chat1.jpg" alt="Profile Photo" class="img-fluid rounded-circle mr-2" style="height:50px;">
                    <div class="w-50">
                    <div class="name"><b>`+ `+` + value.numeroEmisor +`</b></div>
                        <div class="small last-message"><b>`+ value.mensaje +`</b></div>
                    </div>
                    <div class="flex-grow-1 text-right">
                        <div class="small time"> Ayer </div>
                        <div class="badge badge-success badge-pill small" id="unread-count">1</div>
                    </div>
                </div>`;
            }
            else
            {
                innerHTML = innerHTML +
                `<div class="chat-list-item d-flex flex-row w-100 p-2 border-bottom" onclick="openmesages(`+ value.numeroEmisor +`)">
                    <img src="images/chat1.jpg" alt="Profile Photo" class="img-fluid rounded-circle mr-2" style="height:50px;">
                    <div class="w-50">
                    <div class="name"><b>`+ value.nombreContacto +`</b></div>
                        <div class="small last-message"><b>`+ value.mensaje +`</b></div>
                    </div>
                    <div class="flex-grow-1 text-right">
                        <div class="small time"> Ayer </div>
                        <div class="badge badge-success badge-pill small" id="unread-count">1</div>
                    </div>
                </div>`;

            }
        }

        else if(moment(convmyDate).day() - moment(convlocaltzDate).day() == 2)
        {
            if(value.nombreContacto == '' || value.nombreContacto == 'undefined' || value.nombreContacto == null )
                {
                    innerHTML = innerHTML +
                    `<div class="chat-list-item d-flex flex-row w-100 p-2 border-bottom" onclick="openmesages(`+ value.numeroEmisor +`)">
                        <img src="images/chat1.jpg" alt="Profile Photo" class="img-fluid rounded-circle mr-2" style="height:50px;">
                        <div class="w-50">
                        <div class="name"><b>`+ `+` + value.numeroEmisor +`</b></div>
                            <div class="small last-message"><b>`+ value.mensaje +`</b></div>
                        </div>
                        <div class="flex-grow-1 text-right">
                            <div class="small time"> Antier </div>
                            <div class="badge badge-success badge-pill small" id="unread-count">1</div>
                        </div>
                    </div>`;
                }
                else
                {
                    innerHTML = innerHTML +
                    `<div class="chat-list-item d-flex flex-row w-100 p-2 border-bottom" onclick="openmesages(`+ value.numeroEmisor +`)">
                        <img src="images/chat1.jpg" alt="Profile Photo" class="img-fluid rounded-circle mr-2" style="height:50px;">
                        <div class="w-50">
                        <div class="name"><b>`+ value.nombreContacto +`</b></div>
                            <div class="small last-message"><b>`+ value.mensaje +`</b></div>
                        </div>
                        <div class="flex-grow-1 text-right">
                            <div class="small time"> Antier </div>
                            <div class="badge badge-success badge-pill small" id="unread-count">1</div>
                        </div>
                    </div>`;

                }
        }

        else
        {
            if(value.nombreContacto == '' || value.nombreContacto == 'undefined' || value.nombreContacto == null )
                {
                    innerHTML = innerHTML +
                    `<div class="chat-list-item d-flex flex-row w-100 p-2 border-bottom" onclick="openmesages(`+ value.numeroEmisor +`)">
                        <img src="images/chat1.jpg" alt="Profile Photo" class="img-fluid rounded-circle mr-2" style="height:50px;">
                        <div class="w-50">
                        <div class="name"><b>`+ `+` + value.numeroEmisor +`</b></div>
                            <div class="small last-message"><b>`+ value.mensaje +`</b></div>
                        </div>
                        <div class="flex-grow-1 text-right">
                            <div class="small time">`+ moment(value.fechaHora, "YYYY-MM-DD HH:mm:ss").format("hh:mm") + `</div>
                            <div class="badge badge-success badge-pill small" id="unread-count">1</div>
                        </div>
                    </div>`;
                }
                else
                {
                    innerHTML = innerHTML +
                    `<div class="chat-list-item d-flex flex-row w-100 p-2 border-bottom" onclick="openmesages(`+ value.numeroEmisor +`)">
                        <img src="images/chat1.jpg" alt="Profile Photo" class="img-fluid rounded-circle mr-2" style="height:50px;">
                        <div class="w-50">
                        <div class="name"><b>`+ value.nombreContacto +`</b></div>
                            <div class="small last-message"><b>`+ value.mensaje +`</b></div>
                        </div>
                        <div class="flex-grow-1 text-right">
                            <div class="small time">`+ moment(value.fechaHora, "YYYY-MM-DD HH:mm:ss").format("DD-MM hh:mm") + `</div>
                            <div class="badge badge-success badge-pill small" id="unread-count">1</div>
                        </div>
                    </div>`;

                }
        }


    });
    
    
    $("#chat-list").html(innerHTML);
}

});

$("#inputsendmessage").on("keydown", function(event) {
if(event.which == 13)
    sendMessage();
});

});

function imagefuploaderShowFiles()
{
    var innerHTML=
    `<div style="width:500px;height:500px;margin-left:200px;" id="carouselExampleControls" class="carousel slide" data-bs-ride="carousel">
    <div class="carousel-inner">
        <div class="carousel-item active">
        <img src="./images/chat1.jpg" class="d-block w-100" alt="...">
        </div>
        <div class="carousel-item">
        <img src="./images/profilepic.png" class="d-block w-100" alt="...">
        </div>
        <div class="carousel-item">
        <img src="./images/chat1.jpg" class="d-block w-100" alt="...">
        </div>
    </div>
    <button style="border:none;" class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden"></span>
    </button>
    <button style="border:none;" class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden"></span>
    </button>
    </div>`;
    
    // var fileInput = document.getElementById('imagefuploader');   
    // var files = fileInput.files
    // for (var i = 0; i < files.length; i++) {
    // 	innerHTML= innerHTML +
    // `<p></p>`;
    //  console.log(files[i].name);
    // }

    $("#messages").html(innerHTML);
    $("#input-area").html('<i style="font-size:1.5rem;margin-left:840px;margin-bottom:20px;border:none" class="fas fa-paper-plane"></i>');

}

function sendMessage()
{
    var date = new Date();
    var current_date = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+ date.getDate();
    var current_time = date.getHours()+":"+date.getMinutes()+":"+ date.getSeconds();
    
    var localtzDate = moment(moment.utc(current_date +' '+current_time)).local();
    var mensaje = $("#inputsendmessage").val();
    var numero = $("#name").val();

    var newMessage = {};
    newMessage.number = numero.substring(1);
    newMessage.message = mensaje;
   
 
    var data = JSON.stringify(newMessage);

    console.log();
    console.log(mensaje);
    console.log(newMessage);

    var innerHTML= '';
     innerHTML= innerHTML+
    `<div class="align-self-end self p-1 my-1 mx-3 rounded bg-white shadow-sm message-item">
        <div class="options">
            <a href="#"><i class="fas fa-angle-down text-muted px-2"></i></a>
        </div>
        <div class="d-flex flex-row">
            <div class="body m-1 mr-2">`+ mensaje +`</div>
            <div class="time ml-auto small text-right flex-shrink-0 align-self-end text-muted" style="width:75px;">
                `+moment(localtzDate, "YYYY-MM-DD HH:mm:ss").format("hh:mm") +
            `</div>
        </div>  
    </div>`;

    $.ajax({
          type: "POST",
          url: "https://www.mctechnologies.online/api/WhatsAppAdmin/EnviarMensajeTexto",
          data: data,
          contentType: "application/json; charset=utf-8",
          dataType: "json",
          success: function (response) {

            $("#messages").append(innerHTML);
            var messages = $('#messages');
            messages.scrollTop(messages.prop("scrollHeight"));

        },
        failure: function (response) {
            Swal.fire({
            icon: "Error",
            title: "Oops...",
            text: response
          });
        },
        error: function (response) {
          Swal.fire({
            icon: "Error",
            title: "Oops...",
            text: response
          });
        }
    });

    $("#inputsendmessage").val('');

}

function OpenModalAgregarContacto(numero)
{
    $("#ModalAgregarContactoNombreLbl").text(numero);

}


function addcontact()
{
     var Numero = $("#ModalAgregarContactoNombreLbl").text();
     var Nombre = $("#ModalAgregarContactoNombreTxt").val();
     var date = new Date();

     if(Numero == '' || Nombre == '')
    {
        return;
    }

     var newContact = {};
     newContact.ContactoId = 0;
     newContact.Numero = Numero;
     newContact.Nombre = Nombre;
     newContact.Favorito = false;
     newContact.Etiqueta ="Nuevo";
     newContact.FechaCreacion = date;
     newContact.Activo = true;

     var data = JSON.stringify(newContact);
     
     $.ajax({
        type: "POST",
        url: "https://www.mctechnologies.online/api/WhatsAppAdmin/AddContacto",
        data: data,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            Swal.fire({
                title: "Info!",
                text: "El contacto se ha guardado correctamente!",
                icon: "success"
              });
        },
        failure: function (response) {
            Swal.fire({
                icon: "Error",
                title: "Oops...",
                text: response
              });
        },
        error: function (response) {
            Swal.fire({
                icon: "Error",
                title: "Oops...",
                text: response
              });
        }
    });

    $("#ModalAgregarContactoNombreLbl").text('');
    $("#ModalAgregarContactoNombreTxt").val('');
    $('#ModalAgregarContacto').modal('toggle');
}


function addtag(numeroEmisor)
{
    url = 'https://www.mctechnologies.online/api/WhatsAppAdmin/GetContactos';
}

function addtofav(numeroEmisor)
{
    $.ajax({
        url: 'https://www.mctechnologies.online/api/WhatsAppAdmin/AddToFav/'+ numeroEmisor,
        type: 'PUT',
        success: function(res) {

            alert('success!');
        }
    });
    
}

function openmesages(numeroEmisor)
{

    $("#input-area").removeClass("d-none");
    $("#input-area").addClass("d-flex");


$.ajax({
url: 'https://www.mctechnologies.online/api/WhatsAppAdmin/GetChatListByNumber/'+ numeroEmisor,
type: 'GET',
success: function(res) {
    CountmessageByNumberList = res.mensajes.length;

    if(res.nombreContacto == '' || res.nombreContacto == 'undefined' || res.nombreContacto == null )
    {
        SetContactName(numeroEmisor,numeroEmisor);
        $("#input-area").css("display", "block");
    }
    else
    {
        SetContactName(res.nombreContacto,numeroEmisor);
    }

    var innerHTML= "";
    $.each(res.mensajes, function(index, value) {
    if(value.tipo == 'text')
    {

        if(value.mensaje1 == '' || value.mensaje1 == 'undefined' || value.mensaje1 == null)
        {
        
        }
        else
        {
            var localtzDate = moment(moment.utc(value.fechaHora)).local();
            innerHTML= innerHTML +
            `<div class="mx-auto my-2 bg-primary text-white small py-1 px-2 rounded">
                    `+ moment(localtzDate, "YYYY-MM-DD HH:mm:ss").format("hh:mm") +
            `</div>
            <div class="align-self-start p-1 my-1 mx-3 rounded bg-white shadow-sm message-item">
                <div class="options">
                    <a href="#"><i class="fas fa-angle-down text-muted px-2"></i></a>
                </div>
                <div class="d-flex flex-row">
                    <div class="body m-1 mr-2">`+ value.mensaje1 +`</div>
                    <div class="time ml-auto small text-right flex-shrink-0 align-self-end text-muted" style="width:75px;">
                        `+ moment(localtzDate, "YYYY-MM-DD HH:mm:ss").format("hh:mm") +
                        `</div>
                </div>
            </div>`;
        }

        if(value.respuesta == '' || value.respuesta  == 'undefined' || value.respuesta  == null )
        {
            
        }
        else
        {

            var localtzDate = moment(moment.utc(value.fechaHora)).local();
            innerHTML= innerHTML +
            `<div class="align-self-end self p-1 my-1 mx-3 rounded bg-white shadow-sm message-item">
                <div class="options">
                    <a href="#"><i class="fas fa-angle-down text-muted px-2"></i></a>
                </div>
                <div class="d-flex flex-row">
                    <div class="body m-1 mr-2">`+ value.respuesta +`</div>
                    <div class="time ml-auto small text-right flex-shrink-0 align-self-end text-muted" style="width:75px;">
                        `+ moment(localtzDate, "YYYY-MM-DD HH:mm:ss").format("hh:mm") +
                        `</div>
                </div>
            </div>`;

        }
    }
    else
    {

        innerHTML= innerHTML +
        `<br/><img class="image-section" style="width: 300px;;height:300px;" data-bind="sanitizedAttr: { src: imageUri }, visible: imageUri()" 
        src="https://navicol.blob.core.windows.net/wsimages/`+ value.mensaje1 +`">`;

    }


    });
   
    $("#messages").html(innerHTML);
    var messages = $('#messages');
    messages.scrollTop(messages.prop("scrollHeight"));
    
}

});


}

function SetContactName(ContactName,Number)
{
    var innerHTML= "";
    innerHTML= innerHTML +
    `<div class="d-block d-sm-none">
        <i class="fas fa-arrow-left p-2 mr-2 text-white" style="font-size: 1.5rem; cursor: pointer;" onclick="showChatList()"></i>
    </div>
    <a href="#"><img src="images/chat1.jpg"  class="img-fluid rounded-circle mr-2" style="height:50px;" id="pic"></a>
    <div class="d-flex flex-column">
        <div class="text-black font-weight-bold">`+ ContactName +`</div>
        <input type="hidden" id="name" name="name" value="+`+ Number +`" />
        <div class="text-black small" id="details"></div>
    </div>`;

     if(ContactName != Number)
    {
        innerHTML= innerHTML +
        `<div class="d-flex flex-row align-items-center ml-auto">
            <a ><i style="color:blue" class="fas fa-tag"></i></a>
            <a href="#" onclick="addtofav(`+ Number +`)"><i class="far fa-star mr-2 mx-sm-3"></i></a>	
        </div>`;
    }
    else
    {
        innerHTML= innerHTML +
        `<div class="d-flex flex-row align-items-center ml-auto">
            <a data-toggle="modal" data-target="#ModalAgregarContacto" onclick="OpenModalAgregarContacto(`+Number+`)"><i style="color:blue" class="fas fa-user"></i></a>
            <a><i style="color:blue" class="fas fa-tag mr-2 mx-sm-3"></i></a>
            <a onclick="addtofav(`+ Number +`)"><i class="far fa-star mr-2 mx-sm-3"></i></a>	
        </div>`;
    }

    $("#navbar-messages").html(innerHTML);
}

function Actualizarmensajes()
{

var CountMessagesListUpd = 0;
var CountmessageByNumberListUpd =0;
 
$.ajax({
    url: 'https://www.mctechnologies.online/api/WhatsAppAdmin/GetChatList',
    type: 'GET',
    success: function(res) {
    
        CountMessagesListUpd = res.length;
        var date = new Date();
        var current_date = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+ date.getDate();
        var current_time = date.getHours()+":"+date.getMinutes()+":"+ date.getSeconds();
        
        var myDate = moment(moment.utc(current_date +' '+current_time)).local();
        
     
        var innerHTML = "";
        $.each(res, function(index, value) {
            var localtzDate = moment(moment.utc(value.fechaHora)).local();
            var convmyDate = moment(myDate, "YYYY-MM-DD HH:mm:ss").format("YYYY-MM-DD");
            var convlocaltzDate = moment(localtzDate, "YYYY-MM-DD HH:mm:ss").format("YYYY-MM-DD");


        if(moment(convmyDate).day() - moment(convlocaltzDate).day() == 0)
            {
                if(value.nombreContacto == '' || value.nombreContacto == 'undefined' || value.nombreContacto == null )
                {
                    innerHTML = innerHTML +
                    `<div class="chat-list-item d-flex flex-row w-100 p-2 border-bottom" onclick="openmesages(`+ value.numeroEmisor +`)">
                        <img src="images/chat1.jpg" alt="Profile Photo" class="img-fluid rounded-circle mr-2" style="height:50px;">
                        <div class="w-50">
                        <div class="name"><b>`+ `+` + value.numeroEmisor +`</b></div>
                            <div class="small last-message"><b>`+ value.mensaje +`</b></div>
                        </div>
                        <div class="flex-grow-1 text-right">
                            <div class="small time">`+ moment(localtzDate, "YYYY-MM-DD HH:mm:ss").format("hh:mm") +`</div>
                            <div class="badge badge-success badge-pill small" id="unread-count">1</div>
                        </div>
                    </div>`;
                }
                else
                {
                    innerHTML = innerHTML +
                    `<div class="chat-list-item d-flex flex-row w-100 p-2 border-bottom" onclick="openmesages(`+ value.numeroEmisor +`)">
                        <img src="images/chat1.jpg" alt="Profile Photo" class="img-fluid rounded-circle mr-2" style="height:50px;">
                        <div class="w-50">
                        <div class="name"><b>`+ value.nombreContacto +`</b></div>
                            <div class="small last-message"><b>`+ value.mensaje +`</b></div>
                        </div>
                        <div class="flex-grow-1 text-right">
                            <div class="small time">`+ moment(localtzDate, "YYYY-MM-DD HH:mm:ss").format("hh:mm") + `</div>
                            <div class="badge badge-success badge-pill small" id="unread-count">1</div>
                        </div>
                    </div>`;

                }
            }

            else if(moment(convmyDate).day() - moment(convlocaltzDate).day() == 1)
            {
                if(value.nombreContacto == '' || value.nombreContacto == 'undefined' || value.nombreContacto == null )
                {
                    innerHTML = innerHTML +
                    `<div class="chat-list-item d-flex flex-row w-100 p-2 border-bottom" onclick="openmesages(`+ value.numeroEmisor +`)">
                        <img src="images/chat1.jpg" alt="Profile Photo" class="img-fluid rounded-circle mr-2" style="height:50px;">
                        <div class="w-50">
                        <div class="name"><b>`+ `+` + value.numeroEmisor +`</b></div>
                            <div class="small last-message"><b>`+ value.mensaje +`</b></div>
                        </div>
                        <div class="flex-grow-1 text-right">
                            <div class="small time"> Ayer </div>
                            <div class="badge badge-success badge-pill small" id="unread-count">1</div>
                        </div>
                    </div>`;
                }
                else
                {
                    innerHTML = innerHTML +
                    `<div class="chat-list-item d-flex flex-row w-100 p-2 border-bottom" onclick="openmesages(`+ value.numeroEmisor +`)">
                        <img src="images/chat1.jpg" alt="Profile Photo" class="img-fluid rounded-circle mr-2" style="height:50px;">
                        <div class="w-50">
                        <div class="name"><b>`+ value.nombreContacto +`</b></div>
                            <div class="small last-message"><b>`+ value.mensaje +`</b></div>
                        </div>
                        <div class="flex-grow-1 text-right">
                            <div class="small time"> Ayer </div>
                            <div class="badge badge-success badge-pill small" id="unread-count">1</div>
                        </div>
                    </div>`;

                }
            }

            else if(moment(convmyDate).day() - moment(convlocaltzDate).day() == 2)
            {
                if(value.nombreContacto == '' || value.nombreContacto == 'undefined' || value.nombreContacto == null )
                    {
                        innerHTML = innerHTML +
                        `<div class="chat-list-item d-flex flex-row w-100 p-2 border-bottom" onclick="openmesages(`+ value.numeroEmisor +`)">
                            <img src="images/chat1.jpg" alt="Profile Photo" class="img-fluid rounded-circle mr-2" style="height:50px;">
                            <div class="w-50">
                            <div class="name"><b>`+ `+` + value.numeroEmisor +`</b></div>
                                <div class="small last-message"><b>`+ value.mensaje +`</b></div>
                            </div>
                            <div class="flex-grow-1 text-right">
                                <div class="small time"> Antier </div>
                                <div class="badge badge-success badge-pill small" id="unread-count">1</div>
                            </div>
                        </div>`;
                    }
                    else
                    {
                        innerHTML = innerHTML +
                        `<div class="chat-list-item d-flex flex-row w-100 p-2 border-bottom" onclick="openmesages(`+ value.numeroEmisor +`)">
                            <img src="images/chat1.jpg" alt="Profile Photo" class="img-fluid rounded-circle mr-2" style="height:50px;">
                            <div class="w-50">
                            <div class="name"><b>`+ value.nombreContacto +`</b></div>
                                <div class="small last-message"><b>`+ value.mensaje +`</b></div>
                            </div>
                            <div class="flex-grow-1 text-right">
                                <div class="small time"> Antier </div>
                                <div class="badge badge-success badge-pill small" id="unread-count">1</div>
                            </div>
                        </div>`;
    
                    }
            }

            else
            {
                if(value.nombreContacto == '' || value.nombreContacto == 'undefined' || value.nombreContacto == null )
                    {
                        innerHTML = innerHTML +
                        `<div class="chat-list-item d-flex flex-row w-100 p-2 border-bottom" onclick="openmesages(`+ value.numeroEmisor +`)">
                            <img src="images/chat1.jpg" alt="Profile Photo" class="img-fluid rounded-circle mr-2" style="height:50px;">
                            <div class="w-50">
                            <div class="name"><b>`+ `+` + value.numeroEmisor +`</b></div>
                                <div class="small last-message"><b>`+ value.mensaje +`</b></div>
                            </div>
                            <div class="flex-grow-1 text-right">
                                <div class="small time">`+ moment(value.fechaHora, "YYYY-MM-DD HH:mm:ss").format("hh:mm") + `</div>
                                <div class="badge badge-success badge-pill small" id="unread-count">1</div>
                            </div>
                        </div>`;
                    }
                    else
                    {
                        innerHTML = innerHTML +
                        `<div class="chat-list-item d-flex flex-row w-100 p-2 border-bottom" onclick="openmesages(`+ value.numeroEmisor +`)">
                            <img src="images/chat1.jpg" alt="Profile Photo" class="img-fluid rounded-circle mr-2" style="height:50px;">
                            <div class="w-50">
                            <div class="name"><b>`+ value.nombreContacto +`</b></div>
                                <div class="small last-message"><b>`+ value.mensaje +`</b></div>
                            </div>
                            <div class="flex-grow-1 text-right">
                                <div class="small time">`+ moment(value.fechaHora, "YYYY-MM-DD HH:mm:ss").format("DD-MM hh:mm") + `</div>
                                <div class="badge badge-success badge-pill small" id="unread-count">1</div>
                            </div>
                        </div>`;
    
                    }
            }
    
        });

        $("#chat-list").html(innerHTML);

   }

});

if ($("#messages").html() !== '')  
{
    var numeroEmisor = $("#name").val();
    

    if(numeroEmisor !== undefined)
    {
        var numero = numeroEmisor.replace('+','');
      
            $.ajax({
            url: 'https://www.mctechnologies.online/api/WhatsAppAdmin/GetChatListByNumber/'+ numero,
            type: 'GET',
            success: function(res) {
        
                CountmessageByNumberListUpd = res.mensajes.length;
                if(res.nombreContacto == '' || res.nombreContacto == 'undefined' || res.nombreContacto == null )
                {
                    SetContactName(numero,numero);
                    $("#inputsendmessage").attr('disabled', 'disabled');
                    $("#buttonsendmessage").hide();
                    
                }
                else
                {
                    SetContactName(res.nombreContacto,numero);
                    $("#inputsendmessage").removeAttr("disabled");
                    $("#buttonsendmessage").show();
                }

                var innerHTML= "";
                $.each(res.mensajes, function(index, value) {

                if(value.tipo == 'text')
                {       
                        
                    if(value.mensaje1 == '' || value.mensaje1 == 'undefined' || value.mensaje1 == null)
                    {
                        
                    }
                    else
                    {
                        var localtzDate = moment(moment.utc(value.fechaHora)).local();
                        innerHTML= innerHTML +
                        `<div class="mx-auto my-2 bg-primary text-white small py-1 px-2 rounded">
                                `+ moment(localtzDate, "YYYY-MM-DD HH:mm:ss").format("hh:mm") +
                                `</div>
                                    <div class="align-self-start p-1 my-1 mx-3 rounded bg-white shadow-sm message-item">
                                        <div class="options">
                                            <a href="#"><i class="fas fa-angle-down text-muted px-2"></i></a>
                                        </div>
                                        <div class="d-flex flex-row">
                                            <div class="body m-1 mr-2">`+ value.mensaje1 +`</div>
                                            <div class="time ml-auto small text-right flex-shrink-0 align-self-end text-muted" style="width:75px;">
                                                `+ moment(localtzDate, "YYYY-MM-DD HH:mm:ss").format("hh:mm") +
                                                `</div>
                                        </div>
                        </div>`;
                    }

                    if(value.respuesta == '' || value.respuesta  == 'undefined' || value.respuesta  == null )
                    {
                        
                    }
                    else
                    {

                        var localtzDate = moment(moment.utc(value.fechaHora)).local();
                        innerHTML= innerHTML +
                        `<div class="align-self-end self p-1 my-1 mx-3 rounded bg-white shadow-sm message-item">
                            <div class="options">
                                <a href="#"><i class="fas fa-angle-down text-muted px-2"></i></a>
                            </div>
                            <div class="d-flex flex-row">
                                <div class="body m-1 mr-2">`+ value.respuesta +`</div>
                                <div class="time ml-auto small text-right flex-shrink-0 align-self-end text-muted" style="width:75px;">
                                    `+ moment(localtzDate, "YYYY-MM-DD HH:mm:ss").format("hh:mm") +
                                    `</div>
                            </div>
                        </div>`;

                    }
                }
                else
                {

                    innerHTML= innerHTML +
                    `<br/><img class="image-section" style="width: 300px;;height:300px;" data-bind="sanitizedAttr: { src: imageUri }, visible: imageUri()" 
                    src="https://navicol.blob.core.windows.net/wsimages/`+ value.mensaje1 +`">`;

                }

                });
            
                if(CountmessageByNumberListUpd > CountmessageByNumberList)
                {
                    $("#messages").html(innerHTML);
                    var messages = $('#messages');
                    messages.scrollTop(messages.prop("scrollHeight"));
                    CountmessageByNumberList= CountmessageByNumberListUpd;
                }
                
            }

            });

    }
    
    
}

}

