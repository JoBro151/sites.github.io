// Темы сайта
const themes = [
    {
        name: 'Пастельная',
        bg: 'linear-gradient(135deg, #e0e7ff 0%, #d1fae5 50%, #fef3c7 100%)',
        card: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
        header: 'linear-gradient(135deg, #a5b4fc 0%, #6ee7b7 50%, #fcd34d 100%)',
        text: '#374151',
        accent: '#8b5cf6'
    },
    {
        name: 'Неоновая',
        bg: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)',
        card: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
        header: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #ec4899 100%)',
        text: '#f1f5f9',
        accent: '#06b6d4'
    },
    {
        name: 'Ретро',
        bg: 'linear-gradient(135deg, #fef7cd 0%, #fed7aa 50%, #fdba74 100%)',
        card: 'linear-gradient(135deg, #ffffff 0%, #fffbeb 100%)',
        header: 'linear-gradient(135deg, #dc2626 0%, #ea580c 50%, #d97706 100%)',
        text: '#431407',
        accent: '#dc2626'
    },
    {
        name: 'Океан',
        bg: 'linear-gradient(135deg, #dbeafe 0%, #bae6fd 50%, #7dd3fc 100%)',
        card: 'linear-gradient(135deg, #ffffff 0%, #f0f9ff 100%)',
        header: 'linear-gradient(135deg, #0369a1 0%, #0ea5e9 50%, #38bdf8 100%)',
        text: '#0c4a6e',
        accent: '#0284c7'
    }
];

function initThemeChanger() {
    const changeThemeBtn = document.getElementById('changeThemeBtn');
    const body = document.body;
    let currentTheme = 0;

    changeThemeBtn.addEventListener('click', function () {
        currentTheme = (currentTheme + 1) % themes.length;
        applyTheme(themes[currentTheme]);
    });

    function applyTheme(theme) {
        // Применяем тему ко всем элементам
        document.documentElement.style.setProperty('--current-bg', theme.bg);
        document.documentElement.style.setProperty('--current-card', theme.card);
        document.documentElement.style.setProperty('--current-header', theme.header);
        document.documentElement.style.setProperty('--current-text', theme.text);
        document.documentElement.style.setProperty('--current-accent', theme.accent);

        // Обновляем текст кнопки
        changeThemeBtn.textContent = `🎨 Тема: ${theme.name}`;
    }
}

