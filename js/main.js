// Laboratorium 6, 7: JavaScript dla funkcjonalności SPA (Single Page Application)
// Inicjalizacja aplikacji po załadowaniu DOM
// Laboratorium 12: wykorzystanie addEventListener do inicjalizacji aplikacji
document.addEventListener('DOMContentLoaded', () => {
    // Tworzenie i inicjalizacja głównej  aplikacji
    const app = new KalisthenicsApp();
    app.init();
});
// Laboratorium 12: klasa zarządzająca aplikacją
class KalisthenicsApp {
    constructor() {
        // Aktualnie wyświetlana sekcja
        this.currentSection = 'home';
        // Laboratorium 7: Aplikacja SPA (Single Page Application)
        // Obiekt zawierający szablony HTML dla wszystkich sekcji
        // Każda sekcja jest generowana przez odpowiednią metodę
        this.sections = {
            home: this.getHomeSection(),
            exercises: this.getExercisesSection(),
            plan: this.getPlanSection(),
            store: this.getStoreSection(),
            about: this.getAboutSection(),
            contact: this.getContactSection()
        };
    }

    /**
     * Inicjalizacja aplikacji - konfiguracja event listenerów i początkowego stanu
     */
    init() {
        // Laboratorium 7: Obsługa nawigacji
        // Nasłuchiwanie kliknięć na linki w menu głównym
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault(); // Zapobieganie domyślnej akcji linku
                const section = e.target.getAttribute('data-section');
                this.navigateTo(section); // Przejście do wybranej sekcji
            });
        });

        // Obsługa przycisków nawigacyjnych na stronie głównej
        document.querySelectorAll('.nav-trigger').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const section = e.target.getAttribute('data-section');
                this.navigateTo(section);
            });
        });

        // Przełącznik menu mobilnego - pokazuje/ukrywa menu na małych ekranach
        document.querySelector('.mobile-menu-btn').addEventListener('click', () => {
            document.querySelector('.main-menu').classList.toggle('active');
        });

        // Obsługa przycisków wstecz/dalej przeglądarki
        // Pozwala na nawigację historią przeglądarki
        window.addEventListener('popstate', (e) => {
            const section = window.location.hash.substring(1) || 'home';
            this.navigateTo(section);
        });

        // Inicjalizacja menedżera koszyka - obsługa zakupów
        this.cartManager = new CartManager();

        // Wczytanie początkowej sekcji na podstawie hasha URL lub domyślnie home
        // Pozwala na bezpośrednie wejście na konkretną sekcję
        const initialSection = window.location.hash.substring(1) || 'home';
        this.navigateTo(initialSection);
    }

    navigateTo(section) {
        // Aktualizacja aktualnej sekcji
        this.currentSection = section;

        // Aktualizacja hasha URL
        window.history.pushState({}, '', `#${section}`);

        // Aktualizacja aktywnego linku
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-section') === section) {
                link.classList.add('active');
            }
        });

        // Laboratorium 6: Wykorzystanie getElementById - aktualizacja zawartości
        document.getElementById('app-content').innerHTML = this.sections[section];

        // Konfiguracja funkcjonalności specyficznej dla sekcji
        // Np. inicjalizacja formularzy, obsługa koszyka, itp.
        this.setupSectionFunctionality(section);
    }

    setupSectionFunctionality(section) {
        switch(section) {
            case 'exercises':
                this.setupExerciseDetails(); // Inicjalizacja szczegółów ćwiczeń
                break;
            case 'plan':
                this.setupPlanForm(); // Konfiguracja formularza planu
                break;
            case 'store':
                this.setupStore(); // Inicjalizacja sklepu i koszyka
                break;
            case 'contact':
                this.setupContactForm(); // Konfiguracja formularza kontaktowego
                break;
        }
    }

    getHomeSection() {
        return `
            <section class="hero" id="home">
                <div class="hero-content">
                    <h1>Odkryj Moc Kalisteniki</h1>
                    <p class="hero-subtitle">Trenuj z nami, wykorzystując tylko ciężar własnego ciała, aby osiągnąć niesamowite rezultaty</p>
                    <div class="hero-buttons">
                        <a href="#exercises" class="btn nav-trigger" data-section="exercises">
                            <i class="fas fa-dumbbell"></i>
                            Poznaj Ćwiczenia
                        </a>
                        <a href="#plan" class="btn btn-outline nav-trigger" data-section="plan">
                            <i class="fas fa-clipboard-list"></i>
                            Stwórz Plan
                        </a>
                    </div>
                </div>
            </section>
            
            <section class="features">
                <div class="container">
                    <h2 class="section-title">Dlaczego Kalistenika?</h2>
                    <div class="features-grid">
                        <div class="feature-card">
                            <div class="feature-icon">
                                <i class="fas fa-dumbbell"></i>
                            </div>
                            <h3>Wszechstronność</h3>
                            <p>Kalistenika rozwija siłę, wytrzymałość, gibkość, koordynację, równowagę i zwinność</p>
                        </div>
                        <div class="feature-card">
                            <div class="feature-icon">
                                <i class="fas fa-home"></i>
                            </div>
                            <h3>Minimalne wymagania</h3>
                            <p>Trenuj wszędzie - w domu, parku czy na plaży, bez potrzeby kupowania drogiego sprzętu</p>
                        </div>
                        <div class="feature-card">
                            <div class="feature-icon">
                                <i class="fas fa-bolt"></i>
                            </div>
                            <h3>Efektywność</h3>
                            <p>Angażuj wiele grup mięśniowych jednocześnie, osiągając lepsze rezultaty w krótszym czasie</p>
                        </div>
                    </div>
                </div>
            </section>

            <section class="benefits">
                <div class="container">
                    <h2 class="section-title">Korzyści z Treningu</h2>
                    <div class="benefits-grid">
                        <div class="benefit-item">
                            <i class="fas fa-heartbeat"></i>
                            <h3>Zdrowie</h3>
                            <p>Poprawa kondycji, wzmocnienie serca i układu krążenia</p>
                        </div>
                        <div class="benefit-item">
                            <i class="fas fa-brain"></i>
                            <h3>Koncentracja</h3>
                            <p>Lepsza koordynacja ruchowa i świadomość ciała</p>
                        </div>
                        <div class="benefit-item">
                            <i class="fas fa-weight"></i>
                            <h3>Siła</h3>
                            <p>Zwiększenie siły funkcjonalnej i wytrzymałości</p>
                        </div>
                        <div class="benefit-item">
                            <i class="fas fa-smile"></i>
                            <h3>Samopoczucie</h3>
                            <p>Redukcja stresu i poprawa nastroju</p>
                        </div>
                    </div>
                </div>
            </section>

            <section class="cta-section">
                <div class="container">
                    <div class="cta-content">
                        <h2>Gotowy na Zmianę?</h2>
                        <p>Rozpocznij swoją przygodę z kalisteniką już dziś!</p>
                        <div class="cta-buttons">
                            <a href="#exercises" class="btn nav-trigger" data-section="exercises">
                                <i class="fas fa-play"></i>
                                Rozpocznij Trening
                            </a>
                            <a href="#store" class="btn btn-outline nav-trigger" data-section="store">
                                <i class="fas fa-shopping-cart"></i>
                                Sprawdź Sprzęt
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            <section class="testimonials">
                <div class="container">
                    <h2 class="section-title">Co Mówią Nasi Trenujący</h2>
                    <div class="testimonials-grid">
                        <div class="testimonial-card">
                            <div class="testimonial-content">
                                <i class="fas fa-quote-left"></i>
                                <p>Dzięki kalistenice zbudowałem siłę i wytrzymałość, o jaką nigdy nie podejrzewałbym swojego ciała.</p>
                            </div>
                            <div class="testimonial-author">
                                <h4>Marek K.</h4>
                                <p>Trenuje od 2 lat</p>
                            </div>
                        </div>
                        <div class="testimonial-card">
                            <div class="testimonial-content">
                                <i class="fas fa-quote-left"></i>
                                <p>Najlepsza decyzja w moim życiu! Treningi są wymagające, ale efekty są niesamowite.</p>
                            </div>
                            <div class="testimonial-author">
                                <h4>Anna W.</h4>
                                <p>Trenuje od 1 roku</p>
                            </div>
                        </div>
                        <div class="testimonial-card">
                            <div class="testimonial-content">
                                <i class="fas fa-quote-left"></i>
                                <p>Kalistenika to nie tylko trening, to styl życia. Polecam każdemu!</p>
                            </div>
                            <div class="testimonial-author">
                                <h4>Piotr M.</h4>
                                <p>Trenuje od 3 lat</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        `;
    }

    getExercisesSection() {
        return `
            <section class="exercises" id="exercises">
                <div class="container">
                    <h2 class="section-title">Podstawowe Ćwiczenia</h2>
                    <div class="exercise-grid" id="exerciseGrid">
                        <!-- Ćwiczenia będą wczytane tutaj -->
                    </div>
                </div>
            </section>
        `;
    }
    // Laboratorium 4: Tworzenie formularza
    getPlanSection() {
        return `
            <section class="training-plan" id="plan">
                <div class="container">
                    <h2 class="section-title">Stwórz Swój Plan Treningowy</h2>
                    <div class="form-container">
                        <form id="trainingPlanForm" class="fancy-form">
                            <div class="form-header">
                                <h3>Personalizacja Planu</h3>
                                <p>Wypełnij formularz, aby otrzymać spersonalizowany plan treningowy</p>
                            </div>
                            
                            <div class="form-group">
                                <label for="name">Imię i Nazwisko</label>
                                <div class="input-wrapper">
                                    <i class="fas fa-user"></i>
                                    <input type="text" id="name" name="name" class="form-control" required pattern="[A-Za-zĄąĆćĘęŁłŃńÓóŚśŹźŻż ]{3,50}" title="Imię i nazwisko powinno zawierać od 3 do 50 znaków" placeholder="np. Jan Kowalski">
                                </div>
                                <div class="error-message" id="nameError">Proszę podać poprawne imię i nazwisko</div>
                            </div>
                            
                            <div class="form-group">
                                <label for="email">Email</label>
                                <div class="input-wrapper">
                                    <i class="fas fa-envelope"></i>
                                    <input type="email" id="email" name="email" class="form-control" required placeholder="np. jan.kowalski@email.com">
                                </div>
                                <div class="error-message" id="emailError">Proszę podać poprawny adres email</div>
                            </div>
                            
                            <div class="form-group">
                                <label for="age">Wiek</label>
                                <div class="input-wrapper">
                                    <i class="fas fa-birthday-cake"></i>
                                    <input type="number" id="age" name="age" class="form-control" required min="16" max="80" placeholder="np. 25">
                                </div>
                                <div class="error-message" id="ageError">Wiek musi być między 16 a 80 lat</div>
                            </div>
                            
                            <div class="form-group">
                                <label>Poziom zaawansowania</label>
                                <div class="radio-group-container">
                                    <div class="radio-group">
                                        <input type="radio" id="beginner" name="level" value="beginner" checked>
                                        <label for="beginner">
                                            <i class="fas fa-star"></i>
                                            Początkujący
                                        </label>
                                    </div>
                                    <div class="radio-group">
                                        <input type="radio" id="intermediate" name="level" value="intermediate">
                                        <label for="intermediate">
                                            <i class="fas fa-star"></i>
                                            <i class="fas fa-star"></i>
                                            Średniozaawansowany
                                        </label>
                                    </div>
                                    <div class="radio-group">
                                        <input type="radio" id="advanced" name="level" value="advanced">
                                        <label for="advanced">
                                            <i class="fas fa-star"></i>
                                            <i class="fas fa-star"></i>
                                            <i class="fas fa-star"></i>
                                            Zaawansowany
                                        </label>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="form-group">
                                <label>Cel treningowy</label>
                                <div class="checkbox-group-container">
                                    <div class="checkbox-group">
                                        <input type="checkbox" id="strength" name="goals" value="strength">
                                        <label for="strength">
                                            <i class="fas fa-dumbbell"></i>
                                            Siła
                                        </label>
                                    </div>
                                    <div class="checkbox-group">
                                        <input type="checkbox" id="endurance" name="goals" value="endurance">
                                        <label for="endurance">
                                            <i class="fas fa-heartbeat"></i>
                                            Wytrzymałość
                                        </label>
                                    </div>
                                    <div class="checkbox-group">
                                        <input type="checkbox" id="flexibility" name="goals" value="flexibility">
                                        <label for="flexibility">
                                            <i class="fas fa-child"></i>
                                            Gibkość
                                        </label>
                                    </div>
                                    <div class="checkbox-group">
                                        <input type="checkbox" id="weightloss" name="goals" value="weightloss">
                                        <label for="weightloss">
                                            <i class="fas fa-weight"></i>
                                            Redukcja tkanki tłuszczowej
                                        </label>
                                    </div>
                                </div>
                                <div class="error-message" id="goalsError">Wybierz przynajmniej jeden cel</div>
                            </div>
                            
                            <div class="form-group">
                                <label for="days">Ile dni w tygodniu możesz trenować?</label>
                                <div class="input-wrapper">
                                    <i class="fas fa-calendar-alt"></i>
                                    <select id="days" name="days" class="form-control" required>
                                        <option value="">Wybierz ilość dni</option>
                                        <option value="2">2 dni</option>
                                        <option value="3">3 dni</option>
                                        <option value="4">4 dni</option>
                                        <option value="5">5 dni</option>
                                        <option value="6">6 dni</option>
                                    </select>
                                </div>
                                <div class="error-message" id="daysError">Wybierz ilość dni treningowych</div>
                            </div>
                            
                            <div class="form-group">
                                <label for="comments">Dodatkowe informacje</label>
                                <div class="input-wrapper">
                                    <i class="fas fa-comment-alt"></i>
                                    <textarea id="comments" name="comments" class="form-control" rows="4"></textarea>
                                </div>
                            </div>
                            
                            <button type="submit" class="btn submit-btn">
                                <i class="fas fa-paper-plane"></i>
                                Utwórz Plan
                            </button>
                        </form>
                    </div>
                </div>
            </section>
        `;
    }

    getStoreSection() {
        return `
            <section class="store" id="store">
                <div class="container">
                    <h2 class="section-title">Sklep z Akcesoriami do Kalisteniki</h2>
                    
                    <div class="products">
                        <div class="product-card">
                            <img src="images/drazek.png" alt="Drążek do podciągania">
                            <div class="product-content">
                                <h3 class="product-title">Drążek do podciągania</h3>
                                <p class="product-description">Solidny drążek montowany w framudze drzwi</p>
                                <p class="product-price">149 zł</p>
                                <button class="add-to-cart" data-id="1" data-name="Drążek do podciągania" data-price="149">Dodaj do koszyka</button>
                            </div>
                        </div>
                        
                        <div class="product-card">
                            <img src="images/porecze.jpg" alt="Poręcze do dipów">
                            <div class="product-content">
                                <h3 class="product-title">Poręcze do dipów</h3>
                                <p class="product-description">Regulowane poręcze do ćwiczeń kalistenicznych</p>
                                <p class="product-price">199 zł</p>
                                <button class="add-to-cart" data-id="2" data-name="Poręcze do dipów" data-price="199">Dodaj do koszyka</button>
                            </div>
                        </div>
                        
                        <div class="product-card">
                            <img src="images/gumy.jpg" alt="Gumy oporowe">
                            <div class="product-content">
                                <h3 class="product-title">Gumy oporowe (set)</h3>
                                <p class="product-description">Zestaw 5 gum o różnej oporności</p>
                                <p class="product-price">129 zł</p>
                                <button class="add-to-cart" data-id="3" data-name="Gumy oporowe (set)" data-price="129">Dodaj do koszyka</button>
                            </div>
                        </div>
                        
                        <div class="product-card">
                            <img src="images/rekawiczki.jpg" alt="Rękawiczki treningowe">
                            <div class="product-content">
                                <h3 class="product-title">Rękawiczki treningowe</h3>
                                <p class="product-description">Rękawiczki chroniące dłonie podczas treningu</p>
                                <p class="product-price">59 zł</p>
                                <button class="add-to-cart" data-id="4" data-name="Rękawiczki treningowe" data-price="59">Dodaj do koszyka</button>
                            </div>
                        </div>
                    </div>
                    
                    <div class="cart-section">
                        <h3>Twój Koszyk</h3>
                        <div id="cart-items"></div>
                        <div class="cart-total">Razem: <span id="cart-total-amount">0</span> zł</div>
                        <button id="checkout" class="btn">Złóż zamówienie</button>
                    </div>
                </div>
            </section>
        `;
    }
