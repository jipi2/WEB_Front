Tema proiect: Website pentru recenzii filme

Pe pagina de login, pentru admin:
	-> username: admin
	-> pasword: admin
	-> orice alceva se va considera a fi un utilizator cu un cont existent
	
Fisierul .html pe care se va da click: "index.html" din folder "html".

Continut arhiva:
	-> folder "html":
		-> contine toate fisierle .html
	-> folder "css":
		-> contine toate fiserele .css, cel putin unul pentru fiecare fisier .html
	-> folder "js":
		-> contine toate fisierele .js, carora li s-a schimbat extensia in .tojs pentru a putea fi trimise
	-> folderul "assets":
		-> contine imagini
	-> acest fisier "readme.txt"
		-> in acest fisier este prezentat pe scurt proiectul

Proiectul din aceasta arhiva reprezinta doar partea de frontend, astfel anumite functionalitati nu sunt inca
disponibile si informatiile din anumite pagini sunt doar exemple.

In toate fisierle .html este inclus fisierul "navbar.css" care reprezinta foaia de stil pentru navbar.

index.html:
	-> aceasta este prima pagina care se va deschide pentru toti utilizatorii:
		-> "admin/useri/cei fara cont"
	-> contine un navbar care la randul lui contine doar un buton spre pagina de sign in/register
	-> contine un carusel de imagini care este realizat cu ajutorul css-ului.
	-> o scurta descriere a site-ului
	-> un buton in partea de jos spre pagina de sign in/register

login_register.html:
	-> aceasta este pagina de sign in/register
	-> contine in partea de sus un navbar cu un singur buton sign up care ne va conduce spre index.html
	-> contine un form pentru sign in si un form pentru	sign up
	-> contine si un checkbox pentru a pastra userul logat
	-> credentialele: username: "admin" password: "admin" ne vor conduce pe prima pagina pentru admin(admin_home.html)
	-> orice alte credentiale ne vor conduce pe pagina "home.html"
	-> aceasta separare este realizata cu ajutorul fisierului javscript: "login_register.tojs"
	-> css-ul aferent paginii acesteia este: "login_register.css"
	-> utilizatorii fara cont, nu pot trece de aceasta pagina
	
home.html:
	-> aceasta este pagina unde vor fi condusi userii logati
	-> navbarul contine:
		-> butonul "home" pentru "home.html"
		-> butonul "Watch List" pentru rubrica "watch list" din pagina "profile.html"
		-> butonul "Profile" pentru pagina care contine date despre utilizator
		-> un search bar pentru a cauta diferite filme, acesta inca nu functioneaza
	-> contine in partea stanga un "side-bar" cu genurile filmului, care sunt link-uri 
		pentru portiunile din pagina unde se afla acele filme.
	-> pentru fiecare gen sunt afisate o serie de filme intr-un grid. (acum sunt aceleasi filme la 
		fiecare gen, dar cand se va realiza baza de date, acestea se vor separa)
	-> fiecare film este compus dintr-o poza, titlu, gen, an aparitie.
	-> daca mergem cu mouse-ul pe imagine, vom vedea raitingul filmului si vom putea vedea un 
		semn de bookmark, care ne va permite sa adaugam filmul pe watch list (functionlitate care
		va fi ulterior adaugata).
	-> un click pe un film ne va conduce pe pagina de recenzie a acelui film (review.html)
	-> css-ul pentru aceasta pagina este "home.css"
	
review.html (este la fel pentru toate filmele, va fi schimbata odata cu aparitia bazei de date):
	-> aceasta pagina contine:
		-> imaginea de prezentare a filmului
		-> scurta prezentare
		-> trailer care este un iframe catre un video pe yt
		-> recenzii
		-> butonul pentru a scrie o recenzie
	-> css-ul: "review.css"
	
reviewForm.html:
	-> in aceasta pagina un user poate scrie un review pentru un anumit film si sa-i 
		atribuie un numar de stelute de la 1-5
	-> css-ul pentru aceasta pagina este: "reviewForm.css"
	-> fisierul javascript este: "reviewForm.tojs"
	
profile.html:
	-> aceasta pagina contine:
		-> navbarul
		-> username-ul si email-ul user-ului si un numar de puncte
		-> un buton de "edit profile" care ne va conduce catre fisierul "edit_credentials.html"
		-> rubrica Watch List care contine diferite filme pe care utilizatorul le-a salvat
	-> css-ul pentru aceasta pagina: "profile.css"
	
edit_credentials.html:
	-> aceasta este pagina unde utilizatorul poate sa isi modifice:
		-> parola
		-> mail-ul
		-> username-ul
		-> numele
	-> aceste modificari vor fi facute in urma verificarii anumitor conditii. Aceasta functionalitate
		va fi implementat ulterior
	-> fiecare modificare este un form separat si implica ca utilizatorul sa cunosca vechile date.
	-> css-ul pentru aceasta pagina este "edit_credentials.css"
	
Acestea au fost paginile pentru utilizatori, acum urmeaza cele pentru admin.

Repet, pentru a intra pe prima pagina a admin-ului, trebuie ca in pagina de login sa se introduca:
	-> username: admin
	-> password: admin
	
admin_home.html:
	-> contine:
		-> navbarul care la randul lui contine:
			-> butonul "Home" care ne va conduce catre "admin_home.html"
			-> butonul "Users" care ne va conduce catre "admin_useri.html"
			-> butonul "Reviews" care ne va conduce catre "admin_reviews.html"
			-> butonul "Add Movie" care ne va conduce catre "admin_movie.html"
		-> butonul "See Users" pentru "admin_useri.html"
		-> butonul "Manage Reviews" pentru "admin_reviews.html"
		-> butonul "Add Movie" pentru "admin_movie.html".
	-> css-ul este "admin.home.css"
		
admin_useri.html:
	-> contine:
		-> navbarul
		-> un tabel cu toti utilizatorii (id, email, nume, username, numarul de puncte)
	-> adminul v-a putea sterge contul unui utilizator
	-> acesta va putea adauga un utilizator
	-> css-ul este "admin_useri.css"
	
admin_reviews.html:
	-> contine:
		-> navbarul
		-> un tabel cu review-urile care asteapta sa fie validate de catre admin
	-> adminul poate sa valideze sau sa nu valideze review-urile scrise de utilizatori
	-> css-ul este "admin_reviews.css"
	
admin_movie.html:
	-> contine:
		-> navbarul
		-> un formular pentru adaugarea unui film
	-> css-ul este "admin_movie.css"