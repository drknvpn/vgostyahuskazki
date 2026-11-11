import { useEffect, useState } from 'react';
import {
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Flame,
  Leaf,
  MapPin,
  Menu,
  Phone,
  Sparkles,
  Utensils,
  X,
} from 'lucide-react';

const gallery = [
  { src: '/images/kaknayti.webp', alt: 'Ориентир с улицы' },
  { src: '/images/saunastol.webp', alt: 'Сауна и комната отдыха' },
  { src: '/images/tvstol.webp', alt: 'Зона отдыха с камином' },
  { src: '/images/par.webp', alt: 'Парная' },
  { src: '/images/razdel.webp', alt: 'Вход и раздевалка' },
  { src: '/images/dush.webp', alt: 'Душевая' },
  { src: '/images/basein.webp', alt: 'Бассеин' },
  { src: '/images/kamin.webp', alt: 'Камин' },
  { src: '/images/tv.webp', alt: 'Телевизор' },
];

const benefits = [
  { icon: Flame, title: 'Настоящая парная', text: 'Тёплое дерево, мягкий пар и приятный свет для полноценного отдыха.' },
  { icon: Utensils, title: 'Мангальная зона', text: 'Мангал находится на улице — можно готовить на свежем воздухе.' },
  { icon: Sparkles, title: 'Всё для компании', text: 'Комната отдыха, телевизор и пространство, где удобно проводить время в компании близких людей.' },
];

