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
          <td>`+ value.numero +`</td>
          <td>`+ value.nombre +`</td>
          <td>`+ value.favorito +`</td>
          <td>`+ value.etiqueta +`</td>
          <td>`+ moment(value.fechaCreacion, "YYYY-MM-DD HH:mm:ss").format("DD-MM-YYYY hh:mm") +`</td>
          <td><button data-bs-toggle="modal" data-bs-target="#ModalEditarContacto" onclick="openmodaledit(`+ value.contactoId +`)" class="btn btn-default"><i class="fas fa-pencil-alt"></i></button></td>
          <td><button class="btn btn-default"><i class="fas fa-trash"></i></button></td>
        </tr>`;

      });

      $("#example tbody").html(innerHTML);


          $('#example').DataTable({
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
          $("div.toolbar").append('<button data-bs-toggle="modal" data-bs-target="#ModalAgregarContacto"  style="background-color:#004a8f;color:white;display:block;margin-left:85%" class="btn btn-default" >+ Agregar</button>');
         
      }
    });
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
  
  function openmodaledit(contactid)
  {
      $("#EditContactoTelefonoTxt").val('numero');
      $("#EditContactoNombreTxt").val('nombre');
      $("#EditContactoFavoritoDdl").val('1');
      $("#EditContactoEtiquetaTxt").val('test');
      alert(contactid);
  }

  function editcontact()
  {
    alert('edit');
  }
