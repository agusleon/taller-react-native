# taller-react-native

### Ejecución del proyecto

Este proyecto hace uso de Expo, una plataforma open-source para crear aplicaciones nativas de IOS y Android. Para correr el proyecto se deben instalar primero expo

``` npm instal --global expo-cli ```

Para luego correr la aplicación con:

``` expo start ```

La consola les mostrará un codigo QR que deberán escanear desde la aplicación Expo GO (exclusiva para Android). Automáticamente la aplicación se deployará en su celular.

### .env

El proyecto utiliza firebase para el login, registro y autenticación de usuarios. Para ello, necesitamos crear un archivo .env con la api key REACT_APP_FIREBASE_API_KEY. El valor de la misma se encuentra en el dashboard de firebase para la aplicación mobile.