function App() {
  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const closePhoto = () => setSelectedPhoto(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closePhoto();
      if (selectedPhoto === null) return;
      if (event.key === 'ArrowRight') setSelectedPhoto((current) => current === null ? null : (current + 1) % gallery.length);
      if (event.key === 'ArrowLeft') setSelectedPhoto((current) => current === null ? null : (current - 1 + gallery.length) % gallery.length);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedPhoto]);

  const selectedImage = selectedPhoto === null ? null : gallery[selectedPhoto];

  return (
    <div className="site-shell">
      <header className="topbar">
        <a className="brand" href="#top" aria-label="Сауна в гостях у сказки">
          <span className="brand-mark"><Leaf size={18} /></span>
          <span>В гостях у сказки</span>
        </a>
        <button className="mobile-menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label="Открыть меню">
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
        <nav className={menuOpen ? 'nav-links is-open' : 'nav-links'}>
          <a href="#about" onClick={() => setMenuOpen(false)}>О сауне</a>
          <a href="#gallery" onClick={() => setMenuOpen(false)}>Фотографии</a>
          <a href="#location" onClick={() => setMenuOpen(false)}>Как добраться</a>
          <a className="nav-book" href="tel:+79028282858"><Phone size={15} /> Забронировать</a>
        </nav>
      </header>

      <main id="top">
        <section className="hero section-wrap">
          <div className="hero-copy">
            <div className="eyebrow"><span className="eyebrow-dot" /> Ханты-Мансийск · уютный отдых</div>
            <h1>Тепло, тишина<br /><em>и свои люди.</em></h1>
            <p className="hero-text">Сауна для тех, кто ценит спокойный отдых, живое тепло дерева и время, которое хочется запомнить.</p>
            <div className="hero-actions">
              <a className="button button-primary" href="tel:+79028282858">Забронировать <ArrowUpRight size={17} /></a>
              <a className="button button-quiet" href="#gallery">Смотреть фото <ChevronRight size={16} /></a>
            </div>
            <div className="hero-note"><Clock3 size={16} /> Работаем ежедневно по предварительной записи</div>
          </div>
          <div className="hero-visual">
            <img src={gallery[0].src} alt={gallery[0].alt} />
            <div className="image-label"><span>01</span><span>комната отдыха</span></div>
            <div className="hero-stamp"><Sparkles size={17} /><span>место<br /><strong>для отдыха</strong></span></div>
          </div>
        </section>

        <section className="booking-panel section-wrap" aria-label="Бронирование и стоимость">
          <div className="booking-main">
            <span className="panel-kicker">Бронирование</span>
            <div className="phone-row"><a href="tel:+79028282858">+7 (902) 828-28-58</a><a href="tel:+73467337272">+7 (3467) 33-72-72</a></div>
            <p>Позвоните нам — подберём удобное время и ответим на вопросы.</p>
          </div>
          <div className="price-block"><span className="panel-kicker">Стоимость</span><strong>1 000 ₽</strong><span>за 1 час</span></div>
          <div className="gift-block"><span className="gift-icon"><Sparkles size={18} /></span><div><span className="panel-kicker">Особое предложение</span><strong>5 часов + 1 в подарок</strong></div></div>
        </section>

        <section className="address-line section-wrap"><MapPin size={18} /><span><strong>Сауна «В гостях у сказки»</strong> · Школьная ул., 3/1, Ханты-Мансийск</span><span className="address-detail">Заезд у Школьной 4</span></section>

        <section id="about" className="section-wrap about-section">
          <div className="section-heading"><div><span className="eyebrow">Всё для хорошего вечера</span><h2>Пространство,<br /><em>в которое возвращаются.</em></h2></div><p>Собрали всё необходимое для отдыха без спешки: парная, удобная зона отдыха и возможность провести вечер так, как хочется именно вам.</p></div>
          <div className="benefit-grid">{benefits.map(({ icon: Icon, title, text }) => <article className="glass-card benefit-card" key={title}><span className="card-icon"><Icon size={20} /></span><h3>{title}</h3><p>{text}</p></article>)}</div>
        </section>

        <section className="section-wrap rules-section">
          <div className="rules-card glass-card"><div className="rules-intro"><span className="eyebrow">Полезно знать</span><h2>Берите с собой<br /><em>только настроение.</em></h2></div><div className="rules-list"><div><span className="rule-number">01</span><span>Веники, алкоголь и предметы личной гигиены, включая тапочки, можно принести с собой по желанию.</span></div><div><span className="rule-number">02</span><span>Мангал находится на улице — отличный вариант для ужина и неспешного общения на свежем воздухе.</span></div><div><span className="rule-number">03</span><span>При заказе 5 часов шестой час отдыха идёт в подарок.</span></div></div></div>
        </section>

        <section id="gallery" className="section-wrap gallery-section">
          <div className="section-heading gallery-heading"><div><span className="eyebrow">Загляните внутрь</span><h2>Здесь <em>уютно.</em></h2></div><p>Нажмите на фотографию, чтобы рассмотреть детали. В галерею можно добавить ещё 4 снимка — замените пустые карточки прямыми ссылками на изображения.</p></div>
          <div className="gallery-grid">{gallery.map((photo, index) => photo.src ? <button className={index === 0 ? 'gallery-item gallery-featured' : 'gallery-item'} key={photo.src} onClick={() => setSelectedPhoto(index)}><img src={photo.src} alt={photo.alt} /><span className="gallery-number">0{index + 1}</span></button> : <div className="gallery-item gallery-empty" key={`empty-${index}`}><span>{String(index + 1).padStart(2, '0')}</span><p>Фото скоро появится</p></div>)}</div>
        </section>

        <section id="location" className="section-wrap location-section"><div className="location-copy"><span className="eyebrow">Как нас найти</span><h2>Ближе, чем<br /><em>кажется.</em></h2><p>Сауна находится в Ханты-Мансийске. Заезд — со стороны Школьной, 4.</p><a className="button button-primary" href="https://yandex.ru/maps/?um=constructor%3Abcc9524183a27b3ad576f3841af4a09f8ccc96478c6debd5b5ab39ea8b11a012" target="_blank" rel="noreferrer">Открыть маршрут <ArrowUpRight size={17} /></a></div><div className="map-frame"><iframe title="Карта проезда до сауны" src="https://yandex.ru/map-widget/v1/?um=constructor%3Abcc9524183a27b3ad576f3841af4a09f8ccc96478c6debd5b5ab39ea8b11a012&source=constructor" width="100%" height="100%" frameBorder="0" /></div></section>
      </main>

      <footer className="footer section-wrap"><div className="brand"><span className="brand-mark"><Leaf size={18} /></span><span>В гостях у сказки</span></div><span>Тепло встречает. Память остаётся.</span><a href="tel:+79028282858"><Phone size={15} /> +7 (902) 828-28-58</a></footer>

      {selectedImage?.src && <div className="lightbox" role="dialog" aria-modal="true" aria-label="Просмотр фотографии" onClick={closePhoto}><button className="lightbox-close" onClick={closePhoto} aria-label="Закрыть"><X size={24} /></button><button className="lightbox-arrow lightbox-left" onClick={(event) => { event.stopPropagation(); setSelectedPhoto((selectedPhoto! - 1 + gallery.length) % gallery.length); }} aria-label="Предыдущее фото"><ChevronLeft size={28} /></button><img src={selectedImage.src} alt={selectedImage.alt} onClick={(event) => event.stopPropagation()} /><button className="lightbox-arrow lightbox-right" onClick={(event) => { event.stopPropagation(); setSelectedPhoto((selectedPhoto! + 1) % gallery.length); }} aria-label="Следующее фото"><ChevronRight size={28} /></button></div>}
    </div>
  );
}

export default App;