function initGallery() {
    const galleryGrid = document.getElementById('galleryGrid');
    const searchInput = document.getElementById('searchInput');

    // Массив изображений для галереи
    const galleryImages = [
        {
            src: 'https://fikiwiki.com/priroda/449-kartinki-krasivyh-gor-39-foto.html',
            name: 'Горы'
        },
        {
            src: 'https://proprikol.ru/kartinki/les-krasivye-kartinki-na-rabochij-stol-50-foto.html',
            name: 'Лес'
        },
        {
            src: 'https://megavtogal.com/28-foto/priroda-krasivye-kartinki-minimalizm.html',
            name: 'Природа'
        },
        {
            src: 'https://pibig.info/140429-krasivye-kartinki-pljazha.html',
            name: 'Пляж'
        },
        {
            src: 'https://klike.net/2967-kartinki-ozero-35-foto.html',
            name: 'Озеро'
        },
        {
            src: 'https://stroi-news.ru/articles/krasivye-kartinki-vodopadov/',
            name: 'Водопад'
        }
    ];

    // Создаем элементы галереи
    function createGalleryItems() {
        galleryGrid.innerHTML = '';
        galleryImages.forEach((image, index) => {
            const galleryItem = document.createElement('div');
            galleryItem.className = 'gallery-item';
            galleryItem.setAttribute('data-name', image.name);

            galleryItem.innerHTML = `
                <div class="gallery-image-container">
                    <img src="${image.src}" alt="${image.name}" loading="lazy">
                </div>
                <div class="gallery-item-content">
                    <h3>${image.name}</h3>
                </div>
            `;

            // Добавляем обработчик клика для открытия полноразмерного изображения
            galleryItem.addEventListener('click', () => openImageModal(image.src, image.name));

            galleryGrid.appendChild(galleryItem);
        });
    }

    // Инициализация галереи
    createGalleryItems();
    let galleryItems = Array.from(galleryGrid.children);

    // Поиск по галерее
    // Минимальное исправление поиска
    searchInput.addEventListener('input', function () {
        const searchTerm = this.value.toLowerCase();

        galleryItems.forEach(item => {
            const itemName = item.getAttribute('data-name').toLowerCase();
            if (itemName.includes(searchTerm)) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    });

    // Перемешивание элементов галереи
    const shuffleBtn = document.getElementById('shuffleBtn');
    shuffleBtn.addEventListener('click', function () {
        // Fisher-Yates shuffle algorithm
        for (let i = galleryItems.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            galleryGrid.appendChild(galleryItems[j]);
        }

        // Обновляем массив после перемешивания
        galleryItems = Array.from(galleryGrid.children);
    });
}

// Функция для открытия модального окна с изображением
function openImageModal(src, title) {
    const imageModal = document.getElementById('imageModal');
    const fullSizeImage = document.getElementById('fullSizeImage');
    const imageTitle = document.getElementById('imageTitle');

    fullSizeImage.src = src;
    imageTitle.textContent = title;

    imageModal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

// Инициализация модального окна для изображений
function initImageModal() {
    const imageModal = document.getElementById('imageModal');
    const imageClose = document.querySelector('.image-close');

    imageClose.addEventListener('click', function () {
        imageModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });

    imageModal.addEventListener('click', function (e) {
        if (e.target === imageModal) {
            imageModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && imageModal.style.display === 'flex') {
            imageModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
}

// Функция для инициализации аккордеона
function initAccordion() {
    const accordionItems = document.querySelectorAll('.accordion-item');

    accordionItems.forEach(item => {
        const header = item.querySelector('.accordion-header');
        const content = item.querySelector('.accordion-content');
        const icon = item.querySelector('.accordion-icon');

        header.addEventListener('click', function () {
            const isActive = item.classList.contains('active');

            // Если текущий элемент уже активен, закрываем его
            if (isActive) {
                item.classList.remove('active');
                content.style.maxHeight = null;
                icon.textContent = '+';
            } else {
                // Закрываем все другие элементы
                accordionItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('active');
                        otherItem.querySelector('.accordion-content').style.maxHeight = null;
                        otherItem.querySelector('.accordion-icon').textContent = '+';
                    }
                });

                // Открываем текущий элемент
                item.classList.add('active');
                content.style.maxHeight = content.scrollHeight + 'px';
                icon.textContent = '−';
            }
        });

        // Инициализация начального состояния
        content.style.maxHeight = null;
        icon.textContent = '+';
    });
}
// Функция для инициализации прогресс-бара
function initProgressBar() {
    const progressFill = document.getElementById('progressFill');
    const progressUp = document.getElementById('progressUp');
    const progressDown = document.getElementById('progressDown');

    let progress = 0;

    function updateProgress() {
        progressFill.style.width = progress + '%';
        progressFill.textContent = progress + '%';

        // Динамическое изменение цвета в зависимости от прогресса
        if (progress < 30) {
            progressFill.style.background = 'linear-gradient(135deg, #ef4444, #f97316)';
        } else if (progress < 70) {
            progressFill.style.background = 'linear-gradient(135deg, #f59e0b, #eab308)';
        } else {
            progressFill.style.background = 'linear-gradient(135deg, #22c55e, #16a34a)';
        }
    }

    progressUp.addEventListener('click', function () {
        if (progress < 100) {
            progress = Math.min(100, progress + 10);
            updateProgress();
        }
    });

    progressDown.addEventListener('click', function () {
        if (progress > 0) {
            progress = Math.max(0, progress - 10);
            updateProgress();
        }
    });

    // Инициализация
    updateProgress();
}

// Убедитесь, что эти функции вызываются при загрузке DOM
document.addEventListener('DOMContentLoaded', function () {
    initThemeChanger();
    initGallery();
    initAccordion();      // Добавьте этот вызов
    initModal();
    initProgressBar();    // Добавьте этот вызов
    initAnimatedTitle();
    initImageModal();
});