// Laboratorium 3: Tworzenie galerii
    getAboutSection() {
        return `
            <section class="about" id="about">
                <div class="container">
                    <h2 class="section-title">O Nas</h2>
                    <div class="about-content">
                        <div class="about-text">
                            <h3>KaliPower - Pasja do Kalisteniki</h3>
                            <p>Jesteśmy zespołem pasjonatów kalisteniki, którzy od lat praktykują i uczą tej formy treningu. Nasza przygoda z treningiem opartym o ciężar własnego ciała zaczęła się ponad 10 lat temu, a dziś dzielimy się naszą wiedzą i doświadczeniem.</p>
                            <p>Naszą misją jest promowanie kalisteniki jako dostępnej dla wszystkich, naturalnej formy aktywności fizycznej, która nie wymaga specjalistycznego sprzętu ani siłowni. Wierzymy, że ciało ludzkie samo w sobie jest doskonałym narzędziem treningowym.</p>
                            <p>Organizujemy warsztaty, zawody i obozy treningowe w całej Polsce. Jeśli chcesz dołączyć do naszej społeczności, śledź nas w mediach społecznościowych lub zapisz się na newsletter.</p>
                        </div>
                        <div class="about-gallery">
                            <h3>Nasza Galeria</h3>
                            <div class="gallery-grid">
                                <a href="images/naswiezym.jpg" data-lightbox="about-gallery" data-title="Trening na świeżym powietrzu">
                                    <img src="images/naswiezym.jpg" alt="Trening na świeżym powietrzu" />
                                </a>
                                <a href="images/warsztaty.jpg" data-lightbox="about-gallery" data-title="Warsztaty kalisteniczne">
                                    <img src="images/warsztaty.jpg" alt="Warsztaty kalisteniczne" />
                                </a>
                                <a href="images/zawody.jpg" data-lightbox="about-gallery" data-title="Zawody kalisteniczne">
                                    <img src="images/zawody.jpg" alt="Zawody kalisteniczne" />
                                </a>
                                <a href="images/grupowy.jpg" data-lightbox="about-gallery" data-title="Trening grupowy">
                                    <img src="images/grupowy.jpg" alt="Trening grupowy" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        `;
    }

    getContactSection() {
        return `
            <section class="contact" id="contact">
                <div class="container">
                    <h2 class="section-title">Kontakt</h2>
                    <div class="contact-content">
                        <div class="contact-info">
                            <h3>Dane Kontaktowe</h3>
                            <p><i class="fas fa-envelope"></i> Email: kontakt@kalipower.pl</p>
                            <p><i class="fas fa-phone"></i> Telefon: +48 123 456 789</p>
                            <p><i class="fas fa-map-marker-alt"></i> Adres: ul. Nadbystrzycka 38D, 20-618 Lublin</p>
                            
                            <h3>Godziny Otwarcia</h3>
                            <p><i class="fas fa-clock"></i> Poniedziałek - Piątek: 8:00 - 21:00</p>
                            <p><i class="fas fa-clock"></i> Sobota: 10:00 - 18:00</p>
                            <p><i class="fas fa-clock"></i> Niedziela: 10:00 - 16:00</p>
                            
                            <h3>Znajdź Nas</h3>
                            <div class="map-container"> <!-- Laboratorium 11: wykorzystanie wyświetlania mapy w aplikacji -->
                                <iframe 
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2496.1234567890123!2d22.5489!3d51.2345!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x472257e7c0c1c8c7%3A0x1c3c3c3c3c3c3c3c!2sPolitechnika%20Lubelska!5e0!3m2!1spl!2spl!4v1234567890!5m2!1spl!2spl" 
                                    width="100%" 
                                    height="450" 
                                    style="border:0;" 
                                    allowfullscreen="" 
                                    loading="lazy" 
                                    referrerpolicy="no-referrer-when-downgrade">
                                </iframe>
                            </div>
                        </div>
                        
                        <div class="contact-form">
                            <h3>Napisz do Nas</h3>
                            <form id="contactForm" class="fancy-form">
                                <div class="form-group">
                                    <label for="contactName">Imię i Nazwisko</label>
                                    <div class="input-wrapper">
                                        <i class="fas fa-user"></i>
                                        <input type="text" id="contactName" name="name" class="form-control" required pattern="[A-Za-zĄąĆćĘęŁłŃńÓóŚśŹźŻż ]{3,50}" title="Imię i nazwisko powinno zawierać od 3 do 50 znaków" placeholder="np. Jan Kowalski">
                                    </div>
                                    <div class="error-message" id="contactNameError">Proszę podać poprawne imię i nazwisko</div>
                                </div>
                                
                                <div class="form-group">
                                    <label for="contactEmail">Email</label>
                                    <div class="input-wrapper">
                                        <i class="fas fa-envelope"></i>
                                        <input type="email" id="contactEmail" name="email" class="form-control" required placeholder="np. jan.kowalski@email.com">
                                    </div>
                                    <div class="error-message" id="contactEmailError">Proszę podać poprawny adres email</div>
                                </div>
                                
                                <div class="form-group">
                                    <label for="subject">Temat</label>
                                    <div class="input-wrapper">
                                        <i class="fas fa-heading"></i>
                                        <input type="text" id="subject" name="subject" class="form-control" required placeholder="np. Zapytanie o treningi">
                                    </div>
                                    <div class="error-message" id="subjectError">Proszę podać temat wiadomości</div>
                                </div>
                                
                                <div class="form-group">
                                    <label for="message">Wiadomość</label>
                                    <div class="input-wrapper">
                                        <i class="fas fa-comment-alt"></i>
                                        <textarea id="message" name="message" class="form-control" rows="5" required placeholder="np. Chciałbym/chciałabym zapytać o możliwość uczestnictwa w treningach..."></textarea>
                                    </div>
                                    <div class="error-message" id="messageError">Proszę wpisać treść wiadomości</div>
                                </div>
                                
                                <button type="submit" class="btn submit-btn">
                                    <i class="fas fa-paper-plane"></i>
                                    Wyślij
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        `;
    }

    setupExerciseDetails() {
        // Tablica z danymi ćwiczeń - w prawdziwej aplikacji mogłyby być pobierane z API
        const exercises = [
            {
                id: 1,
                name: 'Pompki',
                level: 'początkujący',
                description: 'Podstawowe ćwiczenie kalisteniczne rozwijające górne partie ciała.',
                technique: 'Przyjmij pozycję deski, ręce na szerokość barków. Opuść ciało, zginając ręce w łokciach, a następnie wypchnij się z powrotem do góry.',
                muscles: 'Klatka piersiowa, tricepsy, mięśnie naramienne, core',
                reps: '3 serie po 10-15 powtórzeń',
                videoId: 'IODxDxX7oi4' // ID filmu z YouTube
            },
            {
                id: 2,
                name: 'Przysiady',
                level: 'początkujący',
                description: 'Doskonałe ćwiczenie na dolne partie ciała.',
                technique: 'Stań w rozkroku na szerokość bioder, opuść biodra, zginając kolana, a następnie wróć do pozycji początkowej.',
                muscles: 'Uda, pośladki, mięśnie łydek',
                reps: '3 serie po 15-20 powtórzeń',
                videoId: 'gsNoPYwWXeM'
            },
            {
                id: 3,
                name: 'Podciąganie',
                level: 'średniozaawansowany',
                description: 'Jedno z najbardziej efektywnych ćwiczeń górnej części ciała.',
                technique: 'Chwyć drążek nachwytem na szerokość barków, podciągnij ciało w górę, aż broda znajdzie się ponad drążkiem, następnie opuść się kontrolowanie.',
                muscles: 'Plecy, bicepsy, przedramiona',
                reps: '3 serie po 5-10 powtórzeń',
                videoId: 'eGo4IYlbE5g'
            },
            {
                id: 4,
                name: 'Dipy (pompki na poręczach)',
                level: 'średniozaawansowany',
                description: 'Świetne ćwiczenie na klatkę piersiową i tricepsy.',
                technique: 'Trzymając się poręczy, opuść ciało zginając ręce w łokciach, a następnie wypchnij się z powrotem do góry.',
                muscles: 'Klatka piersiowa, tricepsy, mięśnie naramienne',
                reps: '3 serie po 8-12 powtórzeń',
                videoId: '2z8JmcrW-As'
            },
            {
                id: 5,
                name: 'Plank',
                level: 'początkujący',
                description: 'Izometryczne ćwiczenie wzmacniające core.',
                technique: 'Przyjmij pozycję jak do pompki, ale oprzyj się na przedramionach. Utrzymuj ciało w linii prostej.',
                muscles: 'Core, mięśnie brzucha, mięśnie grzbietu',
                reps: '3 serie po 30-60 sekund',
                videoId: 'pSHjTRCQxIw'
            },
            {
                id: 6,
                name: 'Muscle Up',
                level: 'zaawansowany',
                description: 'Zaawansowane ćwiczenie łączące podciągnięcie z dipem.',
                technique: 'Rozpocznij od podciągnięcia, następnie wykonaj energiczny ruch, aby wyjść ponad drążek i zakończ wyprostowaniem rąk.',
                muscles: 'Plecy, klatka piersiowa, tricepsy, bicepsy, mięśnie naramienne',
                reps: '3 serie po 3-5 powtórzeń',
                videoId: '_iYvlSMgUGE'
            }
        ];
        
        // Generowanie kart ćwiczeń w siatce
        const exerciseGrid = document.getElementById('exerciseGrid');
        if (exerciseGrid) {
            exerciseGrid.innerHTML = ''; // Czyszczenie siatki
            
            // Tworzenie kart dla każdego ćwiczenia
            exercises.forEach(exercise => {
                const card = document.createElement('div');
                card.className = 'exercise-card';
                // Generowanie HTML karty ćwiczenia
                card.innerHTML = `
                    <div class="exercise-img">
                        <img src="images/${exercise.name}.jpg" alt="${exercise.name}">
                    </div>
                    <div class="exercise-content">
                        <h3>${exercise.name}</h3>
                        <p class="exercise-level">Poziom: ${exercise.level}</p>
                        <p class="exercise-description">${exercise.description}</p>
                        <button class="btn exercise-details-btn" data-id="${exercise.id}">Szczegóły</button>
                    </div>
                `;
                exerciseGrid.appendChild(card);
            });
            
            // Dodanie obsługi przycisków szczegółów - otwieranie modali
            document.querySelectorAll('.exercise-details-btn').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const id = parseInt(e.target.dataset.id);
                    const exercise = exercises.find(ex => ex.id === id);
                    
                    // Create modal overlay
                    const modal = document.createElement('div');
                    modal.className = 'exercise-modal-overlay';
                    
                    modal.innerHTML = `
                        <div class="exercise-modal">
                            <button class="close-modal">&times;</button>
                            <div class="exercise-modal-content">
                                <h2>${exercise.name}</h2>
                                <div class="exercise-details-grid">
                                    <div class="exercise-info">
                                        <div class="info-section">
                                            <h3>Poziom</h3>
                                            <p>${exercise.level}</p>
                                        </div>
                                        <div class="info-section">
                                            <h3>Opis</h3>
                                            <p>${exercise.description}</p>
                                        </div>
                                        <div class="info-section">
                                            <h3>Technika wykonania</h3>
                                            <p>${exercise.technique}</p>
                                        </div>
                                        <div class="info-section">
                                            <h3>Zaangażowane mięśnie</h3>
                                            <p>${exercise.muscles}</p>
                                        </div>
                                        <div class="info-section">
                                            <h3>Zalecane powtórzenia</h3>
                                            <p>${exercise.reps}</p>
                                        </div>
                                    </div>
                                    <div class="exercise-video">
                                        <iframe 
                                            width="100%" 
                                            height="315" 
                                            src="https://www.youtube.com/embed/${exercise.videoId}" 
                                            title="YouTube video player" 
                                            frameborder="0" 
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                            allowfullscreen>
                                        </iframe>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `;
                    
                    document.body.appendChild(modal);
                    document.body.style.overflow = 'hidden'; // Zapobiega przewijaniu po otwarciu modala
                    
                    // Funkcjonalność zamykania modala
                    const closeBtn = modal.querySelector('.close-modal');
                    closeBtn.addEventListener('click', () => {
                        document.body.removeChild(modal);
                        document.body.style.overflow = ''; // Przywraca przewijanie
                    });
                });
            });
        }
    }

    setupPlanForm() {
        // Laboratorium 4 & Laboratorium 8: Walidacja formularza
        const form = document.getElementById('trainingPlanForm');
        
        if (form) { // Laboratorium 7: Wykorzystanie submit eventu
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                
                // Walidacja formularza
                if (this.validatePlanForm()) {
                    // Laboratorium 6: Wykorzystanie .value - pobranie danych z formularza
                    const formData = {
                        name: document.getElementById('name').value,
                        email: document.getElementById('email').value,
                        age: document.getElementById('age').value,
                        level: document.querySelector('input[name="level"]:checked').value,
                        goals: Array.from(document.querySelectorAll('input[name="goals"]:checked')).map(cb => cb.value),
                        days: document.getElementById('days').value,
                        comments: document.getElementById('comments').value
                    };
                    
                    // Wyświetlenie komunikatu
                    alert(`Dziękujemy ${formData.name}! Twój spersonalizowany plan treningowy zostanie wysłany na adres: ${formData.email}`);
                    
                    // Przekierowanie na stronę główną
                    this.navigateTo('home');
                }
            });
        }
    }
    // Laboratorium 8: Walidacja formularza planu treningowego
    validatePlanForm() {
        // Walidacja formularza planu treningowego
        let isValid = true;
        
        // Walidacja imienia i nazwiska - sprawdzenie poprawności i długości
        const name = document.getElementById('name');
        const nameError = document.getElementById('nameError');
        if (!name.validity.valid) {
            nameError.style.display = 'block';
            isValid = false;
        } else {
            nameError.style.display = 'none';
        }
        
        // Walidacja emaila - sprawdzenie formatu
        const email = document.getElementById('email');
        const emailError = document.getElementById('emailError');
        if (!email.validity.valid) {
            emailError.style.display = 'block';
            isValid = false;
        } else {
            emailError.style.display = 'none';
        }
        
        // Walidacja wieku - sprawdzenie zakresu
        const age = document.getElementById('age');
        const ageError = document.getElementById('ageError');
        if (!age.validity.valid) {
            ageError.style.display = 'block';
            isValid = false;
        } else {
            ageError.style.display = 'none';
        }
        
        // Walidacja celów - sprawdzenie czy wybrano przynajmniej jeden
        const goals = document.querySelectorAll('input[name="goals"]:checked');
        const goalsError = document.getElementById('goalsError');
        if (goals.length === 0) {
            goalsError.style.display = 'block';
            isValid = false;
        } else {
            goalsError.style.display = 'none';
        }
        
        // Walidacja dni treningowych - sprawdzenie czy wybrano
        const days = document.getElementById('days');
        const daysError = document.getElementById('daysError');
        if (!days.value) {
            daysError.style.display = 'block';
            isValid = false;
        } else {
            daysError.style.display = 'none';
        }
        
        return isValid;
    }
    
    setupStore() {
        // Konfiguracja przycisków dodawania do koszyka
        document.querySelectorAll('.add-to-cart').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const productId = parseInt(e.target.dataset.id);
                const productName = e.target.dataset.name;
                const productPrice = parseFloat(e.target.dataset.price);
                
                this.cartManager.addToCart({
                    id: productId,
                    name: productName,
                    price: productPrice,
                    quantity: 1
                });
            });
        });
        
        // Konfiguracja przycisku zamówienia
        document.getElementById('checkout').addEventListener('click', (e) => {
            e.preventDefault();
            this.cartManager.checkout();
        });

        // Wczytanie koszyka przy ładowaniu strony
        this.cartManager.updateCartDisplay();
    }

    setupMap() {
        // Laboratorium 11: Geolokalizacja z Google Maps
        const mapElement = document.getElementById('map');
        
        if (mapElement) {
            // Ponieważ nie możemy użyć prawdziwego API Google Maps, tworzymy placeholder
            mapElement.innerHTML = `
                <div style="background-color: #eee; color: #333; height: 100%; display: flex; align-items: center; justify-content: center; border-radius: 8px;">
                    <div style="text-align: center;">
                        <p style="font-weight: bold;">Mapa - Znajdź nas</p>
                        <p>ul. Sportowa 15, 00-001 Warszawa</p>
                        <p><em>Tutaj byłaby prawdziwa mapa Google Maps</em></p>
                    </div>
                </div>
            `;
            
            // To jest placeholder dla geolokalizacji
            this.setupGeolocation();
        }
    }

    setupGeolocation() {
        // Laboratorium 11: API Geolokalizacji
        if ('geolocation' in navigator) {
            // To normalnie pobierałoby lokalizację użytkownika
            console.log('Geolokalizacja jest dostępna');
            
            // W prawdziwej aplikacji używalibyśmy:
            /*
            navigator.geolocation.getCurrentPosition(position => {
                const userLatitude = position.coords.latitude;
                const userLongitude = position.coords.longitude;
                
                // I następnie używalibyśmy tych współrzędnych z API Google Maps
                console.log(`Lokalizacja użytkownika: ${userLatitude}, ${userLongitude}`);
            });
            */
        } else {
            console.log('Geolokalizacja nie jest dostępna w tej przeglądarce');
        }
    }

    setupContactForm() {
        // Konfiguracja formularza kontaktowego
        const form = document.getElementById('contactForm');
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                if (this.validateContactForm()) {
                    // Pobranie danych z formularza
                    const formData = {
                        name: document.getElementById('contactName').value,
                        email: document.getElementById('contactEmail').value,
                        subject: document.getElementById('subject').value,
                        message: document.getElementById('message').value
                    };
                    
                    // Wyświetlenie komunikatu z danymi
                    alert(`Dziękujemy ${formData.name} za wiadomość! Temat: ${formData.subject}. Odpowiemy na adres: ${formData.email}.`);
                    
                    // Laboratorium 7: Resetowanie formularza
                    form.reset();
                }
            });
        }
    }

    validateContactForm() {
        // Laboratorium 8: Walidacja formularza kontaktowego
        let isValid = true;

        const name = document.getElementById('contactName');
        const email = document.getElementById('contactEmail');
        const subject = document.getElementById('subject');
        const message = document.getElementById('message');

        // Walidacja imienia i nazwiska
        if (!name.validity.valid) {
            document.getElementById('contactNameError').style.display = 'block';
            isValid = false;
        } else {
            document.getElementById('contactNameError').style.display = 'none';
        }

        // Walidacja emaila
        if (!email.validity.valid) {
            document.getElementById('contactEmailError').style.display = 'block';
            isValid = false;
        } else {
            document.getElementById('contactEmailError').style.display = 'none';
        }

        // Walidacja tematu
        if (!subject.value.trim()) {
            document.getElementById('subjectError').style.display = 'block';
            isValid = false;
        } else {
            document.getElementById('subjectError').style.display = 'none';
        }

        // Walidacja wiadomości
        if (!message.value.trim()) {
            document.getElementById('messageError').style.display = 'block';
            isValid = false;
        } else {
            document.getElementById('messageError').style.display = 'none';
        }

        return isValid;
    }

    isValidEmail(email) {
        // Laboratorium 4: Wyrażenie regularne do walidacji emaila
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
}

