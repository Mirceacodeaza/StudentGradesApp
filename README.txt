 StudentGradesApp

Aplicație Spring Boot + Angular pentru gestiunea studenților,
cursurilor, profesorilor și notelor.
Include autentificare cu JWT, CRUD complet, statistici și dashboard.

------------------------------------------------------------------------

 Cerințe

-   Java 17+
-   Maven 3.9+
-   Node.js 18+
-   Angular CLI (npm install -g @angular/cli)
-   MySQL (sau alt DB configurat în application.properties)

------------------------------------------------------------------------

 Cum rulezi aplicația

1. Backend (Spring Boot)

    cd backend
    mvn spring-boot:run

Backend-ul rulează pe: http://localhost:8080

2. Frontend (Angular, mod development)

    cd frontend
    npm install
    ng serve -o

UI: http://localhost:4200


3. Deploy local

Dacă vrei să ruleze totul din Spring Boot (un singur server):

    cd frontend
    ng build --configuration production

Copiază conținutul din frontend/dist/<app-name>/ în:

    backend/src/main/resources/static/

Apoi rulează:

    cd backend
    mvn spring-boot:run

Accesează totul la: http://localhost:8080

------------------------------------------------------------------------

 Autentificare

-   Endpoint login: POST /api/v1/auth/login
-   Token JWT salvat în localStorage
-   Exemplu conturi (de test):
    -   Admin: admin@uni.ro / parolaAdmin
    -   User: student@uni.ro / parolaStudent

------------------------------------------------------------------------

 Funcționalități

Backend

-   CRUD complet pentru:
    -   Studenți
    -   Profesori
    -   Cursuri
    -   Note
-   Validări extinse (email unic, matricol unic, notă 1–10, fără
    duplicat student+curs).
-   Dashboard:
    -   Top studenți după medie
    -   Cursuri populare
    -   Număr total entități
-   JWT Security (login + guard pentru rute).

Frontend

-   Login & Register
-   Liste + Formulare (CRUD)
-   Dashboard cu:
    -   Carduri info (stud., prof., cursuri)
    -   Top studenți
    -   Cursuri populare
    -   Export CSV
-   UI cu Angular Material

------------------------------------------------------------------------

Structură proiect

    StudentGradesApp/
    ├── backend/   (Spring Boot, REST API)
    │   ├── src/main/java/com/example/studentgrades/
    │   └── src/main/resources/
    ├── frontend/  (Angular UI)
    │   ├── src/app/
    │   └── angular.json
    └── README.md

------------------------------------------------------------------------

Exemple API-uri

-   GET /api/students → lista studenți
-   POST /api/students → adaugă student
-   GET /api/grades/search → filtrare note
-   GET /api/dashboard/top-students → top 5 studenți
-   GET /api/dashboard/popular-courses → cursuri populare
-   GET /api/dashboard/counts → total studenți/profesori/cursuri

