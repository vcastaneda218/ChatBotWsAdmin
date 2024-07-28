 $(document).ready(function() { 
    
    if(sessionStorage.getItem("user") != "true")
    {
      location.href="./index.html";
    }

    $.ajax({
    url: 'https://www.mctechnologies.online/api/WhatsAppAdmin/GetContactos',
    type: 'GET',
      success: function(res) {
      
      var innerHTML= "";
      $.each(res, function(index, value) {

      innerHTML= innerHTML +
      `<tr>
          <td>`+ value.contactoId +`</td>
          <td>`+ value.numero +`</td>
          <td>`+ value.nombre +`</td>
          <td>`+ value.favorito +`</td>
          <td>`+ value.etiqueta +`</td>
          <td>`+ moment(value.fechaCreacion, "YYYY-MM-DD HH:mm:ss").format("DD-MM-YYYY hh:mm") +`</td>
          <td><button id="edit" data-bs-toggle="modal" data-bs-target="#ModalEditarContacto" class="btn btn-default"><i class="fas fa-pencil-alt"></i></button></td>
          <td><button class="btn btn-default"><i class="fas fa-trash"></i></button></td>
        </tr>`;

      });

      $("#example tbody").html(innerHTML);


          $('#example').DataTable({
            columnDefs: [
              {
                  target: 0,
                  visible: false,
                  searchable: false
              },

          ],
          "dom": '<"toolbar">frtip',
          info: true,
          searching: true,
          lengthChange: false,
              "language": {
                  "zeroRecords": "No se encontró ninguna contacto",
                  "paginate": {
                      "first": "Primero",
                      "last": "Último",
                      "next": "Siguiente",
                      "previous": "Anterior"
                  },
                  "select": {
                      "rows": " filas seleccionadas"
                  },
                  "loadingRecords": "Un momento, cargando contactos ...",
                  "processing": "Procesando contactos...",
                  "info": "Mostrando _START_ a _END_ de _TOTAL_  de contactos",
                  "lengthMenu": "Mostrando _MENU_ contactos",
              }
          });
          $("div.toolbar").append('<button data-bs-toggle="modal" data-bs-target="#ModalAgregarContacto"  style="background-color:#004a8f;color:white;display:block;margin-left:70%" class="btn btn-default" >+ Agregar</button>');
         
      }
    });

    $('#example tbody').on( 'click', 'button#edit', function () 
    {
      var table = $('#example').DataTable();
      var data = table.row( $(this).parents('tr') ).data();


      
    $("#EditContactoId").text(data[0]);
    $("#EditContactoTelefonoTxt").val(data[1]);
    $("#EditContactoNombreTxt").val(data[2]);
    $("#EditContactoFavoritoDdl").val(data[3]);
    $("#EditContactoEtiquetaTxt").val(data[4]);
      
    } );

  });

  function addcontact()
  {

      var numero = $("#NuevoContactoTelefonoTxt").val();
      var nombre = $("#NuevoContactoNombreTxt").val();
      var favorito = $("#NuevoContactoFavoritoDdl").val();
      var etiqueta = $("#NuevoContactoEtiquetaTxt").val();

      if(numero == '' || numero == 'undefined' || numero == null)
      {
          Swal.fire({
              icon: "warning",
              title: "Atencion!",
              text: "El campo numero es necesario"
          });
          return;
      }

      if(nombre == '' || nombre == 'undefined' || nombre == null)
      {
          Swal.fire({
              icon: "warning",
              title: "Atencion!",
              text: "El campo nombre es necesario"
          });
          return;
      }
      
      if(favorito == '' || favorito == 'undefined' || favorito == null)
      {
          Swal.fire({
              icon: "warning",
              title: "Atencion!",
              text: "El campo favorito es necesario"
          });
          return;
      }

      if(etiqueta == '' || etiqueta == 'undefined' || etiqueta == null)
      {
          Swal.fire({
              icon: "warning",
              title: "Atencion!",
              text: "El campo etiqueta es necesario"
          });
          return;
      }

      var date = new Date();
      var newContact = {};
      newContact.ContactoId = 0;
      newContact.Numero = numero;
      newContact.Nombre = nombre;
      newContact.Favorito = favorito;
      newContact.Etiqueta = etiqueta;
      newContact.FechaCreacion = date;
      newContact.Activo = 1;
   
      var data = JSON.stringify(newContact);
      console.log(newContact);
      
        $.ajax({
            type: "POST",
            url: "https://www.mctechnologies.online/api/Contactos",
            data: data,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (response) {
              Swal.fire({
                title: "Info!",
                text: "El contacto se ha guardado correctamente!",
                icon: "success"
              }).then((result) => {

                location.href="./contacts.html";
                
              });
          },
          failure: function (response) {
              Swal.fire({
              icon: "error",
              title: "Oops...",
              text: response
            });
          },
          error: function (response) {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: response
            });
          }
      });

      $('#ModalAgregarContacto').modal('toggle');

  }

  function editcontact()
  {
    
    var Id = $("#EditContactoId").text();
    var numero = $("#EditContactoTelefonoTxt").val();
    var nombre = $("#EditContactoNombreTxt").val();
    var favorito = $("#EditContactoFavoritoDdl").val();
    var etiqueta = $("#EditContactoEtiquetaTxt").val();

    if(Id == '' || Id == 'undefined' || Id == null)
      {
          Swal.fire({
              icon: "warning",
              title: "Atencion!",
              text: "El campo id es necesario"
          });
          return;
      }
  

    if(numero == '' || numero == 'undefined' || numero == null)
    {
        Swal.fire({
            icon: "warning",
            title: "Atencion!",
            text: "El campo numero es necesario"
        });
        return;
    }

    if(nombre == '' || nombre == 'undefined' || nombre == null)
    {
        Swal.fire({
            icon: "warning",
            title: "Atencion!",
            text: "El campo nombre es necesario"
        });
        return;
    }
    
    if(favorito == '' || favorito == 'undefined' || favorito == null)
    {
        Swal.fire({
            icon: "warning",
            title: "Atencion!",
            text: "El campo favorito es necesario"
        });
        return;
    }

    if(etiqueta == '' || etiqueta == 'undefined' || etiqueta == null)
    {
        Swal.fire({
            icon: "warning",
            title: "Atencion!",
            text: "El campo etiqueta es necesario"
        });
        return;
    }

    var date = new Date();
    var newContact = {};
    newContact.ContactoId = Id;
    newContact.Numero = numero;
    newContact.Nombre = nombre;
    newContact.Favorito = favorito;
    newContact.Etiqueta = etiqueta;

    var data = JSON.stringify(newContact);
    console.log(newContact);
    
      $.ajax({
          type: "PUT",
          url: "http://localhost:5032/api/Contactos/"+ Id,
          data: data,
          contentType: "application/json; charset=utf-8",
          dataType: "json",
          success: function (response) {
            Swal.fire({
              title: "Info!",
              text: "El contacto se ha guardado correctamente!",
              icon: "success"
            }).then((result) => {

              location.href="./contacts.html";
              
            });
        },
        failure: function (response) {
            Swal.fire({
            icon: "error",
            title: "Oops...",
            text: response
          });
        },
        error: function (response) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: response
          });
        }
    });




  }
