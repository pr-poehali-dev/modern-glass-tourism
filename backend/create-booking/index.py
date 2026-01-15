import json
import os
import psycopg2
import re
from datetime import datetime


def handler(event: dict, context) -> dict:
    """API для создания бронирования номера в гостинице"""
    
    method = event.get('httpMethod', 'POST')
    
    # CORS preflight
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    if method != 'POST':
        return {
            'statusCode': 405,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Method not allowed'}),
            'isBase64Encoded': False
        }
    
    # Парсинг данных из тела запроса
    try:
        body = json.loads(event.get('body', '{}'))
    except json.JSONDecodeError:
        return {
            'statusCode': 400,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Invalid JSON'}),
            'isBase64Encoded': False
        }
    
    # Валидация обязательных полей
    required_fields = ['name', 'phone', 'checkIn', 'checkOut', 'roomType', 'guests']
    missing_fields = [field for field in required_fields if not body.get(field)]
    
    if missing_fields:
        return {
            'statusCode': 400,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({
                'error': 'Missing required fields',
                'missing': missing_fields
            }),
            'isBase64Encoded': False
        }
    
    # Извлечение и санитизация данных
    guest_name = body['name'].strip()[:255]
    guest_phone = body['phone'].strip()[:20]
    check_in = body['checkIn']
    check_out = body['checkOut']
    room_type = body['roomType']
    guests_count = int(body['guests'])
    
    # Валидация имени (только буквы, пробелы, дефисы)
    if not re.match(r'^[а-яА-ЯёЁa-zA-Z\s\-]+$', guest_name):
        return {
            'statusCode': 400,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Invalid name format'}),
            'isBase64Encoded': False
        }
    
    # Валидация телефона (только цифры, +, пробелы, скобки, дефисы)
    if not re.match(r'^[\d\+\s\(\)\-]+$', guest_phone):
        return {
            'statusCode': 400,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Invalid phone format'}),
            'isBase64Encoded': False
        }
    
    # Валидация формата дат
    try:
        check_in_dt = datetime.fromisoformat(check_in)
        check_out_dt = datetime.fromisoformat(check_out)
        
        if check_in_dt >= check_out_dt:
            return {
                'statusCode': 400,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'error': 'Check-out date must be after check-in date'}),
                'isBase64Encoded': False
            }
    except ValueError:
        return {
            'statusCode': 400,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Invalid date format'}),
            'isBase64Encoded': False
        }
    
    # Дополнительная валидация
    if room_type not in ['Комфорт', 'Премиум']:
        return {
            'statusCode': 400,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Invalid room type'}),
            'isBase64Encoded': False
        }
    
    if guests_count < 1 or guests_count > 6:
        return {
            'statusCode': 400,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Guests count must be between 1 and 6'}),
            'isBase64Encoded': False
        }
    
    # Подключение к базе данных
    try:
        conn = psycopg2.connect(os.environ['DATABASE_URL'])
        cur = conn.cursor()
        
        # Вставка данных в таблицу
        cur.execute("""
            INSERT INTO bookings 
            (guest_name, guest_phone, check_in_date, check_out_date, room_type, guests_count, status)
            VALUES (%s, %s, %s, %s, %s, %s, %s)
            RETURNING id, created_at, total_nights
        """, (guest_name, guest_phone, check_in, check_out, room_type, guests_count, 'pending'))
        
        result = cur.fetchone()
        booking_id = result[0]
        created_at = result[1].isoformat()
        total_nights = result[2]
        
        conn.commit()
        cur.close()
        conn.close()
        
        return {
            'statusCode': 201,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({
                'success': True,
                'booking': {
                    'id': booking_id,
                    'guestName': guest_name,
                    'phone': guest_phone,
                    'checkIn': check_in,
                    'checkOut': check_out,
                    'roomType': room_type,
                    'guests': guests_count,
                    'totalNights': total_nights,
                    'status': 'pending',
                    'createdAt': created_at
                },
                'message': 'Бронирование успешно создано. Мы свяжемся с вами в ближайшее время!'
            }),
            'isBase64Encoded': False
        }
        
    except psycopg2.Error as e:
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({
                'error': 'Database error',
                'details': str(e)
            }),
            'isBase64Encoded': False
        }
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({
                'error': 'Internal server error',
                'details': str(e)
            }),
            'isBase64Encoded': False
        }