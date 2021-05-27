# Proyecto Final Web: Dnd Character Creator

## Que es?

Una página web en donde podrás crear tu personaje de Dungeons And Dragons, 5th edition. 

## Como se hizo? 

Se utilizó el siguiente technology stack: MongoDB -> Express -> Node js y Vanilla CSS

# Funcionamiento Interno

## HTML

### CreateCharacter

Este archivo, como su nombre lo indica, provee la funcionalidad para que el usuario cree su personaje. A través de llamadas al API de [DnD 5e](https://www.dnd5eapi.co/), la página despliega las razas, niveles, y clases disponibles, y una vez que estas estén seleccionadas, permite al usuario escoger hechizos, habilidades, proficiencias, y todo lo requerido para crear un personaje legal. Una vez que el usuario esté satisfecho con el personaje, este se guarda en una base de datos de MongoDB. (Si el create no esta insertando a la base de datos, por favor contacta al mantainer de este repositorio con tu dirección IP para que esta sea añadida a la whitelist).

Este archivo cuenta con las siguientes funciones:
* getClasses() -> Obtiene las clases del API
* addToSelect(data, id) -> Inserta los elementos proporcionados en data en el select existente con id id.
* getRaces() -> Obtiene las razas del API
* getRaceInfo() -> Dependiendo de la raza que escogio el usuario, se buscan y se muestran ciertas caracteristicas en el API
* addLevels() -> Usa addToSelect() para generar el select de los niveles posibles (1-20)
* getClassInfo()-> Lo mismo pero que getRaceInfo() pero para la clase.
* getLevel(userClass,level) -> Obtiene las caracteristicas especificas de la clase escogida al nivel escogido y las muestra
* onSpellSelect() -> Usando la informacion de getLevel(), detecta si los hechizos escogidos son del nivel adecuado y la cantidad adecuada
* onSkillSelect() -> Lo mismo que onSpellSelect() pero para las habilidades
* preSubmit() -> Masajea los datos obtenidos por las diversas funciones a un formato estandar y lo prepara para ser enviado a guardar
* PointBuy() -> Maneja el establecimiento de ability scores y cuida que el usuario no se pase del limite de puntos
* getSpellsByLevel(userClass, level) -> Utiliza la clase seleccionada userClass y el nivel seleccionado level para ver si la clase puede lanzar hechizos, cuantos, en cuales niveles, y cuales hechizos. 


### Characters

Este archivo utiliza la funcion del backend getCharacters() para obtener una lista de los personajes guardados en la base de datos, para que el usuario pueda borrarlos o editar su nombre. 

Este archivo cuenta con las siguientes funciones:

* getCharacters() -> Utiliza la funcion del backend para obtener la lista de personajes
* displayCharacters(chars) -> Muestra en la pagina los personajes contenidos en el arreglo chars
* deleteChar(id) -> Llama a la funcion characterDelete() del backend para borrar al personaje definido por id
* editChar(id) -> Una vez que el usuario haya demonstrado intencion de editar a un personaje, genera un input text field que se usara para cambiarle el nombre al personaje
* sendEdit(id) -> Utiliza el valor del input de editChar para mandar llamar characterEdit() del backend y cambiar el nombre al personaje definido por id


## JS

### Main.js

El archivo de ruteo de Express, establece las rutas para que los usuarios puedan acceder a las paginas HTML, y permite que estas paginas accedan a las funciones del backend.

### db.js

El archivo principal del backend, utiliza el paquete de mongodb de Node para conectarse con una base de datos previamente creada, y aplicar las operaciones CRUD. Sus funciones son: 

* characterInsert(request) -> **C** de CRUD. Inserta al personaje contenido en request a la DB
* getCharacters() -> **R** de CRUD. Obtiene la lista de los personajes
* modCharacter(request) -> **U** de CRUD. Modifica el nombre de un cierto personaje
* delCharacter(request) -> **D** de CRUD. Elimina el personaje definido por request de la DB

Instrucciones de Instalación:

1. Descargar todos los archivos en .zip
2. Descomprimir los archivos
3. Asegurarse que se tiene instalado node.js. Si no, se puede obtener de https://nodejs.org/en/download/
4. Abrir una terminal en el folder y correr el comando  "npm install"
5. Para correrlo, puedes usar el comando  "npm start" o "npm run dev"

1a. Alternativamente, puedes descargar el paquete directamente haciendo     "npm install https://github.com/Starfleet-Command/ProyectoFinal_Web"  
2a. Y luego correrlo de la misma manera que el paso 5.
