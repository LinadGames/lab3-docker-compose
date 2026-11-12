-- Виконується автоматично ОДИН раз — при першому запуску з порожнім volume
CREATE TABLE IF NOT EXISTS announcements (
    id BIGSERIAL PRIMARY KEY,
    title VARCHAR(120) NOT NULL,
    body TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

INSERT INTO announcements (title, body) VALUES
    ('Новий пак моделей', 'Додано 20 low-poly моделей скель для UE5.'),
    ('Оновлення каталогу', 'Усі матеріали тепер мають версії для UE 5.4+.');
