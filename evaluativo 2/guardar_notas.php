<?php
$cedula = $_POST['cedula'];
$nombre = $_POST['nombre'];
$matematicas = $_POST['matematicas'];
$fisica = $_POST['fisica'];
$programacion = $_POST['programacion'];

if ($cedula === '' || $nombre === '' || !is_numeric($matematicas) || !is_numeric($fisica) || !is_numeric($programacion)) {
    die('Por favor, complete todos los campos correctamente.');
}

$nota_promedio_matematicas = ($matematicas + $fisica + $programacion) / 3;
$nota_promedio_fisica = ($matematicas + $fisica + $programacion) / 3;
$nota_promedio_programacion = ($matematicas + $fisica + $programacion) / 3;

$alumnos_aprobados_matematicas = ($matematicas >= 60) ? 1 : 0;
$alumnos_aprobados_fisica = ($fisica >= 60) ? 1 : 0;
$alumnos_aprobados_programacion = ($programacion >= 60) ? 1 : 0;

$alumnos_aplazados_matematicas = ($matematicas < 60) ? 1 : 0;
$alumnos_aplazados_fisica = ($fisica < 60) ? 1 : 0;
$alumnos_aplazados_programacion = ($programacion < 60) ? 1 : 0;

$alumnos_aprobados_sola = (($matematicas >= 60 && $fisica < 60 && $programacion < 60) ||
                          ($matematicas < 60 && $fisica >= 60 && $programacion < 60) ||
                          ($matematicas < 60 && $fisica < 60 && $programacion >= 60)) ? 1 : 0;

$alumnos_aprobados_doble = (($matematicas >= 60 && $fisica >= 60 && $programacion < 60) ||
                           ($matematicas >= 60 && $fisica < 60 && $programacion >= 60) ||
                           ($matematicas < 60 && $fisica >= 60 && $programacion >= 60)) ? 1 : 0;

$nota_maxima_matematicas = max($matematicas, $fisica, $programacion);
$nota_maxima_fisica = max($matematicas, $fisica, $programacion);
$nota_maxima_programacion = max($matematicas, $fisica, $programacion);

$tabla = "<tr>
            <td>$cedula</td>
            <td>$nombre</td>
            <td>$matematicas</td>
            <td>$fisica</td>
            <td>$programacion</td>
        </tr>";

$resultados = "<p>Resultados:</p>
                <ul>
                    <li>Nota promedio de Matemáticas: $nota_promedio_matematicas</li>
                    <li>Nota promedio de Física: $nota_promedio_fisica</li>
                    <li>Nota promedio de Programación: $nota_promedio_programacion</li>
                    <li>Número de alumnos aprobados en Matemáticas: $alumnos_aprobados_matematicas</li>
                    <li>Número de alumnos aprobados en Física: $alumnos_aprobados_fisica</li>
                    <li>Número de alumnos aprobados en Programación: $alumnos_aprobados_programacion</li>
                    <li>Número de alumnos aplazados en Matemáticas: $alumnos_aplazados_matematicas</li>
                    <li>Número de alumnos aplazados en Física: $alumnos_aplazados_fisica</li>
                    <li>Número de alumnos aplazados en Programación: $alumnos_aplazados_programacion</li>
                    <li>Número de alumnos que aprobaron una sola materia: $alumnos_aprobados_sola</li>
                    <li>Número de alumnos que aprobaron dos materias: $alumnos_aprobados_doble</li>
                    <li>Nota máxima en Matemáticas: $nota_maxima_matematicas</li>
                    <li>Nota máxima en Física: $nota_maxima_fisica</li>
                    <li>Nota máxima en Programación: $nota_maxima_programacion</li>
                </ul>";

echo $tabla;
echo $resultados;
?>
