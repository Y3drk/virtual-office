# virtual-office

## Set up  

<b> Docker </b>  
1. <a href='https://docs.docker.com/get-docker/'> Zainstaluj dockera jeśli go nie posiadasz </a>  
2. Sklonuj projekt:  
a) ```git clone git@github.com:Y3drk/virtual-office.git``` Jeśli masz klucz ssh  
b) ```git clone https://github.com/Y3drk/virtual-office.git``` Jeśli nie masz klucza ssh  
3. Wejdź w root folder: ``` cd virtual-office ```  
4. Edytuj plik docker-compose.yml (np. ``` gedit docker-compose.yml ```)  
5. W części <b>backend</b> dodaj parametr <b>environment</b>(np. w 13 linijce pod parametrem <b>volumes</b>) a w nim: *- OPENAI_API_KEY=WartoscTwojegoKlucza*  
6. Wpisz w konsoli z poziomu root folderu ``` sudo docker-compose up ```
7. Aby skorzystać z aplikacji odpal *localhost:3000*  
8. Po zakończeniu pracy wpisz w konsoli ``` sudo docker-compose down ```

<b> Klasyczny sposób </b>
1. Upewnij się że masz <a href='https://github.blog/changelog/2022-10-24-npm-v9-0-0-released/'> npm wersje 9</a>(``` npm --v ```), przynajmniej 17 wersje <a href='https://www.oracle.com/java/technologies/javase/jdk17-archive-downloads.html'>javy</a>(``` java --version ```) oraz przynajmniej mavena 3.6.3(ta wersja instaluje się domyślnie po wykonaniu ``` sudo apt install maven ```)  
<b>1,5. Jednak nawet przy takim configu, mogą pojawić się problemy z odpaleniem backendu. Dlatego osobiście sugerujemy by zainstalować manualnie <a href='https://phoenixnap.com/kb/install-maven-on-ubuntu'>mavena 3.9</a> </b>  
2. Sklonuj projekt:  
a) ```git clone git@github.com:Y3drk/virtual-office.git``` Jeśli masz klucz ssh  
b) ```git clone https://github.com/Y3drk/virtual-office.git``` Jeśli nie masz klucza ssh  
3. Wejdź w root folder: ``` cd virtual-office ```  
4. Otwórz dwa okna konsoli z poziomu root folderu w jednej wpisz ``` cd backend ``` a w drugiej ``` cd frontend ```  
5. W folderze backend upewnij się ze masz ustawioną oczekiwaną wersje javy i mavena za pomocą komendy ``` mvn --v ```  
6. Pozostając na tej wysokości utwórz plik .env (``` touch .env ```) i zapisz w nim *OPENAI_API_KEY=WartoscTwojegoKlucza*  
7. Następnie odpal backend ``` mvn spring-boot:run ```  
8. W folderze frontend zainstaluj potrzebne paczki ``` npm install ```  
9. Następnie odpal frontend ``` npm start ```  
10. Aby skorzystać z aplikacji wejdź na *localhost:3000*  

## Opis

Projekt stworzony podczas hackathonu 02-03.04.2023, w ramach przedmiotu Inżynieria Oprogramowania.

## Autorzy

- [Andrzej Handzlik](https://github.com/andhandz)
- [Barbara Gaweł-Kucab](https://github.com/bgawkuc)
- [Jędrzej Ziebura](https://github.com/Y3drk)
- [Monika Pyrek](https://github.com/mpyrek)
- [Nikodem Korohoda](https://github.com/Loloxon)
- [Piotr Kowalczyk](https://github.com/pkowalczyk1)

## Linki

- [Raport z retro](/wiki/retro_raport.md)
- [Dokumentacja techniczna](./wiki/technology_stack.md)
