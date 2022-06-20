# ItTest

Prueba técnica de nivel de Angular.

## Características

- Angular 13
- Angular Material
- ngx-charts (gráficas)
- Typescript
- Unit testing con Karma/Jasmine
- Datos de las gráficas cargados a través de un json.
- Models, guards, interceptors.

## Arrancar el proyecto

```bash
# download the example or clone the repo from github
git clone https://github.com/2paedev/it-test

# change directory
cd it-test

# install the repo with npm
npm install

# start the development server
npm run start
```

## Usuarios

Usuario normal -> user/user
Usuario administrador -> admin/admin

## Rutas

- /login: página para hacer el login, se pueden ver las instrucciones en esa página para hacer login. Tiene acceso todos los usuarios a esta página.
- /home: a está página tiene acceso tanto "user" como "admin". Los dos usuarios pueden editar la gráfica y verla.
- /special: en esta página tienen acceso "user" y "admin" y pueden visualizar la gráfica ambos pero solo puede editarla el usuario "admin".
- /admin: página que solo es accesible por el usuario "admin"

## Gráficas

- Gráfica /home: Se pueden añadir columnas a la gráfica y ordenar los elementos por nombre o por valor.
- Gráfica /special: Gráfica con fechas donde se puede seleccionar una fecha de inicio + un lapso de días para visualizar esa parte de la gráfica.

## Unit Testing

Para ejecutar los test:

```bash
npm run test
```

Para ver la cobertura hay que abrir el navegador el fichero: "it-test/coverage/it-test/index.html"