// Laboratorium 11: Menedżer koszyka z localStorage
// Laboratorium 12: klasa zarządzająca koszykiem zakupowym, programowanie obiektowe w js
class CartManager {
    constructor() {
        // Inicjalizacja koszyka
        this.cartItems = [];
        this.loadCart(); // Wczytanie zapisanych produktów z localStorage
        this.updateCartCount();
    }
    
    /**
     * Laboratorium 11: Wczytanie koszyka z localStorage
     */
    loadCart() {
        const cartData = localStorage.getItem('cart');
        if (cartData) {
            this.cartItems = JSON.parse(cartData);
        }
    }
    
    /**
     * Laboratorium 11: Zapisywanie koszyka do localStorage
     */
    saveCart() {
        localStorage.setItem('cart', JSON.stringify(this.cartItems));
        this.updateCartCount();
    }
    
    addToCart(product) {
        // Sprawdzenie czy produkt już jest w koszyku
        const existingItem = this.cartItems.find(item => item.id === product.id);
        
        if (existingItem) {
            existingItem.quantity += 1; // Zwiększenie ilości
        } else {
            this.cartItems.push(product); // Dodanie nowego produktu
        }
        
        this.saveCart();
        this.updateCartDisplay();
    }
    
    removeFromCart(productId) {
        // Usuwanie produktu z koszyka
        this.cartItems = this.cartItems.filter(item => item.id !== productId);
        this.saveCart();
        this.updateCartDisplay();
    }
    
