-- Создание таблицы для хранения бронирований
CREATE TABLE IF NOT EXISTS bookings (
    id SERIAL PRIMARY KEY,
    guest_name VARCHAR(255) NOT NULL,
    guest_phone VARCHAR(50) NOT NULL,
    check_in_date DATE NOT NULL,
    check_out_date DATE NOT NULL,
    room_type VARCHAR(100) NOT NULL,
    guests_count INTEGER NOT NULL DEFAULT 2,
    status VARCHAR(50) NOT NULL DEFAULT 'pending',
    total_nights INTEGER GENERATED ALWAYS AS (check_out_date - check_in_date) STORED,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    notes TEXT,
    CONSTRAINT check_dates CHECK (check_out_date > check_in_date),
    CONSTRAINT check_guests CHECK (guests_count > 0 AND guests_count <= 6),
    CONSTRAINT check_room_type CHECK (room_type IN ('Комфорт', 'Премиум'))
);

-- Создание индексов для быстрого поиска
CREATE INDEX idx_bookings_dates ON bookings(check_in_date, check_out_date);
CREATE INDEX idx_bookings_phone ON bookings(guest_phone);
CREATE INDEX idx_bookings_status ON bookings(status);
CREATE INDEX idx_bookings_room_type ON bookings(room_type);

-- Комментарии к таблице и полям
COMMENT ON TABLE bookings IS 'Таблица бронирований номеров гостиницы Горизонт';
COMMENT ON COLUMN bookings.id IS 'Уникальный идентификатор бронирования';
COMMENT ON COLUMN bookings.guest_name IS 'ФИО гостя';
COMMENT ON COLUMN bookings.guest_phone IS 'Телефон гостя для связи';
COMMENT ON COLUMN bookings.check_in_date IS 'Дата заезда';
COMMENT ON COLUMN bookings.check_out_date IS 'Дата выезда';
COMMENT ON COLUMN bookings.room_type IS 'Тип номера: Комфорт или Премиум';
COMMENT ON COLUMN bookings.guests_count IS 'Количество гостей (1-6)';
COMMENT ON COLUMN bookings.status IS 'Статус бронирования: pending, confirmed, checked_in, checked_out, cancelled';
COMMENT ON COLUMN bookings.total_nights IS 'Количество ночей (автоматически вычисляется)';
COMMENT ON COLUMN bookings.notes IS 'Дополнительные заметки о бронировании';
