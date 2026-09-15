# Segundo avance de Gestión Técnica

El estado compartido de pendientes y usuario se administra con Redux Toolkit. Los campos y errores de los formularios siguen usando useState. El ejemplo de productos de la consigna se adapta a pendientes técnicos según el alcance acordado.

## Archivos principales

- `src/store/store.ts`: combina los reducers, crea una instancia del store y registra el estado anterior y posterior de cada acción en desarrollo.
- `src/store/tasksSlice.ts`: datos iniciales, acción para agregar pendientes y acción para cambiar su estado. `prepare` genera el identificador y la fecha antes del reducer.
- `src/store/userSlice.ts`: datos de la sesión de demostración; acciones login y logout.
- `src/store/hooks.ts`: useAppSelector y useAppDispatch son versiones de useSelector y useDispatch con los tipos de la app.
- `src/types/task.ts` y `src/types/user.ts`: estructura de los datos.
- `App.tsx`: Provider comparte el store con la navegación y las pantallas.

## Recorrido de los datos

Guardar pendiente: el formulario valida campos y teléfono; dispatch(addTask(...)) envía la acción; el reducer agrega el pendiente a tasks.items; los selectores de Inicio y Pendientes reciben la lista actualizada. Cambiar estado usa el identificador de la tarea para modificar únicamente ese registro.

Iniciar sesión: se valida el formato del correo y la longitud de la contraseña. login guarda el correo ingresado y los datos de perfil de demostración en user.currentUser. El navegador observa ese valor y muestra las pantallas principales. Perfil lo consulta con useAppSelector. logout elimina la sesión y la navegación vuelve al formulario.

La contraseña solo vive en el formulario: no se envía a Redux. El nombre, cargo, área y turno son datos de demostración; no hay autenticación real ni registro de cuentas.

## Prueba manual y capturas pendientes

1. Ejecutar `npm start` y abrir la app con Expo Go o un simulador compatible.
2. Verificar que un formulario vacío no permite iniciar sesión. Entrar con `demo@example.com` y una contraseña de al menos seis caracteres.
3. Revisar en Perfil el correo ingresado. Volver a Inicio: inicialmente hay un pendiente, uno en proceso y uno completado.
4. Crear un pendiente válido. El resumen debe mostrar dos pendientes y la lista debe incluir el nuevo registro.
5. Abrir su detalle, cambiarlo a En proceso y volver a Inicio: debe mostrar un pendiente y dos en proceso.
6. Recorrer las pestañas y volver al detalle; comprobar que los datos se conservan.
7. Cerrar sesión: debe aparecer Login. Al iniciar otra sesión dentro de la misma ejecución, los pendientes compartidos se conservan.
8. Revisar los mensajes `[Redux]` en la consola de desarrollo. Cada acción registra el tipo, el estado anterior y el actualizado. Usar datos de demostración para las capturas.

Para el PDF, capturar store, slices, tipos, hooks y su uso desde las pantallas, además de la consola durante login, alta y cambio de estado. Falta realizar la prueba visual en dispositivo y preparar ese PDF. Las pruebas de store no sustituyen la demostración de navegación.

## Verificación automática

- `npm run typecheck`: comprueba los tipos de toda la app.
- `npm run test:redux`: prueba la sesión, altas, identificadores únicos, cambios de estado, identificador inexistente, inmutabilidad, conservación de pendientes al cerrar sesión y registros de consola.

## Alcance del almacenamiento

El store conserva los datos al navegar porque se crea fuera de las pantallas. No hay almacenamiento permanente: reiniciar la app restaura los pendientes de ejemplo y elimina la sesión. Los pendientes son compartidos en esta demostración, no están separados por cuenta.

## Explicación breve para la exposición

Redux centraliza los pendientes y el usuario. Las pantallas consultan el estado con useSelector y envían acciones con useDispatch. Los reducers de cada slice procesan esas acciones. Provider permite acceder al mismo store desde toda la app. Los formularios mantienen localmente los valores escritos y sus mensajes de validación.