    updateQuantity(productId, quantity) {
        // Aktualizacja ilości produktu
        const item = this.cartItems.find(item => item.id === productId);
        if (item) {
            item.quantity = quantity;
            this.saveCart();
            this.updateCartDisplay();
        }
    }
    
    clearCart() {
        // Czyszczenie koszyka
        this.cartItems = [];
        this.saveCart();
        this.updateCartDisplay();
    }
    
    getTotalPrice() {
        // Obliczanie całkowitej ceny
        return this.cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    }
    
    updateCartCount() {
        // Aktualizacja licznika produktów w koszyku
        const cartCount = document.getElementById('cart-count');
        const navbarCartCount = document.querySelector('.cart-count');
        const count = this.cartItems.reduce((total, item) => total + item.quantity, 0);
        
        if (cartCount) {
            cartCount.textContent = count;
        }
        if (navbarCartCount) {
            navbarCartCount.textContent = count;
        }
    }
    
    updateCartDisplay() {
        // Aktualizacja wyświetlania koszyka
        const cartItems = document.getElementById('cart-items');
        const cartTotal = document.getElementById('cart-total-amount');
        
        if (!cartItems) return;
        
        if (this.cartItems.length === 0) {
            cartItems.innerHTML = '<p>Twój koszyk jest pusty</p>';
        } else {
            cartItems.innerHTML = '';
            let total = 0;
            
            this.cartItems.forEach(item => {
                const itemTotal = item.price * item.quantity;
                total += itemTotal;
                
                const itemEl = document.createElement('div');
                itemEl.className = 'cart-item';
                itemEl.innerHTML = `
                    <div class="cart-item-info">
                        <span class="cart-item-name">${item.name}</span>
                        <span class="cart-item-price">${item.price} zł</span>
                    </div>
                    <div class="cart-item-actions">
                        <div class="quantity-controls">
                            <button class="quantity-btn minus" data-id="${item.id}">-</button>
                            <input type="number" class="quantity-input" value="${item.quantity}" min="1" max="99" data-id="${item.id}">
                            <button class="quantity-btn plus" data-id="${item.id}">+</button>
                        </div>
                        <span class="cart-item-total">${itemTotal.toFixed(2)} zł</span>
                        <button class="remove-item" data-id="${item.id}">Usuń</button>
                    </div>
                `;
                cartItems.appendChild(itemEl);
            });
            
            // Dodanie obsługi przycisków usuwania
            cartItems.querySelectorAll('.remove-item').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const productId = parseInt(e.target.dataset.id);
                    this.removeFromCart(productId);
                });
            });

            // Dodanie obsługi przycisków ilości
            // Laboratorium 6: Wykorzystanie .id
            cartItems.querySelectorAll('.quantity-btn.minus').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const productId = parseInt(e.target.dataset.id);
                    const item = this.cartItems.find(item => item.id === productId);
                    if (item && item.quantity > 1) {
                        this.updateQuantity(productId, item.quantity - 1);
                    }
                });
            });

            cartItems.querySelectorAll('.quantity-btn.plus').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const productId = parseInt(e.target.dataset.id);
                    const item = this.cartItems.find(item => item.id === productId);
                    if (item) {
                        this.updateQuantity(productId, item.quantity + 1);
                    }
                });
            });

            // Dodanie obsługi pól ilości
            cartItems.querySelectorAll('.quantity-input').forEach(input => {
                input.addEventListener('change', (e) => {
                    const productId = parseInt(e.target.dataset.id);
                    const newQuantity = parseInt(e.target.value);
                    if (newQuantity > 0 && newQuantity <= 99) {
                        this.updateQuantity(productId, newQuantity);
                    } else {
                        e.target.value = this.cartItems.find(item => item.id === productId).quantity;
                    }
                });
            });
        }
        
        if (cartTotal) {
            cartTotal.textContent = this.getTotalPrice().toFixed(2);
        }
    }
    
    displayCart() {
        // Wyświetlanie koszyka
        this.updateCartDisplay();
    }
    
    checkout() {
        // Obsługa zamówienia
        if (this.cartItems.length === 0) {
            alert('Twój koszyk jest pusty!');
            return;
        }
        
        alert('Dziękujemy za zakupy! Twoje zamówienie zostało złożone.');
        this.clearCart();
        document.getElementById('cart-modal').style.display = 'none';
    }
}