$(document).ready(function() {
    // Manejar el evento de envío del formulario
    $('#formulario').submit(function(event) {
        event.preventDefault();

        // Obtener los valores del formulario
        var cedula = $('#cedula').val();
        var nombre = $('#nombre').val();
        var matematicas = parseFloat($('#matematicas').val());
        var fisica = parseFloat($('#fisica').val());
        var programacion = parseFloat($('#programacion').val());

        // Validar campos vacíos
        if (cedula === '' || nombre === '' || isNaN(matematicas) || isNaN(fisica) || isNaN(programacion)) {
            alert('Por favor, complete todos los campos correctamente.');
            return;
        }

        // Validar rango de notas
        if (matematicas < 1 || matematicas > 20 || fisica < 1 || fisica > 20 || programacion < 1 || programacion > 20) {
            alert('Las notas deben estar en el rango de 1 a 20.');
            return;
        }

        // Realizar la petición AJAX para guardar los datos
        $.ajax({
            url: 'guardar_notas.php',
            method: 'POST',
            data: {
                cedula: cedula,
                nombre: nombre,
                matematicas: matematicas,
                fisica: fisica,
                programacion: programacion
            },
            success: function(response) {
                // Mostrar la respuesta en la tabla
                $('#tabla').append(response);
                // Limpiar los campos del formulario
                $('#formulario')[0].reset();

                // Calcular resultados
                calcularResultados();
            },
            error: function() {
                alert('Error al guardar los datos.');
            }
        });
    });

    function calcularResultados() {
        // Obtener las notas de todos los estudiantes
        var notasMatematicas = [];
        var notasFisica = [];
        var notasProgramacion = [];

        $('#tabla tr:gt(0)').each(function() {
            var notaMatematicas = parseFloat($(this).find('td:eq(2)').text());
            var notaFisica = parseFloat($(this).find('td:eq(3)').text());
            var notaProgramacion = parseFloat($(this).find('td:eq(4)').text());

            notasMatematicas.push(notaMatematicas);
            notasFisica.push(notaFisica);
            notasProgramacion.push(notaProgramacion);
        });

        // Calcular los resultados
        var notaPromedioMatematicas = calcularPromedio(notasMatematicas);
        var notaPromedioFisica = calcularPromedio(notasFisica);
        var notaPromedioProgramacion = calcularPromedio(notasProgramacion);

        var alumnosAprobadosMatematicas = contarAprobados(notasMatematicas);
        var alumnosAprobadosFisica = contarAprobados(notasFisica);
        var alumnosAprobadosProgramacion = contarAprobados(notasProgramacion);

        var alumnosAplazadosMatematicas = contarAplazados(notasMatematicas);
        var alumnosAplazadosFisica = contarAplazados(notasFisica);
        var alumnosAplazadosProgramacion = contarAplazados(notasProgramacion);

        var alumnosAprobadosUnaMateria = contarAprobadosUnaMateria(notasMatematicas, notasFisica, notasProgramacion);
        var alumnosAprobadosDosMaterias = contarAprobadosDosMaterias(notasMatematicas, notasFisica, notasProgramacion);

        var notaMaximaMatematicas = notasMatematicas.length > 0 ? Math.max(...notasMatematicas) : 0;
        var notaMaximaFisica = notasFisica.length > 0 ? Math.max(...notasFisica) : 0;
        var notaMaximaProgramacion = notasProgramacion.length > 0 ? Math.max(...notasProgramacion) : 0;

        // Mostrar los resultados en la tabla
        $('#tabla-resultados').empty();
        $('#tabla-resultados').append('<tr><th>Materia</th><th>Nota Promedio</th><th>Aprobados</th><th>Aplazados</th><th>Aprobados en una Materia</th><th>Aprobados en dos Materias</th><th>Nota Máxima</th></tr>');
        $('#tabla-resultados').append('<tr><th>Matemáticas</th><td>' + notaPromedioMatematicas + '</td><td>' + alumnosAprobadosMatematicas + '</td><td>' + alumnosAplazadosMatematicas + '</td><td>' + alumnosAprobadosUnaMateria + '</td><td>' + alumnosAprobadosDosMaterias + '</td><td>' + notaMaximaMatematicas + '</td></tr>');
        $('#tabla-resultados').append('<tr><th>Física</th><td>' + notaPromedioFisica + '</td><td>' + alumnosAprobadosFisica + '</td><td>' + alumnosAplazadosFisica + '</td><td>' + alumnosAprobadosUnaMateria + '</td><td>' + alumnosAprobadosDosMaterias + '</td><td>' + notaMaximaFisica + '</td></tr>');
        $('#tabla-resultados').append('<tr><th>Programación</th><td>' + notaPromedioProgramacion + '</td><td>' + alumnosAprobadosProgramacion + '</td><td>' + alumnosAplazadosProgramacion + '</td><td>' + alumnosAprobadosUnaMateria + '</td><td>' + alumnosAprobadosDosMaterias + '</td><td>' + notaMaximaProgramacion + '</td></tr>');
    }

    function calcularPromedio(notas) {
        var suma = 0;
        for (var i = 0; i < notas.length; i++) {
            suma += notas[i];
        }
        return (suma / notas.length).toFixed(2);
    }

    function contarAprobados(notas) {
        var contador = 0;
        for (var i = 0; i < notas.length; i++) {
            if (notas[i] >= 6) {
                contador++;
            }
        }
        return contador;
    }

    function contarAplazados(notas) {
        var contador = 0;
        for (var i = 0; i < notas.length; i++) {
            if (notas[i] < 6) {
                contador++;
            }
        }
        return contador;
    }

    function contarAprobadosUnaMateria(notasMatematicas, notasFisica, notasProgramacion) {
        var contador = 0;
        for (var i = 0; i < notasMatematicas.length; i++) {
            if ((notasMatematicas[i] >= 6 && notasFisica[i] < 6 && notasProgramacion[i] < 6) ||
                (notasMatematicas[i] < 6 && notasFisica[i] >= 6 && notasProgramacion[i] < 6) ||
                (notasMatematicas[i] < 6 && notasFisica[i] < 6 && notasProgramacion[i] >= 6)) {
                contador++;
            }
        }
        return contador;
    }

    function contarAprobadosDosMaterias(notasMatematicas, notasFisica, notasProgramacion) {
        var contador = 0;
        for (var i = 0; i < notasMatematicas.length; i++) {
            if ((notasMatematicas[i] >= 6 && notasFisica[i] >= 6 && notasProgramacion[i] < 6) ||
                (notasMatematicas[i] >= 6 && notasFisica[i] < 6 && notasProgramacion[i] >= 6) ||
                (notasMatematicas[i] < 6 && notasFisica[i] >= 6 && notasProgramacion[i] >= 6)) {
                contador++;
            }
        }
        return contador;
    }

    // Calcular resultados iniciales al cargar la página
    calcularResultados();
});
